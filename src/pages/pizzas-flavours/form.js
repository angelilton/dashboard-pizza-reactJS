import React, {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState
} from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import { Button, Grid, InputLabel, Typography } from '@material-ui/core'
import { Form, FormContainer, TextField } from 'ui'
import { PIZZAS_FLAVOURS } from 'routes'
import { useCollection } from 'hooks'

const initialState = {
  image: '',
  name: '',
  value: {}
}

// ---- hook to handle pizza data ----
function usePizzaFlavours(id) {
  const [pizza, setPizza] = useState(initialState)
  const { data, add, edit } = useCollection('pizzasFlavours')

  useEffect(() => {
    setPizza(data?.find((pizza) => pizza.id === id) || initialState)
  }, [data, id])

  return { pizza, add, edit }
}

// ---- reducer ----
function reducer(state, action) {
  if (action.type === 'EDIT') {
    return action.payload
  }

  if (action.type === 'UPDATE_FIELD') {
    return {
      ...state,
      ...action.payload
    }
  }

  if (action.type === 'UPDATE_SIZE') {
    return {
      ...state,
      value: {
        ...state.value,
        ...action.payload
      }
    }
  }

  return state
}

// ---- Form ----
const FormRegisterFlavour = () => {
  const { id } = useParams()
  const imageField = useRef()
  const history = useHistory()
  const { data: pizzasSizes } = useCollection('pizzasSizes')
  const { pizza, add, edit } = usePizzaFlavours(id)

  const [pizzaEditable, dispatch] = useReducer(reducer, initialState)

  // console.log('pizzaEditable:', pizzaEditable)

  const texts = useMemo(
    () => ({
      title: id ? 'Editar sabor' : 'Cadastrar novo sabor',
      button: id ? 'Salvar' : 'Cadastrar'
    }),
    [id]
  )

  useEffect(() => {
    imageField.current.focus()
  }, [id])

  useEffect(() => {
    dispatch({
      type: 'EDIT',
      payload: pizza
    })
  }, [pizza])

  const handleChange = useCallback(async (e) => {
    const { name: field, value } = e.target
    const action = field.includes('size-') ? 'UPDATE_SIZE' : 'UPDATE_FIELD'
    const fieldName = field.includes('size-')
      ? field.replace('size-', '')
      : field

    dispatch({
      type: action,
      payload: {
        [fieldName]: value
      }
    })
  }, [])

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault()
      const { id, ...data } = pizzaEditable

      const normalizedData = {
        ...data,
        value: Object.entries(data.value).reduce((acc, [sizeId, value]) => {
          acc[sizeId] = +value
          return acc
        }, {})
      }

      console.log('normalize:', normalizedData)
      if (id) await edit(id, normalizedData)
      else await add(normalizedData)

      history.push(PIZZAS_FLAVOURS)
    },
    [add, edit, history, pizzaEditable]
  )

  return (
    <FormContainer>
      <Grid item xs={12}>
        <Typography variant="h4">{texts.title}</Typography>
      </Grid>
      <Form onSubmit={handleSubmit}>
        <TextField
          label="Link para imagem desse sabor"
          name="image"
          inputRef={imageField}
          value={pizzaEditable.image}
          onChange={handleChange}
        />

        <TextField
          label="Nome do sabor"
          name="name"
          value={pizzaEditable.name}
          onChange={handleChange}
        />

        <Grid item xs={12}>
          <InputLabel>Valores (em R$) para cada tamanho:</InputLabel>
        </Grid>

        {pizzasSizes?.map((size) => (
          <TextField
            key={size.id}
            label={size.name}
            name={`size-${size.id}`}
            value={pizzaEditable.value[size.id] || ''}
            onChange={handleChange}
            xs={3}
          />
        ))}

        <Grid item container justify="flex-end" spacing={2}>
          <Grid item>
            <Button variant="contained" component={Link} to={PIZZAS_FLAVOURS}>
              Cancelar
            </Button>
          </Grid>

          <Grid item>
            <Button variant="contained" color="primary" type="submit">
              {texts.button}
            </Button>
          </Grid>
        </Grid>
      </Form>
    </FormContainer>
  )
}

export default FormRegisterFlavour

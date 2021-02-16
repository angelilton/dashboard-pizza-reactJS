import React, {
  useCallback,
  useMemo,
  useState,
  useEffect,
  useReducer,
  useRef
} from 'react'
import { Button, Grid, Typography } from '@material-ui/core'
import { TextField, FormContainer, Form } from 'ui'
import { Link, useHistory, useParams } from 'react-router-dom'
import { PIZZAS_SIZES } from 'routes'
import { useCollection } from 'hooks'

const initialState = {
  name: '',
  size: '',
  slices: '',
  flavours: ''
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

  return state
}

// ---- hook to handle pizza data ----
function usePizzaSize(id) {
  const { data, add, edit } = useCollection('pizzasSizes')
  const [pizza, setPizza] = useState(initialState)

  useEffect(() => {
    setPizza(data?.find((p) => p.id === id) || initialState)
  }, [data, id])

  return { pizza, add, edit }
}

// ---- Form ----
const FormRegisterSize = () => {
  const history = useHistory()
  const { id } = useParams()
  const nameField = useRef()

  const { pizza, add, edit } = usePizzaSize(id)

  const [pizzaEdit, dispatch] = useReducer(reducer, initialState)

  const texts = useMemo(
    () => ({
      title: id ? 'Editar tamanho' : 'Cadastrar novo tamanho',
      button: id ? 'salvar' : 'Cadastrar'
    }),
    [id]
  )

  useEffect(() => {
    nameField.current.focus()
  }, [id])

  useEffect(() => {
    dispatch({
      type: 'EDIT',
      payload: pizza
    })
  }, [pizza])

  const handleChange = useCallback((e) => {
    const { name, value } = e.target
    dispatch({
      type: 'UPDATE_FIELD',
      payload: {
        [name]: value
      }
    })
  }, [])

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault()
      const { id, name, size, slices, flavours } = pizzaEdit

      const data = {
        name,
        size: Number(size),
        slices: Number(slices),
        flavours: Number(flavours)
      }

      if (id) {
        await edit(id, data)
      } else {
        await add(data)
      }

      //update table with pizzas data
      history.push(PIZZAS_SIZES)
    },
    [add, edit, history, pizzaEdit]
  )

  return (
    <FormContainer>
      <Grid item xs={12}>
        <Typography variant="h4">{texts.title}</Typography>
      </Grid>

      <Form onSubmit={handleSubmit}>
        <TextField
          name="name"
          label="Nome para esse tamanho. Ex: Pequena"
          inputRef={nameField}
          value={pizzaEdit.name}
          onChange={handleChange}
        />

        <TextField
          name="size"
          label="Diâmetro da pizza em cm"
          value={pizzaEdit.size}
          onChange={handleChange}
        />

        <TextField
          name="slices"
          label="Quantidade de fatias"
          value={pizzaEdit.slices}
          onChange={handleChange}
        />

        <TextField
          name="flavours"
          label="Quantidade de sabores"
          value={pizzaEdit.flavours}
          onChange={handleChange}
        />

        <Grid item container justify="flex-end" spacing={2}>
          <Grid item>
            <Button
              variant="contained"
              color="secondary"
              component={Link}
              to={PIZZAS_SIZES}
            >
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

export default FormRegisterSize

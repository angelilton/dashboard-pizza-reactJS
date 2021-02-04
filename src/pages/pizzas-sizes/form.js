import React, { useCallback, useState, useEffect, useReducer } from 'react'
import styled from 'styled-components'
import { Button, Grid, Typography } from '@material-ui/core'
import { TextField } from 'ui'
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
  return state
}

// ---- hook to handle pizza data ----
function usePizzaSize(id) {
  const { data, add } = useCollection('pizzasSizes')
  const [pizza, setPizza] = useState(initialState)

  useEffect(() => {
    setPizza(data?.find((p) => p.id === id) || initialState)
  }, [data, id])

  return { pizza, add }
}

// ---- Form ----
const FormRegisterSize = () => {
  const history = useHistory()
  const { id } = useParams()
  const { pizza, add } = usePizzaSize(id)

  const [pizzaEdit, dispatch] = useReducer(reducer, initialState)
  console.log('item to edit:', pizzaEdit)

  useEffect(() => {
    dispatch({
      type: 'EDIT',
      payload: pizza
    })
  }, [pizza])

  const handleChange = useCallback((e) => {}, [])

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault()
      const { name, size, slices, flavours } = e.target.elements

      const data = {
        name: name.value,
        size: Number(size.value),
        slices: Number(slices.value),
        flavours: Number(flavours.value)
      }

      await add(data)
      history.push(PIZZAS_SIZES)
    },
    [add, history]
  )

  return (
    <Container>
      <Grid item xs={12}>
        <Typography variant="h4">Cadastrar novo tamanho</Typography>
      </Grid>

      <Form onSubmit={handleSubmit}>
        <TextField
          name="name"
          label="Nome para esse tamanho. Ex: Pequena"
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
              Cadastrar
            </Button>
          </Grid>
        </Grid>
      </Form>
    </Container>
  )
}

const Form = styled(Grid).attrs({
  item: true,
  container: true,
  xs: 12,
  spacing: 2,
  component: 'form'
})``

const Container = styled(Grid).attrs({
  container: true,
  spacing: 2
})`
  && {
    margin-bottom: ${({ theme }) => theme.spacing(5)}px;
  }
`

export default FormRegisterSize

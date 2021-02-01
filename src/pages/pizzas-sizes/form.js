import React, { useCallback } from 'react'
import styled from 'styled-components'
import { Button, Grid, Typography } from '@material-ui/core'
import { TextField } from 'ui'
import { Link } from 'react-router-dom'
import { PIZZAS_SIZES } from 'routes'
import { useCollection } from 'hooks'

const FormRegisterSize = () => {
  const { add } = useCollection('pizzasSizes')

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault()
      const { name, size, slices, flavours } = e.target.elements

      const data = {
        name: name.value,
        size: Number(size.value),
        slices: Number(slices.value),
        flavours: Number(flavours.value)
      }

      add(data)
    },
    [add]
  )

  return (
    <Container>
      <Grid item xs={12}>
        <Typography variant="h4">Cadastrar novo tamanho</Typography>
      </Grid>

      <Form onSubmit={handleSubmit}>
        <TextField name="name" label="Nome para esse tamanho. Ex: Pequena" />

        <TextField name="size" label="Diâmetro da pizza em cm" />

        <TextField name="slices" label="Quantidade de fatias" />

        <TextField name="flavours" label="Quantidade de sabores" />

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

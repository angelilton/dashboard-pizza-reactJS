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

// ---- Form ----
const FormRegisterFlavour = () => {
  const { id } = useParams()
  const imageField = useRef()

  const { data: pizzasSizes } = useCollection('pizzasSizes')
  console.log('Sizes:', pizzasSizes)

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

  return (
    <FormContainer>
      <Grid item xs={12}>
        <Typography variant="h4">{texts.title}</Typography>
      </Grid>
      <Form>
        <TextField
          label="Link para imagem desse sabor"
          name="image"
          inputRef={imageField}
        />
        <TextField label="Nome do sabor" name="name" />
        <Grid item xs={12}>
          <InputLabel>Valores (em R$) para cada tamanho:</InputLabel>
        </Grid>
        // add sizes fields
        {pizzasSizes?.map((size) => (
          <TextField
            key={size.id}
            label={size.name}
            name={`size-${size.id}`}
            xs={2}
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

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

const FormRegisterFlavour = () => {
  const { id } = useParams()
  const imageField = useRef()

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

        <TextField label="Pequena" name="size-0" xs={4} />

        <TextField label="Média" name="size-1" xs={4} />

        <TextField label="Grande" name="size-2" xs={4} />

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

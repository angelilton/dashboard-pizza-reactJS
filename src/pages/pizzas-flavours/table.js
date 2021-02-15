import React from 'react'
import { Link, useRouteMatch } from 'react-router-dom'
import {
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableRow
} from '@material-ui/core'
import { Add, Delete, Edit } from '@material-ui/icons'
import {
  TableButton,
  TableContainer,
  TableTitle,
  TableTitleContainer,
  THead,
  Th
} from 'ui'
import { PIZZAS_FLAVOURS, NEW, EDIT } from 'routes'

const TablePizzaFlavours = () => {
  const newFlavourPath = useRouteMatch(`${PIZZAS_FLAVOURS}${NEW}`)

  return (
    <TableContainer>
      <TableTitleContainer>
        <Grid item>
          <TableTitle>Sabores cadastrados</TableTitle>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
            component={Link}
            to={`${PIZZAS_FLAVOURS}${NEW}`}
            disabled={!!newFlavourPath}
          >
            Adicionar novo sabor
          </Button>
        </Grid>
      </TableTitleContainer>
    </TableContainer>
  )
}

export default TablePizzaFlavours

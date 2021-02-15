import React from 'react'
import { Route } from 'react-router'
import { EDIT, NEW, PIZZAS_FLAVOURS } from 'routes'
import FormRegisterFlavour from './form'
import TablePizzaFlavours from './table'

const newFlavourPath = `${PIZZAS_FLAVOURS}${NEW}`
const editFlavourPath = `${PIZZAS_FLAVOURS}${EDIT()}`

const PizzasFlavours = () => {
  return (
    <>
      <Route path={[newFlavourPath, editFlavourPath]}>
        <FormRegisterFlavour />
      </Route>
      <TablePizzaFlavours />
    </>
  )
}

export default PizzasFlavours

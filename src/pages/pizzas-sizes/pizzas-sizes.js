import React from 'react'
import { Route } from 'react-router-dom'
import FormRegisterSize from './form'
import TablePizzasSizes from './table'
import { PIZZAS_SIZES, NEW } from 'routes'

const pizzasSizes = () => {
  return (
    <>
      <Route path={`${PIZZAS_SIZES}${NEW}`}>
        <FormRegisterSize />
      </Route>
      <TablePizzasSizes />
    </>
  )
}

export default pizzasSizes

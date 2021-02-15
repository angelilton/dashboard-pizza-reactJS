import { lazy } from 'react'
import * as routes from 'routes'

// importes das paginas com lazy load > isso vai carregar apenas quando chamado
const Orders = lazy(() => import('pages/orders'))
const PizzasSizes = lazy(() => import('pages/pizzas-sizes'))
const PizzasFlavours = lazy(() => import('pages/pizzas-flavours'))

// items para o menu com rotas to e component
const menuItems = [
  {
    label: 'Pedidos',
    link: routes.HOME,
    component: Orders,
    exact: true
  },

  {
    label: 'Tamanhos de pizzas',
    link: routes.PIZZAS_SIZES,
    component: PizzasSizes
  },

  {
    label: 'Sabores de pizzas',
    link: routes.PIZZAS_FLAVOURS,
    component: PizzasFlavours
  }
]

export default menuItems

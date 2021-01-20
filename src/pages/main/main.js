import React, { lazy, Suspense } from 'react'
import { Link, Route, Switch } from 'react-router-dom'
import {
  Drawer as MaterialDrawer,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText
} from '@material-ui/core'
import styled from 'styled-components'

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

const Main = () => (
  <>
    <Drawer variant="permanent">
      <Typography variant="h4">React-zzaria</Typography>
      <Typography>(sistema de cadastro)</Typography>

      <Divider />

      <List>
        {menuItems.map((item) => (
          <ListItem key={item.label} button component={Link} to={item.link}>
            <ListItemText>{item.label}</ListItemText>
          </ListItem>
        ))}
      </List>
    </Drawer>

    <Wrapper>
      <Suspense fallback="Loading...">
        <Switch>
          {menuItems.map((item) => (
            <Route key={item.link} exact={item.exact} path={item.link}>
              <item.component />
            </Route>
          ))}
        </Switch>
      </Suspense>
    </Wrapper>
  </>
)

const Drawer = styled(MaterialDrawer)`
  .MuiPaper-root {
    width: 280px;
    padding: ${({ theme }) => theme.spacing(1, 0)};
  }
`

const Wrapper = styled.main`
  margin-left: 280px;
  padding: 3rem;
`

export default Main

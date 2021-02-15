import React, { Suspense, useCallback } from 'react'
import { Link, Route, Switch, useLocation } from 'react-router-dom'
import {
  Drawer as MaterialDrawer,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText
} from '@material-ui/core'
import styled from 'styled-components'
import menuItems from './content'
import { useScrollToTop } from 'hooks'
import * as routes from 'routes'

const Main = () => {
  useScrollToTop()
  const { pathname } = useLocation()

  const getSelectedMenuItem = useCallback(
    (item) => {
      return (
        pathname === item.link ||
        (pathname.includes(item.link) && item.link !== routes.HOME)
      )
    },
    [pathname]
  )

  return (
    <>
      <Drawer variant="permanent">
        <Typography variant="h4">React-zzaria</Typography>
        <Typography>(sistema de cadastro)</Typography>

        <Divider />

        <List>
          {menuItems.map((item) => (
            <ListItem
              key={item.label}
              button
              selected={getSelectedMenuItem(item)}
              component={Link}
              to={item.link}
            >
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
}

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

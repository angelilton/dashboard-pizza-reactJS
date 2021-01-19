import React, { Suspense } from 'react'
import { Route, Switch } from 'react-router-dom'

const Main = () => (
  <>
    <Suspense fallback="Loading...">
      <Switch>
        <Route>
          <h1>main</h1>
        </Route>
      </Switch>
    </Suspense>
  </>
)

export default Main

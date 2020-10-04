import React from 'react'
import { Helmet } from 'react-helmet'
import { Layout } from './components'
import { GlobalStyled } from './components/globalStyle'
import { useSelector } from 'react-redux'

import { Switch, Route, Link } from 'react-router-dom'
import { Routes } from './routes'

const menuList = [
  <Link to="/userList">Utilisateur</Link>,
  <Link to="/teamList">Equipe</Link>,
  <Link to="/jobList">Fonction</Link>,
]

const App = () => {
  const active = useSelector((state) => state.loading)
  return (
    <>
      <GlobalStyled />
      <Helmet>
        <title>titre par default</title>
      </Helmet>
      <Layout menuList={menuList} modal={active}>
        <Switch>{createRoute()}</Switch>
      </Layout>
    </>
  )
}

export default App

/*
not really necessarie in this case, but if you want to make protected route or manage translation it's ready
 */
const createRoute = () => {
  return Routes.map(({ path, component, exact = true, params }) => (
    <Route
      path={path}
      exact={exact}
      key={path}
      render={(props) =>
        React.createElement(component, { ...props, ...params })
      }
    />
  ))
}

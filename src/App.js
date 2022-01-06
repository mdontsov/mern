import React, { useState, useCallback } from 'react'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'

import Users from './user/pages/Users'
import NewPlace from './places/pages/NewPlace'
import UpdatePlace from './places/pages/UpdatePlace'
import MainNavigation from './shared/components/Navigation/MainNavigation'
import UserPlaces from './places/pages/UserPlaces'
import Auth from './user/pages/Auth'
import { AuthContext } from './shared/context/AuthContext'

import './App.css'

/**
 * @returns 'exact' route path filtering and the order is really matters here
 */
const App = () => {

  var [isLoggedIn, setIsLoggedIn] = useState(false)
  var [userId, setUserId] = useState(false)

  var appLogin = useCallback((userId) => {
    setIsLoggedIn(true)
    setUserId(userId)
  }, [])

  var appLogout = useCallback(() => {
    setIsLoggedIn(false)
    setUserId(null)
  }, [])

  var routes = {}

  if (isLoggedIn) {
    routes = <Switch>
      <Route path={"/"} exact={true}>
        <Users />
      </Route>
      <Route path={"/:userId/places"} exact={true}>
        <UserPlaces />
      </Route>
      <Route path={"/places/new"}>
        <NewPlace />
      </Route>
      <Route path={"/places/:placeId"}>
        <UpdatePlace />
      </Route>
      <Redirect to={"/"} />
    </Switch>
  } else {
    routes = <Switch>
      <Route path={"/"} exact={true}>
        <Users />
      </Route>
      <Route path={"/:userId/places"} exact={true}>
        <UserPlaces />
      </Route>
      <Route path={"/auth"}>
        <Auth />
      </Route>
      <Redirect to={"/auth"} />
    </Switch>
  }

  return (
    <AuthContext.Provider value={
      {
        isLoggedIn: isLoggedIn,
        userId: userId,
        login: appLogin,
        logout: appLogout
      }
    }>
      <Router>
        <MainNavigation />
        <main>
          {routes}
        </main>
      </Router>
    </AuthContext.Provider>
  );
}

export default App

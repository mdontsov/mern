import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'

import Users from './user/pages/Users'
import NewPlace from './places/pages/NewPlace'
import MainNavigation from './shared/components/Navigation/MainNavigation'

import './App.css'

/**
 * @returns 'exact' route path filtering
 */
const App = () => {
  return (
    <Router>
      <MainNavigation />
      <main>
        <Switch>
          <Route path={"/"} exact={true}>
            <Users />
          </Route>
          <Route path={"/places/new"}>
            <NewPlace />
          </Route>
          <Redirect to={"/"} />
        </Switch>
      </main>
    </Router>
  );
}

export default App
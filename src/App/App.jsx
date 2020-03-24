import { Menu, PrivateRoute } from '../_components'
import React, { useEffect } from 'react'
import { Redirect, Route, Router, Switch } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { AnswerPollPage } from '../Pages/AnswerPoll'
import { CreatePollPage } from '../Pages/CreatePoll'
import { HomePage } from '../Pages/Home'
import { LoginPage } from '../Pages/Login'
import { RegisterPage } from '../Pages/Register'
import { alertActions } from '../_actions'
import { history } from '../_helpers'

function App() {
  const alert = useSelector(state => state.alert)
  const dispatch = useDispatch()

  useEffect(() => {
    history.listen((location, action) => {
      // clear alert on location change
      dispatch(alertActions.clear())
    })
  }, [])

  return (
    <Router history={history}>
      <Menu />
      <div className="jumbotron">
        <div className="container">
          <div className="col-md-8 offset-md-2">
            {alert.message && (
              <div className={`alert ${alert.type}`}>{alert.message}</div>
            )}

            <Switch>
              <PrivateRoute exact path="/" component={HomePage} />
              <Route path="/login" component={LoginPage} />
              <Route path="/register" component={RegisterPage} />
              <Route exact path="/polls" component={CreatePollPage} />
              <Route
                exact
                path="/polls/:id/answer"
                component={AnswerPollPage}
              />
              <Route
                exact
                path="/polls/:id/answer/:answerId"
                component={AnswerPollPage}
              />
              <Route exact path="/polls/:id" component={CreatePollPage} />
              <Redirect from="*" to="/" />
            </Switch>
          </div>
        </div>
      </div>
    </Router>
  )
}

export { App }

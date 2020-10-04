import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'
import { BrowserRouter as Router } from 'react-router-dom'
import { ApolloProvider } from '@apollo/client'
import createStore from './reducers'
import { Provider } from 'react-redux'

import client from './config'

const store = createStore(window.REDUX_DATA)
delete window.REDUX_DATA

ReactDOM.render(
  <>
    <Provider store={store}>
      <Router>
        <ApolloProvider client={client}>
          <App />
        </ApolloProvider>
      </Router>
    </Provider>
  </>,
  document.getElementById('app')
)

import express from 'express'
import React from 'react'
import { connectDb } from './model'
import { StaticRouter as Router } from 'react-router-dom'
import fetch from 'node-fetch'
import { Provider as ReduxProvider } from 'react-redux'
import createStore from '../client/reducers'
import { renderToString } from 'react-dom/server'
import Helmet from 'react-helmet'
import App from '../client/app'
import schema from './graphql'

import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client'

var app = express()
var cors = require('cors')

app.use(cors())

app.use(express.static('public'))

schema.applyMiddleware({ app })

app.get('*', (req, res) => {
  const client = new ApolloClient({
    ssrMode: true,
    link: createHttpLink({
      uri: 'http://localhost:8080/graphql',
      credentials: 'same-origin',
      fetch: fetch,
      headers: {
        cookie: req.header('Cookie'),
      },
    }),
    cache: new InMemoryCache(),
  })

  const context = {}
  const store = createStore()

  const app = renderToString(
    <ReduxProvider store={store}>
      <Router location={req.url} context={context}>
        <ApolloProvider client={client}>
          <App />
        </ApolloProvider>
      </Router>
    </ReduxProvider>
  )
  const helmet = Helmet.renderStatic()

  res.send(formatHTML(app, helmet))
})

connectDb()
  .then(() => {
    console.log('db is connected')
    app.listen(8080, () => console.log('server is running'))
  })
  .catch((e) => {
    console.log('error', e)
  })

const formatHTML = (appStr, helmet) => {
  return `
    <!doctype html>
    <html ${helmet.htmlAttributes.toString()}>
        <head>
            ${helmet.title.toString()}
            ${helmet.meta.toString()}
            ${helmet.link.toString()}
        </head>
        <body ${helmet.bodyAttributes.toString()}>
            <div id="app">
                ${appStr}
            </div>
            <script src="/bundle.js"></script>
        </body>
    </html>
`
}

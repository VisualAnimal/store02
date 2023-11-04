import React from 'react'
import ReactDOM from 'react-dom/client'
// import './index.css'
import { router } from './routes/router.jsx'
import { RouterProvider } from 'react-router-dom'
import { ApolloProvider } from '@apollo/client'
import { client } from './serve/apollo.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  </React.StrictMode>,
)

import { createBrowserRouter } from 'react-router-dom'
import Attribute from './attribute'
import Product from './product'
import List from './list'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <div>hello world</div>
    },
    {
        path: '/attribute',
        element: <Attribute />
    },
    {
        path: '/product',
        element: <Product />
    },
    {
        path: '/list',
        element: <List />
    },
])
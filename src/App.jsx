import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import {
  Home ,
  Products,
  SingleProduct,
  About,
  Cart,
  Error,
  Checkout,
  Private
} from './pages'
import AppLayout from './components/layouts/AppLayout';

const router = createBrowserRouter([
  {
    path : '/',
    element : <AppLayout />,
    children:[
      {
        index: true,
        element : <Home />,
      },
      {
        path : 'products',
        element : <Products />,
        children:[
          {
            path :':id',
            element : <SingleProduct />
          },
        ]
      },
      {
        path : 'about',
        element : <About />
      },
      {
        path : 'cart',
        element : <Cart />
      }
    ]
  }
])

function App() {

  return (
   <RouterProvider router={router} />
  )
}

export default App

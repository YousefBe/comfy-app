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
import ErrorPage from './pages/ErrorPage';
// import { ProductsLoader } from './pages/ProductsPage';

const router = createBrowserRouter([
  {
    path : '/',
    element : <AppLayout />,
    errorElement : <ErrorPage />,
    // loader : ProductsLoader ,
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
      },
      {
        path : 'checkout',
        element : <Checkout />
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

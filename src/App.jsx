import { Col, Row } from 'react-bootstrap'
import CartContext from './Components/contextapi/CartContextApi'
import { RouterProvider } from 'react-router-dom'
import { router } from './Components/AppRouter'
import './App.css'

function App() {
  return (
    <Row>
      <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <CartContext>
          <RouterProvider router={router}/>
        </CartContext>
      </Col>
    </Row>
  )
}

export default App

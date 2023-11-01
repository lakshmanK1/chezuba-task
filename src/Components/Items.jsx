
import { Button, Card, Col, Row } from 'react-bootstrap'
import { Tag } from 'rsuite'
import { Context } from './contextapi/CartContextApi'
import React from 'react'

// eslint-disable-next-line react/prop-types
function Items({items}) {
    const {state} = React.useContext(Context);
  return (
    <Row>
        {
            // eslint-disable-next-line react/prop-types
            items?.map((data)=>{
                return(
                    <Col className='d-flex justify-content-center align-items-center my-1' xs={12} sm={12} md={3} lg={4} xl={4} xxl={4} key={data.id}>
                        <Card className='w-75'>
                        <Card.Img variant="top" src={data.image} />
                        <Card.Body>
                            <Card.Title>{data.name}</Card.Title>
                            <Card.Text>₹ {data.price}</Card.Text>
                            <Card.Text><Tag>{data.category}</Tag></Card.Text>
                            <Button variant="primary" onClick={()=>state.addItem(data)}>ADD TO CART</Button>
                        </Card.Body>
                        </Card>
                    </Col>
                )
            })
        }
    </Row>
  )
}

export default Items
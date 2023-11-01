import React from 'react'
import { Navbar, Nav, Badge, Button, Modal, List, FlexboxGrid, Avatar} from 'rsuite';
import HomeIcon from '@rsuite/icons/legacy/Home';
import AdminIcon from '@rsuite/icons/Admin';
import TrashIcon from '@rsuite/icons/Trash';
import { Col } from 'react-bootstrap';
import { Context } from './contextapi/CartContextApi';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './contextapi/AuthContext';


const styleCenter = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '60px'
};

const slimText = {
  fontSize: '0.666em',
  color: '#97969B',
  fontWeight: 'lighter',
  paddingBottom: 5
};

const titleStyle = {
  paddingBottom: 5,
  whiteSpace: 'nowrap',
  fontWeight: 500,
};

const dataStyle = {
  fontSize: '1.2em',
  fontWeight: 500
};

function Header() {
  // eslint-disable-next-line react/prop-types
  const {state} = React.useContext(Context);
  const [activeKey, setActiveKey] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const auth = useAuth();
  const navigate = useNavigate();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleLogout = () => {
    auth.logout();
    navigate('/');
  }

  return (
    <React.Fragment>
    <Navbar className='bg-white'>
    <Navbar.Brand href="#" className='text-success d-flex justify-content-center align-items-center'>
      <img src='src\assets\icons8-carbohydrates-50.png'/>
     Star bakery
    </Navbar.Brand>
    <Nav onSelect={setActiveKey} activeKey={activeKey}>
      <Nav.Item className='text-success' icon={<HomeIcon />} as={Link} to='/home'>Home</Nav.Item>
      <Nav.Item className='text-success' as={Link} to='/items'>Items</Nav.Item>
      {auth.user === 'admin' ? <Nav.Item className='text-success' as={Link} to='/dashboard'>Dashboard</Nav.Item> : null}
    </Nav>
    <Nav pullRight>
    <Nav.Item>
      <Badge content={state.cart.length} onClick={handleOpen}>
        <Button>
        <img src='src\assets\shopping-cart-svgrepo-com.svg' width={20} height={20}/>
        </Button>
      </Badge>
      </Nav.Item>
      {!auth.user ? <Nav.Item className='text-success' icon={<AdminIcon />} as={Link} to='/login'>login</Nav.Item> :
       <Nav.Item className='text-success' icon={<AdminIcon />} onClick={handleLogout} as={Link} to='/login'>logout</Nav.Item>}
    </Nav>
  </Navbar>

  <Modal open={open} onClose={handleClose}>
    <Modal.Header>
      <Modal.Title>Cart</Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <Col>
      <List hover>
      {state?.cart?.map((item, index) => (
        <List.Item key={item['name']} index={index + 1}>
          <FlexboxGrid>
            {/*icon*/}
            <FlexboxGrid.Item colspan={4} style={styleCenter}>
              <Avatar
              size="lg"
              circle
              src={item.image}
              alt="@SevenOutman"
              />
            </FlexboxGrid.Item>
            {/*base info*/}
            <FlexboxGrid.Item
              colspan={6}
              style={{
                ...styleCenter,
                flexDirection: 'column',
                alignItems: 'flex-start',
                overflow: 'hidden'
              }}
            >
              <div style={{ textAlign: 'center' }}>
                <div style={slimText}>item</div>
                <div style={titleStyle}>{item['name']} x {item['qnty']}</div>
              </div>
            </FlexboxGrid.Item>
            {/*peak data*/}
            <FlexboxGrid.Item colspan={6} style={styleCenter}>
              <div style={{ textAlign: 'right' }}>
                <div style={slimText}>price</div>
                <div style={dataStyle}>{item['price']}</div>
              </div>
            </FlexboxGrid.Item>
            <FlexboxGrid.Item
              colspan={4}
              style={{
                ...styleCenter
              }}
            >
              <div style={{ textAlign: 'right' }}>
                <div style={slimText}>action</div>
                <TrashIcon onClick={()=>state.removeItem(item.id)}/>
              </div>
            </FlexboxGrid.Item>
          </FlexboxGrid>
        </List.Item>
      ))}
    </List>
    </Col>
    </Modal.Body>
    <Modal.Footer>
      <FlexboxGrid>
      <FlexboxGrid.Item colspan={4} style={{...styleCenter}}>
      <div style={titleStyle}>Total Price : {state.totalCartAmount}</div>
      </FlexboxGrid.Item>
      </FlexboxGrid>
      <Button onClick={handleClose} appearance="primary">
        Order
      </Button>
      <Button onClick={handleClose} appearance="subtle">
        Cancel
      </Button>
    </Modal.Footer>
  </Modal>

    </React.Fragment>
  )
}

export default Header
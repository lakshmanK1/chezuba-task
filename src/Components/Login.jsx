import React from 'react'
import { useAuth } from './contextapi/AuthContext';
import {useNavigate} from 'react-router-dom'
import {Content, FlexboxGrid, Panel, Form, ButtonToolbar, Button, Schema} from 'rsuite'

const { StringType} = Schema.Types;

const model = Schema.Model({
    user: StringType().isRequired('Required'),
})

function Login() {
    const [formValue, setFormValue] = React.useState({user:null})
    const formRef = React.useRef();
    const [formError, setFormError] = React.useState({});
    const auth = useAuth();
    const navigate = useNavigate();

    const handleSubmit = () => {
        if (!formRef.current?.check()) {
          console.error('Form Error');
          return;
        }
        auth.login(formValue.user);
        navigate('/');
      };

   return (
    <React.Fragment>
      <Content className='my-5'>
        <FlexboxGrid justify="center">
          <FlexboxGrid.Item colspan={12}>
            <Panel header={<h3 className='loginformtext'>Login</h3>} bordered className='loginform'>
              <Form ref={formRef}
                onSubmit={handleSubmit}
                onChange={setFormValue}
                onCheck={setFormError}
                formValue={formValue}
                model={model}
                fluid>
                <Form.Group>
                  <Form.ControlLabel className='loginformtext'>Username</Form.ControlLabel>
                  <Form.Control name="user" type='text'/>
                </Form.Group>
                <Form.Group>
                  <ButtonToolbar>
                    <Button appearance="primary" type='submit' className='signinbtn'>Sign in</Button>
                  </ButtonToolbar>
                </Form.Group>
              </Form>
            </Panel>
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </Content> 
    </React.Fragment>
  )
}

export default Login
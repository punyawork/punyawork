import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import './SignUp.css'
import Header from '../Header/Header';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Footer from '../Footer/Footer';

function SignUp() {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [fullName, SetFullName] = useState('');
  const [email, SetEmail] = useState('');
  const [mobNumber, SetMobNumber] = useState('');
  const [password, SetPassword] = useState('');
  const [requestBodyData, SetRequestBodyData] = useState({})
  const endpoint = "https://localhost:44308/signup";
  const [userRegister,setUserRegister]=useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () =>{ setShow(false)
    navigate('/');
  };
  const handleShow = () => setShow(true);

  const handleSignUp = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    SaveSignUpData();
  };
  const SaveSignUpData = async () => {
    try {
      await axios.post(endpoint, {
        FullName: fullName,
        Email: email,
        MobNumber: mobNumber,
        Password: password
      }).then((response) => {
        debugger;
        if(response.status==200 && response.data.Result=="DataExist"){
          setUserRegister(true);
        }else if(response.status==200 && response.data.Result=="DataSaved"){
          const userIdBase64 = btoa(response.data.Count.toString());
          localStorage.setItem("pwc",userIdBase64)
          handleShow();
          
        }
      })

    } catch (e) {
      console.log(e);
    }
  }

  return (
    <>
      <header className="sticky-header">
        <Header />
      </header>
      <div className="signUpContainer">
        <h1 style={{ textAlign: 'center' }}>Create An Acount</h1>
        <Form noValidate validated={validated} onSubmit={handleSignUp}>
          <Row className="mb-3">
            <Form.Group controlId="validationFullName">
              <Form.Label size='md'>FullName</Form.Label>
              <Form.Control type='test' placeholder='Enter FullName...' size='md' required onChange={(e) => { SetFullName(e.target.value) }} />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group controlId="validationMobile">
              <Form.Label>Mob No.</Form.Label>
              <Form.Control type='number' placeholder='Enter Mobile Number...' size='md' required onChange={(e) => { SetMobNumber(e.target.value) }} />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group controlId="validationEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type='email' placeholder='Enter Email...' size='md' required onChange={(e) => { SetEmail(e.target.value); setUserRegister(false) }} />
              {userRegister?<p className='AlertTitle'>This email is already registered.</p>:<></>}
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group controlId="validationCustom03">
              <Form.Label>Set Password</Form.Label>
              <Form.Control type="password" placeholder="Enter Password..." size='md' required onChange={(e) => { SetPassword(e.target.value) }} />
            </Form.Group>
          </Row>
          <Button className="button signupButton" type="submit">SignUp</Button>
        </Form>
        {/* <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button> */}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>You have registered Successfully</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <p>Your UserName and Passwork has been sent to your <bold>{email}.</bold></p>
        <p className='UserNameAndEmail'>UserName: {email}</p>
        <p className='UserNameAndEmail'>Password:{password}</p>
        </Modal.Body>
      </Modal>
      </div>
      <Footer/>
    </>
  );
}

export default SignUp;
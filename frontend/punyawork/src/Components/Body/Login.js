import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import './Login.css'
import Header from '../Header/Header.js'
import HomeCarousel from './HomeCarousel';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Footer from '../Footer/Footer.js';


function Login() {
  const endpoint = "https://localhost:44308/logindetail";
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [email, setEmail] = useState();
  const [password, SetPassword] = useState();
  const [isPasswordWrong, setIsPasswordWrong] = useState(false);
  const [show, setShow] = useState(false);
  
  const handleClose = () => {
    setShow(false)
    navigate('/daanam');
  };
  const handleShow = () => setShow(true);
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    event.preventDefault();
    setValidated(true);
    ValidateUserLoginDetail();
  };
  const ValidateUserLoginDetail = async () => {
    try {
      await axios.post(endpoint, {
        Email: email,
        Password: password
      }).then((response) => {
        if (response.status == 200 && response.data == "WrongPassword") {
          setIsPasswordWrong(true);
        } else if (response.status == 200 && response.data == "CorrectDetails") {
          handleShow();
        }
      })
    } catch (e) {
      console.log(e);
    }
  }
const[isLogin, setIsLogin]=useState(false);
  useEffect(()=>{
    const storedUserIdBase64 = localStorage.getItem('pwc');
    if(storedUserIdBase64!=null){
      window.location.href = "http://localhost:3000/daanam";
    }
  })
  return (
    <>
      <header className="sticky-header">
        <Header />
      </header>
      <HomeCarousel />
      <div className="LoginContainer">
        <h1 style={{ textAlign: 'center' }}>Login</h1>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group controlId="validationCustomUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control type='test' placeholder='Enter UserName...' required onChange={(e) => { setEmail(e.target.value) }} />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group controlId="validationCustom03">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Enter Password..." required onChange={(e) => {
                SetPassword(e.target.value);
                setIsPasswordWrong(false);
              }} />
              {isPasswordWrong ? <p className='AlertTitle'>Your Password is Wrong</p> : <></>}
            </Form.Group>
          </Row>
          <Button className="button" type="submit">Login</Button>
        </Form>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>You have logged In Successfully</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>You are welcome to the <label className='darkFont'>One to One Donation Portal</label>. Please <label className='darkFont'>donate with Heart </label> and <label className='darkFont'>Not more than Rs. 5 on a single day</label></p>
          </Modal.Body>
        </Modal>
        <h1 style={{ textAlign: 'center' }}>OR</h1>
        <p>If you do not have an account then please <a href='/signup' className='bodyLink'>create it.</a></p>
      </div>
      <footer>
        <Footer />
      </footer>
    
    </>


  );
}

export default Login;
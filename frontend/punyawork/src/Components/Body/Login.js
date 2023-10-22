import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';

import Header from '../Header/Header.js'
import HomeCarousel from './HomeCarousel';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Footer from '../Footer/Footer.js';
import '../../Styles.css'
import applicationbackendconfig from '../../applicationbackend.config.js';

function Login() {
  const apiHost=applicationbackendconfig.apiHostUrl;
  const endpoint = apiHost+"/logindetail";
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
        
        if (response.status == 200 && response.data.Result == "WrongPassword") {
          setIsPasswordWrong(true);
        } else if (response.status == 200 && response.data.Result == "CorrectDetails") {
          handleShow();
          const userIdBase64 = btoa(response.data.Count.toString());
          localStorage.setItem("pwc",userIdBase64)
         
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
      navigate('/Daanam')
    }
  },[])
  return (
    <>
      <header className="sticky-header">
        <Header />
      </header>
      <HomeCarousel />
      <div className="flex flex-col p-[1rem] md:w-[50%] mx-auto">
        <h1 className='text-center text-kesari'>Login</h1>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group controlId="validationCustomUsername">
              <Form.Label className='text-kesari'>Username</Form.Label>
              <Form.Control type='test' placeholder='Enter UserName...' required onChange={(e) => { setEmail(e.target.value) }} />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group controlId="validationCustom03">
              <Form.Label className='text-kesari'>Password</Form.Label>
              <Form.Control type="password" placeholder="Enter Password..." required onChange={(e) => {
                SetPassword(e.target.value);
                setIsPasswordWrong(false);
              }} />
              {isPasswordWrong ? <p className='AlertTitle'>Your Password is Wrong</p> : <></>}
            </Form.Group>
          </Row>
          <button className="bg-kesari text-red px-[.75rem] py-[.5rem] rounded-[.3rem] text-white font-sm" type="submit">Login</button>
        </Form>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>You have logged In Successfully</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>You are welcome to the <label className='darkFont'>One to One Donation Portal</label>. Please <label className='darkFont'>donate with Heart </label> and <label className='darkFont'>Not more than Rs. 5 on a single day</label></p>
          </Modal.Body>
        </Modal>
        <h1 className='text-center text-kesari'>OR</h1>
        <p>If you do not have an account then please <a href='/signup' className='bg-kesari px-[1rem] pb-[.5rem] text-[1.5rem] hover:text-kesari'>create it.</a></p>
      </div>
      <footer>
        <Footer />
      </footer>
    
    </>


  );
}

export default Login;
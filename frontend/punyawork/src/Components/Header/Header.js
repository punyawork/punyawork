import React from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import punyawork from "../../Logos/PunyaWorkLogo.PNG";
import "./header.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import "../../Styles.css";

// import "bootstrap/dist/css/bootstrap.min.css";

const Header = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    navigate("/");
  };
  const handleShow = () => setShow(true);

  const logOut = () => {
    const storedUserIdBase64 = localStorage.getItem("pwc");

    if (storedUserIdBase64 != null) {
      localStorage.removeItem("pwc");
      handleShow();
    }
  };
  return (
    <Navbar collapseOnSelect  expand="lg"  className="bg-kesari">
      <Navbar.Brand href="/" className="pl-[1rem]">
        <img className="rounded-[50%] w-[4rem]" src={punyawork} />
        <p className="text-white text-center text-[1rem]">एकैकं दानं</p>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" className="mr-[1rem] text-white border-white border-[2rem]"/>
      <Navbar.Collapse
        id="responsive-navbar-nav"
        style={{ justifyContent: "flex-end" }}
      >
        <Nav className="flex justify-start mx-[1rem]">
          <Nav.Link href="/Daanam" className="text-white px-[1.5rem] text-xl">
            Daanam
          </Nav.Link>
          <Nav.Link href="/raisefund" className="text-white px-[1.5rem] text-xl">
            RaiseFund
          </Nav.Link>
          <Nav.Link href="/SetUserProfile" className="text-white px-[1.5rem] text-xl">
            YourProfile
          </Nav.Link>

          <Nav.Link href="/" className="text-white px-[1.5rem] text-xl">
            Login
          </Nav.Link>
          <Nav.Link href="/SignUp" className="text-white px-[1.5rem] text-xl">
            Signup
          </Nav.Link>

          <Nav.Link
            href=""
            className="text-white px-[1.5rem] text-xl"
            onClick={() => {
              logOut();
            }}
          >
            Logout
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>You have Logout Successfully</Modal.Title>
        </Modal.Header>
      </Modal>
    </Navbar>
  );
};

export default Header;

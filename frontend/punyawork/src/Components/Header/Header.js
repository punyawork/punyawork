import React from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import punyawork from "../../Logos/PunyaWorkLogo.PNG"
import './header.css';


// import "bootstrap/dist/css/bootstrap.min.css";

const Header=()=> {
    return (
        <Navbar collapseOnSelect expand="lg" className="NavbarClass">
            <Navbar.Brand href="#home">
                <div><img className="LogoClass" src={punyawork} />
                    <p className="ourTagLine">एकैकं दानं</p></div>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav" style={{justifyContent:"flex-end"}}>
                <Nav className="mr-auto">
                    <Nav.Link href="/Daanam" className="navLink">Daanam</Nav.Link>
                    <Nav.Link href="/raisefund" className="navLink">RaiseFund</Nav.Link>

                    <Nav.Link href="/" className="navLink">Login</Nav.Link>
                    <Nav.Link href="/SignUp" className="navLink">
                        SignUp
                    </Nav.Link>
                    <Nav.Link href="/SetUserProfile" className="navLink">
                        Your Profile
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default Header;

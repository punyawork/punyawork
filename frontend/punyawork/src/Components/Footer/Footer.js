import React from "react"
import { Container, Row, Col } from "react-bootstrap";

import './Footer.css';


const Footer = () => {

    return (
        <div style={{ backgroundColor: "green" }}>
            <Container className="FooterClass">
                <Row>
                    <Col>
                        <p className="aboutpunyawork">PunyaWork</p>
                        <p className="punyaworkdescription">PunyaWork is an online portal. We are promoting One to One Donation.</p>
                    </Col>
                    <Col>
                        <Row>
                            <a className="navLinks" href="#">Insights</a>
                        </Row>
                        <Row>
                            <a className="navLinks" href="/daanam">Daanam</a>
                        </Row>
                        <Row>
                            <a className="navLinks" href="/raisefund">RaiseFund</a>
                        </Row>
                        <Row>
                            <a className="navLinks" href="/signup">Create Your Account</a>
                        </Row>
                        <Row>
                            <a className="navLinks" href="/">Login</a>
                        </Row>
                    </Col>
                    <Col>
                        <Row>
                            <a className="navLinks" href="#">Social Media</a>
                        </Row>
                        <Row>
                            <a className="navLinks" href="/daanam">Facebook</a>
                        </Row>
                        <Row>
                            <a className="navLinks" href="/daanam">Twitter</a>
                        </Row>
                        <Row>
                            <a className="navLinks" href="/daanam">Instagram</a>
                        </Row>
                        <Row>
                            <a className="navLinks" href="/daanam">LinkedIn</a>
                        </Row>
                    </Col>
                    {/* <Col>
                        <Row>
                            <a className="navLinks" href="#">Our Partners</a>
                        </Row>
                        <Row>
                            <a className="navLinks" href="/daanam">Daanam</a>
                        </Row>
                        <Row>
                            <a className="navLinks" href="/daanam">Daanam</a>
                        </Row>
                        <Row>
                            <a className="navLinks" href="/daanam">Daanam</a>
                        </Row>
                        <Row>
                            <a className="navLinks" href="/daanam">Daanam</a>
                        </Row>
                    </Col> */}
                </Row>
            </Container>

        </div>


    )


}

export default Footer
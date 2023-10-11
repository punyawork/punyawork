import React, { useEffect } from "react";
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useState, forwardRef, useImperativeHandle } from "react";
import { Row, Col, Container } from "react-bootstrap";
import './userProfile.css';
import ListGroupItem from "react-bootstrap";
import { ListGroup } from "react-bootstrap";
import SumitImage from '../../../../Images/UsersImages/sumit.JPG';
import axios from "axios";

const UserProfile = forwardRef((props, ref) => {
    const [show, setShow] = useState(false);
    const UserProfileEndpoint = "https://localhost:44308/UserProfileDataByItsId?id=";
    const [userData, setUserData] = useState({});
    const GetUserProfileData = async (id) => {
        try {
            await axios.get(UserProfileEndpoint + id).then((response) => {
                if (response.status == 200) {
                    setUserData(response.data)
                }
            })
        } catch (e) {
            console.log(e);
        }
    }
    useEffect(()=>{

        GetImage();
    },[userData])
    const handleClose = () => setShow(false);
    const handleShow = (id) => {
        debugger;
        GetUserProfileData(id);
        setShow(true);
    };
    useImperativeHandle(ref, () => ({
        handleShow,
    }));
    var ImgaeAPIURL = "https://localhost:44308/GetFile?filename=";
    function getFileExtension(fileName) {
        return fileName.slice(((fileName.lastIndexOf(".") - 1) >>> 0) + 2);
      }
      const [profileImageURL, setProfileImageURL] = useState(null);

    const GetImage = async () => {
        try {
            if (userData!= null) {
                var extension= getFileExtension(userData.ProfileImageName);
                await axios.get(ImgaeAPIURL + userData.ProfileImageName, { responseType: 'arraybuffer' }).then((response) => {
                
                    console.log(response);
                    const imageBlob = new Blob([response.data], { type: `image/${extension}` });
                    const imageUrl = URL.createObjectURL(imageBlob);
                    setProfileImageURL(imageUrl);
                    if (response.status != 200) {
                        alert("Server has some error. Please Raise Your Fund After SomeTime")
                    }
                });
            }
        } catch (e) {
            console.log(e);
        }

    }
    return (<>
        <Container>
            <Offcanvas className="DaanCardOffCanvas" show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title className="punyaTextColor">User Information</Offcanvas.Title>
                </Offcanvas.Header>

                <Offcanvas.Body>
                    <Row>
                        <img src={profileImageURL} className="profileImage" />
                    </Row>
                    <Row>
                        <ListGroup className="UserDetailList">
                            <ListGroup.Item variant="dark" className="ListItem">
                                <label className="labelClass">Name:</label>{userData.FullName}</ListGroup.Item>
                            <ListGroup.Item variant="dark" className="ListItem">  <label className="labelClass">Email:</label>{userData.Email}</ListGroup.Item>
                            <ListGroup.Item variant="dark" className="ListItem">  <label className="labelClass">Mobile No.:</label>{userData.MobNumber}</ListGroup.Item>
                            <ListGroup.Item variant="dark" className="ListItem">  <label className="labelClass">Address:</label>Payarepur, Barauli, PostOffice=Barauli</ListGroup.Item>
                            <ListGroup.Item variant="dark" className="ListItem">  <label className="labelClass">Country:</label>India</ListGroup.Item>
                            <ListGroup.Item variant="light" className="ListItem">  <label className="labelClass">UPI Mobile No.:</label>8507064152</ListGroup.Item>
                            <ListGroup.Item variant="dark" className="ListItem">
                                <label className="labelClass">Total Fund Raised</label>0</ListGroup.Item>
                            <ListGroup.Item variant="dark" className="ListItem">
                                <label className="labelClass">Blessings</label>0</ListGroup.Item>
                        </ListGroup>
                    </Row>

                </Offcanvas.Body>


            </Offcanvas>
        </Container>

    </>)
})
export default UserProfile;
import React, { useEffect } from "react";
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useState, forwardRef, useImperativeHandle } from "react";
import { Row, Col, Container } from "react-bootstrap";

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
            <Offcanvas className="" show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton className="bg-kesari">
                    <Offcanvas.Title className="text-white font-bold">User Information</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Row>
                        <img src={profileImageURL} className="w-full h-[13rem]"/>
                    </Row>
                    <Row>
                        <ul className="p-[2rem] bg-green">
                            <li className="text-white font-bold">
                                <label className="pr-[2rem]">Name:</label>{userData.FullName}</li>
                            <li className="text-white font-bold">  <label className="pr-[2rem]">Email:</label>{userData.Email}</li>
                            <li className="text-white font-bold">  <label className="pr-[2rem]">Mobile No.:</label>{userData.MobNumber}
                            </li>
                           
                            
                            <li className="text-white font-bold">  <label className="pr-[2rem]">UPI Mobile No.:</label>
                            {userData.MobNumber}</li>
                            <li className="text-white font-bold">
                                <label className="pr-[2rem]">Total Fund Raised</label>0</li>
                            <li className="text-white font-bold">
                                <label className="pr-[2rem]">Blessings</label>0</li>
                                <li className="text-white font-bold">  <label className="pr-[2rem]">Country:</label>India</li>
                        </ul>
                    </Row>

                </Offcanvas.Body>


            </Offcanvas>
        </Container>

    </>)
})
export default UserProfile;
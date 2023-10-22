import React, { useEffect } from "react";
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useState, forwardRef, useImperativeHandle } from "react";
import { Row, Col, Container } from "react-bootstrap";

import divstGroupItem from "react-bootstrap";
import { divstGroup } from "react-bootstrap";
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
        return fileName.split('.').pop();
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
                        <img src={profileImageURL} className="w-full h-[13rem] object-contain"/>
                    </Row>
                    <Row>
                        <div className="p-[2rem] bg-green flex flex-col">
                            <div className="text-white font-bold mb-[.5rem]">
                            <label className="pr-[2rem] text-left">Name:</label>
                            <p className="text-left">{userData.FullName}</p></div>
                            <div className="text-white font-bold mb-[.5rem]">  <label className="pr-[2rem]">Email:</label>
                            <p>{userData.Email}</p></div>
                            <div className="text-white font-bold mb-[.5rem]">  <label className="pr-[2rem]">Mobile No.:</label>
                            <p>{userData.MobNumber}</p>
                            </div>
                            <div className="text-white font-bold mb-[.5rem]">  <label className="pr-[2rem]">UPI Mobile No.:</label>
                           <p> {userData.MobNumber}</p></div>
                            <div className="text-white font-bold mb-[.5rem]">
                                <label className="pr-[2rem]">Total Fund Raised</label>
                                <p>{userData.TotalFundRasie}</p></div>
                            <div className="text-white font-bold mb-[.5rem]">
                                <label className="pr-[2rem]">Blessings</label>
                                <p>{userData.BlessingPoints}</p></div>
                            <div className="text-white font-bold mb-[.5rem]">  <label className="pr-[2rem]">Country:</label>
                                <p>{userData.Country}</p></div>
                        </div>
                    </Row>

                </Offcanvas.Body>


            </Offcanvas>
        </Container>

    </>)
})
export default UserProfile;
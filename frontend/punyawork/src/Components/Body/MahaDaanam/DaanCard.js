import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import React, { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import reconnectwithmobile from '../../../Images/Connecting world.jpg'
import { useState, useRef } from 'react';
import UserProfile from './UserProfileCard/UserProfile';
import './DaanCard.css';
import axios from 'axios';


const DaanCard = ({ daanCardData }) => {
    const [showProfile, setShowProfile] = useState(false);
    const childRef = useRef();
    const showUserProfile = (event) => {

        childRef.current.handleShow(event.target.id);
    }
    function getFileExtension(fileName) {
        return fileName.slice(((fileName.lastIndexOf(".") - 1) >>> 0) + 2);
      }
    const [medicalImage, setMedicalImage] = useState(null);
    var ImgaeAPIURL = "https://localhost:44308/GetFile?filename=";
    const GetImage = async () => {
        try {
            if (daanCardData != null) {
                var extension= getFileExtension(daanCardData.MedicalImage);
                await axios.get(ImgaeAPIURL + daanCardData.MedicalImage, { responseType: 'arraybuffer' }).then((response) => {
                    console.log(response);
                    const imageBlob = new Blob([response.data], { type: `image/${extension}`});
                    const imageUrl = URL.createObjectURL(imageBlob);
                    setMedicalImage(imageUrl);
                    if (response.status != 200) {
                        alert("Server has some error. Please Raise Your Fund After SomeTime")
                    }
                });
            }
        } catch (e) {
            console.log(e);
        }

    }
    useEffect(() => {
        GetImage();
    }, [])
    return (
        <Card className='daanCard'>
            <Row>
                <Col>
                    <Card.Body>
                        <Card.Title className='OrangeColorClass'> {daanCardData.FullName}</Card.Title>
                        <Card.Text>
                            {daanCardData.Description}
                        </Card.Text>
                        <p style={{ fontWeight: 'bold' }} className='OrangeColorClass'>Required Amount: Rs. {daanCardData.FundRaiseAmount}</p>
                        <p style={{ fontWeight: 'bold' }} className='OrangeColorClass'>Please Donate Him On This UPI No. {daanCardData.UPIMobNumber}</p>
                        <Row>
                            <p>Please Donate with Heart. Donation without heart can not bring hapiness on both people. Before sending donation amount,please check his profile.</p>
                            <p style={{ fontWeight: 'bold' }} className='OrangeColorClass'>Maximum donation limit is Rs. 5 only. you will get 5 Blessings in return of it.</p>
                            <p style={{ fontWeight: 'bold' }} className='OrangeColorClass'>Once you will get 5000 Blessing point, we will run a banner ads on your profile and you will earn money</p>
                        </Row>
                        <>
                            <Button className='button' onClick={showUserProfile} id={daanCardData.UserSignUpID}>Visit His Profile</Button>
                            <UserProfile ref={childRef} />
                        </>

                    </Card.Body>
                </Col>
                <Col>
                    <Card.Img variant="top" src={medicalImage} className='imageClass' />


                </Col>

            </Row>
        </Card>
    );
}

export default DaanCard;
import Header from "../../../Header/Header";
import React, { useEffect } from "react";
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useState, forwardRef, useImperativeHandle } from "react";
import { Row, Col, Container } from "react-bootstrap";
import ListGroupItem from "react-bootstrap";
import { ListGroup } from "react-bootstrap";
import SumitImage from '../../../../Images/UsersImages/sumit.JPG';
import axios from "axios";
import './SetUserProfile.css'
import Button from 'react-bootstrap/Button';
import Footer from "../../../Footer/Footer";
import Image from 'react-bootstrap/Image';
import Form from 'react-bootstrap/Form';

const SetUserProfile = () => {
    const storedUserIdBase64 = localStorage.getItem('pwc');
    let userId = parseInt(atob(storedUserIdBase64), 10);
    const [show, setShow] = useState(false);
    const UserProfileEndpoint = "https://localhost:44308/UserProfileDataByItsId?id=";
    const [userData, setUserData] = useState({});
    const [profileImage, setProfileImage] = useState(null);
    const [profileImageURL, setProfileImageURL] = useState(null);
    const [profileImageName, setProfileImageName] = useState('');
    const GetUserProfileData = async (id) => {
        try {
            await axios.get(UserProfileEndpoint + id).then((response) => {
                if (response.status == 200) {
                    handleShow(); 
                    setUserData(response.data);  
                }
            })
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(()=>{
        GetImage(); 
    },[userData]);
    const handleProfileImage = (e) => {
        debugger;
        var selectedFile = e.target.files[0];
        setProfileImage((previousimage)=>previousimage=selectedFile);
        setProfileImageName(selectedFile.name);
        const fileURL = URL.createObjectURL(selectedFile);
        setProfileImageURL(fileURL);
    
        fileUploadAPi();

    };
    const updateEndpoint = "https://localhost:44308/UpdateSignUpData";
    const SaveSignUpData = async () => {
        try {
          await axios.post(updateEndpoint, {
            Id:userId,
            ProfileImageName: profileImageName,   
          }).then((response) => {
            
            if(response.status==200 && response.data.Result=="ProfileImageNameUpdated"){
            alert("Your Profile image Updated");
            }else if(response.status!=200){
            alert("Your Profile image did not update. Server is Down. Try it aftersome time");
            }
          })
    
        } catch (e) {
          console.log(e);
        }
      }
    const handleClose = () => setShow(false);
    const handleShow = () => {


        setShow(true);
    };
    const endpointForIMageUpload = "https://localhost:44308/api/FileUpload/UploadImage";
    const fileUploadAPi = async () => {
        try {
            if(profileImage!=null){
                const formData = new FormData();
                formData.append('file', profileImage);
                await axios.post(endpointForIMageUpload, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }).then((response) => {
    
                    if (response.status == 200) {
                        SaveSignUpData();
                    }else{
                        alert("Server has some error. Please Raise Your Fund After SomeTime");
                    }
    
                });
            }
            
        } catch (e) {
            console.log(e);
        }
    }
    useEffect(() => {
        GetUserProfileData(userId);
    }, []);
    var ImgaeAPIURL = "https://localhost:44308/GetFile?filename=";
    function getFileExtension(fileName) {
        return fileName.slice(((fileName.lastIndexOf(".") - 1) >>> 0) + 2);
      }
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
    
    const [isEditingEnable, setIsEditingEnable] = useState(false);

    return (<>
        <Header />
        <Container>

            <Row>
                <Col>
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
                </Col>
                <Col>
                    {
                        !isEditingEnable ? (<Image src={profileImageURL} className="setProfileImage" />) : (<><Form.Control className="EditImage" type="file" onChange={(e)=>{
                            handleProfileImage(e);
                        }} placeholder="Choose Image" size='lg' required multiple >
                        </Form.Control>
                        <Image src={profileImageURL} className="setProfileImage" />
                        </>)
                    }
                    <Button className="button" style={{ marginLeft: "5px" }} onClick={()=>{
                        setIsEditingEnable(!isEditingEnable);
                        
                    }}> {!isEditingEnable?<>Edit Image</>:<>Save Image</>}</Button>



                </Col>
            </Row>
        </Container>
        <Footer />
    </>)
}

export default SetUserProfile;
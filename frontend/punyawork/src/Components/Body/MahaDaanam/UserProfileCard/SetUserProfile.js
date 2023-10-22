import Header from "../../../Header/Header";
import React, { useEffect } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useState, forwardRef, useImperativeHandle } from "react";
import { Row, Col, Container } from "react-bootstrap";
import trstGroupItem from "react-bootstrap";
import { trstGroup } from "react-bootstrap";
import SumitImage from "../../../../Images/UsersImages/sumit.JPG";
import axios from "axios";

import Button from "react-bootstrap/Button";
import Footer from "../../../Footer/Footer";
import Image from "react-bootstrap/Image";
import Form from "react-bootstrap/Form";
import "../../../../Styles.css";

const SetUserProfile = () => {
  const storedUserIdBase64 = localStorage.getItem("pwc");
  let userId = parseInt(atob(storedUserIdBase64), 10);
  const [show, setShow] = useState(false);
  const UserProfileEndpoint =
    "https://localhost:44308/UserProfileDataByItsId?id=";
  const [userData, setUserData] = useState({});
  const [profileImage, setProfileImage] = useState(null);
  const [profileImageURL, setProfileImageURL] = useState(null);
  const [profileImageName, setProfileImageName] = useState("");

  const [validated, setValidated] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [mobNumber, setMobNumber] = useState('');
  const [upiMobNumber, setupiMobNumber] = useState('');
  const [country, setCountry] = useState('');

  const [address, setAddress] = useState('');
  


  const GetUserProfileData = async (id) => {
    try {
      await axios.get(UserProfileEndpoint + id).then((response) => {
        if (response.status == 200) {
          handleShow();
          setUserData(response.data);
        }
      });
    } catch (e) {
      console.log(e);
    }
  };

  
  useEffect(() => {
    GetImage();
    
  }, [userData]);
  const handleProfileImage = (e) => {
    debugger;
    var selectedFile = e.target.files[0];
    setProfileImage(selectedFile);
    setProfileImageName(selectedFile.name);
    setUserData(prevUserData=>({...prevUserData,ProfileImageName:selectedFile.name}))
    const fileURL = URL.createObjectURL(selectedFile);
    setProfileImageURL(fileURL);

    fileUploadAPi(selectedFile);
  };
  const updateEndpoint = "https://localhost:44308/UpdateSignUpData";
  const SaveUserDetailUpdateData = async (imageName) => {
    try {
      await axios
        .post(updateEndpoint, userData)
        .then((response) => {
          if (
            response.status == 200 &&
            response.data.Result == "UserProfileDataUpdated"
          ) {
            // GetUserProfileData(userId);
            alert("Your Profile Date Updated");
          } else if (response.status != 200) {
            alert(
              "Your Profile image did not update. Server is Down. Try it aftersome time"
            );
          }
        });
    } catch (e) {
      console.log(e);
    }
  };
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };
  const endpointForIMageUpload =
    "https://localhost:44308/api/FileUpload/UploadImage";
  const fileUploadAPi = async (selectedFile) => {
    debugger;
    try {
      if (selectedFile != null) {
        const formData = new FormData();
        formData.append("file", selectedFile);
        await axios
          .post(endpointForIMageUpload, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            if (response.status == 200) {
              //SaveSignUpData(selectedFile.name);
            } else {
              alert(
                "Server has some error. Please Raise Your Fund After SomeTime"
              );
            }
          });
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    GetUserProfileData(userId);
    
  }, []);
  var ImgaeAPIURL = "https://localhost:44308/GetFile?filename=";
  function getFileExtension(fileName) {
    return fileName.split('.').pop();
  }
  const GetImage = async () => {
    try {
      if (userData != null) {
        debugger;
        var extension = getFileExtension(userData.ProfileImageName);
        await axios
          .get(ImgaeAPIURL + userData.ProfileImageName, {
            responseType: "arraybuffer",
          })
          .then((response) => {
            console.log(response);
            const imageBlob = new Blob([response.data], {
              type: `image/${extension}`,
            });
            const imageUrl = URL.createObjectURL(imageBlob);
            setProfileImageURL(imageUrl);
            if (response.status != 200) {
              alert(
                "Server has some error. Please Raise Your Fund After SomeTime"
              );
            }
          });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const [isEditingEnable, setIsEditingEnable] = useState(false);

  return (
    <>
      <Header />
      <div className="p-[1rem] flex flex-col md:w-1/2 md:m-auto">
        <div className="flex flex-col pb-[1rem]">
          <label className=" text-kesari md:text-xl">Profile Image:</label>
          {!isEditingEnable ? (
            <Image
            src={profileImageURL}
            className="w-full h-[15rem] rounded-[1rem] md:h-[25rem] object-contain"
          />
          ) : (
            <>
            <input
              type="file"
              className="border-b-[.1rem] text-[.75rem] border-b-black border-t-0 outline-none"
              onChange={(e)=>{ handleProfileImage(e)
                
              }}
            />
            <Image
            src={profileImageURL}
            className="w-full h-[15rem] rounded-[1rem] md:h-[25rem] object-contain"
          />
            </>
          )}
        </div>
        <div className="flex flex-col pb-[1rem]">
          <label className=" text-kesari md:text-xl">Name:</label>
          {!isEditingEnable ? (
            <label className=" overflow-hidden text-[.75rem] border-b-[.1rem] border-b-kesari md:text-xl">
              {userData.FullName }
            </label>
          ) : (
            <input
              type="text"
              className="border-b-[.1rem] text-[.75rem] border-b-black border-t-0 outline-none"
              defaultValue={userData.FullName}
              onChange={(e)=>{ setUserData(prevUserData=>({...prevUserData,FullName:e.target.value}))
              }}
              required
            />
          )}
        </div>
        <div className="flex flex-col pb-[1rem]">
        <label className=" text-kesari md:text-xl">Email:</label>
          {!isEditingEnable ? (
            <label className=" overflow-hidden text-[.75rem] border-b-[.1rem] border-b-kesari md:text-xl">
              {userData.Email}
            </label>
          ) : (
            <input
              type="text"
              className="border-b-[.1rem] text-[.75rem] border-b-black border-t-0 outline-none"
              defaultValue={userData.Email}
              onChange={(e)=>{ setUserData(prevUserData=>({...prevUserData,Email:e.target.value}))
              }}
              required
            />
          )}
        </div>
        <div className="flex flex-col pb-[1rem]">
        <label className=" text-kesari md:text-xl">Mobile No.:</label>
          {!isEditingEnable ? (
            <label className=" overflow-hidden text-[.75rem] border-b-[.1rem] border-b-kesari md:text-xl">
              {userData.MobNumber}
            </label>
          ) : (
            <input
              type="text"
              className="border-b-[.1rem] text-[.75rem] border-b-black border-t-0 outline-none"
              defaultValue={userData.MobNumber}
              onChange={(e)=>{ setUserData(prevUserData=>({...prevUserData,MobNumber:e.target.value}))
              }}
              required
            />
          )}
        </div>
        <div className="flex flex-col pb-[1rem]">
        <label className=" text-kesari md:text-xl">UPI Mobile No.:</label>
          {!isEditingEnable ? (
            <label className=" overflow-hidden text-[.75rem] border-b-[.1rem] border-b-kesari md:text-xl">
              {userData.UPINumber}
            </label>
          ) : (
            <input
              type="text"
              className="border-b-[.1rem] text-[.75rem] border-b-black border-t-0 outline-none"
              defaultValue={userData.UPINumber}
              onChange={(e)=>{ setUserData(prevUserData=>({...prevUserData,UPINumber:e.target.value}))
              }}
              required
            />
          )}
          
        </div>
        <div className="flex flex-col pb-[1rem]">
        <label className=" text-kesari md:text-xl">Total Fund Raised</label>
          <label className=" overflow-hidden text-[.75rem] border-b-[.1rem] border-b-kesari md:text-xl">
          {userData.TotalFundRasie}
          </label>
        </div>
        <div className="flex flex-col pb-[1rem]">
          <label className=" text-kesari md:text-xl">Blessings</label>
          <label className=" overflow-hidden text-[.75rem] border-b-[.1rem] border-b-kesari md:text-xl">
          {userData.BlessingPoints}
          </label>
        </div>
        <div className="flex flex-col pb-[1rem]">
        <label className=" text-kesari md:text-xl">Address:</label>
          {!isEditingEnable ? (
            <label className=" overflow-hidden text-[.75rem] border-b-[.1rem] border-b-kesari md:text-xl">
              {userData.Address}
            </label>
          ) : (
            <textarea
              type="text"
              className="border-b-[.1rem] text-[.75rem] border-b-black border-t-0 outline-none"
              defaultValue={userData.Address}
              onChange={(e)=>{ setUserData(prevUserData=>({...prevUserData,Address:e.target.value}))
                
              }}
              rows="4"
              required
            />
          )}
          
        </div>
        <div className="flex flex-col pb-[1rem]">
        <label className=" text-kesari md:text-xl">Country:</label>
          {!isEditingEnable ? (
            <label className=" overflow-hidden text-[.75rem] border-b-[.1rem] border-b-kesari md:text-xl">
              {userData.Country}
            </label>
          ) : (
            <input
              type="text"
              className="border-b-[.1rem] text-[.75rem] border-b-black border-t-0 outline-none"
              defaultValue={userData.Country}
              onChange={(e)=>{ setUserData(prevUserData=>({...prevUserData,Country:e.target.value}))
              }}
              required
            />
          )}
          
        </div>
        <div className="flex flex-col pb-[1rem]">
          <button
            className="bg-kesari text-red px-[.75rem] py-[.5rem] rounded-[.3rem] text-white font-sm mt-[1rem]"
            onClick={() => {
              setIsEditingEnable(!isEditingEnable);
              if(isEditingEnable==true){
                SaveUserDetailUpdateData();
              }
            }}
          >
            {!isEditingEnable ? <>Edit Details</> : <>Save Details</>}
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SetUserProfile;

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import reconnectwithmobile from "../../../Images/Connecting world.jpg";
import { useState, useRef } from "react";
import UserProfile from "./UserProfileCard/UserProfile";

import axios from "axios";
import "../../../Styles.css";
import applicationbackendconfig from "../../../applicationbackend.config";

const DaanCard = ({ daanCardData }) => {
  const apiHost=applicationbackendconfig.apiHostUrl;
  const [showProfile, setShowProfile] = useState(false);
  const childRef = useRef();
  const showUserProfile = (event) => {
    childRef.current.handleShow(event.target.id);
  };
  function getFileExtension(fileName) {
    return fileName.split('.').pop();
  }
  const [medicalImage, setMedicalImage] = useState(null);
  var ImgaeAPIURL = apiHost+"/GetFile?filename=";
  const GetImage = async () => {
    try {
      if (daanCardData != null) {
        var extension = getFileExtension(daanCardData.MedicalImage);
        await axios
          .get(ImgaeAPIURL + daanCardData.MedicalImage, {
            responseType: "arraybuffer",
          })
          .then((response) => {
            console.log(response);
            const imageBlob = new Blob([response.data], {
              type: `image/${extension}`,
            });
            const imageUrl = URL.createObjectURL(imageBlob);
            setMedicalImage(imageUrl);
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
  useEffect(() => {
    GetImage();
  }, []);
  return (
    <div className="p-[1rem] flex flex-col md:flex-row">
      
        <div className="md:w-[58%]">
          <Card.Title className="text-kesari font-bold">
            {" "}
            {daanCardData.FullName}
          </Card.Title>
          <Card.Text className="text-justify">
            {daanCardData.Description}
          </Card.Text>
          <p style={{ fontWeight: "bold" }} className="OrangeColorClass">
            Required Amount: Rs. {daanCardData.FundRaiseAmount}
          </p>
        
          <p style={{ fontWeight: "bold" }} className="OrangeColorClass">
            Please Donate Him On This UPI No. {daanCardData.UPIMobNumber}
          </p>
          <p className="text-justify">
            Please Donate with Heart. Donation without heart can not bring
            hapiness on the face of both people. Before sending donation
            amount,please check his profile.
          </p>
          <p style={{ fontWeight: "bold" }} className="OrangeColorClass">
            Maximum donation limit is Rs. 5 only. you will get 5 Blessings in
            return of it.
          </p>
          <p style={{ fontWeight: "bold" }} className="OrangeColorClass">
            Once you will get 5000 Blessing point, we will run a banner ads on
            your profile and you will earn money
          </p>
        
          <button
            className="bg-kesari text-red px-[.75rem] py-[.5rem] rounded-[.3rem] text-white font-sm"
            onClick={showUserProfile}
            id={daanCardData.UserSignUpID}
          >
            Visit His Profile
          </button>
          <UserProfile ref={childRef} />
        </div>
      
      <div className="md:w-[38%] md:pl-[2rem]">
        <img variant="top" src={medicalImage} className="w-full h-[31rem] py-[2rem]" />
      </div>
    </div>
  );
};

export default DaanCard;

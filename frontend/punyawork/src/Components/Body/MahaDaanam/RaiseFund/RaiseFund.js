import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import Header from "../../../Header/Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Dropdown from "react-bootstrap/Dropdown";
import Image from "react-bootstrap/Image";
import Footer from "../../../Footer/Footer";
const RaiseFund = () => {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [fullName, setFullName] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [mobNumber, setMobNumber] = useState("");
  const [fundAmount, setFundAmount] = useState(0);
  const [lastDateForFund, setLastDateForFund] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const endpointForSavingData = "https://localhost:44308/SaveFundRaise";
  const endpointForIMageUpload =
    "https://localhost:44308/api/FileUpload/UploadImage";
  const [userRegister, setUserRegister] = useState(false);

  const [selectedValue, setSelectedValue] = useState(
    "Select Your Type of Fund"
  );
  const [fundType, setFundType] = useState(0);
  const [medicleImage, setMedicleImage] = useState(null);
  const [idImage, setIdImage] = useState(null);
  const [medicalImageURL, setmedicalImageURL] = useState(null);
  const [idImageURL, setIdImageURL] = useState(null);
  const [medicalFileName, setMedicalFileName] = useState("");
  const [idFileName, setIdFileName] = useState("");

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    navigate("/daanam");
  };
  const handleShow = () => setShow(true);

  const [dataExist, setDataExist] = useState(false);

  const handleCloseDataExist = () => {
    setDataExist(false);
    navigate("/daanam");
  };
  const handleShowDataExist = () => setDataExist(true);

  const handleMedicalImage = (e) => {
    var selectedFile = e.target.files[0];
    setMedicleImage(selectedFile);
    setMedicalFileName(selectedFile.name);
    const fileURL = URL.createObjectURL(selectedFile);
    setmedicalImageURL(fileURL);
  };
  const handleIdImage = (e) => {
    var selectedFile = e.target.files[0];
    setIdImage(selectedFile);
    setIdFileName(selectedFile.name);
    const fileURL = URL.createObjectURL(selectedFile);
    setIdImageURL(fileURL);
  };

  const handleFundRaise = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    debugger;
    SaveFundRaiseDate();
  };
  const handleTemplateSelection = (value, a) => {
    debugger;
    setSelectedValue(value);
    console.log(value);
    // SaveSignUpData();
  };

  const fileUploadAPi = async (image) => {
    try {
      const formData = new FormData();
      formData.append("file", image);
      await axios
        .post(endpointForIMageUpload, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          debugger;
          if (response.status != 200) {
            alert(
              "Server has some error. Please Raise Your Fund After SomeTime"
            );
          }
        });
    } catch (e) {
      console.log(e);
    }
  };

  const SaveFundRaiseDataToDB = async (e) => {
    await axios
      .post(endpointForSavingData, {
        FullName: fullName,
        Description: description,
        FundRaiseAmount: fundAmount,
        UPIMobNumber: mobNumber,
        Email: email,
        MedicalImage: medicalFileName,
        IDProofImage: idFileName,
        UserValidatedToShare: isChecked,
        LastFundRaiseDate: lastDateForFund,
      })
      .then((response) => {
        debugger;
        if (response.status == 200 && response.data == "DataExist") {
          handleShowDataExist();
        } else if (response.status == 200 && response.data == "DataSaved") {
          handleShow();
        }
      });
  };
  const SaveFundRaiseDate = async () => {
    try {
      await fileUploadAPi(medicleImage);
      await fileUploadAPi(idImage);
      await SaveFundRaiseDataToDB();
    } catch (error) {
      alert("Server has error. it can not be submitted now");
      console.error(error);
    }
  };

  return (
    <>
      <header className="sticky-header">
        <Header />
      </header>
      <div className="p-[1rem]">
        <div className="flex flex-col">
          
          <div className='md:w-[50%] m-auto'>
            <Form noValidate validated={validated} onSubmit={handleFundRaise}>
              <Row className="mb-3">
                <Form.Group controlId="validationFullName">
                  <Form.Label className="text-kesari text-[1rem] md:text-[1.25rem]">
                    Enter FullName
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter FullName..."
                    required
                    onChange={(e) => {
                      setFullName(e.target.value);
                    }}
                  />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label className="text-kesari text-[1rem] md:text-[1.25rem]">
                    Description
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={5}
                    required
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                  />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group controlId="validationMobile">
                  <Form.Label className="text-kesari text-[1rem] md:text-[1.25rem]">
                    Fund Amount
                  </Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter Your Fund Amount..."
                    required
                    onChange={(e) => {
                      setFundAmount(e.target.value);
                    }}
                    max="49999"
                    min="0"
                  />
                  {fundAmount > 49999 && (
                    <Form.Text className="text-danger">
                      You can not raise fund more than Rs. 49999
                    </Form.Text>
                  )}
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group controlId="validationMobile">
                  <Form.Label className="text-kesari text-[1rem] md:text-[1.25rem]">
                    Enter Your UPI Number
                  </Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter Your UPI Mobile Number..."
                    required
                    onChange={(e) => {
                      setMobNumber(e.target.value);
                    }}
                    min="0"
                  />
                  {mobNumber < 0 && (
                    <Form.Text className="text-danger">
                      This field can not be Negative.
                    </Form.Text>
                  )}
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group controlId="validationEmail">
                  <Form.Label className="text-kesari text-[1rem] md:text-[1.25rem]">
                    Enter Your Email
                  </Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter Email..."
                    required
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setUserRegister(false);
                    }}
                  />
                  {userRegister ? (
                    <p className="AlertTitle">
                      This email is already registered.
                    </p>
                  ) : (
                    <></>
                  )}
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group controlId="validationCustom03">
                  <Form.Label className="text-kesari text-[1rem] md:text-[1.25rem]">
                    Upload Your Medical Receipt
                  </Form.Label>
                  <Form.Control
                    type="file"
                    placeholder="Enter Password..."
                    required
                    onChange={(e) => {
                      handleMedicalImage(e);
                    }}
                    multiple
                  />
                  {medicalImageURL != null && (
                    <Image src={medicalImageURL} className="ImageClass" />
                  )}
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group controlId="validationCustom03">
                  <Form.Label className="text-kesari text-[1rem] md:text-[1.25rem]">
                    Upload Any ID to Verify Your age
                  </Form.Label>
                  <Form.Control
                    type="file"
                    placeholder="Enter Password..."
                    required
                    onChange={(e) => {
                      handleIdImage(e);
                    }}
                    multiple
                  />
                  {idImageURL != null && (
                    <Image src={idImageURL} className="ImageClass" />
                  )}
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group controlId="validationEmail">
                  <Form.Label className="text-kesari text-[1rem] md:text-[1.25rem]">
                    Last Date for FundRaise
                  </Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="Enter Email..."
                    required
                    onChange={(e) => {
                      setLastDateForFund(e.target.value);
                    }}
                  />
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <div className="mb-3 flex flex-row">
                  <InputGroup.Checkbox
                    aria-label="Checkbox for following text input"
                    checked={isChecked}
                    className='w-[2rem] h-[2rem]'
                    onChange={(e) => {
                      setIsChecked(!isChecked);
                    }}
                    required
                  />
                  <div className='pl-[1rem] font-bold text-kesari'>
                    We will share your UPI Number on your FundRaise Profile.if
                    it is fine for You then please check this Checkbox
                  </div>
                </div>
                {validated && (
                  <Form.Text className="text-danger">
                    All fields are required.
                  </Form.Text>
                )}
              </Row>
              <button
                className="bg-kesari text-red px-[.75rem] py-[.5rem] rounded-[.3rem] text-white font-sm"
                type="submit"
              >
                Submit Details
              </button>
            </Form>
          </div>
         
        </div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              You have Created Your Profile Successfully For Fund Raise
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              We will publish it so that all persons can start donating after 10
              to 15 minutes. Please wait!
            </p>
          </Modal.Body>
        </Modal>
        <Modal show={dataExist} onHide={handleCloseDataExist}>
          <Modal.Header closeButton>
            <Modal.Title>
              You have already raised fund with this Account.
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Please wait unitll that will be closed</p>
            <p>{email}</p>
            <p>{mobNumber}</p>
          </Modal.Body>
        </Modal>
      </div>

      <Footer />
    </>
  );
};

export default RaiseFund;

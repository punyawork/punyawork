
import React, { useEffect, useState } from "react";
import Header from "../../Header/Header";
import DaanCard from "./DaanCard";
import axios from "axios";
import Footer from "../../Footer/Footer";
import { Spinner } from "react-bootstrap";
import applicationbackendconfig from "../../../applicationbackend.config";
import { useNavigate } from "react-router";
const Daanam = () => {
  const navigate = useNavigate();
  var AllFunds = [{}];
  const apiHost=applicationbackendconfig.apiHostUrl;
  const GetAllFundsEndpoint = apiHost+"/GetAllFundRaiseData";
  const[AllFundsData,setAllFundsData]=useState([]);

  const GetAllFundRaiseData = async () => {
    try{
      await axios.get(GetAllFundsEndpoint).then((response) => {
        if (response.status == 200) {
          AllFunds = response.data;
          setAllFundsData(AllFunds);
        }
      })
    }catch(e){
      console.log(e);
    }
   
  }
  useEffect(() => {
    GetAllFundRaiseData();
    const storedUserIdBase64 = localStorage.getItem('pwc');
    if(storedUserIdBase64==null){
      navigate('/')
    }
  }, []);

  return (

    <>
      <header className="sticky-header">
        <Header />
      </header>
      <main>
        {
          AllFundsData.length>0?
          AllFundsData.map((item,index)=>{
           return<DaanCard key={index} daanCardData={item} />
          }):<div className="h-[20rem] flex justify-center">
            <Spinner animation="border" className="object-center m-auto text-kesari md:p-[2rem]" size="lg" /></div> 
        }
        
      </main>
      <footer>
      <Footer/>
      </footer>
    </>
  )
}

export default Daanam;
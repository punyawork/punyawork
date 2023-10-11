
import React, { useEffect, useState } from "react";
import Header from "../../Header/Header";
import DaanCard from "./DaanCard";
import axios from "axios";
import Footer from "../../Footer/Footer";
const Daanam = () => {

  var AllFunds = [{}];
  const GetAllFundsEndpoint = "https://localhost:44308/GetAllFundRaiseData";
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
          }):<p>data is loadig</p>
        }
        
      </main>
      <footer>
      <Footer/>
      </footer>
    </>
  )
}

export default Daanam;
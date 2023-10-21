import React from "react"
import { Container, div, Col } from "react-bootstrap";




const Footer = () => {

    return (
        <div className='bg-green p-[1rem]'>
            <div className='flex flex-col md:flex-row'>
                    <div className="md:w-[40%]">
                        <p className="text-white font-bold">PunyaWork</p>
                        <p className="text-white">PunyaWork is an online portal. We are promoting One to One Donation.</p>
                    </div>
                    <div className='md:w-[30%] pb-[2rem]'>
                        <div>
                            <a className="font-bold" href="#">Insights</a>
                        </div>
                        <div>
                            <a className="navLinks" href="/daanam">Daanam</a>
                        </div>
                        <div>
                            <a className="navLinks" href="/raisefund">RaiseFund</a>
                        </div>
                        <div>
                            <a className="navLinks" href="/signup">Create Your Account</a>
                        </div>
                        <div>
                            <a className="navLinks" href="/">Login</a>
                        </div>
                    </div>
                    <div className="md:w-[30%]">
                        <div>
                            <a className="font-bold" href="#">Social Media</a>
                        </div>
                        <div>
                            <a className="navLinks" href="/daanam">Facebook</a>
                        </div>
                        <div>
                            <a className="navLinks" href="/daanam">Twitter</a>
                        </div>
                        <div>
                            <a className="navLinks" href="/daanam">Instagram</a>
                        </div>
                        <div>
                            <a className="navLinks" href="/daanam">LinkedIn</a>
                        </div>
                    </div>
                   
               
            </div>

        </div>


    )


}

export default Footer
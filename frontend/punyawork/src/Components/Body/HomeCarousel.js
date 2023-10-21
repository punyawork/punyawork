import Carousel from 'react-bootstrap/Carousel';
import ConnectingWorl from '../../Images/Connecting world.jpg'
import DigitalWorld from '../../Images/DigitalImage.webp'
import MobileDontation from '../../Images/Mobile Donate.jpg'
import MoneyDonation from '../../Images/MoneyImage.jpg'
import Donationwithheart from '../../Images/donationwithheart.jpg'
import '../../Styles.css';
import Laptop from '../../Images/laptop.jpg'

function HomeCarousel() {
    return (
        <Carousel>
            
            <Carousel.Item  className=" hidden" interval={3000}>
            <img src={DigitalWorld} className="h-[1/2] w-full md:h-[30rem]"/>
                <Carousel.Caption className=''>
                    {/* <h3 className='text-[1rem] text-kesari bg-white'>Donote with Heart</h3> */}
                    <p className='text-[1rem] text-white font-bold relative bottom-[4.5rem] md:text-[3rem] md:bottom-[6.5rem]'>Welcome to the Portal of One to One Donation</p>
                </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item interval={3000}>
               
                <img src={Laptop} className="h-[1/2] w-full md:h-[30rem]" />
                <Carousel.Caption>
                    {/* <h3 className='textColorClass'>Donate and Earn</h3> */}
                    <p className='text-[1rem] text-white font-bold  relative bottom-[4.5rem] md:text-[3rem] md:bottom-[6.5rem]'> Your 1Rs. Donation can bring lots of laugh</p>
                </Carousel.Caption>
            </Carousel.Item>
            
        </Carousel>
    );
}

export default HomeCarousel;
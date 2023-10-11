import Carousel from 'react-bootstrap/Carousel';
import ConnectingWorl from '../../Images/Connecting world.jpg'
import DigitalWorld from '../../Images/DigitalImage.webp'
import MobileDontation from '../../Images/Mobile Donate.jpg'
import MoneyDonation from '../../Images/MoneyImage.jpg'
import Donationwithheart from '../../Images/donationwithheart.jpg'
import './HomeCarousel.css'
function HomeCarousel() {
    return (
        <Carousel>
            <Carousel.Item interval={3000}>
            <img src={DigitalWorld} className='HomeCarousel' />
                <Carousel.Caption className='captionClass'>
                    <h3 className='textColorClass'>Donote with Heart</h3>
                    <p className='textColorClass'>Welcome to the Portal of One to One Donation</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={2500}>
               
                <img src={MoneyDonation} className='HomeCarousel' />
                <Carousel.Caption className='captionClass'>
                    <h3 className='textColorClass'>Donate and Earn</h3>
                    <p className='textColorClass'> Your 1Rs. Donation can bring lots of laugh on the face of other person</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={3000}>
                <img src={Donationwithheart} className='HomeCarousel' />
                <Carousel.Caption className='captionClass'>
                    <h3 className='textColorClass'>Let's participate in Maha Daanam</h3>
                    <p className='textColorClass'>
                        Donation is a part of Karma according to Bhagawat Geeta
                    </p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
}

export default HomeCarousel;
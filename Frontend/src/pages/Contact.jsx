import React from 'react'
import Title from '../components/Title';
import NewsletterBox from '../components/NewsletterBox';
import { assets } from '../assets/assets';

const Contact = () => {
    return (
        <div>
            <div className='text-center text-2xl pt-10 border-t'>
                <Title text1={'CONTACT'} text2={'US'} />
            </div>

            <div className='my-12 flex flex-col md:flex-row items-center gap-14 mb-28'>

                {/* Image */}
                <img
                    className='w-full md:max-w-[480px] rounded-2xl shadow-sm'
                    src={assets.contact_img}
                    alt="Contact Ravi Creation"
                />

                {/* Content */}
                <div className='flex flex-col justify-center items-start gap-6 max-w-md'>

                    <p className='font-semibold text-2xl text-gray-800'>
                        Ravi Creation
                    </p>

                    <p className='text-gray-600 leading-relaxed'>
                        We create handmade car hanger dream catchers designed to bring positivity, elegance, and spiritual charm to your car interior.
                        Have questions, bulk inquiries, or custom design requests? We’d love to hear from you!
                    </p>

                    <div className='text-gray-600'>
                        <p className='font-medium text-gray-800'>Our Location</p>
                        <p>A-75 Avdhut Nagar Society</p>
                        <p>Katargam, Surat, India</p>
                    </div>

                    <div className='text-gray-600'>
                        <p className='font-medium text-gray-800'>Contact Details</p>
                        <p>📞 +91 9106238665</p>
                        <p>📧 ravindrakachariya@gmail.com</p>
                    </div>

                    <div>
                        <p className='font-semibold text-lg text-gray-800'>
                            Custom Orders & Collaborations
                        </p>
                        <p className='text-gray-600 text-sm'>
                            For wholesale, collaborations, or personalized car hanger designs, feel free to connect with us directly.
                        </p>
                    </div>

                    <button className='mt-4 border border-black px-8 py-3 text-sm rounded-full hover:bg-black hover:text-white transition-all duration-300'>
                        Contact Now
                    </button>
                </div>
            </div>

            <NewsletterBox />
        </div>
    )
}

export default Contact;
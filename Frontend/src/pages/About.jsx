import React from 'react'
import Title from '../components/Title';
import NewsletterBox from '../components/NewsletterBox';
import { assets } from '../assets/assets';

const About = () => {
    return (
        <div className="px-4 sm:px-10">

            {/* Heading */}
            <div className='text-2xl text-center pt-10 border-t'>
                <Title text1={'ABOUT'} text2={'US'} />
            </div>

            {/* About Section */}
            <div className='my-14 flex flex-col md:flex-row items-center gap-14'>

                {/* Image */}
                <img
                    className='w-full md:max-w-[480px] rounded-2xl shadow-md'
                    src={assets.about_img}
                    alt="About Ravi Creation"
                />

                {/* Content */}
                <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600 leading-relaxed'>

                    <p>
                        Our journey began with a simple passion — creating beautiful handmade car hanger dream catchers that bring positivity and elegance to every drive. What started as a small creative idea has grown into a brand dedicated to handcrafted car decor that reflects art, culture, and spiritual charm.
                    </p>

                    <p>
                        Every car hanger is carefully handmade using quality threads, beads, and decorative elements. We focus on detail, balance, and finishing to ensure that each piece adds a unique and premium touch to your car interior.
                    </p>

                    <div>
                        <h3 className='text-xl font-semibold text-gray-800 mb-2'>
                            Our Mission
                        </h3>
                        <p>
                            Our mission is to spread positive vibes and aesthetic beauty through handcrafted car accessories. We believe your car is more than just a vehicle — it’s your personal space. Our goal is to make that space stylish, peaceful, and inspiring.
                        </p>
                    </div>

                </div>
            </div>

            {/* Why Choose Us */}
            <div className='text-xl text-center py-6'>
                <Title text1={'WHY'} text2={'CHOOSE US'} />
            </div>

            <div className='grid gap-6 md:grid-cols-3 mb-24'>

                <div className='bg-white rounded-2xl shadow-sm hover:shadow-md transition p-8 flex flex-col gap-4'>
                    <h4 className='font-semibold text-lg text-gray-800'>
                        Handmade with Love
                    </h4>
                    <p className='text-gray-600 text-sm leading-relaxed'>
                        Each car hanger is crafted with care and attention to detail, ensuring uniqueness and authenticity in every piece.
                    </p>
                </div>

                <div className='bg-white rounded-2xl shadow-sm hover:shadow-md transition p-8 flex flex-col gap-4'>
                    <h4 className='font-semibold text-lg text-gray-800'>
                        Premium Quality Materials
                    </h4>
                    <p className='text-gray-600 text-sm leading-relaxed'>
                        We use high-quality threads, beads, and decorative elements to create durable and long-lasting products.
                    </p>
                </div>

                <div className='bg-white rounded-2xl shadow-sm hover:shadow-md transition p-8 flex flex-col gap-4'>
                    <h4 className='font-semibold text-lg text-gray-800'>
                        Elegant & Spiritual Design
                    </h4>
                    <p className='text-gray-600 text-sm leading-relaxed'>
                        Our designs are created to add aesthetic beauty and positive energy to your car interior.
                    </p>
                </div>

            </div>

            <NewsletterBox />
        </div>
    )
}

export default About;
import React from 'react'

const Testimonials = () => {
    const reviews = [
        {
            name: "Priya Sharma",
            rating: 5,
            comment: "Amazing quality! The car hanger looks beautiful in my car. Highly recommended!",
            location: "Mumbai"
        },
        {
            name: "Rahul Verma",
            rating: 5,
            comment: "Great product, fast delivery. The dream catcher adds a nice touch to my car interior.",
            location: "Delhi"
        },
        {
            name: "Anjali Singh",
            rating: 4,
            comment: "Very nice design and good quality. Worth the price. Quick delivery too!",
            location: "Bangalore"
        }
    ]

    return (
        <div className='my-16 px-4 sm:px-10 bg-gray-50 py-16'>
            <div className='text-center mb-12'>
                <h2 className='text-3xl font-bold text-gray-800'>What Our Customers Say</h2>
                <p className='text-gray-600 mt-2'>Real reviews from happy customers</p>
            </div>

            <div className='flex flex-col md:flex-row gap-8 justify-center max-w-6xl mx-auto'>
                {reviews.map((review, index) => (
                    <div key={index} className='bg-white p-6 rounded-2xl shadow-md flex-1 hover:shadow-xl transition duration-300'>
                        <div className='flex items-center gap-1 mb-3'>
                            {[...Array(5)].map((_, i) => (
                                <span key={i} className={`text-lg ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}>
                                    ★
                                </span>
                            ))}
                        </div>
                        <p className='text-gray-700 mb-4 italic'>"{review.comment}"</p>
                        <div className='flex justify-between items-center'>
                            <span className='font-semibold text-gray-800'>{review.name}</span>
                            <span className='text-sm text-gray-500'>{review.location}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Testimonials

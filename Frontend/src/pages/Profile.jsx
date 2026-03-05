import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FaUser, FaHeart, FaShoppingBag, FaEdit, FaSave, FaTimes } from 'react-icons/fa';
import { selectCurrentUser, updateUserProfile } from '../store/userSlice';
import Title from '../components/Title';

const Profile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(selectCurrentUser);
    const [isEditing, setIsEditing] = useState(false);
    const [editedUser, setEditedUser] = useState(() => user || {});

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

    const handleSave = () => {
        dispatch(updateUserProfile(editedUser));
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditedUser(user);
        setIsEditing(false);
    };

    if (!user) {
        return null;
    }

    return (
        <div className='border-t pt-10'>
            <div className='text-2xl mb-10'>
                <Title text1={'My'} text2={'Profile'} />
            </div>

            <div className='max-w-2xl mx-auto'>
                {/* Profile Header */}
                <div className='bg-white rounded-2xl shadow-lg p-8 mb-6'>
                    <div className='flex items-center gap-6'>
                        <div className='w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center'>
                            <FaUser className='text-4xl text-gray-400' />
                        </div>
                        <div className='flex-1'>
                            {isEditing ? (
                                <div className='space-y-3'>
                                    <div>
                                        <label className='text-sm text-gray-500'>Name</label>
                                        <input
                                            type='text'
                                            value={editedUser.name || ''}
                                            onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
                                            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black mt-1'
                                        />
                                    </div>
                                    <div>
                                        <label className='text-sm text-gray-500'>Email</label>
                                        <input
                                            type='email'
                                            value={editedUser.email || ''}
                                            onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
                                            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black mt-1'
                                        />
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <h2 className='text-2xl font-semibold text-gray-800'>{user.name}</h2>
                                    <p className='text-gray-500'>{user.email}</p>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Edit Actions */}
                    <div className='flex justify-end gap-3 mt-6'>
                        {isEditing ? (
                            <>
                                <button
                                    onClick={handleCancel}
                                    className='flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition'
                                >
                                    <FaTimes /> Cancel
                                </button>
                                <button
                                    onClick={handleSave}
                                    className='flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition'
                                >
                                    <FaSave /> Save
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={() => setIsEditing(true)}
                                className='flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition'
                            >
                                <FaEdit /> Edit Profile
                            </button>
                        )}
                    </div>
                </div>

                {/* Quick Links */}
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                    <button
                        onClick={() => navigate('/wishlist')}
                        className='flex items-center gap-4 p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition'
                    >
                        <div className='w-12 h-12 bg-red-50 rounded-full flex items-center justify-center'>
                            <FaHeart className='text-xl text-red-500' />
                        </div>
                        <div className='text-left'>
                            <h3 className='font-semibold text-gray-800'>My Wishlist</h3>
                            <p className='text-sm text-gray-500'>View your saved items</p>
                        </div>
                    </button>

                    <button
                        onClick={() => navigate('/orders')}
                        className='flex items-center gap-4 p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition'
                    >
                        <div className='w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center'>
                            <FaShoppingBag className='text-xl text-blue-500' />
                        </div>
                        <div className='text-left'>
                            <h3 className='font-semibold text-gray-800'>My Orders</h3>
                            <p className='text-sm text-gray-500'>Track your orders</p>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Profile;

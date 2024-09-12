import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getUserById } from '../services/UserService';

const UserDetails = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const navigate = useNavigate(); // Hook for navigation

    useEffect(() => {
        async function fetchUser() {
            try {
                const response = await getUserById(id);
                setUser(response);
            } catch (error) {
                console.error(error);
            }
        }
        fetchUser();
    }, [id]);

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className='container'>
            <br/>
            <br/>
            <p className='h5'>ID: {user.id}</p>
            <br/>
            <p className='h5'>Name: {user.name}</p>
            <br/>
            <p className='h5'>Email: {user.email}</p>
            <br/>
            <p className='h5'>Contact: {user.contact}</p>
            <br/>
            <button onClick={() => navigate('/')} className='btn btn-light h5 btn-lg'>&lt; Back</button>
        </div>
    );
};

export default UserDetails;
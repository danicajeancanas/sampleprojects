import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { deleteUser } from '../services/UserService';

const UserList = () => {
    const { users, setIsUpdateMode, setSelectedUser, setUsers } = useContext(UserContext);
    const navigate = useNavigate();


    //Function to update the details of a user
    const handleUpdateClick = (user) => {
        setIsUpdateMode(true);
        setSelectedUser(user);
        console.log(user);
    }


    //function to view the details of a user
    const handleViewClick = (userId) => {
        navigate(`/contact-detail/${userId}`);
    };


    // Function to handle user deletion
    const handleDelete = async (id) => {
        try {
            await deleteUser(id);
            // Update the state to remove the deleted user
            setUsers(users.filter(user => user.id !== id));
        } catch (error) {
            console.error('Failed to delete user:', error);
        }
    };

    return (
        <div className='container'>
            <table className='table table-bordered'>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Contact</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map(
                            user =>
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.contact}</td>
                                    <td>
                                        <button className='btn btn-light' onClick={() => handleViewClick(user.id)}>View</button>
                                        <button className='btn btn-light' style={{ marginLeft: '10px' }} onClick={() => handleUpdateClick(user)}>Update</button>
                                        <button className='btn btn-light' style={{ marginLeft: '10px' }} onClick={() => handleDelete(user.id)}>Delete</button>
                                    </td>
                                </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    );
};

export default UserList;
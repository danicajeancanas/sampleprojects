import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../context/UserContext';
import { updateUser } from '../services/UserService';
import { useLocation } from 'react-router-dom';

const UserForm = () => {
    const { users, addUser, isUpdateMode, selectedUser, updateUserInContext, setIsUpdateMode, setSelectedUser } = useContext(UserContext);
    const [form, setForm] = useState({ id: '', name: '', email: '', contact: '' });
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const userId = queryParams.get('id');



    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newUser = { id: form.id, name: form.name, contact: form.contact, email: form.email };
        if (isUpdateMode) {
            try {
                const updatedUser = await updateUser(form);
                updateUserInContext(updatedUser);
            } catch (error) {
                console.error('Error updating user:', error);
            }
        } else {
            addUser(newUser);
        }
        setForm({ id: '', name: '', email: '', contact: '' });
        setIsUpdateMode(false);
        setSelectedUser(null);
    };

    useEffect(() => {
        if (selectedUser) {
            setForm({
                id: selectedUser.id,
                name: selectedUser.name,
                email: selectedUser.email,
                contact: selectedUser.contact
            })
        }
    }, [selectedUser]);

    useEffect(() => {
        if (userId) {
            const userToEdit = users.find(user => user.id === parseInt(userId));
            if (userToEdit) {
                setForm(userToEdit);
            }
        }
    }, [userId, users]);

    useEffect(() => {
        if (!isUpdateMode) {
            const maxId = users.reduce((max, user) => (user.id > max ? user.id : max), 0);
            setForm((prevState) => ({
                ...prevState,
                id: maxId + 1
            }));
        }
    }, [isUpdateMode, users]);


    return (
        <div className='container'>
            <br />
            <div className='form-row'>
                <div className='card col-md-6'>
                    <div className='card-body'>
                        <form onSubmit={handleSubmit}>
                            {isUpdateMode && (
                                <div className='form-group mb-2'>
                                    <label className='form-label h6'>Id</label>
                                    <fieldset disabled>
                                        <input
                                            type="text"
                                            name="id"
                                            placeholder="ID"
                                            value={form.id || ''}
                                            onChange={handleChange}
                                            readOnly
                                            className='form-control'
                                        />
                                    </fieldset>
                                </div>
                            )}

                            <div className='form-group mb-2'>
                                <label className='form-label h6'>Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Name"
                                    value={form.name}
                                    onChange={handleChange}
                                    required
                                    className='form-control'
                                    pattern="^[A-Za-zÑñ\s]+$"
                                    title="Name must contain only letters and spaces"
                                />
                            </div>
                            <div className='form-group mb-2'>
                                <label className='form-label h6'>Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={form.email}
                                    onChange={handleChange}
                                    required
                                    className='form-control'
                                />
                            </div>
                            <div className='form-group mb-2'>
                                <label className='form-label h6'>Contact</label>
                                <input
                                    type="text"
                                    name="contact"
                                    placeholder="Enter Contact Information"
                                    value={form.contact}
                                    onChange={handleChange}
                                    required
                                    className='form-control'
                                    pattern="^(?:\d-?){11}$"
                                    title="Contact number must be exactly 11 digits"
                                />
                            </div>
                            <br />
                            <button type="submit" className='btn btn-light'>{selectedUser ? 'Update' : 'Add'}</button>
                        </form>
                        <br />
                    </div>
                </div>
            </div>
        </div>

    );
};

export default UserForm;
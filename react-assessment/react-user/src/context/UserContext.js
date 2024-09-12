import React, { createContext, useState, useEffect } from 'react';
import { addUser as addUserService, getUsers, deleteUser as deleteUserService } from '../services/UserService';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [isUpdateMode, setIsUpdateMode] = useState(false); 
  const [selectedUser, setSelectedUser] = useState(null); 
  

  //fetching or getting all the user
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []);


  //adding a user
  const addUser = async (user) => {
    try {
      const newUser = await addUserService(user);
      setUsers([...users, newUser]);
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  //update a user
  const updateUserInContext = (updatedUser) => {
    setUsers(users.map(user => user.id === updatedUser.id ? updatedUser : user));
    setIsUpdateMode(false);
    setSelectedUser(null);
  };

  const deleteUser = async (id) => {
    try {
      await deleteUserService(id); // Call the API to delete the user
      setUsers((prevUsers) => prevUsers.filter(user => user.id !== id));
      return { success: true }; // Return success status
    } catch (error) {
      console.error('Error deleting user:', error);
      return { success: false, message: error.message }; // Return failure status and message
    }
  };


  return (
    <UserContext.Provider value={{ users, addUser, isUpdateMode, setIsUpdateMode, selectedUser, setSelectedUser, updateUserInContext, deleteUser, setUsers }}>
      {children}
    </UserContext.Provider>
  );
};


const BASE_API_URL = 'http://localhost:8080/api'; 

//get all the user
export const getUsers = async () => {
  const USERS_API_URL = `${BASE_API_URL}/users`;
  try {
    const response = await fetch(USERS_API_URL);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};


//update a user
export const updateUser = async (user) => {
    const USER_API_URL = `${BASE_API_URL}/update/${user.id}`;
    try {
      const response = await fetch(USER_API_URL, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return await response.json();
    } catch (error) {
      console.error('Error updating user data:', error);
      throw error;
    }
  };

  //add a user
  export const addUser = async (user) => {
    const USER_API_URL = `${BASE_API_URL}/add`;
    try {
        const response = await fetch(USER_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });
        if (!response.ok) {
            throw new Error('Failed to add user');
        }
        return response.json();
    } catch (error) {
        console.error('Error updating user data:', error);
        throw error;
    }
};
  

//for viewing the details of a user
export const getUserById = async (id) => {
    const USER_API_URL = `${BASE_API_URL}/users/${id}`;
    try {
        const response = await fetch(USER_API_URL);
        if (!response.ok) {
            throw new Error('Failed to fetch user');
        }
        return response.json();
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
};

//deleting a user
export const deleteUser = async (id) => {
    const USER_API_URL = `${BASE_API_URL}/delete/${id}`;
    try {
        const response = await fetch(USER_API_URL, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to delete user: ${errorText}`);
        }
        // Check if response has content before parsing
        const text = await response.text();
        return text ? JSON.parse(text) : {};
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    }
};

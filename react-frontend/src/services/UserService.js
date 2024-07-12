import axios from 'axios';
const apiBaseUrl = process.env.REACT_APP_API_AUTHENTICATE_BASE_URL;
class UserService {

    getUsers(token){
        return axios.get(`${apiBaseUrl}/user`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          // Add any other headers as needed
        },
      });
    }



    getUserById(userId,token){
        return axios.get(`${apiBaseUrl}/users/${userId}`,{
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          // Add any other headers as needed
        },

      });
    }

    updateUser(user, userId,token){
        return axios.put(`${apiBaseUrl}/users/${userId}`, user,{
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          // Add any other headers as needed
        },
      });
    }

    deleteUser(userId,token){
        return axios.delete(`${apiBaseUrl}/users/${userId}`,{
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          // Add any other headers as needed
        },
      });
    }
}

export default new UserService()
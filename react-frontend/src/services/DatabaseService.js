import axios from 'axios';
const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
class DatabaseService {

    getDatabases(token){
        return axios.get(`${apiBaseUrl}/databases`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          // Add any other headers as needed
        },
      });
    }

    createDatabase(database,token){
        return axios.post(`${apiBaseUrl}/databases`, database,{
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          // Add any other headers as needed
        },


      });
    }

    getDatabaseById(databaseId,token){
        return axios.get(`${apiBaseUrl}/databases/${databaseId}`,{
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          // Add any other headers as needed
        },

      });
    }

    updateDatabase(database, databaseId,token){
        return axios.put(`${apiBaseUrl}/databases/${databaseId}`, database,{
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          // Add any other headers as needed
        },
      });
    }

    deleteDatabase(databaseId,token){
        return axios.delete(`${apiBaseUrl}/databases/${databaseId}`,{
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          // Add any other headers as needed
        },
      });
    }
}

export default new DatabaseService()
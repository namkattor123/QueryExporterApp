import axios from 'axios';

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

class QueryService {

    getQueries(token){
        return axios.get(`${apiBaseUrl}/queries`,{
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          // Add any other headers as needed
        },
        });
    }

    createQuery(query,token){
        return axios.post(`${apiBaseUrl}/queries/test`, query,{
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          // Add any other headers as needed
        },
        });
    }

    getQueryById(queryId, token){
        return axios.get(`${apiBaseUrl}/queries/${queryId}`,{
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          // Add any other headers as needed
        },
        });
    }

    updateQuery(query, queryId, token){
        return axios.put(`${apiBaseUrl}/queries/${queryId}`, query,{
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          // Add any other headers as needed
        },
        });
    }

    deleteQuery(queryId, token){
        return axios.delete(`${apiBaseUrl}/queries/${queryId}`,{
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          // Add any other headers as needed
        },
        });
    }
}

export default new QueryService()
import axios from 'axios';
const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
const apiAuthenticateUrl = process.env.REACT_APP_API_AUTHENTICATE_BASE_URL;
class HomeService {
    homeView(token){
        return axios.get(`${apiBaseUrl}/home`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          // Add any other headers as needed
        },
        });
    }
    exportToYaml(token){
        return axios.get(`${apiBaseUrl}/home/downloadYaml`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          // Add any other headers as needed
        },
        });
    }

    login(account,token){
        return axios.post(`http://localhost:8080/api/auth/login`, account,{
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          // Add any other headers as needed
        },
        });
    }

}

export default new HomeService()
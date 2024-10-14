import axios from 'axios';
import { headers } from '../utils';
const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
class DatabaseService {

  getDatabases(token) {
    return axios.get(`${apiBaseUrl}/databases`, {
      headers: headers(token)
    });
  }

  createDatabase(database, token) {
    return axios.post(`${apiBaseUrl}/databases`, database, {
      headers: headers(token)
    });
  }

  getDatabaseById(databaseId, token) {
    return axios.get(`${apiBaseUrl}/databases/${databaseId}`, {
      headers: headers(token)

    });
  }

  updateDatabase(database, databaseId, token) {
    return axios.put(`${apiBaseUrl}/databases/${databaseId}`, database, {
      headers: headers(token)
    });
  }

  deleteDatabase(databaseId, token) {
    return axios.delete(`${apiBaseUrl}/databases/${databaseId}`, {
      headers: headers(token)
    });
  }
}

export default new DatabaseService()

// annotations:
//   nginx.ingress.kubernetes.io/configuration-snippet: |
//     add_header Access-Control-Allow-Origin $http_origin;
//     add_header Access-Control-Allow-Methods "POST, GET, OPTIONS";
//     add_header Access-Control-Allow-Credentials true;
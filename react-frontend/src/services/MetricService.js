import axios from 'axios';

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

class MetricService {

    getMetrics(token){
        return axios.get(`${apiBaseUrl}/metrics`,{
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          // Add any other headers as needed
        },
        });
    }

    createMetric(metric,token){
        return axios.post(`${apiBaseUrl}/metrics`, metric,{
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          // Add any other headers as needed
        },
        });
    }

    getMetricById(metricId,token){
        return axios.get(`${apiBaseUrl}/metrics/${metricId}`,{
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          // Add any other headers as needed
        },
        });
    }

    updateMetric(metric, metricId, token){
        return axios.put(`${apiBaseUrl}/metrics/${metricId}`, metric,{
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          // Add any other headers as needed
        },
        });
    }

    deleteMetric(metricId, token){
        return axios.delete(`${apiBaseUrl}/metrics/${metricId}`,{
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          // Add any other headers as needed
        },
        });
    }
}

export default new MetricService()
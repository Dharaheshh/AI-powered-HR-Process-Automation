import axios from 'axios';

const API = axios.create({
  baseURL: '/api',
});

// Attach JWT token to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth APIs
export const signupAPI = (data) => API.post('/auth/signup', data);
export const loginAPI = (data) => API.post('/auth/login', data);
export const getMeAPI = () => API.get('/auth/me');

// Role APIs
export const getRolesAPI = () => API.get('/roles');
export const getRoleAPI = (id) => API.get(`/roles/${id}`);

// Job Opening APIs
export const createJobOpeningAPI = (data) => API.post('/job-openings', data);
export const getJobOpeningsAPI = () => API.get('/job-openings');
export const getMyJobOpeningsAPI = () => API.get('/job-openings/my');
export const getJobOpeningAPI = (id) => API.get(`/job-openings/${id}`);
export const updateJobOpeningAPI = (id, data) => API.put(`/job-openings/${id}`, data);
export const deleteJobOpeningAPI = (id) => API.delete(`/job-openings/${id}`);

// Applications
export const applyToJobAPI = async (jobOpeningId, formData) => {
  const response = await API.post(`/applications/${jobOpeningId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};
export const getApplicantsAPI = (jobOpeningId) => API.get(`/applications/job/${jobOpeningId}`);
export const getMyApplicationsAPI = () => API.get('/applications/my');
export const getAllApplicationsAPI = () => API.get('/applications/all');
export const getApplicationAPI = (id) => API.get(`/applications/${id}`);

export const updateApplicationStatusAPI = (id, status, extraData = {}) => API.patch(`/applications/${id}/status`, { status, ...extraData });
export const addRecruiterNoteAPI = (id, text) => API.post(`/applications/${id}/notes`, { text });

// Analytics
export const getHRSummaryAPI = () => API.get('/analytics/hr-summary');
export const getReportDataAPI = () => API.get('/analytics/report-data');

// Settings
export const getHrSettingsAPI = () => API.get('/settings/availability');
export const updateHrSettingsAPI = (data) => API.put('/settings/availability', data);

// Recommendations (Cross-Role Matching)
export const getRecommendationsAPI = () => API.get('/recommendations');
export const getMyRecommendationsAPI = () => API.get('/recommendations/my');
export const acceptRecommendationAPI = (id) => API.put(`/recommendations/${id}/accept`);
export const ignoreRecommendationAPI = (id) => API.put(`/recommendations/${id}/ignore`);

// AI 
export const analyzeResumeAPI = (data) => API.post('/ai/analyze-resume', data, {
  headers: { 'Content-Type': 'multipart/form-data' }
});

export default API;

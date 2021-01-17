import axios from 'axios';

const url = "http://localhost:5000";

const api = axios.create({
    baseURL: url,
});

export const insertIssue = payload => api.post(`/issues`, payload);
export const getAllIssues = () => api.get(`/issues`);
export const getCommentsOfIssue = (id) => api.get(`/issues/${id}`);
export const insertCommentOfIssue = (id, payload) => api.post(`/issues/${id}`, payload);
export const removeIssue = (id) => api.delete(`/issues/${id}`);

const apis = {
    insertIssue,
    getAllIssues,
    getCommentsOfIssue,
    insertCommentOfIssue,
    removeIssue,
}

export default apis;
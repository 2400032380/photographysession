import api from './api';

export const getAllSessions = async () => (await api.get('/photography/all')).data;
export const getSessionById = async (id) => (await api.get(`/photography/get/${id}`)).data;
export const addSession = async (session) => (await api.post('/photography/add', session)).data;
export const updateSession = async (session) => (await api.put('/photography/update', session)).data;
export const deleteSession = async (id) => (await api.delete(`/photography/delete/${id}`)).data;

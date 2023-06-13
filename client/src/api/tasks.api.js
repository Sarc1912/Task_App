import axios from 'axios';

const tasksApis = axios.create({
    baseURL: 'http://127.0.0.1:8000/tasks/api/v1/tasks/'
})

export const getAllTasks = () => tasksApis.get('/');

export const getTask = (id) => tasksApis.get(`/${id}/`)

export const createTask = (task) =>  tasksApis.post('/', task);

export const deleteTask = (id) => tasksApis.delete(`/${id}`);

export const updateTask = (id, task) => tasksApis.put(`/${id}/`, task);
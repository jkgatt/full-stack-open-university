import axios from 'axios'

const baseUrl = '/api/persons'

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then(response => response.data);
}

const create = (newContact) => {
  const request = axios.post(baseUrl, newContact);
  return request.then(response => response.data);
}

const update = (id, updatedContact) => {
  const request = axios.put(`${baseUrl}/${id}`, updatedContact)
  return request.then(response => response.data)
}

const remove = (contactId) => {
  return axios.delete(`${baseUrl}/${contactId}`);
}
export default {getAll, create, update, remove};
import axios from "axios";

// need to change the base URL from localhost to api/persons before building for the production
// const baseUrl = 'http://localhost:3001/api/persons'
const baseUrl = "api/persons";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

interface CreateProp {
  name: string;
  number: string;
}

const create = (newObject: CreateProp) => {
  const request = axios.post(baseUrl, newObject);
  return request.then((response) => response.data);
};

const deleteContact = (id: string) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then((response) => response.data);
};

const updateContact = (id: string, newObject: CreateProp) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((response) => response.data);
};

export default {
  getAll,
  create,
  deleteContact,
  updateContact,
};

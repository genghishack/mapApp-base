import {API} from "aws-amplify";

export const getUser = async (id = null) => {
  if (!id) {
    return API.get('mapapp', '/user/self', {});
  }
  else {
    return API.get('mapapp', `/user/${id}`, {});
  }
}

export const createUser = async (userData: null | any = null) => {
  if (!userData) {
    return API.post('mapapp', '/user', {});
  }
  else {
    return API.post('mapapp', '/user', {body: userData});
  }
}

export const listUsers = async () => {
  return API.get('mapapp', '/user', {});
}

export const deleteUser = async (id) => {
  return API.del('mapapp', `/user/${id}`, {});
}

export const enableUser = async (id) => {
  return API.patch('mapapp', `/user/enable/${id}`, {});
}

export const disableUser = async (id) => {
  return API.patch('mapapp', `/user/disable/${id}`, {});
}

export const listRoles = async () => {
  return API.get('mapapp', '/user/roles', {});
}

export const addUserToRole = async (id, role) => {
  return API.put('mapapp', `/user/role/${id}`,{body: {role}});
}

export const removeUserFromRole = async (id, role) => {
  return API.del('mapapp', `/user/role/${id}`, {body: {role}});
}

export const changeUsername = async (id, name) => {
  return API.patch('mapapp', `/user/name/${id}`, {body: {name}});
}

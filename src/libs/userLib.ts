import {API} from "aws-amplify";

export const getUser = async (id = null) => {
  if (!id) {
    return API.get('mapapp', '/user/self', {});
  }
  else {
    return API.get('mapapp', `/user/${id}`, {});
  }
}

export const createUser = async () => {
  return API.post('mapapp', '/user', {});
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

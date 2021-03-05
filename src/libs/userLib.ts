import {API} from "aws-amplify";

export const getUser = async () => {
  return API.get('mapapp', '/user/self', {});
}

export const createUser = async () => {
  return API.post('mapapp', '/user', {});
}

export const listUsers = async () => {
  return API.get('mapapp', '/user', {});
}

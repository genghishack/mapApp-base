import {API} from "aws-amplify";

export const getResources = async () => {
  return API.get('mapapp', '/resource', {});
}

export const createResource = async (resource) => {
  return API.post('mapapp', '/resource', {
    body: resource
  });
}

import {API} from "aws-amplify";

export type ResourceType = {
  name: string;
  business: string;
  website: string;
  email: string;
  phone: string;
  fax: string;
  address: {
    street_1: string;
    street_2: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
  },
  description: string;
};

export const getResources = async (userId: string | null) => {
  if (userId) {
    return API.get('mapapp', `/resource/user/${userId}`, {});
  }
  return API.get('mapapp', '/resource/public', {});
}

export const createResource = async (resource: ResourceType) => {
  return API.post('mapapp', '/resource', {
    body: resource
  });
}

export const editResource = async (resourceId: string, resource: ResourceType) => {
  return API.patch('mapapp', `/resource/${resourceId}`, {
    body: resource
  });
}

export const submitResource = async (resourceId: string) => {
  return API.patch('mapapp', `/resource/submit/${resourceId}`, {});
}

export const deleteResource = async (resourceId: string) => {
  return API.del('mapapp', `/resource/${resourceId}`, {});
}

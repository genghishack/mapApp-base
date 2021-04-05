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
  return API.get('mapapp', '/resource', {});
}

export const createResource = async (resource: ResourceType) => {
  return API.post('mapapp', '/resource', {
    body: resource
  });
}

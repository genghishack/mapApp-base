import {API} from "aws-amplify";

export type ResourceType = {
  name: any;
  business: any;
  website: any;
  email: any;
  phone: any;
  fax: any;
  address: {
    street_1: any;
    street_2: any;
    city: any;
    state: any;
    country: any;
    postalCode: any;
  },
  description: any;
};

export const getResources = async () => {
  return API.get('mapapp', '/resource', {});
}

export const createResource = async (resource: ResourceType) => {
  return API.post('mapapp', '/resource', {
    body: resource
  });
}

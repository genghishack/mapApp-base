import {API} from "aws-amplify";

export const getUser = () => {
  return API.get('mapapp', '/user/self', {});
}

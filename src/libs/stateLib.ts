import {API} from "aws-amplify";

export type StateType = any;

export const getStates = async () => {
  return API.get('mapapp', '/state', {});
}

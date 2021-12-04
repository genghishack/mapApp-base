import {API} from "aws-amplify";

export type CategoryType = {
  name: string;
};

export const listCategories = async () => {
  return API.get('mapapp', '/category', {});
}

export const createCategory = async (categoryData: null | any = null) => {
  if (!categoryData) {
    return API.post('mapapp', '/category', {});
  }
  else {
    return API.post('mapapp', '/category', {body: categoryData});
  }
}

export const editCategory = async (id: string, category: CategoryType) => {
  return API.patch('mapapp', `/category/${id}`, {
    body: category
  });
}

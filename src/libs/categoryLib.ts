import {API} from "aws-amplify";

export type CategoryType = {
  name: string;
  properties_json?: string;
};

export const getCategories = async () => {
  return API.get('mapapp', '/category', {});
}

export const createCategory = async (category: CategoryType) => {
  return API.post('mapapp', '/category', {
    body: category
  });
}

export const editCategory = async (categoryId: string, category: CategoryType) => {
  return API.patch('mapapp', `/category/${categoryId}`, {
    body: category
  });
}

export const deleteCategory = async (categoryId: string) => {
  return API.del('mapapp', `/category/${categoryId}`, {});
}

export const changeCategoryName = async (id, name) => {
  return API.patch('mapapp', `/category/name/${id}`, {body: {name}});
}

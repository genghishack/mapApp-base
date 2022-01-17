import React, {useEffect, useState} from 'react';
import {getCategories} from "../../../libs/categoryLib";
import {Table} from "react-bootstrap";
import CreateCategory from './CreateCategory';
import CategoryRow from "./CategoryRow";

const CategoryAdmin = () => {
  const [categoryList, setCategoryList] = useState([]);

  const getCategoryList = async () => {
    const categories = await getCategories();
    setCategoryList(categories.data);
  }

  useEffect(() => {
    getCategoryList().then();
  }, [])

  return (
    <div className="CategoryAdmin">
      <header>Category admin</header>
      <CreateCategory getCategoryList={getCategoryList}/>
      <Table striped bordered hover>
        <thead>
        <tr>
          <th>Name</th>
        </tr>
        </thead>
        <tbody>
        {categoryList.map((category: any) => (
          <CategoryRow
            key={category.id}
            initialCategoryData={category}
            getCategoryList={getCategoryList}
          />
        ))}
        </tbody>
      </Table>
    </div>
  )
}

export default CategoryAdmin;

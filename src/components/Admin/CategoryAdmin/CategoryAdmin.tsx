import React, {useEffect, useState} from 'react';
import {listCategories} from "../../../libs/categoryLib";
import CreateCategory from "./CreateCategory";
import Table from "react-bootstrap/Table";
import CategoryRow from "./CategoryRow";

const CategoryAdmin = () => {
  const [categoryList, setCategoryList] = useState([]);

  const getCategoryList = async () => {
    const categories = await listCategories();
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
          />
        ))}
        </tbody>
      </Table>
    </div>
  )
}

export default CategoryAdmin;

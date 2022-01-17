import React, { useState } from 'react';
import {connect} from "react-redux";

import CategoryNameCell from "./CategoryNameCell";

interface ICategoryRow {
  initialCategoryData: any;
  getCategoryList: Function;
  dispatch: Function;
}

const CategoryRow = (props: ICategoryRow) => {
  const {initialCategoryData, dispatch} = props;
  const [category, setCategory] = useState(initialCategoryData);

  const updateCategory = (categoryData) => {
    setCategory(categoryData);
  }

  return (
    <tr className="UserRow">
      <td>
        <CategoryNameCell category={category} setCategory={updateCategory}/>
      </td>
    </tr>
  )
}

function mapStateToProps(state: { errors: any; }) {
  return {
    errors: state.errors,
  };
}

export default connect(mapStateToProps)(CategoryRow);

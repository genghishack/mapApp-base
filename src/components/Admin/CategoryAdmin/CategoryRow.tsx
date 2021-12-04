import React, { useState } from 'react';
import {connect} from "react-redux";

import CategoryNameCell from "./CategoryNameCell";

interface ICategoryRow {
  initialCategoryData: any;
}

const CategoryRow = (props: ICategoryRow) => {
  const {initialCategoryData} = props;
  const [category, setCategory] = useState(initialCategoryData);

  return (
    <tr className="CategoryRow">
      <td>
        <CategoryNameCell category={category} setCategory={setCategory}/>
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

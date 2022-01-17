import React, {useState} from 'react';
import {Button, Form} from 'react-bootstrap';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheckSquare, faTimes, faEdit} from "@fortawesome/free-solid-svg-icons";

import {useFormFields} from "../../../libs/hooksLib";
import {changeCategoryName} from "../../../libs/categoryLib";

interface ICategoryNameCell {
  category: any;
  setCategory: Function;
}

const CategoryNameCell = (props: ICategoryNameCell) => {
  const {category, setCategory} = props;
  const [isEditing, setIsEditing] = useState(false);
  const [fields, handleFieldChange] = useFormFields({
    name: category.name,
  });

  const toggleChangeName = async () => {
    setIsEditing(!isEditing)
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    setIsEditing(false);
    const updatedCategory = await changeCategoryName(category.id, fields.name);
    setCategory(updatedCategory.data);
  }

  return (
    <div className="categoryCell">
      {isEditing ? (
        <>
          <Form className="inline" onSubmit={handleSubmit}>
            <Form.Group controlId="name">
              <Form.Control
                type="text"
                value={fields.name}
                onChange={handleFieldChange}
              />
            </Form.Group>
            <Button
              type="submit"
              variant="link"
            ><FontAwesomeIcon
              icon={faCheckSquare}
              className="success"
            /></Button>
          </Form>
          <div className="option">
            <Button
              variant="link"
              onClick={toggleChangeName}
            ><FontAwesomeIcon
              icon={faTimes}
              className="failure"
            /></Button>
          </div>
        </>
      ) : (
        <>
          <div className="categoryName">
            {category.name}
          </div>
          <div className="option">
            <Button
              variant="link"
              onClick={toggleChangeName}
            ><FontAwesomeIcon
              icon={faEdit}
              className="info"
            /></Button>
          </div>
        </>
      )}
    </div>
  );
}

export default CategoryNameCell;

import React, {useState} from 'react';
import {useFormFields} from "../../../libs/hooksLib";
import {createCategory} from "../../../libs/categoryLib";
import {Button, Form} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheckSquare, faPlusSquare, faTimes} from "@fortawesome/free-solid-svg-icons";

interface ICreateCategory {
  getCategoryList: Function;
}

const CreateCategory = (props: ICreateCategory) => {
  const {getCategoryList} = props;
  const [isCreatingCategory, setIsCreatingCategory] = useState(false);
  const [fields, handleFieldChange] = useFormFields({
    name: '',
  });

  const toggleCreateCategory = (evt) => {
    setIsCreatingCategory(!isCreatingCategory);
  }

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    setIsCreatingCategory(false);
    await createCategory({name: fields.name});
    await getCategoryList();
  }

  const renderCreateCategoryForm = () => {
    return (
      <>
        <Button
          variant="link"
          onClick={toggleCreateCategory}
        ><FontAwesomeIcon
          icon={faTimes}
          className="failure"
        /></Button>
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
      </>
    )
  }

  const renderCreateCategoryButton = () => {
    return (
      <>
        <Button
          variant="link"
          onClick={toggleCreateCategory}
        ><FontAwesomeIcon
          icon={faPlusSquare}
          className="info"
        /></Button>
        <div className="label">Create Category</div>
      </>
    )
  }

  return (
    <div className="CreateUser inline">
      {isCreatingCategory ? renderCreateCategoryForm() : renderCreateCategoryButton()}
    </div>
  );
}

export default CreateCategory;

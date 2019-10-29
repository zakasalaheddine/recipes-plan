import React from 'react';
import { InputGroup, Button, Col, Form } from 'react-bootstrap';

const RecipeContents= ({ type, label, prop, handleChangeList, handleAddNew, handleDelete }) => {
    return (
        <Form.Group as={Col} controlId="Ingredients">
            <Form.Label>{label}</Form.Label>
            {
                prop.map((item, index) => (
                    <InputGroup className="mb-3" key={type + "-" + index}>
                        <Form.Control placeholder={type} type="text"
                            name={type} onChange={(e) => handleChangeList(e, index, type)} value={item}
                        />
                        <InputGroup.Append>
                            <Button variant="outline-danger" onClick={(e) => handleDelete(e, index, type)}>
                                Delete
                            </Button>
                        </InputGroup.Append>
                    </InputGroup>
                ))
            }
            <Button variant="secondary" onClick={ () => handleAddNew(type) }>
                Add New {type}
            </Button>
        </Form.Group>
    );
}
export default RecipeContents;
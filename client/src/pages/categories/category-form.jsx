import React from 'react';
import { Form, Modal, Button } from 'react-bootstrap';

const CategoryForm = ({category, type, show, handleClose}) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Form>
                <Modal.Header closeButton>
                    <Modal.Title>{`${type} ${category.name}`}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Name: </Form.Label>
                        <Form.Control 
                            type="text" name="name" 
                            value={category.name} 
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Form>
      </Modal>
    )
}
export default CategoryForm;
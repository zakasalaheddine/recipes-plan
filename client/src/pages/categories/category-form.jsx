import React from 'react';
import { Form, Col, Row, Image } from 'react-bootstrap';

import SelectCategory from '../../components/categorySelect.component';
import ImageUploader from '../../components/image-uploader.component';

const CategoryForm = ({category, categories, handleChange}) => {
    
    return (
        <div>
            <Form.Group>
                <Form.Label>Name: </Form.Label>
                <Form.Control name="name"
                    value={category.name}
                    onChange={handleChange}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Parent: </Form.Label>
                <SelectCategory 
                    categories={categories}
                    value={category.parent && category.parent._id}
                    handleChange={handleChange}
                />
            </Form.Group>
            <Form.Group controlId="bloqued">
                <Form.Label >Status: </Form.Label>
                <Form.Check 
                    type="checkbox"
                    name="bloqued"
                    label={category.bloqued ? 'Accepted' : 'Bloqued'}
                    checked={category.bloqued}
                    onChange={handleChange}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Image: </Form.Label>
                <Row >
                    <ImageUploader handleChangeFile={handleChange}/>
                    <Col>
                        {
                            (category.image !== '' && category.image)
                            ?   (
                                <figure className="col-md-12 image-holder">
                                    <Image src={category.image} alt="picture" rounded className="img-fluid shadow-sm" />
                                </figure>
                                )
                            :   <p>Image Not Found</p>
                        }
                    </Col>
                </Row>
            </Form.Group>
        </div>
    )
}
export default CategoryForm;
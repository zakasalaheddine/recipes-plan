import React, { Fragment } from 'react';
import { Form, Row, Col, Image } from 'react-bootstrap';

import SelectCategory from '../../components/categorySelect.component';
import ImageUploader from '../../components/image-uploader.component';
const PostForm = ({ post, handleChange, categories }) => {
    return (
        <Fragment>
            <Row>
                <Form.Group as={Col}>
                    <Form.Label>Title :</Form.Label>
                    <Form.Control 
                        name="title"
                        value={post.title}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Label>Category: </Form.Label>
                    <SelectCategory 
                        categories={categories}
                        value={post.category && post.category._id}
                        handleChange={handleChange}
                    />
                </Form.Group>
            </Row>
            <Row>
                <Form.Group controlId="bloqued" as={Col}>
                    <Form.Label >Bloqued: </Form.Label>
                    <Form.Check 
                        type="checkbox"
                        name="bloqued"
                        label={post.bloqued ? 'Accepted' : 'Bloqued'}
                        checked={post.bloqued}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group controlId="accepted" as={Col}>
                    <Form.Label >Accepted: </Form.Label>
                    <Form.Check 
                        type="checkbox"
                        name="accepted"
                        label={post.accepted ? 'Accepted' : 'Bloqued'}
                        checked={post.accepted}
                        onChange={handleChange}
                    />
                </Form.Group>
            </Row>
            
            <Form.Group>
                <Form.Label>Image: </Form.Label>
                <Row >
                    <ImageUploader handleChangeFile={handleChange}/>
                    <Col>
                        {
                            (post.thumbnail !== '' && post.thumbnail)
                            ?   (
                                <figure className="col-md-12 image-holder">
                                    <Image src={post.thumbnail} alt="picture" rounded className="img-fluid shadow-sm" />
                                </figure>
                                )
                            :   <p className="text-center">Image Not Found</p>
                        }
                    </Col>
                </Row>
            </Form.Group>
            <Form.Group>
                    <Form.Label>Content :</Form.Label>
                    <Form.Control 
                        as="textarea"
                        name="content"
                        value={post.content.join('\n')}
                        onChange={handleChange}
                    />
                </Form.Group>
        </Fragment>
    )
}
export default PostForm;
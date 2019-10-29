import React from 'react';
import { Card, Form, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import SelectCategory from '../categorySelect.component';
import ImageUploaderHolder from './image-uploader-holder.component';
import RecipeContents from './recipe-contents.component';

const RecipeForm = ({ recipe, categories, handleSubmit, handleChange, handleChangeInfo, handleDelete, handleAddNew, handleChangeList }) => {
    return (
        <Form onSubmit={handleSubmit}>
            <Card>
                <Card.Body>
                    {/* TITLE - CATEGORY */}
                    <Form.Row>
                        <Form.Group as={Col} controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" name="name"
                                value={recipe.name}
                                onChange={handleChange}
                                placeholder="Enter Recipe Title" />
                        </Form.Group>
                        <Form.Group as={Col} controlId="category">
                            <Form.Label>Category</Form.Label>
                            <SelectCategory
                                handleChange={handleChange}
                                value={recipe.category._id}
                                categories={categories} />
                        </Form.Group>
                    </Form.Row>
                    {/* RECIPE INFO */}
                    <Form.Row>
                        <Form.Group as={Col} controlId="preptime">
                            <Form.Label>Prep time</Form.Label>
                            <Form.Control type="text"
                                placeholder="Prep time"
                                name="makingTime"
                                value={recipe.info.makingTime}
                                onChange={handleChangeInfo} />
                        </Form.Group>
                        <Form.Group as={Col} controlId="servings">
                            <Form.Label>Number of servings</Form.Label>
                            <Form.Control type="text"
                                placeholder="Number of servings"
                                name="serving"
                                value={recipe.info.serving}
                                onChange={handleChangeInfo} />
                        </Form.Group>
                        <Form.Group as={Col} controlId="cals">
                            <Form.Label>Cals</Form.Label>
                            <Form.Control type="text"
                                placeholder="Calories"
                                name="cals"
                                value={recipe.info.cals}
                                onChange={handleChangeInfo} />
                        </Form.Group>
                    </Form.Row>
                    {/* DESCRIPTION - IMAGE - STATUS */}
                    <Form.Row>
                        <Form.Group as={Col} controlId="description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea"
                                rows="3"
                                placeholder="Recipe Description"
                                name="description"
                                value={recipe.description}
                                onChange={handleChange} />
                        </Form.Group>
                    </Form.Row>
                    <ImageUploaderHolder
                        images={recipe.images}
                        handleDelete={handleDelete}
                        addNewImage={handleAddNew} />
                    <Form.Row>
                        <Form.Label>STATUS</Form.Label>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} controlId="accepted">
                            <Form.Check type="checkbox"
                                name="accepted"
                                label={recipe.accepted ? 'Accepted' : 'Refused'}
                                checked={recipe.accepted}
                                onChange={handleChange} />
                        </Form.Group>
                        <Form.Group as={Col} controlId="bloqued">
                            <Form.Check type="checkbox"
                                name="bloqued"
                                label={recipe.bloqued ? 'Bloqued' : 'Showed'}
                                checked={recipe.bloqued}
                                onChange={handleChange} />
                        </Form.Group>
                    </Form.Row>
                    {/* INGREDIENTS - DIRECTIONS */}
                    <Form.Row>
                        <RecipeContents
                            type='ingredient'
                            label="Ingredients"
                            prop={recipe.ingredients}
                            handleAddNew={handleAddNew}
                            handleChangeList={handleChangeList}
                            handleDelete={handleDelete} />
                        <RecipeContents
                            type='direction'
                            label="Directions"
                            prop={recipe.directions}
                            handleAddNew={handleAddNew}
                            handleChangeList={handleChangeList}
                            handleDelete={handleDelete} />
                    </Form.Row>
                </Card.Body>
                <Card.Footer>
                    <Button variant="secondary" as={Link} to="/recipes">
                        BACK
                    </Button>
                    <Button variant="success" className="float-right" type="submit">
                        EDIT
                    </Button>
                </Card.Footer>
            </Card>
        </Form>
    )
}
export default RecipeForm;
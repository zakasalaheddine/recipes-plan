import React, { useState } from 'react';
import { Card, Table, Spinner, ButtonGroup, Button, Alert, Image } from 'react-bootstrap';
import { useQuery } from '@apollo/react-hooks';

import { FETCH_ALL_CATEGORIES } from './gql';
import Layout from '../layout';
const Categories = (props) => {

    const { loading, error, data } = useQuery(FETCH_ALL_CATEGORIES, {
        fetchPolicy: 'cache-and-network'
    })
    const [selectedCategory, setSelectedCategory] = useState({});
    const handleEditClick = (category) => {
        selectedCategory(category)
    }
    return (
        <Layout>
            <h1 className='h3 mb-0 text-gray-800'>Categories</h1>
            <hr />
            <Card>
                {error && ( 
                    <Alert variant='danger'>
                        {error}
                    </Alert>
                )}
                <Card.Body>
                    {loading ? (<Spinner  animation="grow" />) : (
                        <Table striped responsive bordered size="sm">
                            <thead>
                                <tr>
                                    <td>Name</td>
                                    <td>Image</td>
                                    <td>Parent</td>
                                    <td>Status</td>
                                    <td>Actions</td>
                                </tr>
                            </thead>
                            {
                                data && (
                                    <tbody>
                                       {data.categories.map((category, index) => (
                                           <tr key={index}>
                                                <td>{category.name}</td>
                                                <td>{category.image ? 
                                                    <Image src={category.image} alt="picture" rounded className="img-fluid shadow-sm" />
                                                    : 'No Image'}
                                                </td>
                                                <td>{category.parent && category.parent.name}</td>
                                                <td>{category.bloqued}</td>
                                                <td>
                                                    <ButtonGroup size="sm">
                                                        <Button 
                                                            onClick={(category) => handleEditClick(category)} 
                                                            variant="secondary">Edit</Button>
                                                        <Button variant="danger">Delete</Button>
                                                    </ButtonGroup>
                                                </td>
                                           </tr>
                                       ))} 
                                    </tbody>
                                )
                            }
                        </Table>
                    )}
                </Card.Body>
            </Card>
        </Layout>
    )
}
export default Categories;
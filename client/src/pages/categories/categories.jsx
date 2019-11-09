import React from 'react';
import { Card, Table, Spinner, ButtonGroup, Button, Alert } from 'react-bootstrap';
import { useQuery } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';


import { FETCH_ALL_CATEGORIES } from './gql';
import Layout from '../layout';
const Categories = (props) => {
    const { loading, error, data } = useQuery(FETCH_ALL_CATEGORIES, {
        fetchPolicy: 'cache-and-network',
        onError(){
            console.log(error);
        }
    })
    return (
        <Layout>
            <Button 
                className="float-right" 
                variant="primary"
                as={Link} to='/categories/new'
            >Add New Category</Button>
            <h1 className='h3 mb-0 text-gray-800'>Categories</h1>
            <hr />
            <Card>
                {error ? ( 
                    <Alert variant='danger'>
                        {error}
                    </Alert>
                ) : (
                <Card.Body>
                    {loading ? (<Spinner  animation="grow" />) : (
                        <Table striped responsive bordered size="sm">
                            <thead>
                                <tr>
                                    <td>Name</td>
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
                                                <td>{category.parent && category.parent.name}</td>
                                                <td>{category.bloqued}</td>
                                                <td className="mx-auto">
                                                    <ButtonGroup size="sm">
                                                        <Button 
                                                            as={Link} to={`/categories/${category._id}`}
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
                )
            }
            </Card>
        </Layout>
    )
}
export default Categories;
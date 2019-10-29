import React from 'react';
import { Card, Table, Spinner, ButtonGroup, Button, Alert, Image } from 'react-bootstrap';
import { useQuery } from '@apollo/react-hooks';

import { FETCH_ALL_CATEGORIES } from './gql';
import Layout from '../layout';
const Categories = (props) => {

    const { loading, error, data } = useQuery(FETCH_ALL_CATEGORIES, {
        fetchPolicy: 'cache-and-network'
    })


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
                                       {data.categories.map(({name, image, parent, bloqued}, index) => (
                                           <tr key={index}>
                                                <td>{name}</td>
                                                <td>{image && <Image src={image} alt="picture" rounded className="img-fluid shadow-sm" />}</td>
                                                <td>{parent && parent.name}</td>
                                                <td>{bloqued}</td>
                                                <td>Actions</td>
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
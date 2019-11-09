import React from 'react';
import { Button, Card, ButtonGroup, Table, Spinner, Alert} from 'react-bootstrap';
import { useQuery } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';

import Layout from '../layout';
import { FETCH_ALL_POSTS } from './gql';
const Posts = () => {
    const { loading, error, data } = useQuery(FETCH_ALL_POSTS, {
        fetchPolicy: 'cache-and-network'
    })
    return (
        <Layout>
            <Button 
                as={Link} to={'/posts/new'}
                className="float-right" 
                variant="primary">
                Add New Post</Button>
            <h1 className='h3 mb-0 text-gray-800'>Posts</h1>
            <hr />
            <Card>
                <Card.Body>
                    {
                        error ? (
                        <Alert variant='danger'>
                            {error}
                        </Alert>) : (
                            loading ? (
                                    <Spinner  animation="grow" />
                                ) 
                            : (
                                <Table striped responsive bordered size="sm">
                                    <thead>
                                        <tr>
                                            <td>Title</td>
                                            <td>Category</td>
                                            <td>User</td>
                                            <td>Actions</td>
                                        </tr>
                                    </thead>
                                    {
                                        data && (
                                            <tbody>
                                                {data.posts.map(post => (
                                                    <tr key={post._id}>
                                                        <td>{post.title}</td>
                                                        <td>{post.category.name}</td>
                                                        <td>{post.user.name}</td>
                                                        <td>
                                                            <ButtonGroup size="sm">
                                                                <Button 
                                                                    as={Link} to={`/posts/${post._id}`}
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
                            )   
                        )
                    }
                </Card.Body>
            </Card>

        </Layout>
    )
}

export default Posts

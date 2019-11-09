import React, { useState, useEffect } from 'react';
import { Card, Form, Spinner, Button } from 'react-bootstrap';
import { useHistory, Link } from 'react-router-dom';

import { useQuery, useMutation } from '@apollo/react-hooks';
import { uploadFile } from '../../utils/functions';
import Layout from '../layout';
import PostForm from './post-form';
import { FETCH_ALL_CATEGORIES } from '../categories/gql';
import { CREATE_NEW_POST } from './gql';
const AddPost = () => {
    let history = useHistory();
    const [post, setPost] = useState({
        title: '',
        category: null,
        content: [],
        thumbnail: '',
        accepted: false,
        bloqued: true,
    });
    const [image, setImage] = useState(null);
    const [categories, setCategories] = useState([]);
    const { loading, error, data } = useQuery(FETCH_ALL_CATEGORIES, {
        onCompleted(){
            setCategories(data.categories);
        }
    })
    const [addNewPost] = useMutation(CREATE_NEW_POST);
    useEffect(() => {
        async function imageChange() {
            if(image){
                const fileName = await uploadFile(image);
                setPost({...post, thumbnail: fileName});
                setImage(null);
            }
        }
        imageChange();
    }, [image, post]);
    const handleChange = (e) => {
        if(e.target.name === 'image'){
            setImage(e.target.files[0]);
        }else if (e.target.name === 'category'){
            setPost({
                ...post,
                category: e.target.value
            })
        }
        else if (e.target.name === 'bloqued'){
            setPost({
                ...post,
                bloqued: !post.bloqued
            })
        }
        else if (e.target.name === 'accepted'){
            setPost({
                ...post,
                accepted: !post.accepted
            })
        }
        else if (e.target.name === 'content'){
            setPost({
                ...post,
                content: e.target.value.split('\n')
            })
        }
        else{
            setPost({...post, [e.target.name] : e.target.value});
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const newPost = {...post};
        delete newPost.category
        addNewPost({
            variables: {
                post: newPost,
                category: typeof(post.category) === 'string' ? post.category : post.category._id
            }
        }).then(_ => {
            history.push('/posts');
        })
    }
    return (
        <Layout>
            <h1 className='h3 mb-0 text-gray-800'>Posts</h1>
            <hr />
            {
                error ? (
                    <div className="mx-auto">
                        ERROR
                    </div>
                ) : (
                    <Card>
                        <Form method="post" onSubmit={handleSubmit}>
                            <Card.Body>
                                {
                                    loading ? (<Spinner  animation="grow" />)
                                    : (
                                        <PostForm post={post} 
                                            categories={categories} 
                                            handleChange={handleChange}
                                        />
                                    )
                                }
                            </Card.Body>
                            <Card.Footer>
                            <Button variant="secondary" as={Link} to="/posts">
                                BACK
                            </Button>
                            <Button variant="success" className="float-right" type="submit">
                                ADD
                            </Button>
                            </Card.Footer>
                        </Form>
                </Card>
                )
            }
            
        </Layout>
    )
}
export default AddPost;
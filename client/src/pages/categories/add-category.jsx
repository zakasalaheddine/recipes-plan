import React, { useState, useEffect } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/react-hooks';

import Layout from '../layout';
import CategoryForm from './category-form';
import { uploadFile } from '../../utils/functions';
import { FETCH_ALL_CATEGORIES, CREATE_NEW_CATEGORY } from './gql';
const AddCategory = () => {
    let history = useHistory();
    const [category, setCategory] = useState({
        name: '',
        parent: null,
        image: '',
        bloqued: true
    })
    const [image, setImage] = useState(null);
    const [categories, setCategories] = useState([]);

    const { data } = useQuery(FETCH_ALL_CATEGORIES, {
        onCompleted(){
            setCategories(data.categories);
        }
    })

    const [addNewCategory] = useMutation(CREATE_NEW_CATEGORY);

    useEffect(() => {
        async function imageChange() {
            if(image){
                const fileName = await uploadFile(image);
                setCategory({...category, image: fileName});
                setImage(null);
            }
        }
        imageChange();
    }, [image, category]);
    const handleChange = (e) => {
        if(e.target.name === 'image'){
            setImage(e.target.files[0]);
        }else if (e.target.name === 'category'){
            setCategory({
                ...category,
                parent: e.target.value
            })
        }
        else if (e.target.name === 'bloqued'){
            setCategory({
                ...category,
                bloqued: !category.bloqued
            })
        }
        else{
            setCategory({...category, [e.target.name] : e.target.value});
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        addNewCategory({
            variables: category
        }).then(_ => {
            history.push('/categories');
        })
    }
    return (
        <Layout>
            <h1 className='h3 mb-0 text-gray-800'>Add New Category</h1>
            <hr />
            <Card>
                <Form onSubmit={handleSubmit} method="post">
                    <Card.Body>
                        <CategoryForm 
                            category={category} 
                            categories={categories} 
                            handleChange={handleChange} 
                        />
                    </Card.Body>
                    <Card.Footer>
                        <Button variant="secondary" as={Link} to="/categories">
                            BACK
                        </Button>
                        <Button variant="success" className="float-right" type="submit">
                            ADD
                        </Button>
                    </Card.Footer>
                </Form>
            </Card>
        </Layout>
    )
}
export default AddCategory;
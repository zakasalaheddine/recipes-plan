import React, { useState, useEffect } from 'react';
import { Card, Spinner, Form, Button } from 'react-bootstrap';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Link, useHistory } from 'react-router-dom';

import { uploadFile } from '../../utils/functions';
import Layout from '../layout';
import CategoryForm from './category-form';
import { FETCH_ONE_CATEGORY_BY_ID, UPDATE_CATEGORY_BY_ID } from './gql';
const EditCategory = (props) => {

    let history = useHistory();
    const category_id = props.match.params.id;
    const [category, setCategory] = useState(null);
    const [categories, setCategories] = useState([]);
    const [image, setImage] = useState(null);
    
    const [editCategory, {loading: editLoading}] = useMutation(UPDATE_CATEGORY_BY_ID);
    const { loading, error, data } = useQuery(FETCH_ONE_CATEGORY_BY_ID, {
        variables: { id: category_id },
        fetchPolicy: 'cache-and-network',
        onCompleted(){
            if(data.category.parent != null)
                setCategory(data.category);
            else
                setCategory({...data.category, parent : 0 });
            setCategories(data.categories);
        }
    })
    
    useEffect(() => {
        async function imageChange() {
            if(image){
                const fileName = await uploadFile(image);
                setCategory({...category, image: fileName});
                setImage(null);
                console.log(category);
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
        editCategory({
            variables: category
        }).then(res => {
            history.push('/categories');
        })
    }
    return (
        <Layout>
            <h1 className='h3 mb-0 text-gray-800'>Edit Category: {category && category.name}</h1>
            <hr />
            <Card>
                <Form onSubmit={handleSubmit} method="post">
                    <Card.Body>
                        { error && (<div class="mx-auto">{error}</div>) }
                        { (loading || editLoading) && (<Spinner  animation="grow" />) }
                        { (data && category) && (
                            <CategoryForm 
                                category={category} 
                                categories={categories} 
                                handleChange={handleChange} 
                            />
                        )}
                    </Card.Body>
                    <Card.Footer>
                        <Button variant="secondary" as={Link} to="/categories">
                            BACK
                        </Button>
                        <Button variant="success" className="float-right" type="submit">
                            EDIT
                        </Button>
                    </Card.Footer>
                </Form>
            </Card>
        </Layout>
    )
}
export default EditCategory;
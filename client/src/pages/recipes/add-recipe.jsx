import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { Spinner } from 'react-bootstrap';

import { CREATE_RECIPE } from './gql';
import Layout from '../layout';
import RecipeForm from '../../components/recipe/recipeForm.component';
import useRecipeForm from '../../hooks/useRecipeForm';


function AddRecipe(props) {
  const recipeId = props.match.params.id;
  const [createRecipe, { loading }] = useMutation(CREATE_RECIPE);
  const INITIAL_RECIPE = {
    name: '',
    ingredients: [],
    directions: [],
    description: '',
    info: {
      makingTime: '',
      serving: '',
      cals: ''
    },
    images: [],
    bloqued: false,
    accepted: false,
    category: {_id: null}
  }
  const { recipe, handleChange, handleChangeInfo, 
          handleAddNew, handleChangeList,
          handleDelete, handleSubmit, 
          categories 
        } = useRecipeForm(INITIAL_RECIPE, recipeId, createRecipe);
  return (
    <Layout className="App">
        <h1 className='h3 mb-0 text-gray-800'>ADD NEW RECIPE</h1>
        <hr />
        { (loading) ? (<Spinner animation="grow" />) : (
          <RecipeForm recipe={recipe} categories={categories} 
            handleSubmit={handleSubmit} handleAddNew={handleAddNew} handleChange={handleChange} 
            handleChangeInfo={handleChangeInfo} handleChangeList={handleChangeList} handleDelete={handleDelete} />
        )}
    </Layout>
  );
}
export default AddRecipe;
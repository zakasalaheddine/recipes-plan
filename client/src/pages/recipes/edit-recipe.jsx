import React from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Alert, Spinner } from 'react-bootstrap';

import { FETCH_RECIPE_BY_ID, UPDATE_RECIPE_BY_ID } from './gql';
import Layout from '../layout';
import RecipeForm from '../../components/recipe/recipeForm.component';
import useRecipeForm from '../../hooks/useRecipeForm';


function EditRecipe(props) {
  const recipeId = props.match.params.id;
  const [editRecipeMutation, { loading: editLoading }] = useMutation(UPDATE_RECIPE_BY_ID);
  const INITIAL_RECIPE = {
    name: '',
    ingredients: [''],
    directions: [''],
    description: '',
    info: {
      makingTime: '',
      serving: '',
      cals: ''
    },
    images: [''],
    bloqued: false,
    accepted: false,
    category: {_id: null}
  }
  const { recipe, handleChange, handleChangeInfo, 
          handleAddNew, handleChangeList,
          handleDelete, handleSubmit, 
          categories, setRecipe 
        } = useRecipeForm(INITIAL_RECIPE, recipeId, editRecipeMutation);
  
  const { loading, error, data } = useQuery(FETCH_RECIPE_BY_ID, {
    variables: { recipe: recipeId },
    fetchPolicy: 'cache-and-network',
    onCompleted() {
      if (data) {
        setRecipe(data.recipe);
      }
    }
  })
  return (
    <Layout className="App">
        <h1 className='h3 mb-0 text-gray-800'>EDIT RECIPE</h1>
        <hr />
        { error &&  (
          <Alert>
            <Alert.Heading>How's it going?!</Alert.Heading>
            <p>
              {error}
            </p>
          </Alert>
        )}
        { (loading || editLoading) ? (<Spinner animation="grow" />) : (
          <RecipeForm recipe={recipe} categories={categories} 
            handleSubmit={handleSubmit} handleAddNew={handleAddNew} handleChange={handleChange} 
            handleChangeInfo={handleChangeInfo} handleChangeList={handleChangeList} handleDelete={handleDelete} />
        )}
    </Layout>
  );
}
export default EditRecipe;
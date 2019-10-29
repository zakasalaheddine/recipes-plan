import React from 'react';
import { Link } from 'react-router-dom';
import { Table, Card, Spinner, ButtonGroup, Button } from 'react-bootstrap';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import Layout from '../layout';

function Recipes() {
  const { loading, error, data } = useQuery(GET_RECIPES, {
    fetchPolicy: 'cache-and-network',
  });
  return (
    <Layout>
      <div className="App">
        <Button variant="primary" as={Link} to={`/recipes/new`} className="float-right">Add New Recipe</Button>
        <h1 className='h3 mb-0 text-gray-800'>Recipes</h1>
        <hr />
        <Card>
          <Card.Body>
            { loading && (<Spinner  animation="grow" />) }
            { error && (<div class="mx-auto">{error}</div>) }
            {
              data && (
                <Table striped responsive bordered size="sm">
                  <thead>
                    <tr>
                      <th>Recipe Title</th>
                      <th>Category</th>
                      <th>User</th>
                      <th>Status</th>
                      <th>Bloqued</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      data.recipes.map(recipe => (
                        <tr key={recipe._id}>
                          <td>{recipe.name}</td>
                          <td>{recipe.category.name}</td>
                          <td>{recipe.user.name}</td>
                          <td>{recipe.accepted ? 'Accepted' : 'Refused'}</td>
                          <td>{recipe.bloqued ? 'Bloqued' : 'Showed'}</td>
                          <td>
                          <ButtonGroup size="sm">
                            <Button as={Link} to={`/recipes/${recipe._id}`} variant="secondary">Edit</Button>
                            <Button variant="danger">Delete</Button>
                          </ButtonGroup>
                          </td>
                        </tr>
                      ))
                    }
                  </tbody>
                </Table>
              )
            }
            
          </Card.Body>
        </Card>
        
    </div>
    </Layout>
    
  );
}

const GET_RECIPES = gql`
  {
  recipes {
    _id
    name
    user{
      name
    }
    category{
      name
    }
    bloqued
    accepted
    updatedAt
  }
}
`;

export default Recipes;
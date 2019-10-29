import { gql } from 'apollo-boost';

export const UPDATE_RECIPE_BY_ID = gql`
  mutation updateRecipe($id: ID!, $recipe: RecipeInput!, $category: ID!){
    updateRecipe(id: $id, recipe: $recipe, category: $category){
      _id
      name
    }
  }
`
export const CREATE_RECIPE = gql`
  mutation createRecipe($recipe: RecipeInput!, $category: ID!){
    createRecipe(recipe: $recipe, category: $category){
      _id
      name
    }
  }
`
export const FETCH_RECIPE_BY_ID = gql`
query recipe($recipe: ID!) {
  recipe(recipe: $recipe){
    name
    description
    ingredients
    directions
    images
    accepted
    bloqued
    info{
      makingTime
      serving
      cals
    }
    category
    {
      _id
    }
    user{
      name
    }
  }
}
`
export const FETCH_ALL_CATEGORIES = gql`
{
  categories{
    _id
    name
  }
}
`
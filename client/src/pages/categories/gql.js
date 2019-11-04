import { gql } from 'apollo-boost';

export const UPDATE_CATEGORY_BY_ID = gql`
    mutation updateCategory($_id: ID!, $name: String!, $parent: ID, $image: String, $bloqued: Boolean!){
        updateCategory(id: $_id, name: $name, parent: $parent, image: $image, bloqued: $bloqued){
            _id
            name
        }
    }
`

export const CREATE_NEW_CATEGORY = gql`
    mutation createCategory($name: String!, $parent: ID, $image: String, $bloqued: Boolean!){
        createCategory(name: $name, parent: $parent, image: $image, bloqued: $bloqued){
            _id
            name
        }
    }
`

export const FETCH_ALL_CATEGORIES = gql`
    {
        categories{
            _id
            name
            image
            parent{
                _id
                name
            }
            createdAt
            bloqued
        }
    }
`
export const FETCH_ONE_CATEGORY_BY_ID = gql`
    query category($id: ID!){
        category(id: $id){
            _id
            name
            image
            parent{
                _id
                name
            }
            createdAt
            bloqued
        }
        categories{
            _id
            name
        }
    }
`
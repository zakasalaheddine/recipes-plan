import { gql } from 'apollo-boost';

export const FETCH_ALL_POSTS = gql`{ posts { _id title category { _id name } thumbnail user { _id name } } }`
export const FETCH_POST_BY_ID = gql`
    query post($id: ID!){
        post(id: $id){
            title
            category{
                _id
                name
            }
            content
            thumbnail
            accepted
            bloqued
        }
        categories{
            _id
            name
        }
    }
`
export const UPDATE_POST_BY_ID = gql`
    mutation updatePost($_id: ID!, $post: PostInput!, $category: ID!){
        updatePost(id: $_id, post: $post, category: $category){
            _id
            title
            slug
        }
    }
`
export const CREATE_NEW_POST = gql`
    mutation createPost($post: PostInput, $category: ID!){
        createPost(post: $post, category: $category){
            _id
        }
    }
`
import { gql } from 'apollo-boost';

export const FETCH_ALL_CATEGORIES = gql`
    {
        categories{
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
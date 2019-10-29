import { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';

import { FETCH_ALL_CATEGORIES } from '../pages/recipes/gql';

const useRecipeForm = (initialRecipe, recipeId, submitCallback) => {
    const [recipe, setRecipe] = useState(initialRecipe);
    const [categories, setCategories] = useState([]);
    const { data } = useQuery(FETCH_ALL_CATEGORIES, {
        variables: { recipe: recipeId },
        fetchPolicy: 'cache-and-network',
        onCompleted() {
          if (data) {
            setCategories(data.categories);
          }
        }
      })
    let history = useHistory();
    const handleChange = (e) => {
        if (e.target.name === 'accepted')
            setRecipe({
                ...recipe,
                accepted: !recipe.accepted
            })
        else if (e.target.name === 'bloqued')
            setRecipe({
                ...recipe,
                bloqued: !recipe.bloqued
            })
        else if (e.target.name === 'category') {
            recipe.category._id = e.target.value;
            setRecipe({
                ...recipe
            })
        } else
            setRecipe({
                ...recipe,
                [e.target.name]: e.target.value
            })
    }
    const handleChangeInfo = (e) => {
        recipe.info[e.target.name] = e.target.value;
        setRecipe({
            ...recipe
        });
    }
    const handleAddNew = (type, value = "") => {
        if (type === 'ingredient')
            recipe.ingredients.push(value);
        else if (type === 'direction')
            recipe.directions.push(value);
        else if (type === 'image')
            recipe.images.push(value);
        setRecipe({
            ...recipe
        });
    }
    const handleChangeList = (e, index, type) => {
        type === 'ingredient' ? recipe.ingredients[index] = e.target.value : recipe.directions[index] = e.target.value;
        setRecipe({
            ...recipe
        });
    }
    const handleDelete = (e, index, type) => {
        const newValues = [];
        if (type === 'ingredient') {
            recipe.ingredients.forEach((item, i) => {
                if (i !== index) {
                    newValues.push(item);
                }
            })
            setRecipe({
                ...recipe,
                ingredients: newValues
            });
        }
        if (type === 'direction') {
            recipe.directions.forEach((item, i) => {
                if (i !== index) {
                    newValues.push(item);
                }
            })
            setRecipe({
                ...recipe,
                directions: newValues
            });
        }
        if (type === 'images') {
            recipe.images.forEach((item, i) => {
                if (i !== index) {
                    newValues.push(item);
                }
            })
            setRecipe({
                ...recipe,
                images: newValues
            });
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const editedRecipe = {
            ...recipe
        };
        delete editedRecipe.category;
        delete editedRecipe.user;
        if(recipeId !== 'new'){
            submitCallback({
                variables: {
                    id: recipeId,
                    recipe: editedRecipe,
                    category: recipe.category._id
                }
            }).then(result => {
                //setRecipe(result.data.updateRecipe);
                history.push('/recipes');
            });
        }else{
            submitCallback({
                variables: {
                    recipe: editedRecipe,
                    category: recipe.category._id
                }
            }).then(result => {
                //setRecipe(result.data.updateRecipe);
                history.push('/recipes');
            });
        }
    }
    return {recipe, setRecipe, categories, handleChange, handleChangeInfo, handleAddNew, handleChangeList, handleDelete, handleSubmit};
}
export default useRecipeForm;
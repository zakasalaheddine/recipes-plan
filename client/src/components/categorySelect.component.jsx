import React from 'react';
import { FormControl } from 'react-bootstrap';

const CategorySelect = ({ categories, handleChange, value }) => {
    return (
        <FormControl as="select" name="category" onChange={handleChange} value={value}>
            <option>Choose a Category</option>
                {
                    categories.map(category=> (
                        <option key={category._id}  value={category._id} > {category.name} </option>
                        )
                    )
                }
        </FormControl>
    )
}
export default CategorySelect;
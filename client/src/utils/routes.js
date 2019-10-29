import Dashboard from '../pages/dashboard';
import Recipes from '../pages/recipes/recipes';
import EditRecipe from '../pages/recipes/edit-recipe';
import AddRecipe from '../pages/recipes/add-recipe';
import Categories from '../pages/categories/categories';

const AppRoutes = [
    {
        name: 'Dashboard',
        link: '/',
        component: Dashboard,
        icon: 'fa fa-tachometer-alt',
        showInSideBar: true,
        exact: true
    },
    {
        name: 'Recipes',
        link: '/recipes',
        component: Recipes,
        icon: 'fa fa-hamburger',
        showInSideBar: true,
        exact: true
    },
    {
        name: 'New Recipe',
        link: '/recipes/new',
        component: AddRecipe,
        icon: '',
        showInSideBar: false,
        exact: true
    },
    {
        name: 'Edit Recipe',
        link: '/recipes/:id',
        component: EditRecipe,
        icon: '',
        showInSideBar: false,
        exact: false
    },
    {
        name: 'Categories',
        link: '/categories',
        component: Categories,
        icon: 'fa fa-tags',
        showInSideBar: true,
        exact: true
    },
];

export default AppRoutes;
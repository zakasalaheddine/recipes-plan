import Dashboard from '../pages/dashboard';
import Recipes from '../pages/recipes/recipes';
import EditRecipe from '../pages/recipes/edit-recipe';
import AddRecipe from '../pages/recipes/add-recipe';
import Categories from '../pages/categories/categories';
import EditCategory from '../pages/categories/edit-category';
import AddCategory from '../pages/categories/add-category';
import Posts from '../pages/posts/posts';
import EditPost from '../pages/posts/edit-post';
import AddPost from '../pages/posts/add-post';
import Login from '../pages/authentication/login';

const AppRoutes = [
    {
        name: 'Login',
        link: '/login',
        component: Login,
        icon: '',
        showInSideBar: false,
        exact: true,
        isPrivate: false,
    },
    {
        name: 'Dashboard',
        link: '/',
        component: Dashboard,
        icon: 'fa fa-tachometer-alt',
        showInSideBar: true,
        exact: true,
        isPrivate: true,
    },
    {
        name: 'Recipes',
        link: '/recipes',
        component: Recipes,
        icon: 'fa fa-hamburger',
        showInSideBar: true,
        exact: true,
        isPrivate: true,
    },
    {
        name: 'New Recipe',
        link: '/recipes/new',
        component: AddRecipe,
        icon: '',
        showInSideBar: false,
        exact: true,
        isPrivate: true,
    },
    {
        name: 'Edit Recipe',
        link: '/recipes/:id',
        component: EditRecipe,
        icon: '',
        showInSideBar: false,
        exact: false,
        isPrivate: true,
    },
    {
        name: 'Categories',
        link: '/categories',
        component: Categories,
        icon: 'fa fa-tags',
        showInSideBar: true,
        exact: true,
        isPrivate: true,
    },
    {
        name: 'Add Category',
        link: '/categories/new',
        component: AddCategory,
        icon: 'fa fa-tags',
        showInSideBar: false,
        exact: true,
        isPrivate: true,
    },
    {
        name: 'Edit Category',
        link: '/categories/:id',
        component: EditCategory,
        icon: 'fa fa-tags',
        showInSideBar: false,
        exact: false,
        isPrivate: true,
    },
    {
        name: 'Posts',
        link: '/posts',
        component: Posts,
        icon: 'fa fa-tags',
        showInSideBar: true,
        exact: true,
        isPrivate: true,
    },
    {
        name: 'Add Post',
        link: '/posts/new',
        component: AddPost,
        icon: 'fa fa-tags',
        showInSideBar: false,
        exact: true,
        isPrivate: true,
    },
    {
        name: 'Edit POST',
        link: '/posts/:id',
        component: EditPost,
        icon: 'fa fa-tags',
        showInSideBar: false,
        exact: false,
        isPrivate: true,
    },
];

export default AppRoutes;
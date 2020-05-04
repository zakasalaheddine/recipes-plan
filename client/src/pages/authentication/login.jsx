import React, { useContext } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Form as BootstrapForm, Button, Spinner } from 'react-bootstrap';
import { useMutation } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';
import { LOGIN } from './gql';
import { AuthContext } from '../../contexts/AuthContext';
import { LOGIN_USER } from '../../reducers/types';



const Login = () => {
    const [login, { loading }] = useMutation(LOGIN)
    const { dispatch } = useContext(AuthContext);
    let history = useHistory();
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-xl-10 col-lg-12 col-md-9">
                    <div className="card o-hidden border-0 shadow-lg my-5">
                        <div className="card-body p-0">
                            <div className="row">
                                <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
                                <div className="col-lg-6">
                                    <div className="p-5">
                                        <div className="text-center">
                                            <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                                        </div>
                                        <Formik initialValues={{ email: 'salah@salah.com', password: '123456', remember: false }} 
                                            validate={values => {
                                                const errors = {};
                                                if (!values.email) {
                                                  errors.email = 'Required';
                                                } else if (
                                                  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                                                ) {
                                                  errors.email = 'Invalid email address';
                                                }
                                                return errors;
                                              }}
                                            onSubmit={(values, { setSubmitting }) => {
                                                console.log({values});
                                                setSubmitting(true);
                                                login({ variables: {
                                                    email: values.email,
                                                    password: values.password
                                                }}).then(res => {
                                                    const result = res.data.login;
                                                    console.log({result: res.data.login});
                                                    dispatch({
                                                        type: LOGIN_USER,
                                                        payload: {
                                                            user: result.user,
                                                            jwtToken: result.access_token
                                                        }
                                                    })
                                                    history.push('/');
                                                    setSubmitting(false);
                                                })
                                            }}
                                        >
                                            {
                                                ({ isSubmitting }) => (
                                                    <Form>
                                                        <BootstrapForm.Group>
                                                            <BootstrapForm.Label >Email: </BootstrapForm.Label>
                                                            <Field type="email" name="email" 
                                                                    as={BootstrapForm.Control}
                                                            />
                                                            <ErrorMessage name="email" component="div" className="text-danger"/>
                                                        </BootstrapForm.Group>
                                                        <BootstrapForm.Group>
                                                            <BootstrapForm.Label >Password: </BootstrapForm.Label>
                                                            <Field type="password" name="password" 
                                                                    as={BootstrapForm.Control}
                                                            />
                                                        </BootstrapForm.Group>
                                                        <BootstrapForm.Group>
                                                            <Field type="checkbox" name="remember" 
                                                                    custom
                                                                    as={BootstrapForm.Check} 
                                                                    id={'custom-checkbox'}
                                                                    label={'Remember Me'}
                                                            />
                                                        </BootstrapForm.Group>
                                                        <Button type="submit" variant="primary" block disabled={loading}>
                                                            {loading ? (<Spinner  animation="grow" />) : 'Login'}
                                                        </Button>
                                                    </Form>
                                                )
                                            }
                                            
                                        </Formik>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Login;
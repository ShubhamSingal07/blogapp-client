import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { Button, Error, Input, Link } from '../components';
import { customFetch } from '../utils/fetch';

export default function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const initialValues = { username: '', password: '' };
  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .min(4, 'Too Short!')
      .max(20, 'Too Long!')
      .required('Username is required'),
    password: Yup.string().min(8, 'Too Short!').required('Password is required'),
  });

  const handleSubmit = async values => {
    const data = await customFetch({ url: '/login', method: 'post', body: values });

    if (data.success) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/', { replace: true });
    }

    if (data.error) setError(data.error);
  };

  return (
    <div className="w-full max-w-xs mx-auto min-h-screen flex flex-col justify-center">
      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}>
        <Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" noValidate>
          {error && <Error>{error}</Error>}

          <div className="mb-4">
            <Input label="Username" type="text" name="username" placeholder="Username" />
          </div>

          <div className="mb-6">
            <Input label="Password" type="password" name="password" placeholder="Password" />
          </div>

          <div className="flex items-center justify-between">
            <Button type="submit">Login</Button>
            <Link to="/signup">Signup</Link>
          </div>
        </Form>
      </Formik>
    </div>
  );
}

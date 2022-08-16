import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { Input, Navbar } from '../components';
import { customFetch } from '../utils/fetch';

const fetchArticleById = async articleId => {
  if (articleId) return customFetch({ url: `/api/article/${articleId}` });
  return false;
};

export default function Write() {
  const { articleId } = useParams();
  const navigate = useNavigate();
  const { data, status } = useQuery(['editarticle'], () => fetchArticleById(articleId));

  const article = data?.article;
  let initialValues = {
    title: '',
    description: '',
    thumbnail: '',
    featureImage: '',
    publishTime: '',
  };
  if (status === 'success' && article)
    initialValues = {
      title: article.title,
      description: article.description,
      thumbnail: article.thumbnail,
      featureImage: article.featureImage,
      publishTime: article.publishTime && new Date(article.publishTime),
    };

  const validationSchema = Yup.object().shape({
    title: Yup.string().min(4, 'Too Short!').required('Title is required'),
    description: Yup.string().min(100, 'Too Short!').required('Description is required'),
    thumbnail: Yup.string().url('Enter a valid image url').required('Thumbnail is required'),
    featureImage: Yup.string().url('Enter a valid image url'),
    publishTime: Yup.date('Enter a valid time'),
  });

  const handleSubmit = async (values, action, validateForm, setErrors, setTouched) => {
    const errors = await validateForm(values);

    if (action === 'schedule' && !values.publishTime) {
      const errorsObj = { ...errors, publishTime: 'Time is required for scheduling' };
      setTouched(errorsObj);
      return setErrors(errorsObj);
    }

    if (Object.keys(errors).length !== 0) {
      setTouched(errors);
      return setErrors(errors);
    }

    const valuesObj = { ...values };

    if (articleId) valuesObj.articleId = articleId;

    if (action === 'draft') {
      valuesObj.isDraft = true;
      delete valuesObj.publishTime;
    }

    if (action === 'publish') {
      delete valuesObj.publishTime;
    }

    const data = await customFetch({ url: '/api/article', method: 'post', body: valuesObj });


    if (data.articleId && action === 'schedule') {
      await customFetch({
        url: `/api/article/${data.articleId}/schedule`,
        method: 'put',
        body: { publishTime: valuesObj.publishTime },
      });
    }

    navigate(`/article/${data.articleId}`);
  };

  return (
    <>
      <Navbar />

      {status === 'error' && <p>Error fetching Articles</p>}
      {status === 'loading' && <p>Fetching data...</p>}
      {status === 'success' && (
        <Formik validationSchema={validationSchema} initialValues={initialValues}>
          {({ validateForm, values, setErrors, setTouched }) => (
            <Form className="lg:w-2/5 md:w-3/5 sm:w-4/5 mx-auto" noValidate>
              <div className="my-4">
                <Input name="title" label="Title" placeholder="Title" />
              </div>

              <div className="mb-4">
                <Input
                  name="description"
                  type="textarea"
                  label="Description"
                  placeholder="Description"
                />
              </div>

              <div className="mb-4">
                <Input name="thumbnail" label="Thumbnail URL" placeholder="Enter a image URL" />
              </div>

              <div className="mb-4">
                <Input
                  name="featureImage"
                  label="Feature Image URL"
                  placeholder="Enter a image URL"
                />
              </div>

              <div className="my-4">
                <Input name="publishTime" type="datetime-local" label="Schedule Time" />
              </div>

              <div className="inline-flex rounded-md shadow-sm" role="group">
                <button
                  type="button"
                  className="py-2 px-4 text-sm font-medium text-gray-900 bg-white rounded-l-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
                  onClick={() =>
                    handleSubmit(values, 'draft', validateForm, setErrors, setTouched)
                  }>
                  Save as Draft
                </button>
                <button
                  type="button"
                  className="py-2 px-4 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
                  onClick={() =>
                    handleSubmit(values, 'publish', validateForm, setErrors, setTouched)
                  }>
                  Publish
                </button>
                <button
                  type="button"
                  className="py-2 px-4 text-sm font-medium text-gray-900 bg-white rounded-r-md border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
                  onClick={() =>
                    handleSubmit(values, 'schedule', validateForm, setErrors, setTouched)
                  }>
                  Schedule
                </button>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </>
  );
}

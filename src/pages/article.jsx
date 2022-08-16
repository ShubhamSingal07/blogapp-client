import { useParams, useNavigate } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Form, Formik, Field } from 'formik';
import * as Yup from 'yup';

import { customFetch } from '../utils/fetch';
import { Button, Navbar } from '../components';
import { convertToMonthDate } from '../utils/date';

const fetchArticleById = async articleId => customFetch({ url: `/api/article/${articleId}` });
const fetchCommentsOnArticle = async articleId => customFetch({ url: `/api/comment/${articleId}` });

export default function Write() {
  const { articleId } = useParams();
  const navigate = useNavigate();

  const { data, status } = useQuery(['article'], () => fetchArticleById(articleId));
  const { data: commentsData, status: commentsStatus } = useQuery(['comments', articleId], () =>
    fetchCommentsOnArticle(articleId),
  );

  const useAddComment = articleId => {
    const queryClient = useQueryClient();

    return useMutation(values => postComment(values, articleId), {
      onSuccess: () => {
        return queryClient.invalidateQueries(['comments', articleId]);
      },
    });
  };
  const addComment = useAddComment(articleId);

  const article = data?.article;

  const handleEdit = articleId => {
    navigate(`/article/${articleId}/write`);
  };
  const handleDelete = async articleId => {
    const data = await customFetch({ url: `/api/article/${articleId}`, method: 'delete' });
    if (data.success) navigate('/me', { replace: true });
  };
  const postComment = async (values, articleId) => {
    const data = await customFetch({
      url: `/api/comment/${articleId}`,
      method: 'post',
      body: values,
    });
    return data;
  };

  const userId = JSON.parse(localStorage.getItem('user'))?._id;

  return (
    <>
      <Navbar />

      {status === 'error' && <p>Error fetching Articles</p>}
      {status === 'loading' && <p>Fetching data...</p>}
      {status === 'success' && (
        <div className="lg:w-3/5 md:w-4/5 sm:w-full bg-white-100 mx-auto p-4 ">
          {article.authorId._id === userId && (
            <div className="inline-flex rounded-md w-full justify-end" role="group">
              <button
                type="button"
                className="py-2 px-4 text-sm font-medium text-gray-900 bg-white rounded-l-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
                onClick={() => handleEdit(articleId)}>
                Edit
              </button>
              <button
                type="button"
                className="py-2 px-4 text-sm font-medium text-gray-900 bg-white rounded-r-md border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
                onClick={() => handleDelete(articleId)}>
                Delete
              </button>
            </div>
          )}

          <h2 className="text-3xl font-bold">{article.title}</h2>
          {article.authorId?.username && (
            <p className="text-gray-500">
              <img
                className="inline w-6 h-6 rounded-full mr-2"
                src="/images/user.png"
                alt="Avatar of Jonathan Reinink"
              />
              {article.authorId.username}
            </p>
          )}
          <p className="text-xs text-gray-400">
            Last updated at {convertToMonthDate(article.updatedAt)}
          </p>

          <img
            src={article.thumbnail}
            alt={`${article.title} alt`}
            width="50%"
            className="mx-auto py-4"
          />
          <img
            src={article.featureImage}
            alt={`${article.title} feature alt`}
            width="50%"
            className="mx-auto py-4"
          />
          <span>{article.isDraft && 'Draft'}</span>
          <p className="text-lg w-4/5 mx-auto">{article.description}</p>
        </div>
      )}

      <Formik
        initialValues={{ text: '' }}
        validationSchema={Yup.object().shape({
          text: Yup.string().min(2, 'Too Short!').required('Comment is required'),
        })}
        onSubmit={values => addComment.mutate(values)}>
        <Form className="lg:w-2/5 md:w-3/5 sm:w-4/5 mx-auto flex" noValidate>
          <Field
            name="text"
            placeholder="Post a comment"
            as={props => (
              <input
                className="shadow appearance-none border rounded-tl rounded-bl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                {...props}
              />
            )}
          />
          <Button
            className="shadow-md flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500
            hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded-tr rounded-br"
            type="submit">
            Post
          </Button>
        </Form>
      </Formik>

      {commentsStatus === 'error' && <p>Error fetching Articles</p>}
      {commentsStatus === 'loading' && <p>Fetching data...</p>}
      {commentsStatus === 'success' && (
        <div className="lg:w-2/5 md:w-3/5 sm:w-4/5 mx-auto">
          {commentsData?.comments.map(comment => (
            <div key={comment._id} className="flex items-center my-3">
              <img
                className="inline w-5 h-5 rounded-full mr-2"
                src="/images/user.png"
                alt="Avatar of Jonathan Reinink"
              />

              <div>
                <p>{comment.text}</p>
                <p className="text-xs text-gray-500">{comment.authorId?.username || 'Guest'}</p>
                <p className="text-xs text-gray-500">{convertToMonthDate(comment.createdAt)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

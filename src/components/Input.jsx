import { useField } from 'formik';

import { Error } from './Error';

export function Input({ label, type, name, placeholder }) {
  const [field, meta] = useField(name);

  const error = meta.touched && meta.error;

  return (
    <>
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={name}>
        {label}
      </label>
      {type === 'textarea' ? (
        <textarea
          {...field}
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
            error && 'border-red-500'
          }`}
          name={name}
          id={name}
          type={type}
          placeholder={placeholder}
        />
      ) : (
        <input
          {...field}
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
            error && 'border-red-500'
          }`}
          name={name}
          id={name}
          type={type}
          placeholder={placeholder}
        />
      )}
      {error && <Error>{error}</Error>}
    </>
  );
}

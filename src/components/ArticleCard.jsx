import { Link } from 'react-router-dom';

import { convertToMonthDate } from '../utils/date';

export function ArticleCard({
  _id,
  title,
  description,
  authorId,
  updatedAt,
  thumbnail,
  isDraft = false,
}) {
  return (
    <Link to={`/article/${_id}`} className="m-auto my-5 lg:w-2/5 sm:w-3/5">
      <div className=" w-full lg:flex" style={{ minHeight: '250px' }}>
        <div
          className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
          style={{ backgroundImage: `url(${thumbnail})` }}
          title={`${title} alt`}></div>

        <div className="w-full border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
          <div className="mb-8">
            <div className="text-gray-900 font-bold text-xl mb-2">
              {title}
              {isDraft && (
                <span className="inline-block bg-gray-200 rounded-full px-2 py-1 text-sm font-semibold text-xs mx-2 text-gray-700">
                  Draft
                </span>
              )}
            </div>
            <p className="text-gray-700 text-base">{description.slice(0, 100)}</p>
          </div>

          <div className="flex items-center">
            <img
              className="w-10 h-10 rounded-full mr-4"
              src="/images/user.png"
              alt="Avatar of Jonathan Reinink"
            />
            <div className="text-sm">
              <p className="text-gray-900 leading-none">{authorId.username}</p>
              <p className="text-gray-600">{convertToMonthDate(updatedAt)}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

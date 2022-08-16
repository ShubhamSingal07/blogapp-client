import { useQuery } from '@tanstack/react-query';
import { ArticleCard, Navbar } from '../components';

import { customFetch } from '../utils/fetch';

const fetchArticles = async () => customFetch({ url: '/api/article' });

export default function Home() {
  const { data, status } = useQuery(['articles'], fetchArticles);
  return (
    <>
      <Navbar />
      {status === 'error' && <p>Error fetching Articles</p>}
      {status === 'loading' && <p>Fetching data...</p>}
      {status === 'success' && (
        <div className="flex flex-col justify-center p-10">
          {data.articles.map(article => (
            <ArticleCard key={article._id} {...article} />
          ))}
        </div>
      )}
    </>
  );
}

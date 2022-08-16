import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ArticleCard, Navbar, Tabs } from '../components';

import { customFetch } from '../utils/fetch';

const fetchMyArticles = async () => customFetch({ url: '/api/article/me' });

export default function MyArticles() {
  const tabs = ['Published', 'Drafts'];
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  const { data, status } = useQuery(['myarticles'], fetchMyArticles);
  return (
    <>
      <Navbar />
      <Tabs tabs={tabs} setSelectedTab={setSelectedTab} />
      {status === 'error' && <p>Error fetching Articles</p>}
      {status === 'loading' && <p>Fetching data...</p>}
      {status === 'success' && (
        <div className="flex flex-col justify-center p-10">
          {data.articles
            .filter(article => (selectedTab === 'Drafts' ? article.isDraft : !article.isDraft))
            .map(article => (
              <ArticleCard key={article._id} {...article} />
            ))}
        </div>
      )}
    </>
  );
}

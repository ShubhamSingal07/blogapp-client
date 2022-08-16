import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { EntryController, RedirectController } from './controllers';

import Home from './pages/home';
import Login from './pages/login';
import Write from './pages/write';
import Signup from './pages/signup';
import Article from './pages/article';
import MyArticles from './pages/myArticles';

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route
            path="/login"
            element={
              <RedirectController>
                <Login />
              </RedirectController>
            }
          />
          <Route
            path="/signup"
            element={
              <RedirectController>
                <Signup />
              </RedirectController>
            }
          />
          <Route path="/" element={<Home />} />
          <Route
            path="/article/write"
            element={
              <EntryController>
                <Write />
              </EntryController>
            }
          />
          <Route
            path="/article/:articleId/write"
            element={
              <EntryController>
                <Write />
              </EntryController>
            }
          />
          <Route path="/article/:articleId" element={<Article />} />
          <Route
            path="/me"
            element={
              <EntryController>
                <MyArticles />
              </EntryController>
            }
          />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;

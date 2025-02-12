import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../../stores/authStore';
import { useNavigate } from 'react-router-dom';

function Home() {
  const apiKey = "a1d174c225324fada4ae91dd21c58830";
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { authUser, viewNews, isViewingNews, isSavingPost, savePost} = useAuthStore();

  const handleSaveNews = async (url, title) => {
    if (!authUser) {
      alert("Please login to view news!");
      return;
    }

    const data = {post_url : url, post_headline : title};
    await savePost(data);
  }

  const handleViewNews = async (desc, url, headline) => {
    if (!authUser) {
      alert("Please login to view news!");
      return;
    }
  
    const updatedData = { description: desc, newsUrl: url, headline: headline };
  
    await viewNews(updatedData); 
    
    if(isViewingNews) window.open(url, "_blank");
  };


  useEffect(() => {
    const fetchNews = async () => {
      const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch news');
        }
        const data = await response.json();
        setArticles(data.articles);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) return <div className="text-center text-xl">Loading...</div>;
  if (error) return <div className="text-center text-red-600">Error: {error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="header mb-10">
        <h1 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 md:text-6xl lg:text-7xl mb-4">
          InsightSphere
        </h1>
        <p className="text-lg italic text-center text-gray-700 md:text-xl lg:text-2xl mb-6">
          Discover What Matters, Tailored Just for You
        </p>
      </div>
      {articles.length > 0 && (
        <div className="relative mb-6 overflow-hidden rounded-lg">
          {articles[0].urlToImage && (
            <img src={articles[0].urlToImage} className="w-full h-72 object-cover transition-transform duration-300 hover:scale-105" alt="News" />
          )}
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <h2 className="text-white text-2xl font-bold text-center p-4">{articles[0].title}</h2>
          </div>
        </div>
      )}

      <h1 className="text-2xl font-bold mb-4">Latest News</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {articles.map((article, index) =>
          article.urlToImage ? (
            <div className="bg-white rounded-lg shadow-lg overflow-hidden" key={index}>
              <img src={article.urlToImage} alt="News" className="rounded-t-lg w-full h-48 object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
                <p className="text-gray-700 mb-4">{article.content ? article.content.slice(0, 75) : ''}...</p>
                <button
                  onClick={() => handleViewNews(article.description, article.url, article.title)}
                  className="block bg-blue-500 text-white text-center py-2 rounded hover:bg-blue-600 transition w-full"
                >
                  {isViewingNews ? "Working" : "Read More"}
                </button>

                <button
                onClick={() => handleSaveNews(article.url, article.title)}
                  className="block bg-orange-500 text-black text-center py-2 rounded hover:bg-orange-800 hover:text-white mt-2 transition w-full"
                >
                  {isSavingPost ? "Saving..." : "Save Post"}
                </button>
              </div>
            </div>
          ) : null
        )}
      </ul>
    </div>
  );
}

export default Home;

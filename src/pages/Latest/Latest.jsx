import React, { useEffect } from "react";
import { useAuthStore } from "../../stores/authStore";

function Latest() {
  const {categorisedArticles, fetchBasedOnCategory, isFetchingNews, authUser, viewNews, isViewingNews, isSavingPost, savePost} = useAuthStore();

  const fetchCategorisedNews = async () => {
    //await fetchBasedOnCategory();
  }

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

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Latest News</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {isFetchingNews ? (
          <div>Loading...</div>
        ) : (
          categorisedArticles.map((article, index) =>
            article.urlToImage ? (
              <div className="bg-white rounded-lg shadow-lg overflow-hidden" key={index}>
                <img src={article.urlToImage} alt="News" className="rounded-t-lg w-full h-48 object-cover" />
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
                  <p className="text-gray-700 mb-4">{article.content ? article.content.split(" ").slice(0, 40).join(" ") : ""}...</p>
                  <button
                    onClick={() => handleViewNews(article.description, article.url, article.title)}
                    className="block bg-blue-500 text-white text-center py-2 rounded hover:bg-blue-600 transition w-full"
                  >
                    {isViewingNews ? "Working..." : "Read More"}
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
          )
        )}
      </ul>
    </div>
  );
}

export default Latest;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';

function CoffeeNews() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        // Use a local mock data approach instead of calling NewsAPI directly
        // This improves reliability and avoids API key exposure
        let response;
        
        if (API_BASE_URL) {
          // In production, we would fetch from our backend API
          response = await axios.get(`${API_BASE_URL}/api/coffee-news`);
          setNews(response.data);
        } else {
          // In development or if the API call fails, use static mock data
          const mockNews = [
            {
              title: "The Rise of Specialty Coffee in Home Brewing",
              description: "How consumers are bringing cafe-quality coffee experiences to their homes with new brewing techniques and equipment.",
              urlToImage: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085",
              publishedAt: new Date().toISOString(),
              url: "https://example.com/coffee-article-1"
            },
            {
              title: "Sustainable Coffee Farming Practices Gaining Momentum",
              description: "Coffee farmers around the world are adopting more sustainable practices to combat climate change and improve bean quality.",
              urlToImage: "https://images.unsplash.com/photo-1511537190424-bbbab87ac5eb",
              publishedAt: new Date(Date.now() - 86400000).toISOString(), // Yesterday
              url: "https://example.com/coffee-article-2"
            },
            {
              title: "Barista Championships Showcase Innovation in Coffee Preparation",
              description: "The World Barista Championship is highlighting new trends in coffee preparation methods and flavor profiles.",
              urlToImage: "https://images.unsplash.com/photo-1513162613623-336aa0d8aff7",
              publishedAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
              url: "https://example.com/coffee-article-3"
            }
          ];
          setNews(mockNews);
        }
        
        setLoading(false);
      } catch (err) {
        console.error("Coffee news fetch error:", err);
        setError('Failed to fetch coffee news. Please try again later.');
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) return <div className="loading-container"><div className="loading">Loading coffee news...</div></div>;
  if (error) return <div className="error-container"><div className="error">{error}</div></div>;

  return (
    <div className="news-container">
      {news.length === 0 ? (
        <div className="no-news">No coffee news available at the moment. Please check back later.</div>
      ) : (
        news.map((article, index) => (
          <article key={index} className="news-card">
            <img 
              src={article.urlToImage || 'https://images.unsplash.com/photo-1509042239860-f550ce710b93'} 
              alt={article.title} 
              className="news-image"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1509042239860-f550ce710b93'; // Fallback image
              }}
            />
            <div className="news-content">
              <h3>{article.title}</h3>
              <p>{article.description}</p>
              <div className="news-footer">
                <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
                <a href={article.url} target="_blank" rel="noopener noreferrer">
                  Read More
                </a>
              </div>
            </div>
          </article>
        ))
      )}
    </div>
  );
}

export default CoffeeNews; 
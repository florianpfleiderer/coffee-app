import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CoffeeNews() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('https://newsapi.org/v2/everything', {
          params: {
            // Enhanced search query to include barista and more coffee terms
            q: '(coffee OR barista OR "specialty coffee" OR "coffee industry") +coffee -"coffee table" -"coffee break"',
            // More coffee-specific news sources and industry publications
            domains: 'sprudge.com,perfectdailygrind.com,dailycoffeenews.com,baristamagazine.com,coffeereview.com,roastmagazine.com,coffeetalk.com,scanews.coffee,globalcoffeeplatform.org,coffeemag.com',
            language: 'en',
            sortBy: 'publishedAt',
            pageSize: 3,
            apiKey: '7aca469872d04e7dbbbdf21592cfa67f'
          }
        });
        
        // Enhanced filtering to include barista-related content
        const filteredNews = response.data.articles
          .filter(article => {
            const titleLower = article.title.toLowerCase();
            const descLower = article.description?.toLowerCase() || '';
            
            // Must have an image and meaningful description
            return article.urlToImage && 
                   article.description && 
                   // Expanded list of coffee-related terms
                   (titleLower.includes('coffee') || 
                    titleLower.includes('café') || 
                    titleLower.includes('roast') ||
                    titleLower.includes('barista') ||
                    titleLower.includes('espresso') ||
                    descLower.includes('coffee') ||
                    descLower.includes('beans') ||
                    descLower.includes('roast') ||
                    descLower.includes('barista') ||
                    descLower.includes('espresso'));
          })
          .slice(0, 3);

        setNews(filteredNews);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch news');
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) return <div className="loading">Loading news...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="news-container">
      {news.map((article, index) => (
        <article key={index} className="news-card">
          <img src={article.urlToImage} alt={article.title} className="news-image" />
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
      ))}
    </div>
  );
}

export default CoffeeNews; 
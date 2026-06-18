import { NewsItem, StyledTitle } from 'components/UI/elements';
import styles from './styles';
import { useEffect, useState } from 'react';

export const NewsList = (): JSX.Element => {
  const [newsList, setNewsList] = useState([]);
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch(
          `https://aavegotchi.ghost.io/ghost/api/content/posts/?key=${process.env.GHOST_API_KEY}&limit=4&order=published_at%20desc`,
        );
        const { posts } = await res.json();
        setNewsList(posts);
      } catch (e) {
        console.error('Failed to fetch news: ', e);
        setNewsList([]);
      }
    };
    void fetchNews();
  }, []);

  return (
    <>
      <div className="news-container">
        <StyledTitle text="latest news" style="left" />
        <div className="news-list">
          {newsList?.map((news, index) => (
            <NewsItem title={news.title} content={news.excerpt} image={news.feature_image} link={news.url} key={index} />
          ))}
        </div>
      </div>
      <style jsx>{styles}</style>
    </>
  );
};

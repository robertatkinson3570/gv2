import Image from 'next/image';
import styles from './styles';

interface Props {
  image: string;
  title: string;
  content: string;
  link: string;
}

export const NewsItem = ({ image, title, content, link }: Props): JSX.Element => {
  return (
    <>
      <div className="news-item">
        <div className="image-container">{image && <Image alt="" src={image} objectFit="cover" layout="fill" />}</div>
        <div className="content">
          <div className="title auto-clip" onClick={() => window.open(link, '_blank')}>
            {title}
          </div>
          <div className="description auto-clip">{content}</div>
        </div>
      </div>
      <style jsx>{styles}</style>
    </>
  );
};

import './ArticlePage.scss';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getNewsById } from "../Main/action.js";

const ArticlePage = () => {
    const { id } = useParams();
    const [article, setArticle] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchArticle = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const resp = await getNewsById(id);
                setArticle(resp);
            } catch (err) {
                setError("An error occurred while fetching the article.");
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        }

        fetchArticle();
    }, [id]);

    return (
        <div className='ArticlePage'>
            <header className='ArticlePage-header'>
                <h1>KI-DATA</h1>
                <Link to="/" className='Back-button'>← Back to News</Link>
            </header>

            <div className='ArticlePage-body'>
                {isLoading && (
                    <div className='spinner-container'>
                        <div className="spinner"></div>
                    </div>
                )}

                {error && <div className='ArticlePage-error'>{error}</div>}

                {!isLoading && article && (
                    <div className='Article-content'>
                        <h2 className='Article-title'>{article.metadata.title}</h2>
                        <p className='Article-description'>{article.metadata.description}</p>

                        {article.metadata.tags && article.metadata.tags.length > 0 && (
                            <div className='Article-tags'>
                                {article.metadata.tags.map((tag, tagIndex) => (
                                    <span key={tagIndex} className='Article-tag'>
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}

                        <div className='Article-full-content'>
                            <p>{article.metadata.content}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ArticlePage;

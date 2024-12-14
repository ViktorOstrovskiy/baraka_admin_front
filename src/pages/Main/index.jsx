// MainPage.js
import './Main.scss';
import { searchNews } from "./action.js";
import { useState } from "react";
import { Link } from 'react-router-dom'; // Імпортуємо Link з react-router-dom

const MainPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [search, setSearch] = useState('');
    const [news, setNews] = useState([]);
    const [error, setError] = useState(null);
    const [expandedArticles, setExpandedArticles] = useState(new Set());

    const handleClick = async () => {
        if (search.trim() === '') {
            setError("Please enter your search query.");
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const resp = await searchNews(search);
            setNews(resp);
        } catch (err) {
            setError("An error occurred while searching for news.");
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }


    return (
        <div className='Main'>
            <header className='Main-header'>
                <h1>KI-DATA</h1>
            </header>

            <div className='Main-search'>
                <input
                    type="text"
                    placeholder="Enter a query to search for news..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button onClick={handleClick} disabled={isLoading}>
                    {isLoading ? 'Searching...' : 'Search'}
                </button>
            </div>

            {error && <div className='Main-error'>{error}</div>}

            <div className='Main-news'>
                {news.length > 0 ? (
                    news.map((article, index) => (
                        <div key={index} className='News-item'>
                            <div className='News-content'>
                                <h2 className='News-title'>{article.metadata.title}</h2>
                                <p className='News-description'>{article.metadata.description}</p>

                                {article.metadata.tags && article.metadata.tags.length > 0 && (
                                    <div className='News-tags'>
                                        {article.metadata.tags.map((tag, tagIndex) => (
                                            <span key={tagIndex} className='News-tag'>
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                <Link to={`/article/${article.id}`} className='ReadMore-button'>
                                    Read more
                                </Link>
                            </div>
                        </div>
                    ))
                ) : (
                    !isLoading && <p>Enter your query and click Search to see the news.</p>
                )}
            </div>
        </div>
    )
}

export default MainPage;

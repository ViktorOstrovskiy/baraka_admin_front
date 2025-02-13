import {useState} from "react";
import './SearchProfessions.scss';
import {searchCategories} from "../action.js";
import Input from "../../../components/UI/Input/index.jsx";


const SearchCategories = ({handleClickItemSearch}) => {
    const [search, setSearch] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [news, setNews] = useState([]);

    const handleClick = async () => {

        setIsLoading(true);

        try {
            const resp = await searchCategories(search);
            setNews(resp);
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }

    function toPercentage(score) {
        return (score * 100).toFixed(2) + "%";
    }

    return (
        <div className='SearchProfessions'>
            <div className='SearchProfessions-search-content'>
                <div className='SearchProfessions-search'>
                    <Input placeholder='Enter a query to search for category...' onChange={(e) => setSearch(e.target.value)} value={search}/>
                    <button onClick={handleClick} disabled={isLoading}>
                        {isLoading ? 'Searching' : 'Search'}
                    </button>
                </div>
            </div>
            {!isLoading && news.length > 0 ? (
                news.map((article, index) => (
                    <div key={index} className='Profession-item' onClick={() => handleClickItemSearch({
                        ...article.metadata,
                        id: Number(article.id)
                    })}>
                        <div className='Profession-content'>
                            <h2 onClick={() => handleClickNews(article.id)}
                                className='Profession-title'>{article.metadata.name} <span>{toPercentage(article.score)}</span></h2>
                            {article.metadata.keyWords && article.metadata.keyWords.length > 0 && (
                                <div className='SearchProfessions-tags'>
                                    {article.metadata.keyWords.map((tag, tagIndex) => (
                                        <span key={tagIndex} className='SearchProfessions-tag'>
                                                    {tag}
                                                </span>
                                    ))}
                                </div>
                            )}
                            <p className='Profession-description'>{article.metadata.category_name}</p>
                        </div>
                    </div>
                ))
            ) : (
                !isLoading && <p>Enter your query and click Search to see the categories.</p>
            )}
        </div>
    )
}


export default SearchCategories;

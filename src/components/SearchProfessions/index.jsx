import Input from "../UI/Input/index.jsx";
import {searchNews} from "../../pages/Main/action.js";
import {useState} from "react";
import './SearchProfessions.scss';


const SearchProfessions = () => {
    const [search, setSearch] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [news, setNews] = useState([]);

    const handleClick = async () => {

        setIsLoading(true);

        try {
            const resp = await searchNews(search);
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
                    <Input placeholder='Enter a query to search for profession...' onChange={(e) => setSearch(e.target.value)} value={search}/>
                    <button onClick={handleClick} disabled={isLoading}>
                        {isLoading ? 'Searching' : 'Search'}
                    </button>
                </div>
            </div>
            {!isLoading && news.length > 0 ? (
                news.map((article, index) => (
                    <div key={index} className='Profession-item'>
                        <div className='Profession-content'>
                            <h2 onClick={() => handleClickNews(article.id)}
                                className='Profession-title'>{article.metadata.profession_name} <span>{toPercentage(article.score)}</span></h2>
                            <p className='Profession-description'>{article.metadata.category_name}</p>
                        </div>
                    </div>
                ))
            ) : (
                !isLoading && <p>Enter your query and click Search to see the profession.</p>
            )}
        </div>
    )
}


export default SearchProfessions;

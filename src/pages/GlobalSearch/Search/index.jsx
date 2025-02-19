import {useState} from "react";
import './SearchProfessions.scss';
import Input from "../../../components/UI/Input/index.jsx";
import {globalSearch} from "../action.js";
import {useNavigate} from "react-router-dom";


const SearchGlobal = () => {
    const [search, setSearch] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [news, setNews] = useState(null);
    const navigate = useNavigate();

    const handleClick = async () => {

        setIsLoading(true);

        try {
            const resp = await globalSearch(search);
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


    const handleClickItem = (link) => {
        navigate(link)
    }

    return (
        <div className='SearchProfessions'>
            <div className='SearchProfessions-search-content'>
                <div className='SearchProfessions-search'>
                    <Input placeholder='Enter a query to search..' onChange={(e) => setSearch(e.target.value)} value={search}/>
                    <button onClick={handleClick} disabled={isLoading}>
                        {isLoading ? 'Searching' : 'Search'}
                    </button>
                </div>
            </div>
            {!isLoading && news !== null ? (
                    <div className='Profession-item'>
                        <div className='Profession-content'>
                            <div className='SearchProfessions-item' onClick={() => handleClickItem('/categories')}>
                                {news?.category && <h2 className='Profession-title'> Category: {news?.category?.name}</h2>}
                                {news?.category && <div className='SearchProfessions-tags'>
                                    {news?.category.keyWords.map((tag, tagIndex) => (
                                        <span key={tagIndex} className='SearchProfessions-tag'>
                                                    {tag}
                                                </span>
                                    ))}
                                </div>}
                            </div>
                            <div className='SearchProfessions-item' onClick={() => handleClickItem('/work-type')}>

                            {news?.workType && <h2 className='Profession-title'> Work type: {news?.workType?.name}</h2>}
                            {news?.workType && <div className='SearchProfessions-tags'>
                                {news?.workType.keyWords.map((tag, tagIndex) => (
                                    <span key={tagIndex} className='SearchProfessions-tag'>
                                                    {tag}
                                                </span>
                                ))}
                            </div>}
                            </div>
                            <div className='SearchProfessions-item'  onClick={() => handleClickItem('/payment-type')}>

                            {news?.payment_type && <h2 className='Profession-title'> Payment type: {news?.payment_type?.name}</h2>}
                            {news?.payment_type && <div className='SearchProfessions-tags'>
                                {news?.payment_type.keyWords.map((tag, tagIndex) => (
                                    <span key={tagIndex} className='SearchProfessions-tag'>
                                                    {tag}
                                                </span>
                                ))}
                            </div>}
                            </div>
                            <div className='SearchProfessions-item'   onClick={() => handleClickItem('/')}>

                            {news?.profession && <h2 className='Profession-title'> Profession: {news?.profession?.profession_name}</h2>}
                            {news?.profession && <div className='SearchProfessions-tags'>
                                {news?.profession.keyWords.map((tag, tagIndex) => (
                                    <span key={tagIndex} className='SearchProfessions-tag'>
                                                    {tag}
                                                </span>
                                ))}
                            </div>}
                            </div>
                        </div>
                    </div>
            ) : (
                !isLoading && <p>Enter your query and click Search..</p>
            )}
        </div>
    )
}


export default SearchGlobal;

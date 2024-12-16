import './Main.scss';
import { searchNews } from "./action.js";
import {useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom';
import Input from "../../components/UI/Input/index.jsx";
import Checkbox from "../../components/UI/Checkbox/index.jsx";
import moment from "moment";
import map from "../../assets/images/map.svg";
import SelectBox from "../../components/UI/Select/index.jsx";
import {
    cityOptions,
    districtOptions,
    landOptions,
    optionsSort,
    licenceOptions,
    namesOptions
} from "../../core/helpers/data.js";
import DatePicker from "../../components/UI/DatePicker/index.jsx";


const MainPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingFirst, setIsLoadingFirst] = useState(false);
    const [search, setSearch] = useState('');
    const [news, setNews] = useState([]);
    const [error, setError] = useState(null);
    const [selectedValues, setSelectedValues] = useState({
        sorted: null,
        land: null,
        name: null,
        licence: null,
        city: null,
        district: null
    })
    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateChange = (date) => {
        console.log("Выбранная дата:", date);
        setSelectedDate(date);
    };
    const navigate = useNavigate();

    const handleChangeSelect = (value, key) => {
        setSelectedValues({...selectedValues, [key]: value})
    }

    const handleClick = async () => {

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

     const loadData = async () => {
         setIsLoadingFirst(true);

        const resp = await searchNews(search);
        if(resp) {
            setNews(resp)
        }
         setIsLoadingFirst(false);

     }

     useEffect(() => {
         loadData();
     },[]);


    const handleClickNews = (id) => {
        navigate(`article/${id}`)
    }


    return (
        <div className='Main'>
            <div className='Main-filters'>
                <div className='Main-filters-title'>
                        Filters
                </div>
                <div className='Main-filters-tags'>
                    <div className='Main-filters-tags-title'>
                        Suggested tags
                    </div>
                    <div className='Main-filters-tags-checks'>
                        <Checkbox onChange={() => {}} label='Robotics' checked={true}/>
                        <Checkbox onChange={() => {}} label='Autonomous Vehicles' checked={true}/>
                        <Checkbox onChange={() => {}} label='Ethics' checked={true}/>
                        <Checkbox onChange={() => {}} label='Healthcare' checked={true}/>
                        <Checkbox onChange={() => {}} label='Cybersecurity' checked={true}/>
                    </div>
                </div>
                <div className='Main-filters-tags'>
                    <div className='Main-filters-tags-title'>
                        Date published
                    </div>
                    <div className='Main-filters-tags-selects'>
                        <DatePicker
                            placeholder="Choose a date"
                            selectedDate={selectedDate}
                            onChange={handleDateChange}
                        />
                    </div>
                </div>
                <div className='Main-filters-tags'>
                    <div className='Main-filters-tags-title'>
                        Format
                    </div>
                    <div className='Main-filters-tags-checks-wrap'>
                        <Checkbox className='check-w' onChange={() => {}} label='txt' checked={true}/>
                        <Checkbox className='check-w' onChange={() => {}} label='png' checked={true}/>
                        <Checkbox className='check-w' onChange={() => {}} label='pdf' checked={true}/>
                        <Checkbox className='check-w' onChange={() => {}} label='xls' checked={true}/>
                        <Checkbox className='check-w' onChange={() => {}} label='csv' checked={true}/>
                        <Checkbox className='check-w' onChange={() => {}} label='sql' checked={true}/>
                    </div>
                </div>
                <div className='Main-filters-tags'>
                    <div className='Main-filters-tags-title'>
                        Location
                    </div>
                    <div className='Main-filters-tags-selects'>
                        <SelectBox placeholder='Land' value={selectedValues.land} options={landOptions} onChange={(value) => handleChangeSelect(value, 'land')} />
                        <SelectBox placeholder='City' value={selectedValues.city} options={cityOptions}  onChange={(value) => handleChangeSelect(value, 'city')} />
                        <SelectBox placeholder='District' value={selectedValues.district} options={districtOptions}  onChange={(value) => handleChangeSelect(value, 'district')} />
                    </div>
                </div>
                <div className='Main-filters-tags'>
                    <div className='Main-filters-tags-title'>
                        Publisher
                    </div>
                    <div className='Main-filters-tags-selects'>
                        <SelectBox placeholder='Name' options={namesOptions}  onChange={(value) => handleChangeSelect(value, 'name')}/>
                    </div>
                </div>
                <div className='Main-filters-tags'>
                    <div className='Main-filters-tags-title'>
                        License
                    </div>
                    <div className='Main-filters-tags-selects'>
                        <SelectBox placeholder='MIT License' value={selectedValues.licence} options={licenceOptions}  onChange={(value) => handleChangeSelect(value, 'licence')} />
                    </div>
                </div>
            </div>
            <div className='Main-content'>
                <div className='Main-search-content'>
                    <div className='Main-search'>
                        <Input placeholder='Enter a query to search for articles...' onChange={(e) => setSearch(e.target.value)} value={search}/>
                        <button onClick={handleClick} disabled={isLoading}>
                            {isLoading ? 'Searching' : 'Search'}
                        </button>
                    </div>
                </div>
                <div className='Main-filter'>
                    <div style={{width: '132px'}}>
                        <SelectBox placeholder='Sorted' value={selectedValues.sorted} options={optionsSort} onChange={(value) => handleChangeSelect(value, 'sorted')} />
                    </div>
                    <div className='Main-filter-navigate-map'>
                        <img src={map} alt=""/>
                        Show on map
                    </div>
                </div>

                {error && <div className='Main-error'>{error}</div>}
                {(isLoading || isLoadingFirst) && (
                    <div className='spinner-container'>
                        <div className="spinner"></div>
                    </div>
                )}
                <div className='Main-news'>
                    {!isLoadingFirst && !isLoading &&  news.length > 0 ? (
                        news.map((article, index) => (
                            <div key={index} className='News-item'>
                                <div className='News-content'>
                                    <h2 onClick={() => handleClickNews(article.id)} className='News-title'>{article.metadata.title}</h2>
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

                                    <div className='News-info'>
                                        <span>{moment(article.metadata.date).format('DD.MM.YYYY')}</span>
                                        <span>{article.metadata.author}, {article.metadata.address}</span>
                                        <span>5km from you</span>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        !isLoading && !isLoadingFirst && <p>Enter your query and click Search to see the news.</p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default MainPage;

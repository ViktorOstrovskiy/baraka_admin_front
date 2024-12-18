import './Main.scss';
import { searchNews } from "./action.js";
import {useEffect, useState,useRef} from "react";
import {useNavigate} from 'react-router-dom';
import Input from "../../components/UI/Input/index.jsx";
import Checkbox from "../../components/UI/Checkbox/index.jsx";
import moment from "moment";
import map from "../../assets/images/map.svg";
import list from "../../assets/images/list.svg";
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
        sorted: 'relevance',
        land: null,
        name: null,
        licence: null,
        city: null,
        district: null
    })
    const [showMap,setShowMap] = useState(false);

    const [selectedDate, setSelectedDate] = useState(null);

    const mapRef = useRef(null);
    const mapInstance = useRef(null);

    const [tooltipData, setTooltipData] = useState(null);

    const handleMarkerClick = (article, evt) => {
        if (!evt.target || typeof evt.target.getGeometry !== "function") {
            console.error("Event target is not a valid marker.");
            return;
        }

        if (mapRef.current && mapInstance.current) {
            const mapContainerRect = mapRef.current.getBoundingClientRect();
            const map = mapInstance.current;

            const markerCoords = evt.target.getGeometry();
            const screenPoint = map.geoToScreen(markerCoords);

            const tooltipX = screenPoint.x + mapContainerRect.left;
            const tooltipY = screenPoint.y + mapContainerRect.top + window.scrollY; // Додано scrollY для врахування скролу

            setTooltipData({
                content: (
                    <div className='tooltip-content'>
                    <span className='tooltip-content-title' onClick={() => handleClickNews(article.id)}>
                        {article.metadata.title}
                    </span>
                        <div className='tooltip-content-info'>
                            {article.metadata.author} {article.metadata.address}
                        </div>
                        <div className='tooltip-content-distance'>
                            5km from you
                        </div>
                        {article.metadata.tags && article.metadata.tags.length > 0 && (
                            <div className='tooltip-content-tags'>
                                {article.metadata.tags.map((tag, tagIndex) => (
                                    <span key={tagIndex} className='tooltip-content-tags-tag'>
                                    {tag}
                                </span>
                                ))}
                            </div>
                        )}
                    </div>
                ),
                position: {
                    left: tooltipX,
                    top: tooltipY,
                },
            });
        }
    };

    const handleCloseTooltip = () => {
        setTooltipData(null);
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };
    const navigate = useNavigate();

    const handleChangeSelect = (value, key) => {
        setSelectedValues({...selectedValues, [key]: value})
    }

    const handleClickShowMap = () => {
        setShowMap(!showMap)
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

    useEffect(() => {
        if (showMap && news.length > 0 && mapRef.current) {
            const platform = new H.service.Platform({
                apikey: '8sldLXC5RzF3dgO3VFKdoFMK8_pLb_la1RJD96GHf2Y',
            });

            const defaultLayers = platform.createDefaultLayers();
            const map = new H.Map(
                mapRef.current,
                defaultLayers.vector.normal.map,
                {
                    center: { lat: 53.5511, lng: 9.9937 },
                    zoom: 7,
                }
            );

            mapInstance.current = map;

            const ui = H.ui.UI.createDefault(map, defaultLayers);
            const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

            news.forEach(article => {
                if (article.metadata.latitude && article.metadata.longitude) {
                    const marker = new H.map.Marker({
                        lat: parseFloat(article.metadata.latitude),
                        lng: parseFloat(article.metadata.longitude),
                    });

                    marker.addEventListener('tap', (evt) => {
                        if (!evt || !evt.target) {
                            console.error("Event or target is undefined.");
                            return;
                        }

                        handleMarkerClick(article, evt);
                    });


                    marker.setData({ cursor: 'pointer' });
                    marker.addEventListener('pointerenter', (evt) => {
                        map.getElement().style.cursor = 'pointer';
                    });
                    marker.addEventListener('pointerleave', (evt) => {
                        map.getElement().style.cursor = '';
                    });

                    map.addObject(marker);
                }
            });

            return () => map.dispose();
        }
    }, [showMap, news, navigate]);


    useEffect(() => {
        const handleMapInteraction = () => {
            if (tooltipData) {
                handleCloseTooltip();
            }
        };

        if (mapInstance.current) {
            mapInstance.current.addEventListener('dragstart', handleMapInteraction);
            mapInstance.current.addEventListener('tap', handleMapInteraction);
        }

        return () => {
            if (mapInstance.current) {
                mapInstance.current.removeEventListener('dragstart', handleMapInteraction);
                mapInstance.current.removeEventListener('tap', handleMapInteraction);
            }
        };
    }, [tooltipData, mapInstance]);


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
                    <div className='Main-filter-navigate-map' onClick={handleClickShowMap}>
                        {showMap ? <img src={list} alt=""/> : <img src={map} alt=""/>}
                        {showMap ? "Show list" :"Show on map"}
                    </div>
                </div>

                {error && <div className='Main-error'>{error}</div>}
                {(isLoading || isLoadingFirst) && (
                    <div className='spinner-container'>
                        <div className="spinner"></div>
                    </div>
                )}
                { showMap ?
                    <div ref={mapRef} style={{ width: '100%', height: '500px' }} />

                    :<div className='Main-news'>
                    {!isLoadingFirst && !isLoading && news.length > 0 ? (
                        news.map((article, index) => (
                            <div key={index} className='News-item'>
                                <div className='News-content'>
                                    <h2 onClick={() => handleClickNews(article.id)}
                                        className='News-title'>{article.metadata.title}</h2>
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
                </div>}
            </div>
            {tooltipData && (
                <div
                    className="tooltip"
                    style={{
                        position: 'absolute',
                        left: `${tooltipData.position.left}px`,
                        top: `${tooltipData.position.top - 50}px`,
                    }}
                >
                    {tooltipData.content}
                </div>
            )}
        </div>
    )
}

export default MainPage;

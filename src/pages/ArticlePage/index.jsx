import './ArticlePage.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { getNewsById } from "../Main/action.js";
import back from '../../assets/images/arrow.svg';
import map from '../../assets/images/map.svg';
import moment from "moment/moment.js";

const ArticlePage = () => {
    const { id } = useParams();
    const [article, setArticle] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const mapRef = useRef(null);
    const navigate = useNavigate();

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
        };

        fetchArticle();
    }, [id]);

    useEffect(() => {
        if (article && article.metadata.latitude && article.metadata.longitude && mapRef.current) {
            const platform = new H.service.Platform({
                apikey: '8sldLXC5RzF3dgO3VFKdoFMK8_pLb_la1RJD96GHf2Y',
            });

            const defaultLayers = platform.createDefaultLayers();

            const map = new H.Map(
                mapRef.current,
                defaultLayers.vector.normal.map,
                {
                    center: {
                        lat: parseFloat(article.metadata.latitude),
                        lng: parseFloat(article.metadata.longitude),
                    },
                    zoom: 10,
                }
            );

            const marker = new H.map.Marker({
                lat: parseFloat(article.metadata.latitude),
                lng: parseFloat(article.metadata.longitude),
            });

            map.addObject(marker);

            const ui = H.ui.UI.createDefault(map, defaultLayers);
            const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
        }
    }, [article]);

    return (
        <div className='ArticlePage'>
            <div className='ArticlePage-navigate'>
                <div className='ArticlePage-navigate-back' onClick={() => navigate(-1)}>
                    <img src={back} alt="" />
                    Back
                </div>
                <div className='ArticlePage-navigate-map'>
                    <img src={map} alt="" />
                    Show on map
                </div>
            </div>

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

                        <div className='Article-info'>
                            <span>
                                {moment(
                                    moment(article?.metadata?.date, 'YYYY-MM-DD', true).isValid()
                                        ? article.metadata.date
                                        : '2024-05-07'
                                ).format('DD.MM.YYYY')}
                            </span>
                            <span>{article.metadata.author && `${article.metadata.author},`} {article.metadata.address}</span>
                            <span>5km from you</span>
                        </div>

                        <div className='Article-map-container'>
                            <div className='Article-map-container-title'>Map</div>
                            <div className='Article-map-container-coordinates'>
                                {article.metadata.latitude}{' '}{article.metadata.longitude}
                            </div>
                            <div
                                ref={mapRef}
                                // className='Article-map-container-map'
                                style={{ width: '100%', height: '600px' }}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ArticlePage;

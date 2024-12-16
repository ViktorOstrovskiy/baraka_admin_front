import './ArticlePage.scss';
import {useNavigate, useParams} from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getNewsById } from "../Main/action.js";
import back from '../../assets/images/arrow.svg';
import map from '../../assets/images/map.svg';
import moment from "moment/moment.js";


const ArticlePage = () => {
    const { id } = useParams();
    const [article, setArticle] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

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
        }

        fetchArticle();
    }, [id]);

    return (
        <div className='ArticlePage'>
            <div className='ArticlePage-navigate'>
                <div className='ArticlePage-navigate-back' onClick={() => navigate(-1)}>
                    <img src={back} alt=""/>
                    Back
                </div>
                <div className='ArticlePage-navigate-map'>
                    <img src={map} alt=""/>
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
                            <span>{moment(article.metadata.date).format('DD.MM.YYYY')}</span>
                            <span>{article.metadata.author}, {article.metadata.address}</span>
                            <span>5km from you</span>

                        </div>

                        <div className='Article-full-content'>
                            <p>{article.metadata.content}</p>
                        </div>

                        <div className='Article-map-container'>
                            <div className='Article-map-container-title'>
                                Map
                            </div>
                            <div className='Article-map-container-coordinates'>
                                {article.metadata.latitude}{' '}{article.metadata.longitude}
                            </div>

                            <div className='Article-map-container-map'>

                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ArticlePage;

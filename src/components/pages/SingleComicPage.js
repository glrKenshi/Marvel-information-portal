import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './singleComicPage.scss';

const SingleComic = () => {
    const [comic, setComic] = useState(null)
    const {loading, error, getComic, clearError} = useMarvelService()
    const {comicId} = useParams()

    useEffect(() => {
        updateComic()
    }, [comicId])

    const updateComic = () => {
        clearError()
        getComic(comicId)
            .then(onComicLoaded)
    }

    const onComicLoaded = (comic) => {
        setComic(comic);
    }

    return (
        <>
            {error ? <ErrorMessage/> : (loading ? <Spinner/> : (!comic ? null : <View comic={comic}/>))}
        </>
    )
}

const View = ({comic}) => {    
    const {title, description, pageCount, thumbnail, language, price} = comic

    return (
        <div className="single-comic">
            <img src={thumbnail} alt="x-men" className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount}</p>
                <p className="single-comic__descr">{language}</p>
                <div className="single-comic__price">{price}</div>
            </div>
            <Link to="/comics" className="single-comic__back">Back to all</Link>
        </div>
    )
}

export default SingleComic;
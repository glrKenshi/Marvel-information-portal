import { useEffect, useState } from 'react';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner'
import ErrorMessage from '../errorMessage/ErrorMessage';


import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';

const RandomChar = () => {

    const {loading, error, getCharacter, clearError} = useMarvelService()

    const [char, setChar] = useState({})

    const onCharLoaded = (char) => {
        setChar(char)
    }

    const changeChar = () => {    
        clearError()
        let id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000)
        getCharacter(id)  
            .then(onCharLoaded)
    }

    useEffect(() => {   
        changeChar()
    }, [])

    return (
        <div className="randomchar">
            {error ? <ErrorMessage /> : (loading ? <Spinner /> : <View char={char}/>)}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button className="button button__main">
                    <div className="inner" onClick={changeChar}>try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    )
    
}

const View = ({char}) => {  
    let {name, description, thumbnail, wiki, homepage} = char
 
    return (
        <div className="randomchar__block">
            <img src={thumbnail} alt="Random character" className="randomchar__img"/>
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">{description}
                </p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default RandomChar;
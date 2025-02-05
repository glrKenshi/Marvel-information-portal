import useHttp from "../hooks/http.hook"

const useMarvelService = () => {
    const {loading, error, request, clearError} = useHttp()

    const _apiBase = 'https://gateway.marvel.com:443/v1/public'

    const _apiKey = 'apikey=463faf4d6ecfebab7b78d530947d9280'

    const _basicOffset = "210"

    const getAllCharacters = async (offset = _basicOffset)  => {  
        const res = await request(
            `${_apiBase}/characters?limit=9&offset=${offset}&${_apiKey}`
        )
        return res.data.results.map(_transformCharacter)
    }

    const getCharacter = async (id) => {  
        const res = await request(`${_apiBase}/characters/${id}?${_apiKey}`)
        return _transformCharacter(res.data.results[0])
    }

    const getAllComics = async (offset = 0) => {
		const res = await request(
			`${_apiBase}/comics?orderBy=issueNumber&limit=8&offset=${offset}&${_apiKey}`
		);
		return res.data.results.map(_transformComics);
	};

	const getComic = async (id) => {
		const res = await request(`${_apiBase}/comics/${id}?${_apiKey}`);
		return _transformComics(res.data.results[0])
	};

    const _transformCharacter = (res) => {    
        return {    
            id: res.id,
            name: res.name,
            description: res.description,
            thumbnail: res.thumbnail.path + '.' + res.thumbnail.extension,
            homepage: res.urls[0].url,
            wiki: res.urls[1].url,
            comics: res.comics.items
        }
    }

    const _transformComics = (comics) => {
		return {
			id: comics.id,
			title: comics.title,
			description: comics.description || "There is no description",
			pageCount: comics.pageCount
				? `${comics.pageCount} p.`
				: "No information about the number of pages",
			thumbnail: comics.thumbnail.path + "." + comics.thumbnail.extension,
			language: comics.textObjects[0]?.language || "en-us",
			// optional chaining operator
			price: comics.prices[0].price
				? `${comics.prices[0].price}$`
				: "not available",
		};
	};

    return {
        loading, 
        error, 
        clearError, 
        getAllCharacters, 
        getCharacter,
        getAllComics,
        getComic
    }
}

export default useMarvelService
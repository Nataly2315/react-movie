import React from 'react';

const SearchBar = (props) => {

    const {query, updateSearchBy, searchMovie} = props;


    const handleChange = (e) => {
        updateSearchBy(e.target.value.trim());
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            return searchMovie();
        }
    }

    return (
        <div className="search-block form-row">
            <input type={'text'} className={'form-control col'} onKeyPress={handleKeyPress} onChange={handleChange}
                   maxLength={'100'}
                   value={query || ""}/>

            <button type={'button'} onClick={searchMovie} className={'btn btn-light col-md-3'}>Search</button>
        </div>
    )
}

export default SearchBar;
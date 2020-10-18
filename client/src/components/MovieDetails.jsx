import React from "react";

const MovieDetails = ({movieDetails}) => {


    const prepareListValues = (array) =>
    { let result = '';
      for(let a in array){
          result+= ((a>0) ? ", " : " ")+ array[a].name;
      }
      return result;
    }


    if (Object.keys(movieDetails).length) {
        return (<table className={'table table-striped'}>
            <tbody>
            <tr>
                <th>Статус</th>
                <td>{movieDetails.status}</td>
            </tr>
            <tr>
                <th>Дата выхода</th>
                <td>{movieDetails.release_date}</td>
            </tr>
            <tr>
                <th>Продолжительность</th>
                <td>{movieDetails.runtime}</td>
            </tr>
            <tr>
                <th>Язык оригинала</th>
                <td>{movieDetails.original_language}</td>
            </tr>
            <tr>
                <th>Страна</th>
                <td>{prepareListValues(movieDetails.production_countries)}</td>
            </tr>
            <tr>
                <th>Компания</th>
                <td>{prepareListValues(movieDetails.production_companies)}</td>
            </tr>
            <tr>
                <th>Жанры</th>
                <td>{prepareListValues(movieDetails.genres)}</td>
            </tr>
            <tr>
                <td colSpan={'2'}> {movieDetails.overview}</td>
            </tr>
            </tbody>
        </table>)
    }
    return null;
}

export default MovieDetails;
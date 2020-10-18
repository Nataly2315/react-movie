import React from "react";

import MainPage from "./MainPage";
import {BrowserRouter as Router, Route} from "react-router-dom";

import MoviePage from "./MoviePage";
import Header from "./Header";

class App extends React.Component {

    render() {
        return (<>
                <Header> </Header>
                <Router>
                    <Route exact path="/" component={MainPage}/>
                    <Route exact path="/:movieId" component={MoviePage} toggleModal={this.toggleModal}/>
                </Router>
            </>
        )
    }

}


export default App;

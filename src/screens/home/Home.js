import React, { Component } from 'react';
import Header from '../../common/Header';
class Home extends Component {
    constructor() {
        super();
        this.state = {
            postDetails: [],
            postDetailsSnapshot: [],
            commentTextField: [],
            comments: [],
            profileDetails: {},
            accessToken: sessionStorage.getItem('access-token')
        }
    }
    render() {
        return(
            <Header onSearchTextChanged={this.onSearchTextChangedHandler}></Header>
        );
    }
}

export default Home;
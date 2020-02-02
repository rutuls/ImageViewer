import React, { Component } from 'react';
import Header from '../../common/Header';
import './Profile.css';


class Profile extends Component {

    constructor() {
        super();
        this.state = {
            postDetails: [],
            postDetailsSnapshot: [],
            commentTextField: [],
            comments: [],
            profileDetails: []
        }
    }

    componentWillMount() {
        let data = null;
        let xhr = new XMLHttpRequest();
        let that = this;
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                const commentInit= [];
                const commentTextFieldInit = [];
                JSON.parse(this.responseText).data.forEach(element => {
                    commentInit.push([]);
                    commentTextFieldInit.push("");
                });
                that.setState({comments: commentInit});
                that.setState({commentTextField: commentTextFieldInit});
                that.setState({
                    postDetailsSnapshot: JSON.parse(this.responseText).data
                });
                that.setState({
                    postDetails: JSON.parse(this.responseText).data
                });
                console.log(that.state.postDetails);
            }
        });

        xhr.open("GET", "https://api.instagram.com/v1/users/self/media/recent?access_token=8661035776.d0fcd39.39f63ab2f88d4f9c92b0862729ee2784");
        // xhr.setRequestHeader("Cache-Control", "no-cache");
        //    xhr.setRequestHeader("cor");
        xhr.send(data);




        let dataProfile = null;
        let xhrReleased = new XMLHttpRequest();
        xhrReleased.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                that.setState({
                    profileDetails: JSON.parse(this.responseText).data
                });
                console.log(that.state.profileDetails);
            }

        });

        xhrReleased.open("GET", "https://api.instagram.com/v1/users/self/?access_token=8661035776.d0fcd39.39f63ab2f88d4f9c92b0862729ee2784");
       // xhrReleased.setRequestHeader("Cache-Control", "no-cache");
        xhrReleased.send(dataProfile);

    }

    render() {
        return (
            <div>
                <Header history={this.props.history} profileUrl={this.state.profileDetails.profile_picture} parentPage="profile" />
            </div>
        )
    }
}
export default Profile;
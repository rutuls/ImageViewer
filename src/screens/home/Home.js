import React, { Component } from 'react';
import Header from '../../common/Header';
import { CardContent, Avatar, GridList, Card, GridListTile, withStyles, InputLabel, FormControl, Typography, Input, Button, CardHeader, Divider } from '@material-ui/core';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import '../home/Home.css';

const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper
    },
    upcomingMoviesHeading: {
        textAlign: 'center',
        background: '#ff9999',
        padding: '8px',
        fontSize: '1rem'
    },
    gridListUpcomingMovies: {
        flexWrap: 'nowrap',
        transform: 'translateZ(0)',
        width: '100%'
    },
    gridListMain: {
        transform: 'translateZ(0)',
        width: '1500px'
    },
    formControl: {
        margin: theme.spacing(),
        minWidth: 240,
        maxWidth: 240
    },
    title: {
        color: theme.palette.primary.light,
    }
});

const stylings = {
    tagStyle: {
        display: 'inline',
        paddingRight: '2px',
        fontSize: '15px',
        color: 'blue'
    },

    headingStyle: {
        fontSize: '20px',
    }
}

const cardStyle = {
    width: '100%',
    height: '100%',
    padding: 50,
}

class Home extends Component {
    constructor() {
        super();

        this.state = {
            postDetails: [],
            postDetailsCopy: [],
            commentes: [],
            commentTextField: [],
            profileDetails: {},
        }
    }
    // Calling the provided Post and Profile APIs to get the response
    UNSAFE_componentWillMount() {
        let data = null;
        let xhr = new XMLHttpRequest();
        let that = this;
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                const commentInit = [];
                const commentTextFieldInit = [];
                JSON.parse(this.responseText).data.forEach(element => {
                    commentInit.push([]);
                    commentTextFieldInit.push("");
                });
                that.setState({ 
                    comments: commentInit,
                    commentTextField: commentTextFieldInit,
                    postDetails: JSON.parse(this.responseText).data,
                    postDetailsCopy: JSON.parse(this.responseText).data
                });
                console.log(that.state.postDetailsCopy);
            }
        });
        xhr.open("GET", "https://api.instagram.com/v1/users/self/media/recent?access_token=8661035776.d0fcd39.39f63ab2f88d4f9c92b0862729ee2784");
        xhr.send(data);

        let dataProfile = null;
        let xhrProfile = new XMLHttpRequest();
        xhrProfile.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                that.setState({
                    profileDetails: JSON.parse(this.responseText).data
                });
            }

        });

        xhrProfile.open("GET", "https://api.instagram.com/v1/users/self/?access_token=8661035776.d0fcd39.39f63ab2f88d4f9c92b0862729ee2784");
        xhrProfile.send(dataProfile);
    }
    // Increases the like count
    likeIncrease = (index) => {
        let postDetails = this.state.postDetails;
        postDetails[index].likes.count++;
        this.setState({ postDetails: postDetails });
    }
    // Decreases the like count
    likeDecrease = (index) => {
        let postDetails = this.state.postDetails;
        postDetails[index].likes.count--;
        this.setState({ postDetails: postDetails });
    }

    onCommentChangeHandler = (e, index) => {
        const commentSnapshot = this.state.commentTextField;
        commentSnapshot[index] = e.target.value;
        this.setState({ commentTextField: commentSnapshot });
    }
    //Adding comment when Add button for comment is clicked
    onAddButtonClicked = (index) => {
        let commentTemp = this.state.comments;
        commentTemp[index].push(
            {
                'author': this.state.postDetails[index].user.username,
                'comment': this.state.commentTextField[index]
            }
        )
        this.setState({ comments: commentTemp });
    }

    onSearchTextChangedHandler = (e) => {
        console.log(e.target.value);
        let filteredResult = this.state.postDetailsCopy.filter((post) => {
            return post.caption.text.toUpperCase().indexOf(e.target.value.toUpperCase()) !== -1;
        });
        this.setState({ postDetails: filteredResult });
    }

    render() {
        // Checking access-token in storage when Home is rendered. If user tries to access Home without logging in, it will redirect to login page
        const { classes } = this.props;
        if (sessionStorage.getItem("access-token") === null) {
            this.props.history.push("/");
        }

        return (
            <div>
                <Header history={this.props.history} onSearchTextChanged={this.onSearchTextChangedHandler} profileUrl={this.state.profileDetails.profile_picture} parentPage="home"></Header>

                <GridList cols={2} cellHeight={900} className={classes.gridListMain}>
                    {this.state.postDetails.map((p, index) => (
                        <GridListTile key={"title" + p.id} style={{ width: '650px', margin: '10px' }}>
                            <Card style={{ cardStyle }} variant="outlined">
                                <CardHeader
                                    avatar={
                                        <Avatar aria-label="recipe" src={p.user.profile_picture}>
                                        </Avatar>
                                    }
                                    title={p.user.username}
                                    subheader={(new Date(parseInt(p.created_time))).toLocaleString()}
                                >
                                </CardHeader>
                                <CardContent>
                                    <img src={p.images.standard_resolution.url} alt={p.caption.text} className="postImage" />
                                    <br /><br />
                                    <Divider />
                                    <Typography variant="h5" style={stylings.headingStyle} >
                                        {p.caption.text}
                                    </Typography>
                                    <div>
                                        {p.tags.map(tag => (
                                            <span key={"tags" + tag}>
                                                <Typography display="inline" variant="caption" style={stylings.tagStyle} >#{tag}</Typography>
                                            </span>
                                        ))}
                                    </div>
                                    <div style={{ display: "flex" }}>
                                        {this.state.postDetailsCopy[index].likes.count === p.likes.count ?
                                            <FavoriteBorderIcon onClick={() => this.likeIncrease(index)} />
                                            :
                                            <FavoriteIcon style={{ color: red[500] }} onClick={() => this.likeDecrease(index)}></FavoriteIcon>
                                        }
                                        <span style={{ marginLeft: "5px" }}>{p.likes.count} Likes</span>
                                    </div>
                                    {this.state.comments[index].length !== 0 &&
                                        this.state.comments[index].map((ele, i) => (
                                            <div className="postedComments" key={index + "postedComment" + i}>
                                                <span className="commentAuthor">{ele.author}:</span>
                                                <span className="actualComment">{ele.comment}</span>
                                            </div>
                                        ))}
                                    <br />
                                    <div className="comment-section">
                                        <FormControl required style={{ width: "90%", marginRight: "10px", height: "40px" }}>
                                            <InputLabel htmlFor="username">Add a comment</InputLabel>
                                            <Input type="text" onChange={(e) => this.onCommentChangeHandler(e, index)} />
                                        </FormControl>
                                        <Button className="login-button" variant="contained" color="primary" style={{ height: "50px", cursor: 'pointer' }} onClick={() => this.onAddButtonClicked(index)}>ADD</Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </GridListTile>
                    ))}
                </GridList>
            </div>
        );
    }
}

export default withStyles(styles)(Home);
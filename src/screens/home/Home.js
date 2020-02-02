import React, { Component } from 'react';
import Header from '../../common/Header';
import { CardContent, Avatar, GridList, Card, GridListTile, withStyles, InputLabel, FormControl, Typography, Input, Button, CardHeader, Divider } from '@material-ui/core';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';


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
        cursor: 'pointer',
        width: '1500px'
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 240,
        maxWidth: 240
    },
    title: {
        color: theme.palette.primary.light,
    }
});

const stylings ={
    tagStyle: {
        display: 'inline',
        paddingRight: '2px',
        fontSize: '15px',
        color: 'blue'
    },
    headingStyle:{
        fontSize: '20px',
    }
}
const mediaStyle = {
    height: 0,
    paddingTop: '56.25%', // 16:9
}
const cardStyle = {
    // margin: 'auto',
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
        }
    }

    componentWillMount() {
        let data = null;
        let xhr = new XMLHttpRequest();
        let that = this;
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                that.setState({
                    postDetails: JSON.parse(this.responseText).data,
                    postDetailsCopy: JSON.parse(this.responseText).data
                });
                console.log(that.state.postDetailsCopy);
            }
        });
        xhr.open("GET", "https://api.instagram.com/v1/users/self/media/recent?access_token=8661035776.d0fcd39.39f63ab2f88d4f9c92b0862729ee2784");
        xhr.send(data);
    }

    likeIncrease = (index) => {
        let postDetails = this.state.postDetails;
        postDetails[index].likes.count++;
        this.setState({postDetails: postDetails});
    }

    likeDecrease = (index) => {
        let postDetails = this.state.postDetails;
        postDetails[index].likes.count--;
        this.setState({postDetails: postDetails});
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Header onSearchTextChanged={this.onSearchTextChangedHandler}></Header>
                <GridList cols={2} cellHeight={900} className={classes.gridListMain}>
                    {this.state.postDetails.map((p, index) => (
                        <GridListTile key={"title" + p.id} style={{ width:'650px', margin: '10px' }}>
                            <Card style={{ cardStyle }} variant="outlined">
                            <CardHeader
                                avatar={
                                    <Avatar aria-label="recipe" src={p.user.profile_picture}>
                                    </Avatar>
                                }
                                title={p.user.username}
                                subheader={p.created_time}
                            >
                            </CardHeader>
                                <CardContent>
                                <img src={p.images.standard_resolution.url} alt={p.caption.text} className="postImage" />
                                <Divider/>
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
                                <div>
                                    {this.state.postDetailsCopy[index].likes.count === p.likes.count ? 
                                    <FavoriteBorderIcon onClick={() => this.likeIncrease(index)}/>
                                    :
                                    <FavoriteIcon style={{color: red[500]}} onClick={() => this.likeDecrease(index)}></FavoriteIcon>
                                    }
                                </div>
                                <span>{p.likes.count} Likes</span>
                                <div>
                                        <FormControl required style={{ width: "100%" }}>
                                            <InputLabel htmlFor="username">Username</InputLabel>
                                            <Input type="text" />
                                        </FormControl>
                                        <Button className="login-button" variant="contained" color="primary">Add</Button>
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
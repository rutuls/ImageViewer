import React, { Component } from 'react';
import Header from '../../common/Header';
import { CardContent, Avatar, GridList, Card, GridListTile, withStyles, InputLabel, FormControl, Input, Button } from '@material-ui/core';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

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
        cursor: 'pointer'
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
        }
    }

    componentWillMount() {
        let data = null;
        let xhr = new XMLHttpRequest();
        let that = this;
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                that.setState({
                    postDetails: JSON.parse(this.responseText).data
                });
                console.log(that.state.postDetails);
            }
        });
        xhr.open("GET", "https://api.instagram.com/v1/users/self/media/recent?access_token=8661035776.d0fcd39.39f63ab2f88d4f9c92b0862729ee2784");
        xhr.send(data);
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Header onSearchTextChanged={this.onSearchTextChangedHandler}></Header>
                <GridList cols={2} cellHeight={750} cols={2} className={classes.gridListMain}>
                    {this.state.postDetails.map(p => (
                        <GridListTile key={"title" + p.id} style={{ border: "1px solid black" }}>
                            <Card style={{ cardStyle }} variant="outlined">
                                <CardContent>
                                    <Avatar src={p.user.profile_picture}></Avatar>
                                    <span>
                                        {p.user.username}
                                        {p.created_time}
                                    </span>

                                    <img src={p.images.standard_resolution.url}></img>
                                </CardContent>
                                <div>
                                    {p.caption.text}
                                </div>
                                <div>
                                    {p.tags.map(tag => (
                                        <span key={"tags" + tag}>#{tag}</span>
                                    ))}
                                </div>
                                <div>
                                    <span> <FavoriteBorderIcon />{p.likes.count} Likes</span>
                                </div>
                                <div>
                                        <FormControl required style={{ width: "100%" }}>
                                            <InputLabel htmlFor="username">Username</InputLabel>
                                            <Input type="text" />
                                        </FormControl>
                                        <Button className="login-button" variant="contained" color="primary">Add</Button>
                                    </div>
                            </Card>
                        </GridListTile>
                    ))}
                </GridList>
            </div>
        );
    }
}

export default withStyles(styles)(Home);
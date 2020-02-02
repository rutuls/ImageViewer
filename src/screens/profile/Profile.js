import React, { Component } from 'react';
import Header from '../../common/Header';
import './Profile.css';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import { red } from '@material-ui/core/colors';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import Modal from 'react-modal';
import FormHelperText from '@material-ui/core/FormHelperText';

const stylings = {
    tagStyle: {
        display: 'inline',
        paddingRight: '2px',
        marginRight: '5px',
        fontSize: '15px',
        color: '#00FFFF'
    },
    headingStyle: {
        fontSize: '20px',
    },
    updateModal: {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)'
        }
    }
}
class Profile extends Component {

    constructor() {
        super();
        this.state = {
            postDetails: [],
            postDetailsSnapshot: [],
            commentTextField: [],
            comments: [],
            profileDetails: {},
            profileStats: {},
            modalIsOpen: false,
            isPostModalOpen: false,
            fullnameRequired: "dispNone",
            fullNameField: "",
            activeImageIndex: 0,
            isDataFetched: false,
            accessToken: sessionStorage.getItem('access-token')
        }
    }

    componentWillMount() {
        if (sessionStorage.getItem("access-token") !== null) {
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
                    that.setState({ comments: commentInit });
                    that.setState({ commentTextField: commentTextFieldInit });
                    that.setState({
                        postDetailsSnapshot: JSON.parse(this.responseText).data
                    });
                    that.setState({
                        postDetails: JSON.parse(this.responseText).data
                    });
                    that.setState({
                        isDataFetched: true
                    });


                    // console.log(that.state.postDetails);
                }
            });

            xhr.open("GET", "https://api.instagram.com/v1/users/self/media/recent?access_token=" + this.state.accessToken);
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
                    that.setState({
                        profileStats: JSON.parse(this.responseText).data.counts

                    });
                }

            });

            xhrReleased.open("GET", "https://api.instagram.com/v1/users/self/?access_token=" + this.state.accessToken);
            xhrReleased.send(dataProfile);

        }
    }
    closeModalHandler = () => {
        this.setState({ modalIsOpen: false });
    }
    closePostModalHandler = () => {
        this.setState({ isPostModalOpen: false });
    }
    openModelHandler = () => {
        this.setState({ modalIsOpen: true });
    }
    openPostModelHandler = () => {
        this.setState({ isPostModalOpen: true });
    }
    inputNameChangeHandler = (e) => {
        //const profDetails = this.state.profileDetails
        this.setState({ fullNameField: e.target.value });
    }
    onUpdateButtonClickHandler = (e) => {
        this.state.fullNameField === "" ? this.setState({ fullnameRequired: "dispBlock" }) : this.setState({ fullnameRequired: "dispNone" });
        if (this.state.fullNameField === "") return;
        const profDetails = this.state.profileDetails;
        profDetails.full_name = this.state.fullNameField;
        this.setState({ profileDetails: profDetails });
        this.setState({ modalIsOpen: false });
    }
    likeIconClicked = (index) => {
        let postDetails = this.state.postDetails;
        if (postDetails[index].likes.count === this.state.postDetailsSnapshot[index].likes.count)
            postDetails[index].likes.count++;
        else
            postDetails[index].likes.count--;
        this.setState({ postDetails: postDetails });
    }


    onPostImageClickedHandler = (index) => {
        this.setState({ activeImageIndex: index });
        this.openPostModelHandler();
    }

    onCommentValueChanged = (e, index) => {
        const commentSnapshot = this.state.commentTextField;
        commentSnapshot[index] = e.target.value;
        this.setState({ commentTextField: commentSnapshot });

        console.log(this.state.commentTextField);
    }
    onAddCommentClicked = (index) => {
        let comentInfoState = this.state.comments;
        console.log(index);
        comentInfoState[index].push({
            'author': this.state.postDetails[index].user.username,
            'comment': this.state.commentTextField[index]
        });
        this.setState({ comments: comentInfoState });
        console.log(this.state.comments);
    }
    render() {
        if (sessionStorage.getItem("access-token") === null) {
            this.props.history.push("/");
        }
        return (
            <div>
                <Header history={this.props.history} profileUrl={this.state.profileDetails.profile_picture} parentPage="profile" />
                <br /><br />
                <div className="profile_info">
                    <div id="avatar">
                        <Avatar size="medium" aria-label="recipe" src={this.state.profileDetails.profile_picture}>
                        </Avatar>
                    </div>

                    <div id="header-details">
                        <div>
                            <Typography variant="subtitle1"  >
                                {this.state.profileDetails.username}
                            </Typography>
                        </div>
                        <Typography variant="caption"  >
                            <div id="statInfo">
                                <span className="stat">Posts: {this.state.profileStats.media}</span>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <span className="stat">Follows: {this.state.profileStats.follows}</span>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <span className="stat">Followed By: {this.state.profileStats.followed_by}</span>
                            </div>
                        </Typography>
                        <br />
                        <div id="editSection">
                            <div>
                                {this.state.profileDetails.full_name}
                            </div>
                            <div>&nbsp;&nbsp;&nbsp;</div>
                            <div className="edit_button">
                                <Fab size="small" color="secondary" aria-label="edit" onClick={this.openModelHandler}>
                                    <EditIcon />
                                </Fab>
                                <Modal
                                    ariaHideApp={false}
                                    isOpen={this.state.modalIsOpen}
                                    contentLabel="Login"
                                    onRequestClose={this.closeModalHandler}
                                    style={stylings.updateModal}
                                >
                                    <Typography variant="headline" component="h6" >
                                        Edit
                                     </Typography>
                                    <br />
                                    <FormControl required>
                                        <InputLabel htmlFor="fullname">Full Name</InputLabel>
                                        <Input id="fullname" type="text" fullname={this.state.fullNameField} onChange={this.inputNameChangeHandler} />
                                        <FormHelperText className={this.state.fullnameRequired}>
                                            <span className="red">required</span>
                                        </FormHelperText>
                                    </FormControl>
                                    <br /><br /><br />
                                    <Button className="login-button" variant="contained" color="primary" onClick={this.onUpdateButtonClickHandler}>Update</Button>
                                </Modal>
                            </div>
                        </div>
                    </div>
                </div >
                <br /><br /><br />
                <div className="image_posts">
                    <GridList cellHeight={160} cols={3} style={{ marginLeft: "15%", marginRight: "10%", textAlign: "center" }}>
                        {this.state.postDetails.map((post, index) => (
                            <GridListTile key={"postImg" + post.id} style={{ height: '300px', width: '300px' }}>
                                <img src={post.images.standard_resolution.url} alt={post.caption.text} className="postImage" onClick={() => this.onPostImageClickedHandler(index)} />
                            </GridListTile>
                        ))}
                    </GridList>
                </div>
                {this.state.isDataFetched &&
                    <div className="image_modal">
                        <Modal
                            ariaHideApp={false}
                            isOpen={this.state.isPostModalOpen}

                            contentLabel="Login"
                            onRequestClose={this.closePostModalHandler}

                        >
                            <div className="postModalContainer">
                                <div id="postImg">
                                    <img src={this.state.postDetails[this.state.activeImageIndex].images.standard_resolution.url} alt={this.state.postDetails[this.state.activeImageIndex].caption.text} className="postModalImage" />
                                </div>
                                &nbsp;&nbsp;&nbsp;&nbsp;
                                <div className="modalDetailPane">
                                    <div id="titleBar">
                                        <div id="modalAvatar">
                                            <Avatar aria-label="recipe" src={this.state.profileDetails.profile_picture}>
                                            </Avatar>
                                        </div>
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        <div id="modalUserName">
                                            {this.state.postDetails[this.state.activeImageIndex].user.username}
                                        </div>
                                    </div>
                                    <Divider />
                                    <br />
                                    <Typography variant="h5" style={stylings.headingStyle} >
                                        {this.state.postDetails[this.state.activeImageIndex].caption.text}
                                    </Typography>

                                    <div>
                                        {this.state.postDetails[this.state.activeImageIndex].tags.map(tag => (
                                            <span key={"tags" + tag}>
                                                <Typography display="inline" variant="caption" style={stylings.tagStyle}>#{tag}</Typography>
                                            </span>
                                        ))}
                                    </div>
                                    <br />
                                    <div>
                                        <span>
                                            {this.state.postDetailsSnapshot[this.state.activeImageIndex].likes.count === this.state.postDetails[this.state.activeImageIndex].likes.count ?
                                                <FavoriteBorderOutlinedIcon onClick={() => this.likeIconClicked(this.state.activeImageIndex)} />
                                                :
                                                <FavoriteIcon onClick={() => this.likeIconClicked(this.state.activeImageIndex)} style={{ color: red[500] }} />}
                                        </span>
                                        <span>{this.state.postDetails[this.state.activeImageIndex].likes.count} Likes</span>
                                    </div>
                                    <br />
                                    {this.state.comments[this.state.activeImageIndex].length !== 0 &&
                                        this.state.comments[this.state.activeImageIndex].map((ele, i) => (
                                            <div className="postedComments" key={this.state.activeImageIndex + "postedComment" + i}>
                                                <span className="commentAuthor">{ele.author}:</span>
                                                <span className="actualComment">{ele.comment}</span>
                                            </div>
                                        ))}
                                    <br /><br /><br /><br /><br /><br /><br /><br />
                                    <div>
                                        <FormControl style={{ width: "100%", display: "flex", flexDirection: "row" }}>
                                            <InputLabel htmlFor={"commentTextField" + this.state.activeImageIndex}>Add a comment</InputLabel>
                                            <Input type="text" id={"commentTextField" + this.state.activeImageIndex} style={{ width: "80%" }} onChange={(e) => this.onCommentValueChanged(e, this.state.activeImageIndex)} />
                                            <Button style={{ width: "10%", marginLeft: "15px" }} className="login-button" variant="contained" color="primary" onClick={() => this.onAddCommentClicked(this.state.activeImageIndex)}>Add</Button>
                                        </FormControl>

                                    </div>
                                </div>
                            </div>
                        </Modal>
                    </div>}
            </div >
        )
    }
}

export default Profile;
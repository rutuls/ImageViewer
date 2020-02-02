import React, { Component } from 'react';
import './Header.css';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import InputAdornment from '@material-ui/core/InputAdornment';
import FilledInput from '@material-ui/core/FilledInput';
import Avatar from '@material-ui/core/Avatar';
import { withStyles } from '@material-ui/core/styles';



class Header extends Component {

    constructor() {
        super();
        this.state = {
            loggedIn: sessionStorage.getItem("access-token") == null ? false : true
        }
    }

    render () {
        return (
            <div>
                <header>
                    <div className="app-header">
                        <span className="app-logo">Image Viewer</span>
                        {this.state.loggedIn === true &&
                        <div className="app-right">
                            <FilledInput id="outlined-basic" placeholder="Search..." variant="outlined" onChange={(e)=>this.props.onSearchTextChanged(e)}
                                startAdornment={(
                                    <InputAdornment variant="standard" position="start" id="searchBoxIcon" style={{backgroundColor:"#c0c0c0"}}>
                                        <SearchOutlinedIcon />

                                    </InputAdornment>
                                )}

                            />
                            <Avatar aria-label="recipe" style={{ float: "right", marginLeft: "10px", cursor: "pointer" }}  ></Avatar>

                        </div>}
                    </div>
                </header>
            </div>
        )
    }
}

export default Header;
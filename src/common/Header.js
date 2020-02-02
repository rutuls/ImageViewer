import React, { Component } from 'react';
import './Header.css';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import InputAdornment from '@material-ui/core/InputAdornment';
import FilledInput from '@material-ui/core/FilledInput';
import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';



const Header = function (props) {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <div>
            <header>
                <div className="app-header">
                    <span className="app-logo">Image Viewer</span>
                    {true === true &&
                        <div className="app-right">
                            <FilledInput id="outlined-basic" placeholder="Search..." variant="outlined" onChange={(e) => this.props.onSearchTextChanged(e)}
                                startAdornment={(
                                    <InputAdornment variant="standard" position="start" id="searchBoxIcon" style={{ backgroundColor: "#c0c0c0" }}>
                                        <SearchOutlinedIcon />

                                    </InputAdornment>
                                )}

                            />
                            <Avatar aria-label="recipe" src={props.profileUrl} style={{ float: "right", marginLeft: "10px", cursor: "pointer" }} onClick={handleClick}  ></Avatar>
                            <Menu
                                id="simple-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleClose}>My Account</MenuItem>
                                <MenuItem onClick={handleClose}>Logout</MenuItem>
                            </Menu>
                        </div>}
                </div>
            </header>
        </div>
    )
}

export default Header;
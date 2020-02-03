import React from 'react';
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

    // On clicking on Logout menu item this will delete access-token and redirect user to login page
    const onClickLogOutHandler = () => {
        sessionStorage.removeItem('access-token');
        props.history.push('/');
    }
    // On clicking on MyAccount menu item this handler will redirect user to profile
    const onClickMyAccountHandler = () => {
        props.history.push('/profile');
    }
    // On clicking on ImageViewer Logo and if access-token is not null it will redirect to home page or else it will redirect to login page
    const onClickLogoHandler = () => {
        if (sessionStorage.getItem("access-token") !== null) {
            props.history.push('/home');
        } else {
            props.history.push('/');
        }
    }
    // Added Application logo, for Search bar we have used FilledInput UI component and showing Search icon at start position. Also we show Avatar for showing profile picutre
    // Also showing Menu items when clicking on Avatar
    return (
        <div>
            <header>
                <div className="app-header">
                    <span className="app-logo" style={{ cursor: "pointer" }} onClick={() => { onClickLogoHandler(); }}>Image Viewer</span>
                    {sessionStorage.getItem("access-token") !== null &&
                        <div className="app-right">
                            {props.parentPage === "home" &&
                                <FilledInput style={{ backgroundColor: "#c0c0c0", borderRadius: "4px", width: "300px", height: "35px", paddingBottom: "7px", margin: "5px" }} placeholder="Search..." variant="outlined" onChange={(e) => props.onSearchTextChanged(e)}
                                    startAdornment={(
                                        <InputAdornment variant="standard" position="start" id="searchBoxIcon" style={{ backgroundColor: "#c0c0c0" }}>
                                            <SearchOutlinedIcon />

                                        </InputAdornment>
                                    )}
                                    disableUnderline={true}

                                />}
                            <Avatar aria-label="recipe" src={props.profileUrl} style={{ float: "right", marginLeft: "10px", cursor: "pointer" }} onClick={handleClick}  ></Avatar>
                            <Menu
                                id="simple-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                {props.parentPage === "home" &&
                                    <MenuItem onClick={() => { handleClose(); onClickMyAccountHandler(); }}>My Account</MenuItem>
                                }
                                <MenuItem onClick={() => { handleClose(); onClickLogOutHandler(); }} >Logout</MenuItem>
                            </Menu>
                        </div>}
                </div>
            </header>
        </div>
    )
}
export default Header;
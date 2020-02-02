import React, { Component } from 'react';
import './Header.css';
class Header extends Component {

    render () {
        return (
            <div>
                <header>
                    <div className="app-header">
                        <span className="app-logo">Image Viewer</span>
                    </div>
                </header>
            </div>
        )
    }
}

export default Header;
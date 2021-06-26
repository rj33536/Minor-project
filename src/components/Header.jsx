import React, { useState } from 'react';
import "./Header.css";
import { UserContext } from "../App"
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import classnames from "classnames";

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },

    },
    orange: {
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: deepOrange[500],
    },
    purple: {
        color: theme.palette.getContrastText(deepPurple[500]),
        backgroundColor: deepPurple[500],
    },
    search: {
        color: 'white',
        '& > *': {
            color: 'white',
            // backgroundColor: 'white'
        }
    },
    searchBar: {
        background: 'white',
        display: 'flex',
        width: '100%',
    }
}));
function Header(props) {
    const [isSearching, setIsSearching] = useState(false);
    const classes = useStyles();
    if (isSearching) {
        return (<nav className={`navbar navbar-expand-lg bg-white`}>
            
            <div className={classes.searchBar}>
                <a className={`navbar-brand brand navbar-brand-dark`} href="/" >Bamboo</a>
                <div className="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
                <TextField id="standard-basic" label="Search videos" />
                <CloseIcon onClick={() => setIsSearching(false)} />
            </div>
            </div>
        </nav>);
    }
    return (
        <nav className={`navbar navbar-expand-lg navbar-white`}>
            <a className={`navbar-brand brand`} href="/">Bamboo</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="/navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse justify-content-end mr-4" id="navbarNavDropdown">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link" href="/myvideos" role="button" aria-haspopup="true" aria-expanded="false">
                            My videos
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/upload" role="button" aria-haspopup="true" aria-expanded="false">
                            Upload
                        </a>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="/" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Categories
                        </a>
                        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
                            <a className="dropdown-item" href="/categories/Action">Action</a>
                            <a className="dropdown-item" href="/categories/Comedy">Comedy</a>
                            <a className="dropdown-item" href="/categories/Romance">Romance</a>
                            <a className="dropdown-item" href="/categories/Thriller">Thriller</a>
                            <a className="dropdown-item" href="/categories/Horror">Horror</a>
                            <a className="dropdown-item" href="/categories/Adult">Adult</a>
                        </div>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="/" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Language
                        </a>
                        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
                            <a className="dropdown-item" href="/categories/hindi">Hindi</a>
                            <a className="dropdown-item" href="/categories/english">English</a>
                            <a className="dropdown-item" href="/categories/telugu">Telugu</a>
                            <a className="dropdown-item" href="/categories/kannada">Kannada</a>
                            <a className="dropdown-item" href="/categories/marathi">Marathi</a>
                        </div>
                    </li>
                    <li className="nav-item">
                        <SearchIcon className={classes.search} onClick={() => setIsSearching(true)} />
                    </li>

                    <UserAvatar {...props} />
                </ul>
            </div>
        </nav>
    );
}

const UserAvatar = (props) => {
    const classes = useStyles();
    return (
        <UserContext.Consumer>
            {
                (user) => {
                    console.log(user);
                    return (<li className="nav-item dropdown">
                        <a className="nav-link" href="/" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <Avatar className={classes.purple}>OP</Avatar>
                        </a>
                        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
                            {
                                user && user.user ?
                                    <React.Fragment>
                                        <a className="dropdown-item">{user.user.displayName}</a>
                                        <a className="dropdown-item"onClick={props.Logout}>Logout</a>
                                    </React.Fragment>
                                    :
                                    <a className="dropdown-item" onClick={props.authWithGoogle}>Login With Google</a>

                            }
                            <a className="dropdown-item" href="/categories/english">Help and legal</a>
                        </div>
                    </li>);
                }
            }
        </UserContext.Consumer>
    )
}
export default Header;
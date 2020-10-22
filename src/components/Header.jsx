import React from 'react';
import "./Header.css";
import { UserContext } from "../App"
function Header(props) {

    return (
        <UserContext.Consumer>
            {
                (user) => {

                    return (
                        <nav className={`navbar navbar-expand-lg `}>
                            <a className={`navbar-brand brand`} href="#">Bamboo</a>
                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarNavDropdown">
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
                                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            Categories
                                        </a>
                                        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                            <a className="dropdown-item" href="/">Action</a>
                                            <a className="dropdown-item" href="/">Comedy</a>
                                            <a className="dropdown-item" href="/">Romance</a>
                                            <a className="dropdown-item" href="/">Thriller</a>
                                            <a className="dropdown-item" href="/">Horror</a>
                                            <a className="dropdown-item" href="/">Adult</a>
                                        </div>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            Language
                                        </a>
                                        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                            <a className="dropdown-item" href="/">Hindi</a>
                                            <a className="dropdown-item" href="/">English</a>
                                            <a className="dropdown-item" href="/">Telugu</a>
                                            <a className="dropdown-item" href="/">Kannada</a>
                                            <a className="dropdown-item" href="/">Marathi</a>
                                        </div>
                                    </li>
                                    {
                                        user && user.user ?
                                            <React.Fragment>
                                                <li className="nav-item text-light m-2">{user.user.displayName}</li>
                                                <li className="nav-item text-light m-2"><input type="button" className="btn btn-danger" value="Logout" onClick={props.Logout} /></li>
                                            </React.Fragment>
                                            :
                                            <li className="nav-item m-2">
                                                <button className="btn btn-info" onClick={props.authWithGoogle}>Login With Google</button>
                                            </li>

                                    }
                                </ul>
                            </div>
                        </nav>
                    )
                }
            }
        </UserContext.Consumer>
    );
}
export default Header;
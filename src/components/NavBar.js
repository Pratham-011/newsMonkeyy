import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">NewsMonkey</Link>
                    <button className="navbar-toggler" type="button" onClick={toggleDropdown}>
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`}>
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item"><Link className="nav-link" aria-current="page" to="/">Home</Link></li>
                            <li className="nav-item dropdown">
                                <button className="nav-link dropdown-toggle" onClick={toggleDropdown}>Categories</button>
                                <div className={`dropdown-menu ${isOpen ? 'show' : ''}`} style={{ backgroundColor: "#343a40" }}>
                                    <Link className="dropdown-item text-white" to="/business">Business</Link>
                                    <Link className="dropdown-item text-white" to="/entertainment">Entertainment</Link>
                                    <Link className="dropdown-item text-white" to="/general">General</Link>
                                    <Link className="dropdown-item text-white" to="/health">Health</Link>
                                    <Link className="dropdown-item text-white" to="/science">Science</Link>
                                    <Link className="dropdown-item text-white" to="/sports">Sports</Link>
                                    <Link className="dropdown-item text-white" to="/technology">Technology</Link>
                                </div>
                            </li>
                        </ul>
                        <form className="d-flex" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default NavBar;

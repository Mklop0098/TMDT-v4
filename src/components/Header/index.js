
import { BiBell, BiUserCircle, BiCart, BiChevronDown, BiX, BiMenu, BiSearchAlt } from 'react-icons/bi';
import React from 'react';
import '../../assets/css/index.css'
import '../../assets/css/grid.css';
import '../../assets/css/fonts.css';
import './style.css'
import { Link, useNavigate } from 'react-router-dom';
import { ProductContext } from '../Context';

export default function Header() {

    const navigate = useNavigate()

    const handleLink = () => {
        if(localStorage.getItem('current-user') === null) {
            navigate('/login')
        }
        else navigate('/cart')
    }

    const handleLogout = () => {
        localStorage.removeItem("current-user")
        
    }

    return (
        <ProductContext.Consumer>
            {
                data => (
                    <header>
                            <div className="mobile-menu bg-second">
                            <a href="/#" className="mb-logo">ABELO</a>
                            <span className="mb-menu-toggle" id="mb-menu-toggle">
                                <BiMenu />
                            </span>
                        </div>

                        <div className="header-wrapper" id="header-wrapper">
                            <span className="mb-menu-toggle mb-menu-close" id="mb-menu-close">
                                <BiX />
                            </span>
                            <div className="bg-second">
                                <div className="top-header container">
                                    <ul className="devided">
                                        <li>
                                            <a href="/#">+840123456789</a>
                                        </li>
                                        <li>
                                            <a href="/#">abelo@mail.com</a>
                                        </li>
                                    </ul>
                                    <ul className="devided">
                                        <li className="dropdown">
                                            <a href="/#">USD</a>
                                            <BiChevronDown />
                                            <ul className="dropdown-content">
                                                <li><a href="/#">VND</a></li>
                                                <li><a href="/#">JPY</a></li>
                                                <li><a href="/#">EUR</a></li>
                                            </ul>
                                        </li>
                                        <li className="dropdown">
                                            <a href="/#">ENGLISH</a>
                                            <BiChevronDown />
                                            <ul className="dropdown-content">
                                                <li><a href="/#">VIETNAMESE</a></li>
                                                <li><a href="/#">JAPANESE</a></li>
                                                <li><a href="/#">FRENCH</a></li>
                                                <li><a href="/#">SPANISH</a></li>
                                            </ul>
                                        </li>
                                        <li><a href="/#">ORDER TRACKING</a></li>
                                    </ul>
                                </div>
                            </div>

                            <div className="bg-main bg-bg">
                                <div className="mid-header container">
                                    <Link to={'./'}><span  className="logo">ABELO</span></Link>
                                    <div className="search">
                                        <input type="text" placeholder="Search" />
                                        <BiSearchAlt style={{
                                            position: "absolute",
                                            top: "50%",
                                            transform: "translateY(-50%)",
                                            right: "20px",
                                            cursor: "pointer",
                                            fontSize: "25px"
                                        }}/>
                                    </div>
                                    <ul className="user-menu">
                                        <li><a href="#"><BiBell /></a></li>
                                        <li class="dropdown haha">
                                            <a type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                <BiUserCircle />
                                            </a>
                                            <ul class="dropdown-menu">
                                                <li><Link to={'/order'}><a class="dropdown-item">????n h??ng</a></Link></li>
                                                <li><a class="dropdown-item" href="#" onClick={handleLogout}>????ng xu???t</a></li>
                                            </ul>
                                        </li>
                                        <li type="button" class="position-relative">
                                            <i onClick={handleLink}><span><BiCart /></span></i>
                                            <span class="position-absolute translate-middle badge rounded-pill bg-danger">
                                                {data.cart.length}
                                                <span class="visually-hidden">unread messages</span>
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className="bg-second">
                                <div className="bottom-header container">
                                    <ul className="main-menu">
                                        <li>
                                            <Link to={'/'}><a href="#">Home</a></Link>
                                        </li>

                                        <li className="mega-dropdown">
                                            <Link to={'/shop'}><a href="#">Shop</a></Link>
                                        </li>
                                        <li><a href="#">blog</a></li>
                                        <li>
                                            <Link>
                                                <div class="dropdown">
                                                    <a class=" dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                        Contact
                                                    </a>
                                                    <ul class="dropdown-menu">
                                                        <li>
                                                            <Link to={'/policy'}>   
                                                                <a class="dropdown-item" href="#">Ch??nh s??ch</a>
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link to={'/policy'}>   
                                                                <a class="dropdown-item" href="#">B???o h??nh</a>
                                                            </Link>
                                                        </li><li>
                                                            <Link to={'/policy'}>   
                                                                <a class="dropdown-item" href="#">Li??n h??? v???i ch??ng t??i</a>
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link to={'/discount'}>   
                                                                <a class="dropdown-item" href="#">Khuy???n m??i</a>
                                                            </Link>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </header>
                )
            }
        </ProductContext.Consumer>
        
    );
}
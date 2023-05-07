import React from 'react'
import { Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import SearchBox from './SearchBox'
import { logout } from '../actions/userActions'
import { useState, useEffect } from 'react'

const Sidebar = () => {
    const dispatch = useDispatch()

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    console.log("userInfo:", userInfo);

    const logoutHandler = () => {
        dispatch(logout())
    }

    const [isActive, setIsActive] = useState(false);

    // for name if to long, but hv an error
    // const name = userInfo.name;
    // const firstTwoWords = name.split(' ').slice(0, 2).join(' ');

    useEffect(() => {
        function handleScroll() {
            const sidebar = document.querySelector('.sidebar-navigation');
            if (sidebar && window.scrollY > 100) {
                sidebar.classList.add('scrolling');
            } else if (sidebar) {
                sidebar.classList.remove('scrolling');
            }
        }
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        function handleClickOutside(event) {
            const sidebar = document.querySelector(".sidebar-navigation");
            if (sidebar && !sidebar.contains(event.target)) {
                setIsActive(false);
            }
        }
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    function handleClick() {
        setIsActive(!isActive);
    }

    const handleMouseEnter = () => {
        setIsActive(true);
    };

    const handleMouseLeave = () => {
        setIsActive(false);
    };

    return (
        <>
            {userInfo ? (
                <div className={`sidebar-navigation ${isActive ? 'active' : ''}`} onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}>
                    <ul>
                        <li>
                            <a href="/profile">
                                <span class="icon highlight">
                                    <i class="fas fa-robot"></i>
                                </span>
                                <span class="title" id='username'>{userInfo.name}</span>
                            </a>
                        </li>
                        <li>
                            <a href="/cart">
                                <span class="icon">
                                    <i className='fas fa-shopping-cart'></i>
                                </span>
                                <span class="title">Cart</span>
                            </a>
                        </li>
                        {userInfo.isAdmin && (
                            <>
                                <li>
                                    <a href="/admin/orderlist">
                                        <span class="icon">
                                            <i className='fas fa-shopping-bag'></i>
                                        </span>
                                        <span class="title">Order</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="/admin/userlist">
                                        <span class="icon">
                                            <i className='fas fa-users'></i>
                                        </span>
                                        <span class="title">Users</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="/admin/productlist">
                                        <span class="icon">
                                            <i className='fas fa-box'></i>
                                        </span>
                                        <span class="title">Products</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="/admin/salelist">
                                        <span class="icon">
                                            <i className='fas fa-donate'></i>
                                        </span>
                                        <span class="title">Sales</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="/admin/supplierlist">
                                        <span class="icon">
                                            <i className='fas fa-truck'></i>
                                        </span>
                                        <span class="title">Supplier</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="/admin/expenses">
                                        <span class="icon">
                                            <i className='fas fa-money-bill-alt'></i>
                                        </span>
                                        <span class="title">Expenses</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="/admin/bankAccounts">
                                        <span class="icon">
                                            <i className='fas fa-landmark'></i>
                                        </span>
                                        <span class="title">Bank Account</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="/admin/announce">
                                        <span class="icon">
                                            <i className='fas fa-bullhorn'></i>
                                        </span>
                                        <span class="title">Announce</span>
                                    </a>
                                </li>
                            </>
                        )}
                        {userInfo && !userInfo.isAdmin && (
                            <li>
                                <a href="/ordermylist">
                                    <span class="icon">
                                        <i className='fas fa-shopping-bag'></i>
                                    </span>
                                    <span class="title">Order</span>
                                </a>
                            </li>
                        )}
                        <li>
                            <a onClick={logoutHandler} href="/login">
                                <span class="icon">
                                    <i className='fas fa-sign-out-alt'></i>
                                </span>
                                <span class="title">Logout</span>
                            </a>
                        </li>
                    </ul>
                </div>
            ) : (
                <nav></nav>
            )}
        </>
    )

}

export default Sidebar

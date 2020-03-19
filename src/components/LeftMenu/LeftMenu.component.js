import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Image } from 'react-bootstrap';

import IconLogo from '../../assets/icons/logo.svg';
import Navigation from '../BaseComponents/Navigation';

import './LeftMenu.scss';


const LeftMenu = ({ profile, links }) => {
    return (
        <div className='LeftMenu__container'>
            <div className='LeftMenu__top-part'>
                <Link to={'/'}>
                    <div className='LeftMenu__top-part--logoContainer'>
                        <Image src={IconLogo} alt="logo" />
                        <span>APP</span>
                    </div>
                </Link>


                <div className='LeftMenu__user-info'>
                    <span className='LeftMenu__user-info--name'>{profile.firstName} {profile.lastName}</span>
                    <span className='LeftMenu__user-info--email'>{profile.email}</span>
                </div>
            </div>

            <Navigation links={links} />
        </div>
    );
};

LeftMenu.propTypes = {
    links: PropTypes.array,
    profile: PropTypes.object,
};


export default LeftMenu;

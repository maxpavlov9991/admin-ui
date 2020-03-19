import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import LeftMenu from '../LeftMenu/LeftMenu.container';
import Routing from '../Routes/Routing';
import roleRightsConfig from '../../config/roleRights';

import './Main.scss';


const Main = props => {
    useEffect(() => {
        props.setPermissions(roleRightsConfig.admin);
    }, []);

    if (!props.links) {
        return (
            <div className='Main'>
                Loading...
            </div>
        );
    }

    return (
        <div className='Main'>
            <LeftMenu />
            <Routing />
        </div>
    );
};

Main.propTypes = {
    setPermissions: PropTypes.func,

    links: PropTypes.array,
};

export default Main;

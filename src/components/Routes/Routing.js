import React from 'react';
import { Route, Switch } from 'react-router-dom';
import RoleRoute from './RoleRoute';
import Roles from '../Roles';


const Routing = () => {
    return (
        <Switch>
            <RoleRoute path='/'>
                <Roles />
            </RoleRoute>

        </Switch>
    );
};


export default Routing;

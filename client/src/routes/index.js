import React from 'react';
import routes from './routeConfigurations';
import history from '../history';
import qs from 'querystring';
import { Route } from 'react-router';

const getRouteByName = (name) => routes.find(r => r.name === name);

export const getRoutePathByName = (routeName, params = {}) => {

    const route = getRouteByName(routeName);

    if (!route.path) return ;

    return route.path.replace(/:+(.\w*)/g, (fullMatch, group1) => {
        for (let param in params) {
            if (params.hasOwnProperty(param)) {
                if (param === group1) {
                    return params[group1];
                }
            }
        }
        navigate.push('NotFoundPage');
    });  
};

export const navigate = {
    push: (routeName, params = {}, options = {}) => {
        const queryString = '?' + qs.stringify(options.query || {});
        const hashString = options.hash ? '#' + options.hash : '';

        console.log(getRoutePathByName(routeName, params) + queryString + hashString);

        return history.push(getRoutePathByName(routeName, params) + queryString + hashString);
    },
    replace: (routeName, params = {}, options = {}) => {
        const queryString = '?' + qs.stringify(options.query || {});
        const hashString = options.hash ? '#' + options.hash : '';

        return history.replace(getRoutePathByName(routeName, params) + queryString + hashString);
    },
    goBack: () => history.goBack(),
    notFound: () => {
        history.replace(getRoutePathByName('NotFoundPage'));
    }
};

export default () => routes.map(routeProps => <Route {...routeProps} />);

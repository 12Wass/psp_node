import React from 'react';
import { Redirect } from 'react-router-dom';
// import Pages
import Notfound from '../pages/Notfound';
import HomePage from '../pages/HomePage';
import DashboardPage from '../pages/DashboardPage';
import SiteMarchand from '../pages/SiteMarchand';
import AuthPage from '../pages/AuthPage';
import EmailValidationPage from '../pages/EmailValidationPage';
import CheckoutPage from '../pages/CheckoutPage';
import CustomerPage from '../pages/CustomerPage';
import OrderPage from '../pages/OrderPage';
import SettingsPage from '../pages/SettingsPage';
import OrderDetails from '../pages/OrderDetailsPage';
import CheckoutConfirmedPage from '../pages/CheckoutConfirmedPage';
import CheckoutCancelled from '../pages/CheckoutCancelled';
import CustomersPage from '../pages/CustomersPage';
import TransactionsPage from '../pages/TransactionsPage';

// Routes
export default [
    {
        name: 'AuthPage',
        path: '/auth/:view',
        exact: true,
        private: false,
        component: AuthPage,
    },
    {
        name: 'EmailValidationPage',
        path: '/account/confirm/:token',
        exact: true,
        private: false,
        component: EmailValidationPage,
    },
    {
        name: 'DashboardPage',
        path: '/dashboard',
        exact: true,
        private: true,
        component: DashboardPage,
    },
    {
        name: 'TransactionsPage',
        path: '/transactions',
        exact: true,
        private: true,
        component: TransactionsPage,
    },
    {
        name: 'CustomersPage',
        path: '/customers',
        exact: true,
        type: 'admin',
        private: true,
        component: CustomersPage,
    },
    {
        name: 'CheckoutPage',
        path: '/checkout/:token',
        exact: true,
        private: false,                     // Note that checkout page is public
        component: CheckoutPage,
    },

    /**
     **** SITE MARCHAND ****
     */
    {
        name: 'SiteMarchandPage',
        path: '/',
        exact: true,
        private: false,
        component: SiteMarchand,
    },
    {
        name: 'CustomerPage',
        path: '/site-marchand/customer',
        exact: true,
        private: false,
        component: CustomerPage,
    },
    {
        name: 'OrdersPage',
        path: '/site-marchand/traders/orders',
        exact: true,
        private: false,
        component: OrderPage,
    },    
    {
        name: 'SettingsPage',
        path: '/site-marchand/traders/settings',
        exact: true,
        private: false,
        component: SettingsPage,
    },    
    {
        name: 'OrdersDetailsPage',
        path: '/site-marchand/traders/orders/:id',
        exact: true,
        private: false,
        component: OrderDetails,
    },
    {
        name: 'CheckoutConfirmedPage',
        path: '/site-marchand/confirmed',
        exact: true,
        private: false,
        component: CheckoutConfirmedPage,
    },    
    {
        name: 'CheckoutCancelled',
        path: '/site-marchand/cancelled',
        exact: true,
        private: false,
        component: CheckoutCancelled,
    },    


    /**
     * Not found page
     */
    {
        name: 'NotFoundPage',
        path: '/404',
        exact: true,
        private: false,
        component: Notfound,
    },
    /**
     * Default route redirect to a notfound page
     */
    {
        name: 'Default',
        render: () => <Redirect to='/404' />,
        private: false,
        exact: true,
    }
];
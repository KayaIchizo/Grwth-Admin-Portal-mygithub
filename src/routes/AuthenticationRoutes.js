import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';

// login option 3 routing
const AuthLogin3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Login3')));
const AuthRegister3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Register3')));

const GrwthLogin = Loadable(lazy(() => import('views/grwth/Login')));
const Grwthclient =  Loadable(lazy(() => import('views/grwth/Client')));
const Grwthgetaccesstoken =  Loadable(lazy(() => import('views/grwth/AccessToken')));
// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
    path: '/',
 
    children: [
        {
            path: '/pages/login/login3',
            element: <AuthLogin3 />
        },
        {
            path: '/pages/register/register3',
            element: <AuthRegister3 />
        },
        {
            path: '/',
            element: <GrwthLogin />    //thirty party login page
        },
        {
            path:'/sso-demo-client/callback',
            element:<Grwthclient />
        },
        {
            path:'/getaccestoken',
            element:<Grwthgetaccesstoken />  // get accesstoken
        }
    ],
  
};

export default AuthenticationRoutes;

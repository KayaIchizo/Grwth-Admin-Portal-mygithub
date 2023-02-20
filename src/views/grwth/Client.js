import React, { useState, useEffect } from 'react';
import { useLocation, useSearchParams } from "react-router-dom";
import axios from 'axios';
import './index.css';
import { useRoutes } from 'react-router-dom';
// routes
import MainRoutes from '../../routes/MainRoutes';


const Client = () => {


    const [queryParameters] = useSearchParams();
    const [code, setCode] = useState(queryParameters.get("code"));  //get code value from thirty party api
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(async () => {
        const data = await localStorage.getItem('userinfo'); // userinfo information from thirty party api
        if (data != null) {
            setIsLoaded(true);
        }
        const response = await axios.post('http://localhost:3000/api/auth/', {
            code
        });

        if (response != "") {
            localStorage.setItem("accesstoken", JSON.stringify(response.data.access_token));   //set the thirty party access_token to localstorage
        }

        const responseuserInfo = await axios.post('http://localhost:3000/api/auth/userinfo', {
            access_token: response.data.access_token
        });

        const userinfo = responseuserInfo.data.nameEn;

        if (userinfo.length == 0) {
            localStorage.setItem("userinfo", JSON.stringify(responseuserInfo.data.nameZh));  // get login user name
        }
        else {
            localStorage.setItem("userinfo", JSON.stringify(responseuserInfo.data.nameEn));
        }
        setTimeout(() => {
            setIsLoaded(true);
        }, 1000);

    }, [isLoaded]);


    //Loading page
    return isLoaded ? useRoutes([MainRoutes]) :
        <div className="center">
            <div className="wave"></div>
            <div className="wave"></div>
            <div className="wave"></div>
            <div className="wave"></div>
            <div className="wave"></div>
            <div className="wave"></div>
            <div className="wave"></div>
            <div className="wave"></div>
            <div className="wave"></div>
            <div className="wave"></div>
        </div>;



}

export default Client;
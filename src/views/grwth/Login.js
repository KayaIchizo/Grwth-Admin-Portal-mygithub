import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";


const Login  = () => {

    useEffect(()=> {
        window.location.href = "https://uatgrwth.app360.cn/grwth-as/oauth/authorize?client_id=grwth_x&redirect_uri=http://localhost:8081/sso-demo-client/callback&response_type=code&state=aWhT2X";
    },[]);


    const search = useLocation().search;
    const id = new URLSearchParams(search).get("code");
    console.log(id);
    console.log("sdffffffffffff");
    return(
        <div>
   
        </div>
    )
}

export default Login;
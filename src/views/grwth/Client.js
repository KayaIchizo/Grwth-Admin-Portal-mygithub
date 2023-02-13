import React, { useState, useEffect } from 'react';
import { useLocation, useSearchParams } from "react-router-dom";
import axios from 'axios';


const Client = () => {

    const [queryParameters] = useSearchParams();
    const [code, setCode] = useState(queryParameters.get("code"));
    const url = `https://uatgrwth.app360.cn/grwth-as/oauth/token?grant_type=authorization_code&code=` + code + `&client_id=grwth_x&client_secret=12345678&redirect_uri=http://localhost:8081/sso-demo-client/callback`;

    useEffect(async () => {
        const response = await axios.post('http://localhost:3000/api/auth/', {
            code
          });
          console.log("response=", response.data.access_token)

        
        const responseuserInfo = await axios.post('http://localhost:3000/api/auth/userinfo', {
             access_token: response.data.access_token
        });

        const userinfo = responseuserInfo.data.nameEn;       
        console.log(userInfo);
  
        
    }, [code]);

    return (
        <div>
            client
        </div>
    )

}

export default Client;
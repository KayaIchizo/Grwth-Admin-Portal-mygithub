import React, { useState, useEffect } from 'react';
import { useLocation, useSearchParams } from "react-router-dom";
import axios from 'axios';


const Client = () => {

    const [data, setData] = useState(null);
    const [error, setError] = useState("");
    const [loaded, setLoaded] = useState(false);
    const location = useLocation();
    const [queryParameters] = useSearchParams();
    const [code, setCode] = useState(queryParameters.get("code"));
    const url = `https://uatgrwth.app360.cn/grwth-as/oauth/token?grant_type=authorization_code&code=` + code + `&client_id=grwth_x&client_secret=12345678&redirect_uri=https://grwthx.netlify.app/sso-demo-client/callback`;

    const postdata = {
        grant_type: "authorization_code",
        code: code,
        client_id: "grwth_x",
        client_secret: "12345678",
        redirect_uri: "http://localhost:8081/getaccestoken"
    }

    var config = {
        method: 'post',
        mode: 'no-cors',
        url: url,
        headers: {
            'content-type': 'application/json',
            'Access-Control-Allow-Origin' : '*',
        }
    };


    useEffect(async () => {
        console.log(url);
        // var requestOptions = {
        //     method: 'POST',
        //     redirect: 'follow'
        //   };
          
        //   fetch(url, requestOptions)
        //     .then(response => response.text())
        //     .then(result => console.log(result))
        //     .catch(error => console.log('error', error));
        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [code]);


    console.log("href=", window.location.href);

    return (
        <div>
            client
        </div>
    )

}

export default Client;
import React, { useState, useEffect } from 'react';
import { useLocation, useSearchParams } from "react-router-dom";


const AccessToken  = () => {

    const location = useLocation();
    const [queryParameters] = useSearchParams();
    console.log("queryparam", queryParameters)

    useEffect(()=> {
    
    },[]);

 
    console.log("accesshref=", window.location.href);
    
    return(
        <div>
           AccessToken
        </div>
    )

}

export default AccessToken;
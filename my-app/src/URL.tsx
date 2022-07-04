
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';


const URL: React.FC = () => {
    const url = useParams();
    
    useEffect(()=>{
        async function getURL() {
            axios.get('http://localhost:8080/'+url.url)
            .then((data) => window.location.assign(data.data))
            .catch((err) => window.location.assign("http://localhost:3000/"))
        }
        getURL()
    },[])

    return<></>
}
export default URL;
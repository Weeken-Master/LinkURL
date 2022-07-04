import React,{useEffect,useState} from "react";
import axios from "axios";


export function getalllink() {
    const url =" http://localhost:8080/api/all"
    return axios.get(url)
    .then((v) => {
      return v.data
    })
    .catch((err) => console.log(["APIGet error:", err]));
}
export function getdatachart(){
  
}
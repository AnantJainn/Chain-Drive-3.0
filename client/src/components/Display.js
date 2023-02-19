import { useState } from 'react';
import React from 'react'
import "./Display.css"
const Display = ({contract, account}) => {
    const [data, setData] = useState("");
    const getData = async () => {
        let dataArray;
        const otherAddress = document.querySelector(".address").ariaValueMax;
        if(otherAddress){
            dataArray = await contract.display(otherAddress);
            console.log(dataArray);
        } else {
            dataArray = await contract.display(account)
        }
    }
    return <>
        <div className='image-list'>Image Display</div>
        <input type="text" placeholder='Enter Address' className='address'></input>
        <button className='center button' onClick={getData}></button>

    </>
};

export default Display;
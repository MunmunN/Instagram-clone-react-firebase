import React,{useState} from 'react';
import Authentication from './Authentication';
import './Header.css';
//import Signupmodel from './Signupmodel';

function Header(props){
    //callback function to get username from authentication component
    const [user,setUser]=useState('');
    
    const callbackFunction=(username)=>{
        setUser(username);

    }
    const sendData=()=>{
        props.appCallback(user);
    }
    return(
        <div className="app_header">
            {/* Instagram LoGo */}
            <img className="app_header_image"
            src="https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png"
            alt="">
            </img>
            {/* signin, logout or signout button */}
            {/* <Signupmodel></Signupmodel> */}
            <Authentication parentCallback={callbackFunction}></Authentication>

            {/* calling senData function */}
            {sendData()}
        </div>
    );
}
export default Header;
import { Button } from "@mui/material";
import { maxHeight } from "@mui/system";
import { useContext, useState } from 'react';
import AuthContext from '../auth';
import { GlobalStoreContext } from '../store'


export default function SplashScreen() {
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);

    const handleRegisterButton = () =>{
        window.location.href += 'register'
    }

    const handleLoginButton = () =>{
        window.location.href += 'login'
    }

    return (
        <div id="splash-screen">
            <div style={{fontSize:80,textAlign:"center",marginBottom:'10%'}}>
                Welcome to Playlister
            </div>
            <div>
                <div style={{fontSize:40,textAlign:'center'}} id = "splash-bottom">
                    Feel free to explore the music world~
                </div>
            </div>
            <div id= "splash-button-style">
                <Button style={{right:'3%',fontSize:'25px',borderRadius:'10px', backgroundColor: "#FFFFFF"}} onClick = {handleRegisterButton}>
                    register
                </Button>

                <Button style={{right:'0%',fontSize:'25px',borderRadius:'10px', backgroundColor: "#FFFFFF"}} onClick = {handleLoginButton}>
                    Login
                </Button>

                <Button style={{left:'3%',fontSize:'25px',borderRadius:'10px', backgroundColor: "#FFFFFF"}}>
                    Continue as the Guest
                </Button>
            </div>
            <div style={{fontSize:'30px',marginTop:'5%',textAlign:'center'}}>
                Designed by Zhenchao Xia
            </div>
        </div>
    )
}
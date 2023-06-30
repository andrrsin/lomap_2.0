import {useState} from "react";
import {Button, Container, FormGroup, TextField} from "@mui/material";
import "./login.css"
import {LoginButton} from "@inrupt/solid-ui-react";
import { login } from "@inrupt/solid-client-authn-browser";
import exp from "constants";
const Login = () => {
    const [idp, setIdp] = useState("https://inrupt.net");

    const handleSubmit = async (e:any) => {
        
        e.preventDefault(); //if not used, the page will reload and data will be lost
        login({
          redirectUrl: "http://localhost:3000/", // after redirect, come to the actual page
          oidcIssuer: idp, // redirect to the url
          clientName: "Lo Map",
        });
      };

    return (
        <div style ={{backgroundImage:" url(/Fondo.png)",height:"100vh"}}>

        <Container>
            <div className="wrapper">
            <img className="loginLogo" src="/Lomap.png"/>
            <div className="rightPart">

            <p className="loginText"> BITS is an initiative by HappySW where Lompa is redesigned to turn into a game</p>
            <p className="loginText"> As all HappySW we believe in privacy we use SOLID technologies, please log in with your account</p>
            <p className="loginText"> If not, please create an account in one of the many providers</p>
            <FormGroup className="loginInput">
                <TextField className="loginInput"
                    label="Identity Provider"
                    placeholder="Identity Provider"
                    type="url"
                    value={idp}
                    onChange={(e: any) => setIdp(e.target.value)}
                    InputProps={{
                        endAdornment: (
                            // <LoginButton oidcIssuer={idp}
                            //              redirectUrl="http://172.162.240.176:3000/main/"
                            //              onError={console.error}>
                                <Button variant="contained" onClick={(e) => {
                                    handleSubmit(e);
                                
                                }}>
                                    Login
                                </Button>
                            // </LoginButton>
                        ),
                    }}
                />
            </FormGroup>
            </div>
            </div>
        </Container>
        </div>

    );
}

export default Login;
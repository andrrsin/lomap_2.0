import {useState} from "react";
import {Button, Container, FormGroup, TextField} from "@mui/material";
import "./login.css"

import { login } from "@inrupt/solid-client-authn-browser";

const Login = () => {
    const [idp, setIdp] = useState("https://inrupt.net");

    const handleSubmit = async (e:any) => {
        
        e.preventDefault(); //if not used, the page will reload and data will be lost
        login({
          redirectUrl: "https://andrrsin.github.io/lomap_2.0/", // after redirect, come to the actual page
          oidcIssuer: idp, // redirect to the url
          clientName: "Lo Map",
        });
      };

    return (
        <div style ={{backgroundImage:" url(Fondo.png)",height:"100vh"}}>

        <Container>
            <div className="wrapper">
            <img className="loginLogo" src="Lomap.png" alt =""/>
            <div className="rightPart">

            <p className="loginText"> BITS is an initiative by HappySW where Lomap is converted to a game!</p>
            <p className="loginText"> In HappySW we believe in privacy we use SOLID technologies</p>
            <p className="loginText"> Log in with your provider or create an account in one of them.</p>
            <div className="distances"></div>
            <FormGroup className="loginInput">
                <TextField className="loginInput"
                    label="Identity Provider"
                    placeholder="Identity Provider"
                    type="url"
                    value={idp}
                    onChange={(e: any) => setIdp(e.target.value)}
                    InputLabelProps={{
                        style: {
                          color: 'white',
                        },
                      }}
                    InputProps={{
                        inputProps: {
                            style: {
                              color: 'white',
                            },
                          },
                        endAdornment: (
                            // <LoginButton oidcIssuer={idp}
                            //              redirectUrl="http://172.162.240.176:3000/main/"
                            //              onError={console.error}>
                                <Button data-testid="loginButton" variant="contained" onClick={(e) => {
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
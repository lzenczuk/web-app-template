import React, {Fragment} from "react";
import ReactDOM from "react-dom";

import CssBaseline from '@material-ui/core/CssBaseline';

import Typography from '@material-ui/core/Typography';

import ScatterJS from 'scatterjs-core';
import ScatterEOS from 'scatterjs-plugin-eosjs'

import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { Provider } from 'react-redux'
import store from "./config";
import {ProjectIDE} from "./containers/ProjectIDE";
import {ApplicationTopBar} from "./containers/ApplicationTopBar";

/*ScatterJS.plugins( new ScatterEOS() );

const network = ScatterJS.Network.fromJson({
    blockchain:'eos',
    chainId:'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
    host:'nodes.get-scatter.com',
    port:443,
    protocol:'https'
});*/

/*ident = {
    "hash": "d35a41e9fd309bc8f0d0528176c1782f1139adeac9afacda2caab14f1cb2df48",
    "publicKey": "EOS89KkiNEQHARan46jb2cA1tzBYR4Rc8kbcxwTpXjcJ9t6mxfTVZ",
    "name": "MainId",
    "kyc": false,
    "accounts": [{
        "name": "gezdmmrrgage",
        "authority": "active",
        "publicKey": "EOS88Yq9KWpbv22JDgiQ2wRvUw4cAFPM8Ap15sxydvEgVMcMuy7kK",
        "blockchain": "eos",
        "chainId": "aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906",
        "isHardware": false
    }]
};*/

class App extends React.Component{

    /*constructor(props) {
        super(props);

        this.state = {
            loggedIn: false,
            connected: false
        }
    }

    login() {

        if (!this.state.connected) {
            ScatterJS.connect('MyAppName', {network})
                .then((connected => {
                    if (!connected) return false;

                    this.setState({
                        loggedIn: false,
                        connected: true
                    });

                    return true
                }).bind(this))
                .then((connected => {
                    if(connected){
                        ScatterJS.login().then((identity => {
                            console.log("Login: "+JSON.stringify(identity));

                            if(identity!==undefined && identity.accounts!==undefined && identity.accounts.length!==0){
                                this.setState({
                                    loggedIn: true,
                                    connected: true,
                                    account: identity.accounts[0]
                                })
                            }

                        }).bind(this));
                    }
                }).bind(this));
        }else{
            ScatterJS.login().then((identity => {
                console.log("Login: "+JSON.stringify(identity));

                if(identity!==undefined && identity.accounts!==undefined && identity.accounts.length!==0){
                    this.setState({
                        loggedIn: true,
                        connected: true,
                        account: identity.accounts[0]
                    })
                }

            }).bind(this));
        }
    }

    logout() {
        ScatterJS.logout();
        this.setState({
            loggedIn: false,
            connected: true
        });
    }*/


    render(){

        /*let loginButton = null;

        if(this.state.loggedIn){
            loginButton = <Fragment>
                <Typography variant="subtitle1">{this.state.account.name}</Typography>
                <Button onClick={this.logout.bind(this)}>Logout</Button>
            </Fragment>
        }else{
            loginButton = <Button onClick={this.login.bind(this)}>Login</Button>
        }*/

        return <Provider store={store}>
            <Fragment>
                <CssBaseline/>
                <ApplicationTopBar/>
                <ProjectIDE/>
            </Fragment>
        </Provider>

        // TODO - add this!!!!!
        // <Typography variant="caption">{BRANCH} {COMMITHASH}</Typography>
    }
}

ReactDOM.render(<App/>, document.getElementById("index"));



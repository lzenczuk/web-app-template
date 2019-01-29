import React, {Fragment} from "react";
import ReactDOM from "react-dom";

import CssBaseline from '@material-ui/core/CssBaseline';

import Typography from '@material-ui/core/Typography';

import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { Provider } from 'react-redux'
import store from "./config";
import {ProjectIDE} from "./containers/ProjectIDE";



const App = () => {

    return <Provider store={store}>
        <Fragment>
            <CssBaseline/>
            <AppBar>
                <ToolBar variant="dense">
                    <Typography variant="h6" style={{flexGrow: 1}}>Hello</Typography>
                    <Typography variant="caption">{BRANCH} {COMMITHASH}</Typography>
                    <Button>Login</Button>
                </ToolBar>
            </AppBar>
            <ProjectIDE/>
        </Fragment>
    </Provider>
};

ReactDOM.render(<App/>, document.getElementById("index"));



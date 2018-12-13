import React, {Fragment} from "react";
import ReactDOM from "react-dom";

import CssBaseline from '@material-ui/core/CssBaseline';

import Typography from '@material-ui/core/Typography';

import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { Provider } from 'react-redux'
import store from "./stores/stores";

import { FileTree } from "./containers/FileManager";



const App = () => {
    return <Provider store={store}>
        <Fragment>
            <CssBaseline/>
            <AppBar>
                <ToolBar variant="dense">
                    <Typography variant="h6" style={{flexGrow: 1}}>Hello</Typography>
                    <Button>Login</Button>
                </ToolBar>
            </AppBar>
            <div style={{marginTop: 48, padding: 8, display: "flex"}}>
                <Paper>
                    <FileTree/>
                </Paper>
            </div>
        </Fragment>
    </Provider>
};

ReactDOM.render(<App/>, document.getElementById("index"));



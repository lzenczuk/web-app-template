import React, {Fragment} from "react";
import ReactDOM from "react-dom";

import CssBaseline from '@material-ui/core/CssBaseline';

import Typography from '@material-ui/core/Typography';

import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { Provider } from 'react-redux'
import store from "./config";

import { FileManager } from "./containers/FileManager";
import { FileEditor } from "./components/FileEditor";
import Grid from "@material-ui/core/Grid/Grid";


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
            <Grid container direction="row" justify="flex-start" alignItems="stretch" spacing={8}>
                <Grid item xs={3} container alignItems="stretch">
                    <Paper style={{flexGrow: 1}}>
                        <FileManager/>
                    </Paper>
                </Grid>
                <Grid item xs={9} container alignItems="stretch">
                    <FileEditor />
                </Grid>
            </Grid>
        </Fragment>
    </Provider>
};

ReactDOM.render(<App/>, document.getElementById("index"));



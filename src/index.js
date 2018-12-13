import React, {Fragment} from "react";
import ReactDOM from "react-dom";

import CssBaseline from '@material-ui/core/CssBaseline';

import Typography from '@material-ui/core/Typography';

import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

import {List, ListItem, ListItemText} from '@material-ui/core';

import { closeContextMenu, renameSelectedFile } from "./actions/actions"
import { connect } from 'react-redux'
import { Provider } from 'react-redux'
import store from "./stores/stores";

import { FileTree } from "./containers/FileManager";


// =========================== context menu =================================

const FileManagerContextMenu = (props) => {
    const { visible, top, left, type, onCloseContextMenuClick }  = props;
    const { onRenameFileSelected } = props;

    const onClick = (e) => {
        e.preventDefault();
        onCloseContextMenuClick();
    };

    const onRenameFileClicked = () => {
        onRenameFileSelected()
    };

    let menu = <div/>;

    switch (type) {
        case "FOLDER_CONTEXT_MENU":
            menu = <Paper style={{ position: 'absolute', top: top, left: left, zIndex: 1001}}>
                <List>
                    <ListItem button ><ListItemText>New folder</ListItemText></ListItem>
                    <ListItem button ><ListItemText>New file</ListItemText></ListItem>
                    <ListItem button ><ListItemText>Rename</ListItemText></ListItem>
                    <ListItem button ><ListItemText>Delete</ListItemText></ListItem>
                </List>
            </Paper>;

            break;

        case "FILE_CONTEXT_MENU":
            menu = <Paper style={{ position: 'absolute', top: top, left: left, zIndex: 1001}}>
                <List>
                    <ListItem button onClick={onRenameFileClicked}><ListItemText>Rename</ListItemText></ListItem>
                    <ListItem button ><ListItemText>Delete</ListItemText></ListItem>
                </List>
            </Paper>;

            break;

    }

    if(visible){
        return <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, zIndex: 1000}} onClick={onClick} onContextMenu={onClick}>
            {menu}
        </div>
    }else{
        return <div/>
    }
};

// --------------------------------------------------------------------------------

const FileManagerContextMenuContainer = connect(
    state => state.fileManagerContextMenu,
    dispatch => {
        return {
            onCloseContextMenuClick: () => {
                dispatch(closeContextMenu())
            },
            onRenameFileSelected: () => {
                dispatch(renameSelectedFile())
            }
        }
    }
)(FileManagerContextMenu);


// =========================== Main app =====================================

const App = () => {
    return <Provider store={store}>
        <Fragment>
            <CssBaseline/>
            <FileManagerContextMenuContainer/>
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



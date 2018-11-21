import React, {Fragment} from "react";
import ReactDOM from "react-dom";

import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';

import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

import {List, ListItem, ListItemText, ListItemIcon, Collapse, Badge} from '@material-ui/core';
import {Folder, FolderOpen, InsertDriveFile, Delete, CreateNewFolder, NoteAdd, Edit} from '@material-ui/icons';

// theme structure: ThemeOptions in @material-ui/core/styles/createMuiTheme
const style = theme => ({
    abiFile: {
        top: 11,
        color: "white",
        backgroundColor: "green",
        fontSize: "0.5rem",
        width: 15,
        height: 15,
        right: -4,
    },
    cppFile: {
        top: 11,
        color: "white",
        backgroundColor: "red",
        fontSize: "0.5rem",
        width: 15,
        height: 15,
        right: -4,
    },
    contextIcon: {
        fontSize: "1rem",
        color: theme.palette.action.active,
        '&:hover': {
            color: theme.palette.secondary.main,
        },
    }
});

const Inner = withStyles(style)((props) => {

    const { classes } = props;

    let dense = true;

    return <List dense={dense}>
        <ListItem button>
            <ListItemIcon><Folder/></ListItemIcon>
            <ListItemText>scheduler</ListItemText>
            <div style={{position: "absolute", right: 0}}>
                <Edit className={classes.contextIcon}/>
                <CreateNewFolder className={classes.contextIcon}/>
                <NoteAdd className={classes.contextIcon}/>
                <Delete className={classes.contextIcon}/>
            </div>
        </ListItem>
        <ListItem button>
            <ListItemIcon><FolderOpen/></ListItemIcon>
            <ListItemText>hello</ListItemText>
        </ListItem>
        <Collapse in={true}>
            <List dense={dense}>
                <ListItem button>
                    <ListItemIcon style={{paddingLeft: 16}}><InsertDriveFile/><Badge badgeContent="abi" classes={{ badge: classes.abiFile }}/></ListItemIcon>
                    <ListItemText secondary="generated"><Typography variant="subtitle2">hello.abi</Typography></ListItemText>
                </ListItem>
                <ListItem button>
                    <ListItemIcon style={{paddingLeft: 16}}><InsertDriveFile/><Badge badgeContent="cpp" classes={{ badge: classes.cppFile }}/></ListItemIcon>
                    <ListItemText>hallo.cpp</ListItemText>
                </ListItem>
            </List>
        </Collapse>
        <ListItem button>
            <ListItemIcon><InsertDriveFile/></ListItemIcon>
            <ListItemText>README.md</ListItemText>
        </ListItem>
        <ListItem button>
            <ListItemIcon><InsertDriveFile/></ListItemIcon>
            <ListItemText>License.txt</ListItemText>
        </ListItem>
        <ListItem>
            <ListItemIcon><Folder/></ListItemIcon>
            <ListItemText primary="target" secondary="generated build files"/>
        </ListItem>
    </List>
});

const App = () => {
    return <Fragment>
        <CssBaseline/>
        <AppBar>
            <ToolBar variant="dense">
                <Typography variant="h6" style={{flexGrow: 1}}>Hello</Typography>
                <Button>Login</Button>
            </ToolBar>
        </AppBar>
        <div style={{marginTop: 48, padding: 8, display: "flex"}}>
            <Paper>
                <Inner/>
            </Paper>
        </div>
    </Fragment>
};

ReactDOM.render(<App/>, document.getElementById("index"));



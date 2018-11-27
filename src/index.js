import React, {Fragment} from "react";
import ReactDOM from "react-dom";

import CssBaseline from '@material-ui/core/CssBaseline';
import {withStyles} from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';

import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

import {List, ListItem, ListItemText, ListItemIcon, Collapse, Badge} from '@material-ui/core';
import {Folder, FolderOpen, InsertDriveFile, Delete, CreateNewFolder, NoteAdd, Edit, ArrowRight, ArrowDropDown} from '@material-ui/icons';

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

    let {classes, children, level, parentId} = props;

    if(level===undefined){
        level=0
    }

    if(parentId===undefined){
        parentId='/' // root
    }

    let dense = true;

    let ch = children.map(child => {
        if (child.type === "FILE") {
            return (
                <ListItem button key={parentId+"/"+child.name}>
                    <ListItemIcon style={{paddingLeft: level*16}}><InsertDriveFile/></ListItemIcon>
                    <ListItemText>{child.name}</ListItemText>
                </ListItem>
            )
        }else if(child.type==="FOLDER"){

            const folderIcon = child.open===true ? <FolderOpen/> : <Folder/>;
            const arrowIcon = child.open===true ? <ArrowDropDown/> : <ArrowRight/>;

            return (
                <Fragment key={parentId+"/"+child.name}>
                    <ListItem button>
                        <ListItemIcon style={{paddingLeft: level*16, marginRight: 0}}>{arrowIcon}</ListItemIcon>
                        <ListItemIcon>{folderIcon}</ListItemIcon>
                        <ListItemText>{child.name}</ListItemText>
                    </ListItem>
                    <Collapse in={child.open}>
                        <Inner name={child.name} children={child.children} level={level+1} parentId={parentId+"/"+child.name+"/"}/>
                    </Collapse>
                </Fragment>
            )
        }else{
            return <span/>
        }
    });

    return <List dense={dense}>
        {ch}
    </List>
});

let p = {
    projectName: "test",
    root: {
        type: "FOLDER",
        name: "",
        open: true,
        children: [
            {
                type: "FOLDER",
                name: "scheduler",
                open: true,
                children: [
                    {
                        type: "FOLDER",
                        name: "local",
                        open: true,
                        children: [
                            {
                                type: "FILE",
                                name: "local_scheduler.hpp",
                                content: "Test scheduler.hpp"
                            },
                            {
                                type: "FILE",
                                name: "local_scheduler.cpp",
                                content: "Test scheduler.cpp"
                            }
                        ]
                    },
                    {
                        type: "FOLDER",
                        name: "remote",
                        open: false,
                        children: [
                            {
                                type: "FILE",
                                name: "remote_scheduler.hpp",
                                content: "Test scheduler.hpp"
                            },
                            {
                                type: "FILE",
                                name: "remote_scheduler.cpp",
                                content: "Test scheduler.cpp"
                            }
                        ]
                    },
                    {
                        type: "FILE",
                        name: "scheduler.hpp",
                        content: "Test scheduler.hpp"
                    },
                    {
                        type: "FILE",
                        name: "scheduler.cpp",
                        content: "Test scheduler.cpp"
                    }
                ]
            },
            {
                type: "FOLDER",
                name: "hello",
                open: false,
                children: [
                    {
                        type: "FILE",
                        name: "hello.hpp",
                        content: "Test hello.hpp"
                    },
                    {
                        type: "FILE",
                        name: "hello.cpp",
                        content: "Test hello.cpp"
                    }
                ]
            },
            {
                type: "FILE",
                name: "scheduler.hpp",
                content: "Test scheduler.hpp"
            }
        ]
    }
};


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
                <Inner name={p.root.name} children={p.root.children}/>
            </Paper>
        </div>
    </Fragment>
};

ReactDOM.render(<App/>, document.getElementById("index"));



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
import {
    Folder as FolderIcon,
    FolderOpen,
    InsertDriveFile,
    Delete,
    CreateNewFolder,
    NoteAdd,
    Edit,
    ArrowRight,
    ArrowDropDown
} from '@material-ui/icons';


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

const File = (props) => {

    const {name, level} = props;

    return (
        <ListItem button>
            <ListItemIcon><InsertDriveFile/></ListItemIcon>
            <ListItemText>{name}</ListItemText>
        </ListItem>
    )
};

const Folder = (props) => {

    let {parentId, name, level, files, open} = props;

    if (files === undefined) {
        files = []
    }

    if (level === undefined) {
        level = 0
    }

    const subFiles = files.map(file => {

        switch (file.type) {
            case "FILE":
                return <File key={parentId + '/' + file.name} name={file.name} level={level + 1}/>;
            case "FOLDER":
                return <Folder key={parentId + '/' + file.name} parentId={parentId + '/' + file.name} name={file.name} level={level + 1} open={file.open} files={file.files}/>;
            default:
                throw "Unknown file type: " + file.type
        }
    });

    const folderIcon = open===true ? <FolderOpen/> : <FolderIcon/>;
    const arrowIcon = open===true ? <ArrowDropDown/> : <ArrowRight/>;

    return (
        <Fragment>
            <ListItem button>
                <ListItemIcon>{arrowIcon}</ListItemIcon>
                <ListItemIcon>{folderIcon}</ListItemIcon>
                <ListItemText>{name}</ListItemText>
            </ListItem>
            <Collapse in={open}>
                {subFiles}
            </Collapse>
        </Fragment>
    )
};

const FileTree = (props) => {

    const {files} = props;

    return <Folder key={''} parentId={''} name={'/'} level={0} open={true} files={files}/>
};


let p = {
    projectName: "test",
    files: [
        {
            type: "FOLDER",
            name: "scheduler",
            open: true,
            files: [
                {
                    type: "FOLDER",
                    name: "local",
                    open: true,
                    files: [
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
                    files: [
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
            files: [
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
                <FileTree files={p.files}/>
            </Paper>
        </div>
    </Fragment>
};

ReactDOM.render(<App/>, document.getElementById("index"));



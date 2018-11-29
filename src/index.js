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


function generateSubElements(files, parentId, level) {
    return files.map(file => {

        switch (file.type) {
            case "FILE":
                return <File key={parentId + '/' + file.name} name={file.name} level={level + 1}/>;
            case "FOLDER":
                return <Folder key={parentId + '/' + file.name} parentId={parentId + '/' + file.name} name={file.name}
                               level={level + 1} open={file.open} files={file.files}/>;
            default:
                throw "Unknown file type: " + file.type
        }
    });
}

// ------------------------------- File ------------------------------

const fileStyle = theme => ({
    listItemRoot: {
            padding: 4,
    },
    fileIconRoot: {
            margin: 0,
            marginRight: 4,
    },
    textItemRoot: {
        padding: 0,
        paddingRight: 4,
    },
    textItemPrimary: {
        fontSize: "0.75rem",
    }
});

const File = withStyles(fileStyle)((props) => {

    const {name, level, classes} = props;

    return (
        <ListItem button classes={{root: classes.listItemRoot}} style={{paddingLeft: level*16}}>
            <ListItemIcon classes={{root: classes.fileIconRoot}}><InsertDriveFile/></ListItemIcon>
            <ListItemText classes={{root: classes.textItemRoot, primary: classes.textItemPrimary}}>{name}</ListItemText>
        </ListItem>
    )
});

// ------------------------------- Folder ------------------------------

const folderStyle = theme => ({
    listItemRoot: {
        padding: 4,
    },
    iconItemRoot: {
        margin: 0,
        marginRight: 4,
    },
    textItemRoot: {
        padding: 0,
        paddingRight: 4,
    },
    textItemPrimary: {
        fontSize: "0.75rem",
    }
});

const Folder = withStyles(folderStyle)((props) => {

    let {parentId, name, level, files, open, classes} = props;

    if (files === undefined) {
        files = []
    }

    if (level === undefined) {
        level = 0
    }

    const subFiles = generateSubElements(files, parentId, level);

    const folderIcon = open===true ? <FolderOpen/> : <FolderIcon/>;
    const arrowIcon = open===true ? <ArrowDropDown/> : <ArrowRight/>;

    return (
        <Fragment>
            <ListItem button classes={{root: classes.listItemRoot}} style={{paddingLeft: level*16}}>
                <ListItemIcon classes={{root: classes.iconItemRoot}}>{arrowIcon}</ListItemIcon>
                <ListItemIcon classes={{root: classes.iconItemRoot}}>{folderIcon}</ListItemIcon>
                <ListItemText classes={{root: classes.textItemRoot, primary: classes.textItemPrimary}}>{name}</ListItemText>
            </ListItem>
            <Collapse in={open}>
                {subFiles}
            </Collapse>
        </Fragment>
    )
});

// ------------------------------- FileTree ------------------------------

const FileTree = (props) => {

    const {files} = props;

    const subFiles = generateSubElements(files, '', 0);

    return (<Fragment>
        {subFiles}
    </Fragment>)

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



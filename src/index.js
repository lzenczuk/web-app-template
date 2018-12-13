import React, {Fragment} from "react";
import ReactDOM from "react-dom";

import CssBaseline from '@material-ui/core/CssBaseline';
import {withStyles} from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';

import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

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

import {
    toggleFolder,
    openFolderContextMenu,
    closeContextMenu,
    openFileContextMenu,
    renameSelectedFile
} from "./actions/actions"
import { connect } from 'react-redux'
import { Provider } from 'react-redux'
import store from "./stores/stores";


function generateSubElements(files, parentId, level, onFolderClick, onFolderContextMenuClick, onFileContextMenuClick) {
    return files.map(file => {

        switch (file.type) {
            case "FILE":
                return <File key={parentId + '/' + file.name} parentId={parentId + '/' + file.name} name={file.name} level={level + 1} onFileContextMenuClick={onFileContextMenuClick}/>;
            case "FOLDER":
                return <Folder key={parentId + '/' + file.name} parentId={parentId + '/' + file.name} name={file.name}
                               level={level + 1} open={file.open} files={file.files} onFolderClick={onFolderClick} onFolderContextMenuClick={onFolderContextMenuClick} onFileContextMenuClick={onFileContextMenuClick}/>;
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

    const {name, level, classes, parentId, onFileContextMenuClick} = props;

    const onRightClick = (e) => {
        e.preventDefault();
        onFileContextMenuClick(parentId, e.clientY, e.clientX)
    };

    return (
        <ListItem button classes={{root: classes.listItemRoot}} style={{paddingLeft: level*20}} onContextMenu={onRightClick}>
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

    let {parentId, name, level, files, open, classes, onFolderClick, onFolderContextMenuClick, onFileContextMenuClick} = props;

    if (files === undefined) {
        files = []
    }

    if (level === undefined) {
        level = 0
    }

    const subFiles = generateSubElements(files, parentId, level, onFolderClick, onFolderContextMenuClick, onFileContextMenuClick);

    const folderIcon = open===true ? <FolderOpen/> : <FolderIcon/>;
    const arrowIcon = open===true ? <ArrowDropDown/> : <ArrowRight/>;

    const folderClick = () => onFolderClick(parentId);

    const folderContextClick = (e) => {
        e.preventDefault();
        onFolderContextMenuClick(parentId, e.clientY, e.clientX)
    };

    return (
        <Fragment>
            <ListItem button classes={{root: classes.listItemRoot}} style={{paddingLeft: level*16}} onContextMenu={folderContextClick} onClick={folderClick}>
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

    const {files, onFolderClick, onFolderContextMenuClick, onFileContextMenuClick} = props;
    const { renameFileDialog } = props;

    const subFiles = generateSubElements(files, '', 0, onFolderClick, onFolderContextMenuClick, onFileContextMenuClick);

    return (<Fragment>
        {subFiles}
        <Dialog open={renameFileDialog.open}>
            <DialogTitle>Rename file</DialogTitle>
            <DialogContent>
                <DialogContentText>You up to rename file {renameFileDialog.name}</DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="New file name"
                    type="email"
                    fullWidth
                    value={renameFileDialog.name}
                />
            </DialogContent>
            <DialogActions>
                <Button color="primary">
                    Rename
                </Button>
                <Button color="primary">
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    </Fragment>)

};

// ---------------------------- Containers --------------------------------

// In my case I don't do anything with state (filtering, mapping...)
const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => {
    return {
        onFolderClick: pathArray => {
            dispatch(toggleFolder(pathArray))
        },
        onFolderContextMenuClick: (path, top, left) => {
            dispatch(openFolderContextMenu(path, top, left))
        },
        onFileContextMenuClick: (path, top, left) => {
            dispatch(openFileContextMenu(path, top, left))
        }
    }
};

const FileTreeContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(FileTree);

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
                    <FileTreeContainer/>
                </Paper>
            </div>
        </Fragment>
    </Provider>
};

ReactDOM.render(<App/>, document.getElementById("index"));



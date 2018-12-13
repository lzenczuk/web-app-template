import {Fragment} from "react";
import {Collapse, ListItem, ListItemIcon, ListItemText, withStyles} from "@material-ui/core";
import {ArrowDropDown, ArrowRight, Folder as FolderIcon, FolderOpen, InsertDriveFile} from "@material-ui/icons";
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText/DialogContentText";
import TextField from "@material-ui/core/TextField/TextField";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Button from "@material-ui/core/Button/Button";
import React from "react";

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

export const File = withStyles(fileStyle)((props) => {

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

export const Folder = withStyles(folderStyle)((props) => {

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

export const FileTree = (props) => {

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

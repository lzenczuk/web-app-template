import {Fragment} from "react";
import {Collapse, List, ListItem, ListItemIcon, ListItemText, withStyles} from "@material-ui/core";
import {ArrowDropDown, ArrowRight, Folder as FolderIcon, FolderOpen, InsertDriveFile} from "@material-ui/icons";
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import TextField from "@material-ui/core/TextField/TextField";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Button from "@material-ui/core/Button/Button";
import React from "react";
import Paper from "@material-ui/core/Paper/Paper";

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


const ContextMenu = (props) => {
    const { top, left, type, onCanceled, parentId}  = props;
    const { onRenameSelected } = props;

    const onClick = (e) => {
        e.preventDefault();
        onCanceled();
    };

    const onRenameClicked = () => {
        onRenameSelected(parentId)
    };

    let menu = <div/>;

    switch (type) {
        case "FOLDER_CONTEXT_MENU":
            menu = <Paper style={{ position: 'absolute', top: top, left: left, zIndex: 1001}}>
                <List>
                    <ListItem button ><ListItemText>New folder</ListItemText></ListItem>
                    <ListItem button ><ListItemText>New file</ListItemText></ListItem>
                    <ListItem button  onClick={onRenameClicked}><ListItemText>Rename</ListItemText></ListItem>
                    <ListItem button ><ListItemText>Delete</ListItemText></ListItem>
                </List>
            </Paper>;

            break;

        case "FILE_CONTEXT_MENU":
            menu = <Paper style={{ position: 'absolute', top: top, left: left, zIndex: 1001}}>
                <List>
                    <ListItem button onClick={onRenameClicked}><ListItemText>Rename</ListItemText></ListItem>
                    <ListItem button ><ListItemText>Delete</ListItemText></ListItem>
                </List>
            </Paper>;

            break;

    }


    return <Fragment>
        <div style={{position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, zIndex: 1000}} onClick={onClick} onContextMenu={onClick}>
        </div>
        {menu}
        </Fragment>

};


class RenameFileDialog extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            name: props.name
        }
    }

    handleNameChange(event){
        this.setState({
            name: event.target.value
        })
    }

    render(){

        let name = this.state.name;

        const onRenameClick = (e) => {
            this.props.onRename(this.props.parentId, this.state.name)
        };

        return <Dialog open={true}>
            <DialogTitle>Rename file {this.props.name}</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="New file name"
                    type="email"
                    fullWidth
                    value={name}
                    onChange={this.handleNameChange.bind(this)}
                />
            </DialogContent>
            <DialogActions>
                <Button color="primary" onClick={onRenameClick}>
                    Rename
                </Button>
                <Button color="primary" onClick={this.props.onCancel}>
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    }
}

// ------------------------------- FileTree ------------------------------


export class FileTree extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            contextMenu: {
                visible: false,
            },
            fileRenameDialog: {
                visible: false,
            }
        }
    }

    handleFolderRightClick(parentId, x, y){
        this.setState({
            contextMenu: {
                visible: true,
                top: x,
                left: y,
                type: "FOLDER_CONTEXT_MENU",
                parentId: parentId
            }
        })
    }

    handleFileRightClick(parentId, x, y){
        this.setState({
            contextMenu: {
                visible: true,
                top: x,
                left: y,
                type: "FILE_CONTEXT_MENU",
                parentId: parentId
            }
        })
    }

    handleCancelAction(){

        this.setState({
            contextMenu: {
                visible: false,
            },
            fileRenameDialog: {
                visible: false,
            }
        })
    }

    handleRenameSelected(parentId){

        this.setState({
            contextMenu: {
                visible: false,
            },
            fileRenameDialog: {
                visible: true,
                parentId: parentId
            }
        })
    }

    handleRenameRequest(parentId, name){

        this.setState({
            contextMenu: {
                visible: false,
            },
            fileRenameDialog: {
                visible: false,
            }
        });

        this.props.onRename(parentId, name)
    }

    render(){
        const {files, onFolderClick } = this.props;

        const subFiles = generateSubElements(files, '', 0, onFolderClick, this.handleFolderRightClick.bind(this), this.handleFileRightClick.bind(this));

        let contextMenu = null;
        if(this.state.contextMenu.visible){

            const {top, left, type} = this.state.contextMenu;

            contextMenu = <ContextMenu parentId={this.state.contextMenu.parentId} top={top} left={left} type={type} onCanceled={this.handleCancelAction.bind(this)} onRenameSelected={this.handleRenameSelected.bind(this)}/>
        }

        let fileRenameDialog = null;
        if(this.state.fileRenameDialog.visible){

            const name = this.state.fileRenameDialog.parentId.split("/").pop();

            fileRenameDialog = <RenameFileDialog parentId={this.state.fileRenameDialog.parentId} name={name} onRename={this.handleRenameRequest.bind(this)} onCancel={this.handleCancelAction.bind(this)}/>
        }

        return (<Fragment>
            {contextMenu}
            {subFiles}
            {fileRenameDialog}
        </Fragment>)
    }
};

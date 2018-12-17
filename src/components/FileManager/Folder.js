import {Collapse, ListItem, ListItemIcon, ListItemText, withStyles} from "@material-ui/core";
import {ArrowDropDown, ArrowRight, Folder as FolderIcon, FolderOpen} from "@material-ui/icons";
import React, {Fragment} from "react";
import {File} from "./File";
import {FileManagerContextMenu} from "./FileManagerContextMenu";
import {FileManagerDialog} from "./FileManagerDialog";


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

class FolderInternal extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            open: false,
            contextMenuVisible: false,
            fileDialogVisible: false,
        }
    }

    handleClick(e){
        e.preventDefault();

        this.setState({
            open: !this.state.open,
            contextMenuVisible: false,
            fileDialogVisible: false,
        })
    };

    handleRightClick(e){
        e.preventDefault();

        this.setState({
            open: this.state.open,
            contextMenuVisible: true,
            x: e.clientX,
            y: e.clientY,
        })
    };

    handleSelectedOperation(operation){
        switch (operation) {
            case "RENAME":
                this.setState({
                    open: this.state.open,
                    contextMenuVisible: false,
                    fileDialogVisible: true,
                    operation: operation,
                    confirmationOnly: false,
                    title: "Rename folder "+this.props.name,
                    label: "New name",
                    value: this.props.name
                });
                break;
            case "NEW_FOLDER":
                this.setState({
                    open: this.state.open,
                    contextMenuVisible: false,
                    fileDialogVisible: true,
                    operation: operation,
                    confirmationOnly: false,
                    title: "New folder",
                    label: "Name",
                    value: ""
                });
                break;
            case "NEW_FILE":
                this.setState({
                    open: this.state.open,
                    contextMenuVisible: false,
                    fileDialogVisible: true,
                    operation: operation,
                    confirmationOnly: false,
                    title: "New file",
                    label: "Name",
                    value: ""
                });
                break;
            case "REMOVE":
                this.setState({
                    open: this.state.open,
                    contextMenuVisible: false,
                    fileDialogVisible: true,
                    operation: operation,
                    confirmationOnly: true,
                    title: "Delete folder "+this.props.name,
                });
                break;
        }
    }

    handleAcceptedOperation(param1){

        switch (this.state.operation) {
            case "NEW_FOLDER":
                const folderName = param1;
                this.props.onNewFolder(this.props.parentId, folderName);
                break;
            case "NEW_FILE":
                const fileName = param1;
                this.props.onNewFile(this.props.parentId, fileName);
                break;
            case "RENAME":
                const newName = param1;
                this.props.onRename(this.props.parentId, newName);
                break;
            case "REMOVE":
                this.props.onDelete(this.props.parentId);
                break;
        }

        this.setState({
            open: this.state.open,
            contextMenuVisible: false,
            fileDialogVisible: false,
        });
    }


    handleCanceledOperation(){

        this.setState({
            open: this.state.open,
            contextMenuVisible: false,
            fileDialogVisible: false,
        });
    }


    render(){
        let {parentId, name, level, files, folders, classes, onRename, onDelete, onNewFolder, onNewFile} = this.props;

        if (files === undefined) {
            files = []
        }

        if (folders === undefined) {
            folders = []
        }

        if (level === undefined) {
            level = 0
        }

        const foldersComponents = folders.map( folder => {
            return <Folder key={parentId + '/' + folder.name} parentId={parentId + '/' + folder.name} name={folder.name}
                           level={level + 1}  files={folder.files} folders={folder.folders}
                           onRename={onRename} onDelete={onDelete} onNewFolder={onNewFolder} onNewFile={onNewFile}/>;
        });

        const filesComponents = files.map( file => {
            return <File key={parentId + '/' + file.name} parentId={parentId + '/' + file.name} name={file.name}
                         level={level + 1} onRename={onRename} onDelete={onDelete}/>;
        });

        const folderIcon = this.state.open === true ? <FolderOpen/> : <FolderIcon/>;
        const arrowIcon = this.state.open === true ? <ArrowDropDown/> : <ArrowRight/>;

        return (
            <Fragment>
                <ListItem button classes={{root: classes.listItemRoot}} style={{paddingLeft: level * 16}}
                          onContextMenu={this.handleRightClick.bind(this)} onClick={this.handleClick.bind(this)}>
                    <ListItemIcon classes={{root: classes.iconItemRoot}}>{arrowIcon}</ListItemIcon>
                    <ListItemIcon classes={{root: classes.iconItemRoot}}>{folderIcon}</ListItemIcon>
                    <ListItemText
                        classes={{root: classes.textItemRoot, primary: classes.textItemPrimary}}>{name}</ListItemText>
                </ListItem>
                <Collapse in={this.state.open}>
                    {foldersComponents}
                    {filesComponents}
                </Collapse>

                <FileManagerContextMenu
                    folder={true}
                    visible={this.state.contextMenuVisible}
                    left={this.state.x}
                    top={this.state.y}
                    onCancel={this.handleCanceledOperation.bind(this)}
                    onOperationSelected={this.handleSelectedOperation.bind(this)}
                />

                <FileManagerDialog
                    visible={this.state.fileDialogVisible}
                    confirmationOnly={this.state.confirmationOnly}
                    title={this.state.title}
                    label={this.state.label}
                    value={name}
                    onAccept={this.handleAcceptedOperation.bind(this)}
                    onCancel={this.handleCanceledOperation.bind(this)}/>

            </Fragment>
        )
    }

}

export const Folder = withStyles(folderStyle)(FolderInternal);

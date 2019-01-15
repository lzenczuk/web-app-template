import {ListItem, ListItemIcon, ListItemText, withStyles} from "@material-ui/core";
import {InsertDriveFile} from "@material-ui/icons";
import React from "react";
import {FileManagerContextMenu} from "./FileManagerContextMenu";
import {FileManagerDialog} from "./FileManagerDialog";

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

class FileInternal extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            contextMenuVisible: false,
            fileDialogVisible: false,
        }
    }

    handleRightClick(e){
        e.preventDefault();

        this.setState({
            contextMenuVisible: true,
            x: e.clientX,
            y: e.clientY,
        })
    };

    handleDoubleClick(e){
        e.preventDefault();
        this.props.onSelect(this.props.parentId)
    };

    handleSelectedOperation(operation){
        switch (operation) {
            case "RENAME":
                this.setState({
                    contextMenuVisible: false,
                    fileDialogVisible: true,
                    operation: operation,
                    confirmationOnly: false,
                    title: "Rename file "+this.props.name,
                    label: "New name",
                    value: this.props.name
                });
                break;
            case "REMOVE":
                this.setState({
                    contextMenuVisible: false,
                    fileDialogVisible: true,
                    operation: operation,
                    confirmationOnly: true,
                    title: "Delete file "+this.props.name,
                });
                break;
        }
    }

    handleAcceptedOperation(param1){
        switch (this.state.operation) {
            case "RENAME":
                const newName = param1;
                this.props.onRename(this.props.parentId, newName);
                break;
            case "REMOVE":
                this.props.onDelete(this.props.parentId);
                break;
        }

        this.setState({
            contextMenuVisible: false,
            fileDialogVisible: false,
        });
    }


    handleCanceledOperation(){
        this.setState({
            contextMenuVisible: false,
            fileDialogVisible: false,
        });
    }

    render(){

        const { name, level, classes } = this.props;

        return <ListItem
            button
            classes={{root: classes.listItemRoot}}
            style={{paddingLeft: level * 20}}
            onContextMenu={this.handleRightClick.bind(this)}
            onDoubleClick={this.handleDoubleClick.bind(this)}
        >
            <ListItemIcon classes={{root: classes.fileIconRoot}}><InsertDriveFile/></ListItemIcon>
            <ListItemText classes={{root: classes.textItemRoot, primary: classes.textItemPrimary}}>{name}</ListItemText>
            <FileManagerContextMenu
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
                value={this.state.value}
                onAccept={this.handleAcceptedOperation.bind(this)}
                onCancel={this.handleCanceledOperation.bind(this)}/>
        </ListItem>
    }
}

export const File = withStyles(fileStyle)(FileInternal);

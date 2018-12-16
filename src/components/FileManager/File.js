import {ListItem, ListItemIcon, ListItemText, withStyles} from "@material-ui/core";
import {InsertDriveFile} from "@material-ui/icons";
import React from "react";
import {FileContextMenu} from "./FileContextMenu";
import {NameDialog} from "./NameDialog";

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
            contextMenuVisible: false
        }
    }

    onRightClick(e){
        e.preventDefault();

        console.log("client: "+e.clientX+", "+e.clientY);
        console.log("offset: "+e.offsetX+", "+e.offsetY);
        console.log("screen: "+e.screenX+", "+e.screenY);
        console.log("page: "+e.pageX+", "+e.pageY);

        this.setState({
            contextMenuVisible: true,
            x: e.clientX,
            y: e.clientY,
        })
    };

    onCancelContextAction(){
        this.setState({
            contextMenuVisible: false,
            renameDialogVisible: false,
        })
    };

    onRenameSelected(){
        this.setState({
            contextMenuVisible: false,
            renameDialogVisible: true
        })
    };

    onDeleteSelected(){
        this.setState({
            contextMenuVisible: false,
        })
    };

    onRenameAccepted(newName){
        this.setState({
            contextMenuVisible: false,
            renameDialogVisible: false,
        });

        this.props.onRename(this.props.parentId, newName)
    }

    render(){

        const { name, level, classes } = this.props;

        return <ListItem button classes={{root: classes.listItemRoot}} style={{paddingLeft: level * 20}}
                         onContextMenu={this.onRightClick.bind(this)}>
            <ListItemIcon classes={{root: classes.fileIconRoot}}><InsertDriveFile/></ListItemIcon>
            <ListItemText classes={{root: classes.textItemRoot, primary: classes.textItemPrimary}}>{name}</ListItemText>
            <FileContextMenu
                visible={this.state.contextMenuVisible}
                left={this.state.x}
                top={this.state.y}
                onCancel={this.onCancelContextAction.bind(this)}
                onRenameSelected={this.onRenameSelected.bind(this)}
                onDelteSelected={this.onDeleteSelected.bind(this)}
            />
            <NameDialog visible={this.state.renameDialogVisible} name={name} rename={true} onAccept={this.onRenameAccepted.bind(this)} onCancel={this.onCancelContextAction.bind(this)}/>
        </ListItem>
    }
}

export const File = withStyles(fileStyle)(FileInternal);

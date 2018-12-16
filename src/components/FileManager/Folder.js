import {Collapse, ListItem, ListItemIcon, ListItemText, withStyles} from "@material-ui/core";
import {ArrowDropDown, ArrowRight, Folder as FolderIcon, FolderOpen} from "@material-ui/icons";
import React, {Fragment} from "react";
import {File} from "./File";


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
            open: false
        }
    }

    render(){
        let {parentId, name, level, files, folders, classes, onRename} = this.props;

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
                           onRename={onRename}/>;
        });

        const filesComponents = files.map( file => {
            return <File key={parentId + '/' + file.name} parentId={parentId + '/' + file.name} name={file.name}
                         level={level + 1} onRename={onRename}/>;
        });

        const folderIcon = this.state.open === true ? <FolderOpen/> : <FolderIcon/>;
        const arrowIcon = this.state.open === true ? <ArrowDropDown/> : <ArrowRight/>;

        const folderClick = () => {
            this.setState({ open: !this.state.open })
        };

        const folderContextClick = (e) => {
            e.preventDefault();
            onFolderContextMenuClick(parentId, e.clientY, e.clientX)
        };

        return (
            <Fragment>
                <ListItem button classes={{root: classes.listItemRoot}} style={{paddingLeft: level * 16}}
                          onContextMenu={folderContextClick} onClick={folderClick}>
                    <ListItemIcon classes={{root: classes.iconItemRoot}}>{arrowIcon}</ListItemIcon>
                    <ListItemIcon classes={{root: classes.iconItemRoot}}>{folderIcon}</ListItemIcon>
                    <ListItemText
                        classes={{root: classes.textItemRoot, primary: classes.textItemPrimary}}>{name}</ListItemText>
                </ListItem>
                <Collapse in={this.state.open}>
                    {foldersComponents}
                    {filesComponents}
                </Collapse>
            </Fragment>
        )
    }

}

export const Folder = withStyles(folderStyle)(FolderInternal);

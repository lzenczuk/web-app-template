import {Collapse, ListItem, ListItemIcon, ListItemText, withStyles} from "@material-ui/core";
import {generateSubElements} from "./utils";
import {ArrowDropDown, ArrowRight, Folder as FolderIcon, FolderOpen} from "@material-ui/icons";
import React, {Fragment} from "react";

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
        let {parentId, name, level, files, classes, onFolderContextMenuClick, onFileContextMenuClick} = this.props;

        if (files === undefined) {
            files = []
        }

        if (level === undefined) {
            level = 0
        }

        const subFiles = generateSubElements(files, parentId, level, onFolderContextMenuClick, onFileContextMenuClick);

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
                    {subFiles}
                </Collapse>
            </Fragment>
        )
    }

}

export const Folder = withStyles(folderStyle)(FolderInternal);

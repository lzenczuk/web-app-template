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
export const Folder = withStyles(folderStyle)((props) => {

    let {parentId, name, level, files, open, classes, onFolderClick, onFolderContextMenuClick, onFileContextMenuClick} = props;

    if (files === undefined) {
        files = []
    }

    if (level === undefined) {
        level = 0
    }

    const subFiles = generateSubElements(files, parentId, level, onFolderClick, onFolderContextMenuClick, onFileContextMenuClick);

    const folderIcon = open === true ? <FolderOpen/> : <FolderIcon/>;
    const arrowIcon = open === true ? <ArrowDropDown/> : <ArrowRight/>;

    const folderClick = () => onFolderClick(parentId);

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
            <Collapse in={open}>
                {subFiles}
            </Collapse>
        </Fragment>
    )
});

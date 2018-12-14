import {ListItem, ListItemIcon, ListItemText, withStyles} from "@material-ui/core";
import {InsertDriveFile} from "@material-ui/icons";
import React from "react";

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
        <ListItem button classes={{root: classes.listItemRoot}} style={{paddingLeft: level * 20}}
                  onContextMenu={onRightClick}>
            <ListItemIcon classes={{root: classes.fileIconRoot}}><InsertDriveFile/></ListItemIcon>
            <ListItemText classes={{root: classes.textItemRoot, primary: classes.textItemPrimary}}>{name}</ListItemText>
        </ListItem>
    )
});

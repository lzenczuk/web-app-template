import Paper from "@material-ui/core/Paper/Paper";
import {List, ListItem, ListItemText} from "@material-ui/core";
import React, {Fragment} from "react";

export const ContextMenu = (props) => {
    const {top, left, type, onCanceled, parentId} = props;
    const {onRenameSelected} = props;

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
            menu = <Paper style={{position: 'absolute', top: top, left: left, zIndex: 1001}}>
                <List>
                    <ListItem button><ListItemText>New folder</ListItemText></ListItem>
                    <ListItem button><ListItemText>New file</ListItemText></ListItem>
                    <ListItem button onClick={onRenameClicked}><ListItemText>Rename</ListItemText></ListItem>
                    <ListItem button><ListItemText>Delete</ListItemText></ListItem>
                </List>
            </Paper>;

            break;

        case "FILE_CONTEXT_MENU":
            menu = <Paper style={{position: 'absolute', top: top, left: left, zIndex: 1001}}>
                <List>
                    <ListItem button onClick={onRenameClicked}><ListItemText>Rename</ListItemText></ListItem>
                    <ListItem button><ListItemText>Delete</ListItemText></ListItem>
                </List>
            </Paper>;

            break;

    }


    return <Fragment>
        <div style={{position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, zIndex: 1000}} onClick={onClick}
             onContextMenu={onClick}>
        </div>
        {menu}
    </Fragment>

};

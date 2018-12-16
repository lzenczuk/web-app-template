import Paper from "@material-ui/core/Paper/Paper";
import {List, ListItem, ListItemText} from "@material-ui/core";
import React, {Fragment} from "react";

export const FileManagerContextMenu = (props) => {
    const {visible, top, left, onCancel } = props;
    const { onOperationSelected } = props;

    if(!visible){
        return null
    }

    const handleClick = (e) => {
        e.preventDefault();
        onCancel();
    };

    const handleContextOperationSelected = (operation) => (e) => {
        e.preventDefault();
        onOperationSelected(operation)
    };


    return <Fragment>
        <div style={{position: 'relative'}}>
            <div style={{position: 'fixed', top: 0, bottom: 0, left: 0, right: 0, zIndex: 1000}} onClick={handleClick}
                 onContextMenu={handleClick}>
            </div>
        </div>
        <div style={{position: 'relative'}}>
            <Paper style={{position: 'fixed', top: top, left: left, zIndex: 1001}}>
                <List>
                    <ListItem button onClick={handleContextOperationSelected("RENAME")}><ListItemText>Rename</ListItemText></ListItem>
                    <ListItem button onClick={handleContextOperationSelected("REMOVE")}><ListItemText>Delete</ListItemText></ListItem>
                </List>
            </Paper>
        </div>
    </Fragment>

};

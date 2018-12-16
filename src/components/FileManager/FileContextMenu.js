import Paper from "@material-ui/core/Paper/Paper";
import {List, ListItem, ListItemText} from "@material-ui/core";
import React, {Fragment} from "react";

export const FileContextMenu = (props) => {
    const {visible, top, left, onCancel } = props;
    const {onRenameSelected} = props;

    if(!visible){
        return null
    }

    const onClick = (e) => {
        e.preventDefault();
        onCancel();
    };

    const handleRenameClicked = () => {
        onRenameSelected()
    };

    const handleDeleteClicked = () => {
        onRenameSelected()
    };

    return <Fragment>
        <div style={{position: 'relative'}}>
            <div style={{position: 'fixed', top: 0, bottom: 0, left: 0, right: 0, zIndex: 1000}} onClick={onClick}
                 onContextMenu={onClick}>
            </div>
        </div>
        <div style={{position: 'relative'}}>
            <Paper style={{position: 'fixed', top: top, left: left, zIndex: 1001}}>
                <List>
                    <ListItem button onClick={handleRenameClicked}><ListItemText>Rename</ListItemText></ListItem>
                    <ListItem button><ListItemText>Delete</ListItemText></ListItem>
                </List>
            </Paper>
        </div>
    </Fragment>

};

import Paper from "@material-ui/core/Paper/Paper";
import {List, ListItem, ListItemText} from "@material-ui/core";
import React, {Fragment} from "react";

export const FileManagerContextMenu = (props) => {
    const {visible, top, left, onCancel } = props;
    const { onOperationSelected } = props;

    const operators = [
        { name: "NEW_FOLDER", label: "New folder", folder: true, file: false},
        { name: "NEW_FILE", label: "New file", folder: true, file: false},
        { name: "RENAME", label: "Rename", folder: true, file: true},
        { name: "REMOVE", label: "Delete", folder: true, file: true},
    ];

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

    let ops = operators
        .filter(operator => {
            if(props.folder){
                return operator.folder
            }else{
                return operator.file
            }
        })
        .map( operator => {
        return <ListItem button key={operator.name} onClick={handleContextOperationSelected(operator.name)}><ListItemText>{operator.label}</ListItemText></ListItem>
    });

    return <Fragment>
        <div style={{position: 'relative'}}>
            <div style={{position: 'fixed', top: 0, bottom: 0, left: 0, right: 0, zIndex: 1000}} onClick={handleClick}
                 onContextMenu={handleClick}>
            </div>
        </div>
        <div style={{position: 'relative'}}>
            <Paper style={{position: 'fixed', top: top, left: left, zIndex: 1001}}>
                <List>
                    {ops}
                </List>
            </Paper>
        </div>
    </Fragment>

};

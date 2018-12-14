import React, {Fragment} from "react";
import {generateSubElements} from "./utils";
import {ContextMenu} from "./ContextMenu";
import {RenameDialog} from "./RenameDialog";


export class FileTree extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            contextMenu: {
                visible: false,
            },
            fileRenameDialog: {
                visible: false,
            }
        }
    }

    handleFolderRightClick(parentId, x, y){
        this.setState({
            contextMenu: {
                visible: true,
                top: x,
                left: y,
                type: "FOLDER_CONTEXT_MENU",
                parentId: parentId
            }
        })
    }

    handleFileRightClick(parentId, x, y){
        this.setState({
            contextMenu: {
                visible: true,
                top: x,
                left: y,
                type: "FILE_CONTEXT_MENU",
                parentId: parentId
            }
        })
    }

    handleCancelAction(){

        this.setState({
            contextMenu: {
                visible: false,
            },
            fileRenameDialog: {
                visible: false,
            }
        })
    }

    handleRenameSelected(parentId){

        this.setState({
            contextMenu: {
                visible: false,
            },
            fileRenameDialog: {
                visible: true,
                parentId: parentId
            }
        })
    }

    handleRenameRequest(parentId, name){

        this.setState({
            contextMenu: {
                visible: false,
            },
            fileRenameDialog: {
                visible: false,
            }
        });

        this.props.onRename(parentId, name)
    }

    render(){
        const { files } = this.props;

        const subFiles = generateSubElements(files, '', 0, this.handleFolderRightClick.bind(this), this.handleFileRightClick.bind(this));

        let contextMenu = null;
        if(this.state.contextMenu.visible){

            const {top, left, type} = this.state.contextMenu;

            contextMenu = <ContextMenu parentId={this.state.contextMenu.parentId} top={top} left={left} type={type} onCanceled={this.handleCancelAction.bind(this)} onRenameSelected={this.handleRenameSelected.bind(this)}/>
        }

        let fileRenameDialog = null;
        if(this.state.fileRenameDialog.visible){

            const name = this.state.fileRenameDialog.parentId.split("/").pop();

            fileRenameDialog = <RenameDialog parentId={this.state.fileRenameDialog.parentId} name={name} onRename={this.handleRenameRequest.bind(this)} onCancel={this.handleCancelAction.bind(this)}/>
        }

        return (<Fragment>
            {contextMenu}
            {subFiles}
            {fileRenameDialog}
        </Fragment>)
    }
}

import React, {Fragment} from "react";
import {Folder} from "./Folder";


export class FileManager extends React.Component {

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

    render(){
        const { root, onRename, onDelete, onNewFolder, onNewFile } = this.props;

        const rootFolder = <Folder key={'/' + root.name} parentId={'/' + root.name} name={root.name}
                                   level={0} files={root.files} folders={root.folders} onRename={onRename} onDelete={onDelete} onNewFolder={onNewFolder} onNewFile={onNewFile}/>;



        return (<Fragment>
            {rootFolder}
        </Fragment>)
    }
}

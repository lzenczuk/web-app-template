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
        const { root } = this.props;
        const { onRename, onDelete, onNewFolder, onNewFile, onSelect } = this.props;

        const rootFolder =
            <Folder
                key={root.id}
                id={root.id}
                name={root.name}
                level={0}
                files={root.files}
                folders={root.folders}

                onRename={onRename}
                onDelete={onDelete}
                onNewFolder={onNewFolder}
                onNewFile={onNewFile}
                onSelect={onSelect}
            />;

        return (<Fragment>
            {rootFolder}
        </Fragment>)
    }
}

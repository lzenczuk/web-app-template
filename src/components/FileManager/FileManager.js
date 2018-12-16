import React, {Fragment} from "react";
import {Folder} from "./Folder";


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

    render(){
        const { root, onRename } = this.props;

        const rootFolder = <Folder key={'/' + root.name} parentId={'/' + root.name} name={root.name}
                                   level={0} files={root.files} folders={root.folders} onRename={onRename}/>;



        return (<Fragment>
            {rootFolder}
        </Fragment>)
    }
}

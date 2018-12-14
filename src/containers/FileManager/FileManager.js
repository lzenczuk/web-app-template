import {connect} from "react-redux";

import {rename, toggleFolder} from "../../modules/fileManager/actions";

import {FileTree as FileTreeComponent} from "../../components/FileManager";


const mapStateToProps = state => state.fileManager;

const mapDispatchToProps = dispatch => {
    return {
        onFolderClick: pathArray => {
            dispatch(toggleFolder(pathArray))
        },
        onRename: (parentId, newName) => {
            dispatch(rename(parentId, newName))
        }
    }
};

export const FileTree = connect(
    mapStateToProps,
    mapDispatchToProps
)(FileTreeComponent);

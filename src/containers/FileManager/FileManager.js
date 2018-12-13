import {connect} from "react-redux";

import {openFileContextMenu, openFolderContextMenu, toggleFolder} from "../../actions/actions";

import {FileTree as FileTreeComponent} from "../../components/FileManager";


const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => {
    return {
        onFolderClick: pathArray => {
            dispatch(toggleFolder(pathArray))
        },
        onFolderContextMenuClick: (path, top, left) => {
            dispatch(openFolderContextMenu(path, top, left))
        },
        onFileContextMenuClick: (path, top, left) => {
            dispatch(openFileContextMenu(path, top, left))
        }
    }
};

export const FileTree = connect(
    mapStateToProps,
    mapDispatchToProps
)(FileTreeComponent);

import {connect} from "react-redux";

import {newFile, newFolder, remove, rename, select} from "../../modules/fileManager/actions";

import {FileManager as FileManagerComponent} from "../../components/FileManager";


const mapStateToProps = state => state.fileManager;

const mapDispatchToProps = dispatch => {
    return {
        onRename: (parentId, newName) => {
            dispatch(rename(parentId, newName))
        },
        onDelete: (parentId) => {
            dispatch(remove(parentId))
        },
        onNewFile: (parentId, newName) => {
            dispatch(newFile(parentId, newName))
        },
        onNewFolder: (parentId, newName) => {
            dispatch(newFolder(parentId, newName))
        },
        onSelect: (parentId) => {
            dispatch(select(parentId))
        }
    }
};

export const FileManager = connect(
    mapStateToProps,
    mapDispatchToProps
)(FileManagerComponent);

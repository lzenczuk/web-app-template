import {connect} from "react-redux";

import {remove, rename} from "../../modules/fileManager/actions";

import {FileManager as FileManagerComponent} from "../../components/FileManager";


const mapStateToProps = state => state.fileManager;

const mapDispatchToProps = dispatch => {
    return {
        onRename: (parentId, newName) => {
            dispatch(rename(parentId, newName))
        },
        onDelete: (parentId) => {
            dispatch(remove(parentId))
        }
    }
};

export const FileManager = connect(
    mapStateToProps,
    mapDispatchToProps
)(FileManagerComponent);

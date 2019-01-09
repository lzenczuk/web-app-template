import {connect} from "react-redux";

import {FileEditor as FileEditorComponent} from "../../components/FileEditor"
import {updateFile} from "../../modules/fileEditor/actions";

const mapStateToProps = state => {

    let fe = state.fileEditor;

    if(fe.active!=null && fe.files.hasOwnProperty(fe.active)){
        return {
            active: true,
            fileId: fe.active,
            content: fe.files[fe.active].content
        }
    }else{
        return {
            active: false
        }
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onChange: (fileId, content) => {
            dispatch(updateFile(fileId, content))
        }
    }
};

export const FileEditor = connect(
    mapStateToProps,
    mapDispatchToProps
)(FileEditorComponent);

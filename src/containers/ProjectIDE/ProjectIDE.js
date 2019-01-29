import {connect} from "react-redux";

import {newFile, newFolder, remove, rename, select, updateFile} from "../../modules/projectIDE/actions";

import {ProjectIDE as ProjectIDEComponent} from "../../components/ProjectIDE";


const mapStateToProps = state => {

    let project = state.project;

    if(project.active!=null && project.files.hasOwnProperty(project.active)){
        return {
            root: project.root,
            active: true,
            fileId: project.active,
            content: project.files[project.active].content
        }
    }else{
        return {
            root: project.root,
            active: false
        }
    }
};

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
        },
        onChange: (fileId, content) => {
            dispatch(updateFile(fileId, content))
        }
    }
};

export const ProjectIDE = connect(
    mapStateToProps,
    mapDispatchToProps
)(ProjectIDEComponent);

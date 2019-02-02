import {connect} from "react-redux";

import {newFile, newFolder, remove, rename, select, updateFile} from "../../modules/projectIDE/actions";

import {ProjectIDE as ProjectIDEComponent} from "../../components/ProjectIDE";
import {toJsTree} from "../../modules/projectIDE/projectModel";



const mapStateToProps = state => {

    let project = state.project;

    let result = toJsTree(project);

    if(project.get('activeId') !== undefined){
        result.active = true;
        result.content = project.getIn(['nodes', project.get('activeId'), 'content']);
        result.fileId = project.get('activeId');
    }else {
        result.active = false;
    }

    return result;
};

const mapDispatchToProps = dispatch => {
    return {
        onRename: (id, name) => {
            dispatch(rename(id, name))
        },
        onDelete: (id) => {
            dispatch(remove(id))
        },
        onNewFile: (parentId, name) => {
            dispatch(newFile(parentId, name))
        },
        onNewFolder: (parentId, name) => {
            dispatch(newFolder(parentId, name))
        },
        onSelect: (id) => {
            dispatch(select(id))
        },
        onChange: (id, content) => {
            dispatch(updateFile(id, content))
        }
    }
};

export const ProjectIDE = connect(
    mapStateToProps,
    mapDispatchToProps
)(ProjectIDEComponent);

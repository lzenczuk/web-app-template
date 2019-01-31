import {connect} from "react-redux";

import {newFile, newFolder, remove, rename_request, select, updateFile} from "../../modules/projectIDE/actions";

import {ProjectIDE as ProjectIDEComponent} from "../../components/ProjectIDE";

function findNode(treeRoot, pathArray){

    if(typeof pathArray === "string"){
        pathArray = pathArray.split("/").filter( v => v!=="");
    }

    if(treeRoot.name === pathArray[0]){

        if(pathArray.length === 1){
            return treeRoot;
        }else{

            for(let i=0; i<treeRoot.files.length; i++){
                let node = findNode(treeRoot.files[i], pathArray.slice(1));
                if(node !== undefined){
                    return node;
                }
            }

            for(let i=0; i<treeRoot.folders.length; i++){
                let node = findNode(treeRoot.folders[i], pathArray.slice(1));
                if(node !== undefined){
                    return node;
                }
            }

            return undefined;
        }

    }else{
        return undefined;
    }
}

const mapStateToProps = state => {

    let project = state.project;

    if(project.active.isActivePathSet()){

        let content = "";

        const activeFile = findNode(project.root, project.active.getActivePath());

        if(activeFile!==undefined){
            content = activeFile.content
        }

        let result = {
            root: project.root,
            active: true,
            fileId: project.active.getActivePath(),
            content: content
        };

        return result
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
            dispatch(rename_request(parentId, newName))
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

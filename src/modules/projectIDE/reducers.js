import {CREATE_FILE, SELECT_FILE, UPDATE_FILE, NEW_FILE, NEW_FOLDER, REMOVE, RENAME} from "./actions";
import _ from "lodash";


let initState = {
    root: {
        type: "FOLDER",
        name: "project name",
        folders: [],
        files: []
    },
    active: null,
    files: {}

};

const projectIDEReducer = (state=initState, action) => {

    switch (action.type) {

        case RENAME: {

            let newState = _.cloneDeep(state);

            const { parentId, newName } = action;

            let pathArray = parentIdToPathArray(parentId);

            if(pathArray.length!==0 && pathArray[0]===newState.root.name){

                const element = findTreeNodeByPath(newState.root, pathArray.slice(1));

                if(element!==undefined){
                    element.name = newName
                }

            }

            return newState;
        }

        case REMOVE: {
            let newState = _.cloneDeep(state);

            const { parentId } = action;

            let pathArray = parentIdToPathArray(parentId);

            if(pathArray.length!==0 && pathArray[0]===newState.root.name){

                removeTreeNodeByPath(newState.root, pathArray.slice(1));

            }

            return newState;

        }

        case NEW_FILE: {
            let newState = _.cloneDeep(state);

            const { parentId, newName } = action;

            let pathArray = parentIdToPathArray(parentId);

            if(pathArray.length===1 && pathArray[0]===newState.root.name){

                newState.root.files.push({
                    type: "FILE",
                    name: newName,
                    content: ""
                })

            }else if(pathArray.length>1 && pathArray[0]===newState.root.name){

                let parent = findTreeNodeByPath(newState.root, pathArray.slice(1));
                if(parent!==undefined){
                    parent.files.push({
                        type: "FILE",
                        name: newName,
                        content: ""
                    })
                }

            }

            return newState;

        }

        case NEW_FOLDER: {
            let newState = _.cloneDeep(state);

            const { parentId, newName } = action;

            let pathArray = parentIdToPathArray(parentId);

            if(pathArray.length===1 && pathArray[0]===newState.root.name){

                newState.root.folders.push({
                    type: "FOLDER",
                    name: newName,
                    folders: [],
                    files: []
                })

            }else if(pathArray.length>1 && pathArray[0]===newState.root.name){

                let parent = findTreeNodeByPath(newState.root, pathArray.slice(1));
                if(parent!==undefined){
                    parent.folders.push({
                        type: "FOLDER",
                        name: newName,
                        folders: [],
                        files: []
                    })
                }

            }

            return newState;

        }

        case SELECT_FILE: {

            let newState = _.cloneDeep(state);

            const { fileId } = action;

            newState.active = fileId;

            return newState;
        }

        case UPDATE_FILE: {

            let newState = _.cloneDeep(state);

            const { fileId, content } = action;

            if(newState.files.hasOwnProperty(fileId)){
                newState.files[fileId].content=content;
            }

            return newState;
        }

        case CREATE_FILE: {

            let newState = _.cloneDeep(state);

            const { fileId, content } = action;

            newState.files[fileId] = {
                content: content
            };

            newState.active = fileId;

            return newState;
        }

        default:
            return state
    }
};

export default projectIDEReducer

function findTreeNodeByPath(root, path) {

    const lookingElementName = path[0];

    // last element in path
    if(path.length===1){

        let e = root.folders.find(folder => folder.name===lookingElementName);

        if(e===undefined){
            e =  root.files.find(file => file.name===lookingElementName);
        }

        return e;
    }else{
        let e = root.folders.find(folder => folder.name===lookingElementName);

        if(e===undefined){
            return e
        }else{
            return findTreeNodeByPath(e, path.slice(1))
        }
    }
}

function removeTreeNodeByPath(root, path) {

    const lookingElementName = path[0];

    // last element in path
    if(path.length===1){

        let newFoldersArray = root.folders.filter(folder => folder.name!==lookingElementName);

        if(newFoldersArray.length===root.folders.length){
            root.files = root.files.filter(file => file.name !== lookingElementName);
        }else{
            root.folders = newFoldersArray;
        }
    }else{
        let e = root.folders.find(folder => folder.name===lookingElementName);

        if(e===undefined){
            return
        }else{
            return removeTreeNodeByPath(e, path.slice(1))
        }
    }
}

function parentIdToPathArray(parentId) {
    return parentId.split("/").filter( v => v!=="");
}
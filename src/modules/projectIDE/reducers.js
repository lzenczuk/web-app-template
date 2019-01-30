import {UPDATE_FILE, NEW_FILE, NEW_FOLDER, REMOVE, RENAME, SELECT} from "./actions";
import _ from "lodash";
import {Folder} from "./model";

let initState = {
    root: new Folder("Project name"),
    active: null,
};

const projectIDEReducer = (state=initState, action) => {

    switch (action.type) {

        case RENAME: {

            let newState = _.cloneDeep(state);

            const { parentId, newName } = action;

            newState.root.rename(parentId, newName);

            return newState;
        }

        case REMOVE: {
            let newState = _.cloneDeep(state);

            const { parentId } = action;

            newState.root.delete(parentId);

            return newState;

        }

        case NEW_FILE: {
            let newState = _.cloneDeep(state);

            const { parentId, newName } = action;

            newState.root.createFile(parentId, newName, "Test content of file "+newName);
            newState.active = parentId + "/" + newName;

            return newState;

        }

        case NEW_FOLDER: {
            let newState = _.cloneDeep(state);

            const { parentId, newName } = action;

            newState.root.createFolder(parentId, newName);

            return newState;

        }

        case SELECT: {

            let newState = _.cloneDeep(state);

            const { parentId } = action;

            newState.active = parentId;

            return newState;
        }

        case UPDATE_FILE: {

            let newState = _.cloneDeep(state);

            const { fileId, content } = action;

            let node = newState.root.findByPath(fileId);
            if(node!==undefined && node.type==="FILE"){
                node.content=content
            }

            return newState;
        }

        default:
            return state
    }
};

export default projectIDEReducer

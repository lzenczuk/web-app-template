import {UPDATE_FILE, NEW_FILE, NEW_FOLDER, REMOVE, RENAME, SELECT} from "./actions";
import {createFile, createFolder, createProject, remove, rename, setActive, setContent} from "./projectModel";

let {project: initState} = createProject("Test project");

const projectIDEReducer = (state=initState, action) => {

    switch (action.type) {

        case RENAME: {

            const { id, name } = action;

            let {project: newState} = rename(state, id, name);

            return newState;
        }

        case REMOVE: {

            const { id } = action;

            let {project: newState} = remove(state, id);

            return newState;

        }

        case NEW_FILE: {

            const { parentId, name } = action;

            let {project: newState} = createFile(state, parentId, name, "File "+name+" test content.");

            return newState;
        }

        case NEW_FOLDER: {

            const { parentId, name } = action;

            let {project: newState} = createFolder(state, parentId, name);

            return newState;

        }

        case SELECT: {

            const { id } = action;

            let {project: newState} = setActive(state, id);

            return newState;
        }

        case UPDATE_FILE: {

            const { id, content } = action;

            let {project: newState} = setContent(state, id, content);

            return newState;
        }

        default:
            return state
    }
};

export default projectIDEReducer

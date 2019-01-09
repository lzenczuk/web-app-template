import {CREATE_FILE, SELECT_FILE, UPDATE_FILE} from "./actions";
import _ from "lodash";


let initState = {
    active: null,
    files: {}
};

const fileEditor = (state=initState, action) => {

    switch (action.type) {

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

export default fileEditor

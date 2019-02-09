export const RENAME = 'RENAME';
export const REMOVE = 'REMOVE';
export const NEW_FILE = 'NEW_FILE';
export const NEW_FOLDER = 'NEW_FOLDER';
export const SELECT = 'SELECT';
export const UPDATE_FILE = 'UPDATE_FILE';
export const SEND_PROJECT = 'SEND_PROJECT';


export const rename = (id, name) => {
    return { type: RENAME , id: id, name: name }
};

export const remove = (id) => {
    return { type: REMOVE , id: id }
};

export const newFile = (parentId, name) => {
    return { type: NEW_FILE , parentId: parentId, name: name}
};

export const newFolder = (parentId, name) => {
    return { type: NEW_FOLDER , parentId: parentId, name: name}
};

export const select = (id) => {
    return { type: SELECT , id: id}
};

export const updateFile = (id, content) => {
    return { type: UPDATE_FILE , id: id, content: content }
};

export const sendProject = () => {
    return { type: SEND_PROJECT }
};

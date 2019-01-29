export const RENAME = 'RENAME';
export const REMOVE = 'REMOVE';
export const NEW_FILE = 'NEW_FILE';
export const NEW_FOLDER = 'NEW_FOLDER';
export const SELECT = 'SELECT';
export const SELECT_FILE = 'SELECT_FILE';
export const UPDATE_FILE = 'UPDATE_FILE';
export const CREATE_FILE = 'CREATE_FILE';

export const rename = (parentId, newName) => {
    return { type: RENAME , parentId: parentId, newName: newName }
};

export const remove = (parentId) => {
    return { type: REMOVE , parentId: parentId }
};

export const newFile = (parentId, newName) => {
    return { type: NEW_FILE , parentId: parentId, newName: newName}
};

export const newFolder = (parentId, newName) => {
    return { type: NEW_FOLDER , parentId: parentId, newName: newName}
};

export const select = (parentId) => {
    return { type: SELECT , parentId: parentId}
};

export const selectFile = (fileId) => {
    return { type: SELECT_FILE , fileId: fileId }
};

export const updateFile = (fileId, content) => {
    return { type: UPDATE_FILE , fileId: fileId, content: content }
};

export const createFile = (fileId, content) => {
    return { type: CREATE_FILE , fileId: fileId, content: content }
};

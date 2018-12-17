export const RENAME = 'RENAME';
export const REMOVE = 'REMOVE';
export const NEW_FILE = 'NEW_FILE';
export const NEW_FOLDER = 'NEW_FOLDER';
export const SELECT = 'SELECT';

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

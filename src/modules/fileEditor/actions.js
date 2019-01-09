export const SELECT_FILE = 'SELECT_FILE';
export const UPDATE_FILE = 'UPDATE_FILE';
export const CREATE_FILE = 'CREATE_FILE';

export const selectFile = (fileId) => {
    return { type: SELECT_FILE , fileId: fileId }
};

export const updateFile = (fileId, content) => {
    return { type: UPDATE_FILE , fileId: fileId, content: content }
};

export const createFile = (fileId, content) => {
    return { type: CREATE_FILE , fileId: fileId, content: content }
};

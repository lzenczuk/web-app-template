export const TOGGLE_FOLDER = 'TOGGLE_FOLDER';
export const RENAME = 'RENAME';

export const toggleFolder = (pathArray) => {
    return { type: TOGGLE_FOLDER, path: pathArray }
};

export const rename = (parentId, newName) => {
    return { type: RENAME , parentId: parentId, newName: newName }
};

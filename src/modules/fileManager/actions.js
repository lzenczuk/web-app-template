export const RENAME = 'RENAME';
export const REMOVE = 'REMOVE';

export const rename = (parentId, newName) => {
    return { type: RENAME , parentId: parentId, newName: newName }
};

export const remove = (parentId) => {
    return { type: REMOVE , parentId: parentId }
};

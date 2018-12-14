export const RENAME = 'RENAME';

export const rename = (parentId, newName) => {
    return { type: RENAME , parentId: parentId, newName: newName }
};

export const TOGGLE_FOLDER = 'TOGGLE_FOLDER';

export const toggleFolder = (pathArray) => {
    return { type: TOGGLE_FOLDER, path: pathArray }
};

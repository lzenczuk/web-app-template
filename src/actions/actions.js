export const TOGGLE_FOLDER = 'TOGGLE_FOLDER';
export const OPEN_FOLDER_CONTEXT_MENU = 'OPEN_FOLDER_CONTEXT_MENU';
export const OPEN_FILE_CONTEXT_MENU = 'OPEN_FILE_CONTEXT_MENU';
export const CLOSE_CONTEXT_MENU = 'CLOSE_CONTEXT_MENU';

export const toggleFolder = (pathArray) => {
    return { type: TOGGLE_FOLDER, path: pathArray }
};

export const openFolderContextMenu = (pathArray, top, left) => {
    return { type: OPEN_FOLDER_CONTEXT_MENU, path: pathArray, top: top, left: left }
};

export const openFileContextMenu = (pathArray, top, left) => {
    return { type: OPEN_FILE_CONTEXT_MENU, path: pathArray, top: top, left: left }
};

export const closeContextMenu = () => {
    return { type: CLOSE_CONTEXT_MENU }
};

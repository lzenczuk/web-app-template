import React from "react";
import {Folder} from "./Folder";
import {File} from "./File";

export function generateSubElements(files, parentId, level, onFolderContextMenuClick, onFileContextMenuClick) {
    return files.map(file => {

        switch (file.type) {
            case "FILE":
                return <File key={parentId + '/' + file.name} parentId={parentId + '/' + file.name} name={file.name}
                             level={level + 1} onFileContextMenuClick={onFileContextMenuClick}/>;
            case "FOLDER":
                return <Folder key={parentId + '/' + file.name} parentId={parentId + '/' + file.name} name={file.name}
                               level={level + 1} open={file.open} files={file.files}
                               onFolderContextMenuClick={onFolderContextMenuClick}
                               onFileContextMenuClick={onFileContextMenuClick}/>;
            default:
                throw "Unknown file type: " + file.type
        }
    });
}

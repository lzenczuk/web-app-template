import v1 from "uuid"
import { Map, List } from "immutable";

export const FILE = "FILE";
export const FOLDER = "FOLDER";

const uuid = v1;

const createFileNode = (name, content, parentId) => {
    return Map({id: uuid(), type: FILE, name: name, parentId: parentId, content: content});
};

const createFolderNode = (name, parentId, readOnly) => {

    let folder = Map({id: uuid(), type: FOLDER, name: name, parentId: parentId, readOnly: readOnly});
    folder = folder.set('files', List());
    folder = folder.set('folders', List());

    return folder;
};

export const createProject = (projectName) => {

    let folder = createFolderNode(projectName, undefined, true);

    let project = Map({ rootId: folder.get('id'), activeId: undefined, nodes: Map()});
    project = project.setIn(['nodes', folder.get('id')], folder);

    return {project: project, rootId: folder.get('id')};
};

export const createFile = (project, parentId, name, content) => {

    if(project === undefined){
        throw "projec undefined"
    }

    if(project.getIn(['nodes', parentId]) === undefined){
        throw "parent "+parentId+" not found in project"
    }

    if(project.getIn(['nodes', parentId, "type"]) !== FOLDER){
        throw "parent "+parentId+" is not a folder"
    }

    let fileWithTheSameName = project.getIn(['nodes', parentId, 'files']).find((fid) => project.getIn(['nodes', fid]).get('name') === name);

    if(fileWithTheSameName!==undefined){
        throw "file named "+name+" already exists in parent "+parentId
    }

    let folderWithTheSameName = project.getIn(['nodes', parentId, 'folders']).find((fid) => project.getIn(['nodes', fid]).get('name') === name);

    if(folderWithTheSameName!==undefined){
        throw "folder named "+name+" already exists in parent "+parentId
    }

    const fileNode = createFileNode(name, content, parentId);

    let newProject = project.setIn(['nodes', parentId, 'files'], project.getIn(['nodes', parentId, 'files']).push(fileNode.get('id')));
    newProject = newProject.set('nodes', newProject.get('nodes').set(fileNode.get('id'), fileNode));
    newProject = newProject.set('activeId', fileNode.get('id'));

    return {project: newProject, fileId: fileNode.get('id')};
};

export const createFolder = (project, parentId, name) => {

    if(project === undefined){
        throw "projec undefined"
    }

    if(project.getIn(['nodes', parentId]) === undefined){
        throw "parent "+parentId+" not found in project"
    }

    if(project.getIn(['nodes', parentId, "type"]) !== FOLDER){
        throw "parent "+parentId+" is not a folder"
    }

    let fileWithTheSameName = project.getIn(['nodes', parentId, 'files']).find((fid) => project.getIn(['nodes', fid]).get('name') === name);

    if(fileWithTheSameName!==undefined){
        throw "file named "+name+" already exists in parent "+parentId
    }

    let folderWithTheSameName = project.getIn(['nodes', parentId, 'folders']).find((fid) => project.getIn(['nodes', fid]).get('name') === name);

    if(folderWithTheSameName!==undefined){
        throw "folder named "+name+" already exists in parent "+parentId
    }

    const folderNode = createFolderNode(name, parentId, false);

    let newProject = project.setIn(['nodes', parentId, 'folders'], project.getIn(['nodes', parentId, 'folders']).push(folderNode.get('id')));
    newProject = newProject.set('nodes', newProject.get('nodes').set(folderNode.get('id'), folderNode));

    return {project: newProject, folderId: folderNode.get('id')};
};

export const rename = (project, id, name) => {

    if(project === undefined){
        throw "projec undefined"
    }

    if(project.getIn(['nodes', id]) === undefined){
        throw "parent "+id+" not found in project"
    }

    if(id === project.get('rootId')){
        throw "can not rename project root"
    }

    return {project: project.setIn(['nodes', id, 'name'], name)}
};

export const remove = (project, id) => {

    if(project === undefined){
        throw "projec undefined"
    }

    if(project.getIn(['nodes', id]) === undefined){
        throw "node "+id+" not found in project"
    }

    if(id === project.get('rootId')){
        throw "can not remove project root"
    }

    let parentId = project.getIn(['nodes', id, 'parentId']);
    let nodeType = project.getIn(['nodes', id, 'type']);

    let nodes = findSubNodes(project, id);

    let newProject = project.set('nodes', project.get('nodes').deleteAll(nodes));

    if(nodes.includes(project.get('activeId'))){
        newProject = newProject.set('activeId', undefined);
    }

    if(parentId !== undefined){
        switch (nodeType) {
            case FILE:
                newProject = newProject.setIn(['nodes', parentId, 'files'], newProject.getIn(['nodes', parentId, 'files']).filter( nId => nId !== id));
                break;
            case FOLDER:
                newProject = newProject.setIn(['nodes', parentId, 'folders'], newProject.getIn(['nodes', parentId, 'folders']).filter( nId => nId !== id));
                break;
        }
    }

    return { project: newProject }
};

export const findSubNodes = (project, id) => {

    if(project === undefined){
        throw "projec undefined"
    }

    if(project.getIn(['nodes', id]) === undefined){
        throw "node "+id+" not found in project"
    }

    let node = project.getIn(['nodes', id]);

    switch (node.get('type')) {
        case FILE:
            return [node.get('id')];
        case FOLDER:

            let ids = [node.get('id')];

            ids = ids.concat(node.get('files').toArray());
            ids = ids.concat(node.get('folders').flatMap(folderId => findSubNodes(project, folderId)).toArray());

            return ids;
        default:
            return [];
    }
};

export const setActive = (project, id) => {
    // TODO validation
    return { project: project.set('activeId', id) }
};

export const setContent = (project, id, content) => {
    // TODO validation
    return { project: project.setIn(['nodes', id, 'content'], content) }
};

export const toJsTree = (project) => {

    const rootId = project.get('rootId');

    return {
        root: toJsTreeNode(project, rootId)
    }
};

const toJsTreeNode = (project, nodeId) => {

    let node = project.getIn(['nodes', nodeId]);

    switch (node.get('type')) {
        case FILE:
            return {
                id: node.get('id'),
                name: node.get('name'),
                type: FILE,
                content: node.get('content')
            };
        case FOLDER:
            return {
                id: node.get('id'),
                name: node.get('name'),
                type: FOLDER,
                files: node.get('files').map(fileId => toJsTreeNode(project, fileId)),
                folders: node.get('folders').map(folderId => toJsTreeNode(project, folderId)),
            };
        default:
            return undefined;
    }
};



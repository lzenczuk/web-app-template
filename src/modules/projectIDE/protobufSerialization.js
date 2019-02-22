import protobuf from "protobufjs"
import {createFile, createFolder, createProject, FOLDER} from "./projectModel";

const extractFiles = (basePath, nodeId, project) => {
    let node = project.getIn(['nodes', nodeId]);

    let nodeName = node.get('name');
    let nodePath = basePath + "/" + nodeName;

    let files = [];
    let folders = [];

    if (node.get('type') === FOLDER) {
        node.get('files')
            .map(fileId => project.getIn(['nodes', fileId]))
            .map(file => {
                return {path: nodePath + "/" + file.get('name'), content: file.get('content')}
            })
            .forEach(textFile => files.push(textFile));

        node.get('folders')
            .map(folderId => extractFiles(nodePath, folderId, project))
            .forEach(extractedFilesAndFolders => {
                files = files.concat(extractedFilesAndFolders['files']);
                folders = folders.concat(extractedFilesAndFolders['folders']);
            });

        if(files.length === 0 && folders.length === 0){
            // This is empty folder without files and sub folders
            folders = [{path: nodePath}]
        }
    }

    return {files: files, folders: folders}
};

export const serializeProject = (project) => {

    return protobuf.load("pbf/projectIDE/project.proto").then((root) => {

        const Project = root.lookupType("eos.contract.Project");

        let rootId = project.get('rootId');
        let projectName = project.getIn(['nodes', rootId, 'name']);

        let {files, folders} = extractFiles("", rootId, project);

        const payload = {
            version: 1,
            name: projectName,
            folders: folders,
            files: files
        };

        let errorMessage = Project.verify(payload);
        if(errorMessage){
            throw Error(errorMessage)
        }

        const message = Project.create(payload);

        return Project.encode(message).finish();
    })
};

const addFile = (project, currentNodeId, pathArray, content) => {

    if(pathArray.length===1){
        return createFile(project, currentNodeId, pathArray[0], content).project
    }else{

        let folderId = findFolderInNode(project, currentNodeId, pathArray[0]);

        if(folderId===undefined){
            let {project: newProject, folderId} = createFolder(project, currentNodeId, pathArray[0]);
            return addFile(newProject, folderId, pathArray.slice(1, pathArray.length), content)
        }else{
            return addFile(project, folderId, pathArray.slice(1, pathArray.length), content)
        }

    }
};

const addFolder = (project, currentNodeId, pathArray) => {

    if(pathArray.length===1){
        return createFolder(project, currentNodeId, pathArray[0]).project
    }else{

        let folderId = findFolderInNode(project, currentNodeId, pathArray[0]);

        if(folderId===undefined){
            let {project: newProject, folderId} = createFolder(project, currentNodeId, pathArray[0]);
            return addFolder(newProject, folderId, pathArray.slice(1, pathArray.length))
        }else{
            return addFolder(project, folderId, pathArray.slice(1, pathArray.length))
        }

    }
};

const findFolderInNode = (project, nodeId, folderName) => {
    const folders = project.getIn(['nodes', nodeId, 'folders']);

    return folders.find(folderId => project.getIn(['nodes', folderId, 'name'])===folderName)
};

export const addFileToProject = (project, path, content) => {
    const pathArray = path.split("/").map(s => s.replace(/\s/g,"")).filter(s => s!=="");

    console.log("-----------> project: "+JSON.stringify(project));

    let rootId = project.get('rootId');

    console.log("path: "+JSON.stringify(pathArray));
    console.log("name: "+project.getIn(['nodes', rootId, "name"]));

    if(pathArray[0] !== project.getIn(['nodes', rootId, "name"])){
        console.log("First element not match project name");
        return project
    }else{
        return addFile(project, rootId, pathArray.slice(1, pathArray.length), content)
    }
};

export const addFolderToProject = (project, path) => {
    const pathArray = path.split("/").map(s => s.replace(/\s/g,"")).filter(s => s!=="");

    console.log("-----------> project: "+JSON.stringify(project));

    let rootId = project.get('rootId');

    console.log("path: "+JSON.stringify(pathArray));
    console.log("name: "+project.getIn(['nodes', rootId, "name"]));

    if(pathArray[0] !== project.getIn(['nodes', rootId, "name"])){
        console.log("First element not match project name");
        return project
    }else{
        return addFolder(project, rootId, pathArray.slice(1, pathArray.length))
    }
};

export const deserializeProject = (buffer) => {

    return protobuf.load("pbf/projectIDE/project.proto").then((root) => {

        const Project = root.lookupType("eos.contract.Project");

        const message = Project.decode(buffer);

        console.log("-----------> "+JSON.stringify(message));

        let project, rootId;
        ({ project, rootId } = createProject(message["name"]));

        for(let i=0; i<message.folders.length;i++){
            project = addFolderToProject(project, message['folders'][i].path)
        }

        for(let i=0; i<message.files.length;i++){
            project = addFileToProject(project, message['files'][i].path, message['files'][i].content)
        }

        return project;
    })
};

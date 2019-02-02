import {
    createFile,
    createFolder,
    createProject,
    FILE,
    findSubNodes,
    FOLDER, remove,
    rename,
    toJs} from "./projectModel";
import { Map, List } from "immutable";

const printModel = (model) => {
    console.log(JSON.stringify(model.toJS(), null, 4));
};

test("create project", () => {

    let { project, rootId } = createProject("test");

    printModel(project);

    expect(project).toBeDefined();

    expect(project.get('rootId')).toBeDefined();
    expect(typeof project.get('rootId')).toBe('string');
    expect(project.get('rootId').length).toBe(36);

    expect(project.get('activeId')).toBeUndefined();

    expect(project.get('nodes')).toBeDefined();
    expect(project.get('nodes')).toBeInstanceOf(Map);
    expect(project.get('nodes').count()).toBe(1);

    const rootFolder = project.getIn(['nodes', rootId]);

    expect(rootFolder).toBeDefined();
    expect(rootFolder).toBeInstanceOf(Map);
    expect(rootFolder.get("id")).toBe(rootId);
    expect(rootFolder.get("type")).toBe(FOLDER);
    expect(rootFolder.get("name")).toBe("test");
    expect(rootFolder.get("parent")).toBeUndefined();
    expect(rootFolder.get("readOnly")).toBeTruthy();

    expect(rootFolder.get("files")).toBeInstanceOf(List);
    expect(rootFolder.get("files").count()).toBe(0);

    expect(rootFolder.get("folders")).toBeInstanceOf(List);
    expect(rootFolder.get("folders").count()).toBe(0);

});

test("create file in root of project", () => {

    let project, rootId, fileId;

    ({ project, rootId } = createProject("test"));
    ({ project, fileId} = createFile(project, rootId, "file.cpp", "Test file content"));

    printModel(project);

    expect(project.get('rootId')).toBe(rootId);
    expect(project.get('activeId')).toBe(fileId);
    expect(project.get('nodes').count()).toBe(2);

    expect(project.getIn(['nodes', rootId, 'id'])).toBe(rootId);
    expect(project.getIn(['nodes', rootId, 'files']).count()).toBe(1);
    expect(project.getIn(['nodes', rootId, 'files', 0])).toBe(fileId);
    expect(project.getIn(['nodes', rootId, 'folders']).count()).toBe(0);

    expect(project.getIn(['nodes', fileId, 'id'])).toBe(fileId);
    expect(project.getIn(['nodes', fileId, 'type'])).toBe(FILE);
    expect(project.getIn(['nodes', fileId, 'name'])).toBe("file.cpp");
    expect(project.getIn(['nodes', fileId, 'content'])).toBe("Test file content");
    expect(project.getIn(['nodes', fileId, 'parentId'])).toBe(rootId);
});

test("create folder in root of project", () => {

    let { project, rootId } = createProject("test");

    const response = createFolder(project, rootId, "folder1");

    const newProject = response.project;
    const newFolderId = response.folderId;

    printModel(newProject);

    expect(newProject.get('rootId')).toBe(rootId);
    expect(newProject.get('activeId')).toBeUndefined();
    expect(newProject.get('nodes').count()).toBe(2);

    expect(newProject.getIn(['nodes', rootId, 'id'])).toBe(rootId);
    expect(newProject.getIn(['nodes', rootId, 'folders']).count()).toBe(1);
    expect(newProject.getIn(['nodes', rootId, 'folders', 0])).toBe(newFolderId);
    expect(newProject.getIn(['nodes', rootId, 'files']).count()).toBe(0);

    expect(newProject.getIn(['nodes', newFolderId, 'id'])).toBe(newFolderId);
    expect(newProject.getIn(['nodes', newFolderId, 'type'])).toBe(FOLDER);
    expect(newProject.getIn(['nodes', newFolderId, 'name'])).toBe("folder1");
    expect(newProject.getIn(['nodes', newFolderId, 'readOnly'])).toBeFalsy();
    expect(newProject.getIn(['nodes', newFolderId, 'parentId'])).toBe(rootId);
});

test("create folder in sub folder of project", () => {

    let { project, rootId } = createProject("test");

    const response1 = createFolder(project, rootId, "folder1");

    const newProject1 = response1.project;
    const folder1Id = response1.folderId;

    const response2 = createFolder(newProject1, folder1Id, "folder2");

    const newProject = response2.project;
    const newFolderId = response2.folderId;

    printModel(newProject);

    expect(newProject.get('rootId')).toBe(rootId);
    expect(newProject.get('activeId')).toBeUndefined();
    expect(newProject.get('nodes').count()).toBe(3);

    expect(newProject.getIn(['nodes', folder1Id, 'id'])).toBe(folder1Id);
    expect(newProject.getIn(['nodes', folder1Id, 'folders']).count()).toBe(1);
    expect(newProject.getIn(['nodes', folder1Id, 'folders', 0])).toBe(newFolderId);
    expect(newProject.getIn(['nodes', folder1Id, 'files']).count()).toBe(0);

    expect(newProject.getIn(['nodes', newFolderId, 'id'])).toBe(newFolderId);
    expect(newProject.getIn(['nodes', newFolderId, 'type'])).toBe(FOLDER);
    expect(newProject.getIn(['nodes', newFolderId, 'name'])).toBe("folder2");
    expect(newProject.getIn(['nodes', newFolderId, 'readOnly'])).toBeFalsy();
    expect(newProject.getIn(['nodes', newFolderId, 'parentId'])).toBe(folder1Id);
});

test("create file in sub folder of project", () => {

    let { project, rootId } = createProject("test");

    const response1 = createFolder(project, rootId, "folder1");

    const newProject1 = response1.project;
    const folder1Id = response1.folderId;

    const response2 = createFile(newProject1, folder1Id, "file.cpp", "Test file content");

    const newProject = response2.project;
    const newFileId = response2.fileId;

    printModel(newProject);

    expect(newProject.get('rootId')).toBe(rootId);
    expect(newProject.get('activeId')).toBe(newFileId);
    expect(newProject.get('nodes').count()).toBe(3);

    expect(newProject.getIn(['nodes', folder1Id, 'id'])).toBe(folder1Id);
    expect(newProject.getIn(['nodes', folder1Id, 'files']).count()).toBe(1);
    expect(newProject.getIn(['nodes', folder1Id, 'files', 0])).toBe(newFileId);
    expect(newProject.getIn(['nodes', folder1Id, 'folders']).count()).toBe(0);

    expect(newProject.getIn(['nodes', newFileId, 'id'])).toBe(newFileId);
    expect(newProject.getIn(['nodes', newFileId, 'type'])).toBe(FILE);
    expect(newProject.getIn(['nodes', newFileId, 'name'])).toBe("file.cpp");
    expect(newProject.getIn(['nodes', newFileId, 'content'])).toBe("Test file content");
    expect(newProject.getIn(['nodes', newFileId, 'parentId'])).toBe(folder1Id);
});

test("rename sub folder in project", () => {

    let { project, rootId } = createProject("test");

    const response1 = createFolder(project, rootId, "folder1");

    const newProject1 = response1.project;
    const folder1Id = response1.folderId;

    const response2 = createFile(newProject1, folder1Id, "file.cpp", "Test file content");

    const newProject2 = response2.project;
    const newFileId = response2.fileId;

    const response3 = rename(newProject2, folder1Id, "folderX");

    const newProject = response3.project;

    printModel(newProject);

    expect(newProject.get('rootId')).toBe(rootId);
    expect(newProject.get('activeId')).toBe(newFileId);
    expect(newProject.get('nodes').count()).toBe(3);

    expect(newProject.getIn(['nodes', folder1Id, 'id'])).toBe(folder1Id);
    expect(newProject.getIn(['nodes', folder1Id, 'files']).count()).toBe(1);
    expect(newProject.getIn(['nodes', folder1Id, 'files', 0])).toBe(newFileId);
    expect(newProject.getIn(['nodes', folder1Id, 'name'])).toBe("folderX");
    expect(newProject.getIn(['nodes', folder1Id, 'folders']).count()).toBe(0);

    expect(newProject.getIn(['nodes', newFileId, 'id'])).toBe(newFileId);
    expect(newProject.getIn(['nodes', newFileId, 'type'])).toBe(FILE);
    expect(newProject.getIn(['nodes', newFileId, 'name'])).toBe("file.cpp");
    expect(newProject.getIn(['nodes', newFileId, 'content'])).toBe("Test file content");
    expect(newProject.getIn(['nodes', newFileId, 'parentId'])).toBe(folder1Id);
});

test("find sub nodes", () => {

    let project, root, folder1, folder2, folder3, file1_in_folder1, file2_in_folder1, file1_in_folder2;

    ({project, rootId: root} = createProject("test project"));

    ({project, folderId: folder1} = createFolder(project, root, "folder1"));
    ({project, folderId: folder2} = createFolder(project, folder1, "folder2"));
    ({project, folderId: folder3} = createFolder(project, root, "folder3"));

    ({project, fileId: file1_in_folder1} = createFile(project, folder1, "file1_in_folder1", "Content: file1_in_folder1"));
    ({project, fileId: file2_in_folder1} = createFile(project, folder1, "file2_in_folder1", "Content: file2_in_folder1"));
    ({project, fileId: file1_in_folder2} = createFile(project, folder2, "file1_in_folder2", "Content: file1_in_folder2"));

    let rootSubNodes = findSubNodes(project, root);
    expect(rootSubNodes).toHaveLength(7);
    expect(rootSubNodes).toContain(root);
    expect(rootSubNodes).toContain(folder1);
    expect(rootSubNodes).toContain(folder2);
    expect(rootSubNodes).toContain(folder3);
    expect(rootSubNodes).toContain(file1_in_folder1);
    expect(rootSubNodes).toContain(file2_in_folder1);
    expect(rootSubNodes).toContain(file1_in_folder2);

    let folder1SubNodes = findSubNodes(project, folder1);
    expect(folder1SubNodes).toHaveLength(5);
    expect(folder1SubNodes).toContain(folder1);
    expect(folder1SubNodes).toContain(folder2);
    expect(folder1SubNodes).toContain(file1_in_folder1);
    expect(folder1SubNodes).toContain(file2_in_folder1);
    expect(folder1SubNodes).toContain(file1_in_folder2);

    let folder2SubNodes = findSubNodes(project, folder2);
    expect(folder2SubNodes).toHaveLength(2);
    expect(folder2SubNodes).toContain(folder2);
    expect(folder2SubNodes).toContain(file1_in_folder2);

    let folder3SubNodes = findSubNodes(project, folder3);
    expect(folder3SubNodes).toHaveLength(1);
    expect(folder3SubNodes).toContain(folder3);

    let file1_in_folder2SubNodes = findSubNodes(project, file1_in_folder2);
    expect(file1_in_folder2SubNodes).toHaveLength(1);
    expect(file1_in_folder2SubNodes).toContain(file1_in_folder2);
});

test("remove sub nodes", () => {

    let project, root, folder1, folder2, folder3, file1_in_folder1, file2_in_folder1, file1_in_folder2;

    ({project, rootId: root} = createProject("test project"));

    ({project, folderId: folder1} = createFolder(project, root, "folder1"));
    ({project, folderId: folder2} = createFolder(project, folder1, "folder2"));
    ({project, folderId: folder3} = createFolder(project, root, "folder3"));

    ({project, fileId: file1_in_folder1} = createFile(project, folder1, "file1_in_folder1", "Content: file1_in_folder1"));
    ({project, fileId: file2_in_folder1} = createFile(project, folder1, "file2_in_folder1", "Content: file2_in_folder1"));
    ({project, fileId: file1_in_folder2} = createFile(project, folder2, "file1_in_folder2", "Content: file1_in_folder2"));

    let {project: projectWithoutFolder3} = remove(project, folder3);
    let ids = projectWithoutFolder3.get('nodes').keySeq().toArray();

    expect(ids).toHaveLength(6);
    expect(ids).toContain(root);
    expect(ids).toContain(folder1);
    expect(ids).toContain(folder2);
    expect(ids).toContain(file1_in_folder1);
    expect(ids).toContain(file2_in_folder1);
    expect(ids).toContain(file1_in_folder2);
    expect(projectWithoutFolder3.getIn(['nodes', root, 'folders'])).not.toContain(folder3);

    let {project: projectWithoutFolder2} = remove(project, folder2);
    ids = projectWithoutFolder2.get('nodes').keySeq().toArray();

    expect(ids).toHaveLength(5);
    expect(ids).toContain(root);
    expect(ids).toContain(folder1);
    expect(ids).toContain(folder3);
    expect(ids).toContain(file1_in_folder1);
    expect(ids).toContain(file2_in_folder1);
    expect(projectWithoutFolder2.getIn(['nodes', folder1, 'folders'])).not.toContain(folder2);

    let {project: projectWithoutfile2_in_folder1} = remove(project, file2_in_folder1);
    ids = projectWithoutfile2_in_folder1.get('nodes').keySeq().toArray();

    expect(ids).toHaveLength(6);
    expect(ids).toContain(root);
    expect(ids).toContain(folder1);
    expect(ids).toContain(folder2);
    expect(ids).toContain(folder3);
    expect(ids).toContain(file1_in_folder1);
    expect(ids).toContain(file1_in_folder2);
    expect(projectWithoutfile2_in_folder1.getIn(['nodes', folder1, 'files'])).not.toContain(file2_in_folder1);
});

/*
test("convert project to js", () => {

    let project, root, folder1, folder2, folder3, file1_in_folder1, file2_in_folder1, file1_in_folder2;

    ({project, rootId: root} = createProject("test project"));

    ({project, folderId: folder1} = createFolder(project, root, "folder1"));
    ({project, folderId: folder2} = createFolder(project, folder1, "folder2"));
    ({project, folderId: folder3} = createFolder(project, root, "folder3"));

    ({project, fileId: file1_in_folder1} = createFile(project, folder1, "file1_in_folder1", "Content: file1_in_folder1"));
    ({project, fileId: file2_in_folder1} = createFile(project, folder1, "file2_in_folder1", "Content: file2_in_folder1"));
    ({project, fileId: file1_in_folder2} = createFile(project, folder2, "file1_in_folder2", "Content: file1_in_folder2"));

    console.log(JSON.stringify(project.toJS(), null, 4));

    console.log(JSON.stringify(toJsTree(project), null, 4));
});
*/



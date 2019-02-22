import {createFile, createFolder, createProject} from "./projectModel";
import {addFileToProject, deserializeProject, serializeProject} from "./protobufSerialization";
import {arrayBufferToPrintableString} from "./projectModelBinarySerialization";

test("recursive extraction files from full project", () => {
    let project, rootId, folderId1, folderId2, folderId3, folderId4, folderId5;

    ({ project, rootId } = createProject("testProject"));
    ({ project } = createFile(project, rootId, "root_file1.txt", "Content of root_file1.txt"));
    ({ project } = createFile(project, rootId, "root_file2.txt", "Content of root_file2.txt"));
    ({ project, folderId: folderId1 } = createFolder(project, rootId, "folder1"));
    ({ project } = createFile(project, folderId1, "folder1_file1.txt", "Content of folder1_file1.txt"));
    ({ project, folderId: folderId2 } = createFolder(project, rootId, "folder2"));
    ({ project } = createFile(project, folderId2, "folder2_file1.txt", "Content of folder2_file1.txt"));
    ({ project } = createFile(project, folderId2, "folder2_file2.txt", "Content of folder2_file2.txt"));
    ({ project, folderId: folderId3 } = createFolder(project, folderId1, "folder3"));
    ({ project } = createFile(project, folderId3, "folder3_file1.txt", "Content of folder3_file1.txt"));
    ({ project } = createFile(project, folderId3, "folder3_file2.txt", "Content of folder3_file2.txt"));
    ({ project, folderId: folderId4 } = createFolder(project, folderId2, "folder4"));
    ({ project, folderId: folderId5 } = createFolder(project, rootId, "folder5"));

    serializeProject(project).then( buffer => {

        console.log("Buffer: "+arrayBufferToPrintableString(buffer));

        return deserializeProject(buffer);
    }).then(deserializedProject => {
        console.log("Result project: "+JSON.stringify(deserializedProject, null, 4))
    })
});

/*test("add file to project", () => {

    let project, rootId;
    ({ project, rootId } = createProject("test_project"));

    project = addFileToProject(project, "root_file1.txt", "test");
    project = addFileToProject(project, "/root_file1.txt", "test");
    project = addFileToProject(project, "/test_project/root_file1.txt", "test");
    project = addFileToProject(project, "/test_project/folder_1/folder1_file1.txt", "test");
    project = addFileToProject(project, "/test_project/folder_1/folder1_file2.txt", "test");
    project = addFileToProject(project, "/test_project/folder_1/folder_2/folder2_file1.txt", "test");
    project = addFileToProject(project, "/test_project/folder_1/folder_2/folder2_file2.txt", "test");

    console.log(JSON.stringify(project, null, 4))
});*/

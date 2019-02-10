import {
    arrayBufferToPrintableString, projectToArrayBuffer,
    textFileToArrayBuffer,
    textToArrayBuffer
} from "./projectModelBinarySerialization";
import {createFile, createFolder, createProject} from "./projectModel";

export const sendProjectToServer = (project) => {

    let arrayBuffer = projectToArrayBuffer(project);

    console.log("-------> Buffer: "+arrayBufferToPrintableString(arrayBuffer));

    fetch("/server", {
        method: "POST",
        cache: "no-cache",
        body: new Blob([new Uint8Array(arrayBuffer)])
    }).then(response => {
        console.log("-----> server response"+response)
    }).catch(error => {
        console.error(error)
    })
};



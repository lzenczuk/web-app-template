import {
    arrayBufferToPrintableString,
    textFileToArrayBuffer,
    textToArrayBuffer
} from "./projectModelBinarySerialization";

export const sendProjectToServer = () => {

    let arrayBuffer = textFileToArrayBuffer("/src/proxy/proxy.cpp", "This is proxy file");

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



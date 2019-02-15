import {
    arrayBufferToPrintableString, projectToArrayBuffer, textToArrayBuffer,
} from "./projectModelBinarySerialization";
import ecc from 'eosjs-ecc'
import ScatterJS from "scatterjs-core";

const splitStringTo12CharsChunks = (stringToSplit) => {
    let startIndex = 0;
    let endIndex = 12;

    const chunks = [];

    while (true) {
        if (startIndex > stringToSplit.length - 1) return chunks;
        chunks.push(stringToSplit.substring(startIndex, endIndex));
        startIndex = startIndex + 12;
        endIndex = endIndex + 12;
    }
};

const readChunk = (reader, readerFunction) => {
    reader.read().then(({done, value}) => {
        if(done){
            return;
        }

        readerFunction(value);
        return readChunk(reader, readerFunction)
    })
};

export const sendProjectToServer = (project, publicKey) => {

    let fileBuffer = projectToArrayBuffer(project);
    let publicKeyBuffer = textToArrayBuffer(publicKey);

    let hashSha256 = ecc.sha256(fileBuffer, 'hex');
    let hashSha256AsWords = splitStringTo12CharsChunks(hashSha256).join(' ');

    ScatterJS.scatter.getArbitrarySignature(publicKey, hashSha256AsWords, 'Project file signature', true).then(signature => {

        console.log("Signature: " + signature);

        fetch("/server", {
            method: "POST",
            cache: "no-cache",
            body: new Blob([new Uint8Array(fileBuffer)])
        }).then(response => {
            console.log("-----> server response" + response);
            return response.body
        }).then(body => {
            const reader = body.getReader();

            return readChunk(reader, (v) => console.log("=======> receive: "+v))

        }).catch(error => {
            console.error(error)
        })


    }).catch(error => {
        console.log("---------> Error!", error)
    });

};



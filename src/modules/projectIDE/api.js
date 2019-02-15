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

export const sendProjectToServer = (project, publicKey) => {

    let fileBuffer = projectToArrayBuffer(project);
    let publicKeyBuffer = textToArrayBuffer(publicKey);

    let hashSha256 = ecc.sha256(fileBuffer, 'hex');
    let hashSha256AsWords = splitStringTo12CharsChunks(hashSha256).join(' ');

    ScatterJS.scatter.getArbitrarySignature(publicKey, hashSha256AsWords, 'Project file signature', true).then(signature => {

        console.log("Signature: " + signature);

        const socket = new WebSocket('ws://localhost:7880/server');

        socket.addEventListener('open', function (event) {
            socket.send(fileBuffer);
        });

        socket.addEventListener('message', function (event) {
            console.log('Message from server ', event.data);
        });

    }).catch(error => {
        console.log("---------> Error!", error)
    });

};



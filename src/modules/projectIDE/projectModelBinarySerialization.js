import encoding from 'text-encoding';
import {FOLDER} from "./projectModel";

const UINT32_SIZE = 4;

const SIZE_BYTES = UINT32_SIZE; // number of bytes used to represent size (32 bits)

/**
 * Write data from source buffer to destination buffer with offset in destination buffer
 * @param destBuffer destination buffer
 * @param srcBuffer source buffer
 * @param offset offset in destination buffer to start writing from
 */
const writeUint8Array = (destBuffer, srcBuffer, offset) => {
    new Uint8Array(destBuffer).set(new Uint8Array(srcBuffer), offset);
};

/**
 * Read one uint32 number from buffer
 * @param buffer
 * @param offset
 * @returns {number}
 */
export const readUint32 = (buffer, offset) => new Uint32Array(buffer.slice(offset, offset + UINT32_SIZE))[0];

/**
 * Write ont uint32 number to buffer
 * @param value uint32 number
 * @param buffer buffer to write in
 * @param offset offset in buffer to start writing from
 */
export const writeUint32 = (value, buffer, offset) => {

    let uint32Buffer = new ArrayBuffer(UINT32_SIZE);
    let uint32BufferView = new Uint32Array(uint32Buffer);

    uint32BufferView[0] = value;

    writeUint8Array(buffer, uint32Buffer, offset);
};

/**
 * Converts javascript string to binary array buffer in format:
 * length in bytes (Uint32) bytes (length as first field)
 * @param text javascript string
 * @returns {ArrayBuffer}
 */
export const textToArrayBuffer = (text) => {
    let textBuffer = textEncoder.encode(text).buffer;

    let buffer = new ArrayBuffer(SIZE_BYTES + textBuffer.byteLength);
    writeUint32(textBuffer.byteLength, buffer, 0);
    writeUint8Array(buffer, textBuffer, SIZE_BYTES);

    return buffer;
};

const textDecoder = new encoding.TextDecoder("utf-8");
const textEncoder = new encoding.TextEncoder("utf-8");

/**
 * Converts array buffer to javascript string
 * @param buffer
 * @param offset offset in buffer in bytes
 * @returns {string}
 */
export const arrayBufferToText = (buffer, offset) => {

    let textByteLength = readUint32(buffer, offset);

    let textBuffer = buffer.slice(offset + SIZE_BYTES, offset + SIZE_BYTES + textByteLength);

    return textDecoder.decode(new Uint8Array(textBuffer));
};

/**
 * Convert two strings to binary buffer in format:
 * path length (Uint32), path length (Uint32), path, content length (Uint32), content
 * @param path
 * @param content
 * @returns {ArrayBuffer}
 */
export const textFileToArrayBuffer = (path, content) => {
    let pathBuffer = textToArrayBuffer(path);
    let contentBuffer = textToArrayBuffer(content);

    let buffer = new ArrayBuffer(SIZE_BYTES + pathBuffer.byteLength + contentBuffer.byteLength);

    writeUint32(pathBuffer.byteLength, buffer, 0);
    writeUint8Array(buffer, pathBuffer, SIZE_BYTES);
    writeUint8Array(buffer, contentBuffer, SIZE_BYTES + pathBuffer.byteLength);

    return buffer;
};

/**
 * Convert binary buffer to object with two fields path (string) and content (string)
 * @param buffer
 * @param offset offset in buffer
 * @returns {{path: string, content: string}}
 */
export const arrayBufferToTextFile = (buffer, offset) => {

    let pathBufferLength = readUint32(buffer, offset);

    let path = arrayBufferToText(buffer, offset + SIZE_BYTES);
    let content = arrayBufferToText(buffer, offset + SIZE_BYTES + pathBufferLength);

    return {path: path, content: content}
};

/**
 * Convert array of file objects containing two string fields, path and content, to ArrayByte in format:
 *
 * number of files (Uint32)
 * file length (Uint32), path length (Uint32), path length (Uint32), path, content length (Uint32), content
 * ...
 *
 * @param textFilesArray
 * @returns {ArrayBuffer}
 */
export const textFilesToArrayBuffer = (textFilesArray) => {

    let buffers = [];
    let numberOfFiles = 0;
    let totalFilesSize = 0;

    for(let i=0;i<textFilesArray.length;i++){
        buffers.push(textFileToArrayBuffer(textFilesArray[i].path, textFilesArray[i].content));
        totalFilesSize = totalFilesSize + buffers[i].byteLength;
        numberOfFiles = numberOfFiles + 1;
    }

    let bufferSize = SIZE_BYTES + numberOfFiles * SIZE_BYTES + totalFilesSize;

    let buffer = new ArrayBuffer(bufferSize);

    writeUint32(numberOfFiles, buffer, 0);

    let offset = SIZE_BYTES;

    for(let i=0; i<numberOfFiles; i++){

        let fb = buffers[i];

        writeUint32(fb.byteLength, buffer, offset);
        writeUint8Array(buffer, fb, offset+SIZE_BYTES);

        offset = offset + SIZE_BYTES + fb.byteLength;
    }

    return buffer;
};

/**
 * Extracts list of files from array buffer
 * @param buffer
 * @param offset
 * @returns {Array} Array of objects { path (string), content (string)}
 */
export const arrayBufferToTextFiles = (buffer, offset) => {

    let files = [];


    let numberOfFiles = readUint32(buffer, offset);

    offset = offset+SIZE_BYTES;

    for(let i=0; i<numberOfFiles; i++) {

        let fileLength = readUint32(buffer, offset);
        offset = offset + SIZE_BYTES;

        files.push(arrayBufferToTextFile(buffer, offset));
        offset = offset + fileLength;
    }

    return files;
};

/**
 * Convert immutable project into array buffer in format:
 *
 * project name length (Uint32), project name length (Uint32), project name
 * number of files (Uint32)
 * file length (Uint32), path length (Uint32), path length (Uint32), path, content length (Uint32), content
 * ...
 * @param project
 * @returns {ArrayBuffer}
 */
export const projectToArrayBuffer = (project) => {

    let rootId = project.get('rootId');
    let projectName = project.getIn(['nodes', rootId, 'name']);

    let projectNameBuffer = textToArrayBuffer(projectName);

    let files = extractFiles("", rootId, project);
    let filesBuffer = textFilesToArrayBuffer(files);

    let buffer = new ArrayBuffer(SIZE_BYTES + projectNameBuffer.byteLength + filesBuffer.byteLength);

    writeUint32(projectNameBuffer.byteLength, buffer, 0);
    writeUint8Array(buffer, projectNameBuffer, SIZE_BYTES);
    writeUint8Array(buffer, filesBuffer, SIZE_BYTES + projectNameBuffer.byteLength);

    return buffer;
};

/**
 * Extracts files from project into array of text file objects using recursion
 * @param basePath string representing beginning of path (root)
 * @param nodeId id of node in project to start from
 * @param project
 * @returns {Array} array of { path (string), content (string)} objects
 */
export const extractFiles = (basePath, nodeId, project) => {
    let node = project.getIn(['nodes', nodeId]);

    let nodeName = node.get('name');
    let nodePath = basePath + "/" + nodeName;

    let files = [];

    if (node.get('type') === FOLDER) {
        node.get('files')
            .map(fileId => project.getIn(['nodes', fileId]))
            .map(file => {
                return {path: nodePath + "/" + file.get('name'), content: file.get('content')}
            })
            .forEach(textFile => files.push(textFile));

        node.get('folders')
            .map(folderId => extractFiles(nodePath, folderId, project))
            .forEach(textFilesArray => files = files.concat(textFilesArray))
    }

    return files
};

/**
 * Helper function converting binary buffer to array like string with decimal 8bits values
 * @param buffer
 * @returns {string}
 */
export const arrayBufferToPrintableString = (buffer) => {
    let numbers = [];

    new Uint8Array(buffer).forEach(number => numbers.push(number + ""));

    return "[ " + numbers.join(", ") + " ]";
};


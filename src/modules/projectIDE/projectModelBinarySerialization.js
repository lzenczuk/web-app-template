const SIZE_BYTES = 4; // number of bytes used to represent size (32 bits)

/**
 * Converts javascript string to binary array buffer
 * @param text javascript string
 * @returns {ArrayBuffer}
 */
export const textToArrayBuffer = (text) => {
    const buffer = new ArrayBuffer(text.length * 2); // 2 bytes for each char
    const bufView = new Uint16Array(buffer);
    for (let i = 0, strLen = text.length; i < strLen; i++) {
        bufView[i] = text.charCodeAt(i);
    }
    return buffer;
};

/**
 * Converts arra
 * y buffer to javascript string
 * @param buffer
 * @param offset offset in buffer or 0 if not provided
 * @returns {string}
 */
export const arrayBufferToText = (buffer, offset = 0, length) => {

    console.log("===========> length: "+length);
    console.log("===========> offset: "+offset);

    if(length === undefined){
        length = (buffer.byteLength - offset)
    }

    console.log("===========> length: "+length);

    let textArrayBuffer = new Uint16Array(buffer, offset, length / 2);

    console.log("===========> text buffer length: "+textArrayBuffer.length);
    console.log("===========> text buffer byte length: "+textArrayBuffer.byteLength);
    console.log("===========> text buffer content: "+arrayBufferToPrintableString(textArrayBuffer));

    return String.fromCharCode.apply(null, textArrayBuffer);
};

/**
 * Convert two strings to binary buffer in format: path length (Uint32), content length (Uint32), path, content
 * @param path
 * @param content
 * @returns {ArrayBuffer}
 */
export const textFileToArrayBuffer = (path, content) => {
    let pathBuffer = textToArrayBuffer(path);
    let contentBuffer = textToArrayBuffer(content);

    let totalLength = SIZE_BYTES + pathBuffer.byteLength + SIZE_BYTES + contentBuffer.byteLength;

    let sizeBuffer = new ArrayBuffer(SIZE_BYTES * 2);
    let sizeBufferView = new Uint32Array(sizeBuffer);

    sizeBufferView[0] = pathBuffer.byteLength;
    sizeBufferView[1] = contentBuffer.byteLength;

    let fileBuffer = new ArrayBuffer(totalLength);
    let fileBufferView = new Uint8Array(fileBuffer);

    fileBufferView.set(new Uint8Array(sizeBuffer), 0);
    fileBufferView.set(new Uint8Array(pathBuffer), sizeBuffer.byteLength);
    fileBufferView.set(new Uint8Array(contentBuffer), sizeBuffer.byteLength + pathBuffer.byteLength);

    return fileBuffer;
};

/**
 * Convert binary buffer in format: path length (Uint32), content length (Uint32), path, content to object with two string, path and content
 * @param buffer
 * @param offset offset in buffer or 0 if not provided
 * @returns {{path: string, content: string}}
 */
export const arrayBufferToTextFile = (buffer, offset = 0 ) => {

    console.log("--------> offset: "+offset);

    //new Uint8Array(buffer).slice(offset, offset + SIZE_BYTES * 2);

    // TODO error - it expecting to offset be multiple of 4 but it doesn't have sens from whole file perspective
    // Buffer we receiving here have to be already sliced
    let sizeBufferView = new Uint32Array(new Uint8Array(buffer).slice(offset, offset + SIZE_BYTES * 2));

    console.log("--------> text file array buffer "+arrayBufferToPrintableString(new Uint8Array(buffer).slice(offset, offset + SIZE_BYTES * 2)));
    console.log("--------> text file array buffer "+arrayBufferToPrintableString(sizeBufferView));
    console.log("--------> size buffer length "+sizeBufferView.length);

    let pathBufferLength = sizeBufferView[0];
    let contentBufferLength = sizeBufferView[4];

    console.log("--------> pathBufferLength: "+pathBufferLength);
    console.log("--------> content length: "+contentBufferLength);

    let path = arrayBufferToText(buffer, offset + SIZE_BYTES * 2, pathBufferLength);
    let content = arrayBufferToText(buffer, offset + SIZE_BYTES * 2 + pathBufferLength, contentBufferLength);

    return {path: path, content: content}
};

/**
 * Converts binary buffer to array like string with decimal 8bits values
 * @param buffer
 * @returns {string}
 */
export const arrayBufferToPrintableString = (buffer) => {
    let numbers = [];

    new Uint8Array(buffer).forEach(number => numbers.push(number + ""));

    return "[ " + numbers.join(", ") + " ]";
};

/**
 * Build array buffer from multiple files in format:
 *
 * number on files in buffer: Uint32
 *
 * entries matching number of files:
 *
 * entry size: Uint32
 * file: path length (Uint32), content length (Uint32), path, content to object with two string, path and content
 *
 */
export class FilesBufferBuilder {
    constructor() {
        this.numberOfFiles = 0;
        this.buffer = new ArrayBuffer(0);
    }

    /**
     * Add file to builder
     * @param path
     * @param content
     */
    addFile(path, content) {
        this.numberOfFiles = this.numberOfFiles + 1;
        let fileBuffer = textFileToArrayBuffer(path, content);

        let sizeBuffer = new ArrayBuffer(SIZE_BYTES);
        let sizeBufferView = new Uint32Array(sizeBuffer);
        sizeBufferView[0] = fileBuffer.byteLength;

        let bufferView = new Uint8Array(this.buffer.byteLength + SIZE_BYTES + fileBuffer.byteLength);

        bufferView.set(new Uint8Array(this.buffer), 0);
        bufferView.set(new Uint8Array(sizeBuffer), this.buffer.byteLength);
        bufferView.set(new Uint8Array(fileBuffer), this.buffer.byteLength + SIZE_BYTES);

        this.buffer = bufferView.buffer;
    }

    /**
     * Generate array buffer based on added files
     * @returns {ArrayBuffer}
     */
    buildFilesArrayBuffer() {
        let sizeBuffer = new ArrayBuffer(SIZE_BYTES);
        let sizeBufferView = new Uint32Array(sizeBuffer);

        sizeBufferView[0] = this.numberOfFiles;

        let totalLength = SIZE_BYTES + this.buffer.byteLength;

        let filesBuffer = new ArrayBuffer(totalLength);
        let filesBufferView = new Uint8Array(filesBuffer);

        filesBufferView.set(new Uint8Array(sizeBuffer), 0);
        filesBufferView.set(new Uint8Array(this.buffer), sizeBuffer.byteLength);

        return filesBuffer;
    }
}

export const arrayBufferToFiles = buffer => {

    let files = [];

    let numberOfFilesBufferView = new Uint32Array(buffer, 0, SIZE_BYTES / 4);
    let numberOfFiles = numberOfFilesBufferView[0];

    console.log("----------> number of files: "+numberOfFiles);

    let offset = SIZE_BYTES;

    for (let i = 0; i < numberOfFiles; i++) {
        console.log("----------> offset: "+offset);
        let sizeBufferView = new Uint32Array(new Uint8Array(buffer, offset, SIZE_BYTES));
        let fileBufferLength = sizeBufferView[0];

        console.log("----------> file buffer length: "+fileBufferLength);

        files.push(arrayBufferToTextFile(buffer, offset + SIZE_BYTES));

        offset = offset + SIZE_BYTES + fileBufferLength;
    }

    return files;

};

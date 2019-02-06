import {
    arrayBufferToFiles,
    arrayBufferToPrintableString,
    arrayBufferToText,
    arrayBufferToTextFile,
    arrayBufferToTextFiles,
    FilesBufferBuilder,
    readUint32,
    textFilesToArrayBuffer,
    textFileToArrayBuffer,
    textToArrayBuffer,
    writeUint32
} from "./projectModelBinarySerialization";


test("Uint32 read and write to buffer", () => {

    let buffer = new ArrayBuffer(100);

    writeUint32(10, buffer, 0);
    writeUint32(23509, buffer, 11);
    writeUint32(1002340, buffer, 55);
    writeUint32(100234045, buffer, 81);

    expect(readUint32(buffer, 0)).toBe(10);
    expect(readUint32(buffer, 11)).toBe(23509);
    expect(readUint32(buffer, 55)).toBe(1002340);
    expect(readUint32(buffer, 81)).toBe(100234045);

});

test("Random Uint32 read and write to buffer", () => {

    let buffer = new ArrayBuffer(100);

    for(let i=0 ; i<1000; i++){
        let offset = Math.floor(Math.random() * Math.floor(97));
        let n = Math.floor(Math.random() * Math.floor(4294967295));

        writeUint32(n, buffer, offset);
        expect(readUint32(buffer, offset)).toBe(n);
    }
});

test("serialize and deserialize text", () => {

    let testText = "This is test text";

    let ab = textToArrayBuffer(testText);

    expect(ab).toBeDefined();
    expect(ab).toBeInstanceOf(ArrayBuffer);

    let txt = arrayBufferToText(ab, 0);

    expect(txt).toBeDefined();
    expect(typeof txt).toBe("string");
    expect(txt).toBe(testText);
    expect(txt.length).toBe(17);
});

test("serialize and deserialize empty text", () => {

    let testText = "";

    let ab = textToArrayBuffer(testText);

    expect(ab).toBeDefined();
    expect(ab).toBeInstanceOf(ArrayBuffer);
    expect(ab.byteLength).toBe(4);

    let txt = arrayBufferToText(ab, 0);

    expect(txt).toBeDefined();
    expect(typeof txt).toBe("string");
    expect(txt.length).toBe(0);
    expect(txt).toEqual(testText);
});

test("serialize and deserialize long text", () => {


    let testText = "";

    for(let i=0; i<100000; i++){
        testText = testText+"This is long test text. ";
    }

    let ab = textToArrayBuffer(testText);

    expect(ab).toBeDefined();

    let txt = arrayBufferToText(ab, 0);

    expect(txt).toBeDefined();
    expect(typeof txt).toBe("string");
    expect(txt.length).toEqual(testText.length);
});

test("serialize and deserialize file", () => {

    let testPath = "/project/src/text.txt";
    let testContent = "This is test file content";

    let fileArrayBuffer = textFileToArrayBuffer(testPath, testContent);

    expect(fileArrayBuffer).toBeDefined();
    expect(fileArrayBuffer).toBeInstanceOf(ArrayBuffer);

    //console.log(arrayBufferToPrintableString(fileArrayBuffer));

    let {path, content} = arrayBufferToTextFile(fileArrayBuffer, 0);

    expect(path).toBeDefined();
    expect(path).toBe(testPath);
    expect(content).toBeDefined();
    expect(content).toBe(testContent);
});

test("serialize and deserialize of multiple files", () => {

    let files = [];

    // ------------------ test
    let filesBuffer = textFilesToArrayBuffer(files);

    expect(filesBuffer).toBeDefined();

    //console.log(arrayBufferToPrintableString(filesBuffer));

    let deserializedFiles = arrayBufferToTextFiles(filesBuffer, 0);

    expect(deserializedFiles).toBeDefined();
    expect(deserializedFiles).toBeInstanceOf(Array);
    expect(deserializedFiles.length).toBe(0);
    // ------------------ end of test

    let filePath1 = "/project/src/folder/file1.txt";
    let fileContent1 = "File 1 content text. Extra letters: a";
    files.push({ path: filePath1, content: fileContent1 });

    // ------------------ test
    filesBuffer = textFilesToArrayBuffer(files);

    expect(filesBuffer).toBeDefined();

    //console.log(arrayBufferToPrintableString(filesBuffer));

    deserializedFiles = arrayBufferToTextFiles(filesBuffer, 0);

    expect(deserializedFiles).toBeDefined();
    expect(deserializedFiles).toBeInstanceOf(Array);
    expect(deserializedFiles.length).toBe(1);
    expect(deserializedFiles[0].path).toBe(filePath1);
    expect(deserializedFiles[0].content).toBe(fileContent1);
    // ------------------ end of test

    let filePath2 = "/project/src/folder/file2.txt";
    let fileContent2 = "File 2 content text. Extra letters: ab";
    files.push({ path: filePath2, content: fileContent2 });

    // ------------------ test
    filesBuffer = textFilesToArrayBuffer(files);

    expect(filesBuffer).toBeDefined();

    //console.log(arrayBufferToPrintableString(filesBuffer));

    deserializedFiles = arrayBufferToTextFiles(filesBuffer, 0);

    expect(deserializedFiles).toBeDefined();
    expect(deserializedFiles).toBeInstanceOf(Array);
    expect(deserializedFiles.length).toBe(2);
    expect(deserializedFiles[0].path).toBe(filePath1);
    expect(deserializedFiles[0].content).toBe(fileContent1);
    expect(deserializedFiles[1].path).toBe(filePath2);
    expect(deserializedFiles[1].content).toBe(fileContent2);
    // ------------------ end of test

    let filePath3 = "/project/src/folder/file3.txt";
    let fileContent3 = "File 3 content text. Extra letters: abc";
    files.push({ path: filePath3, content: fileContent3 });

    // ------------------ test
    filesBuffer = textFilesToArrayBuffer(files);

    expect(filesBuffer).toBeDefined();

    //console.log(arrayBufferToPrintableString(filesBuffer));

    deserializedFiles = arrayBufferToTextFiles(filesBuffer, 0);

    expect(deserializedFiles).toBeDefined();
    expect(deserializedFiles).toBeInstanceOf(Array);
    expect(deserializedFiles.length).toBe(3);
    expect(deserializedFiles[0].path).toBe(filePath1);
    expect(deserializedFiles[0].content).toBe(fileContent1);
    expect(deserializedFiles[1].path).toBe(filePath2);
    expect(deserializedFiles[1].content).toBe(fileContent2);
    expect(deserializedFiles[2].path).toBe(filePath3);
    expect(deserializedFiles[2].content).toBe(fileContent3);
    // ------------------ end of test
});



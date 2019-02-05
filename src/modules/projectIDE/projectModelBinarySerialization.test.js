import {
    arrayBufferToFiles,
    arrayBufferToPrintableString,
    arrayBufferToText, arrayBufferToTextFile, FilesBufferBuilder,
    textFileToArrayBuffer,
    textToArrayBuffer
} from "./projectModelBinarySerialization";

test("serialize and deserialize text", () => {

    let testText = "This is test text";

    let ab = textToArrayBuffer(testText);

    expect(ab).toBeDefined();
    expect(ab).toBeInstanceOf(ArrayBuffer);
    expect(ab.byteLength).toBe(34);

    console.log(arrayBufferToPrintableString(ab));

    let txt = arrayBufferToText(ab);

    expect(txt).toBeDefined();
    expect(typeof txt).toBe("string");
    expect(txt.length).toBe(17);
    expect(txt).toEqual(testText);
});

test("serialize and deserialize file", () => {

    let testText = "This is test file content";
    let testPath = "/project/src/text.txt";

    let fileArrayBuffer = textFileToArrayBuffer(testPath, testText);

    expect(fileArrayBuffer).toBeDefined();
    expect(fileArrayBuffer).toBeInstanceOf(ArrayBuffer);
    expect(fileArrayBuffer.byteLength).toBe(4 + 4 + 25*2 + 21*2);

    console.log(arrayBufferToPrintableString(fileArrayBuffer));

    let {path, content} = arrayBufferToTextFile(fileArrayBuffer);

    expect(path).toBeDefined();
    expect(content).toBeDefined();
    expect(path).toBe(testPath);
    expect(content).toBe(testText);
});

test("serialize and deserialize of multiple files", () => {

    let builder = new FilesBufferBuilder();

    let filePath1 = "/project/src/folder/file1.txt";
    let fileContent1 = "File 1 content text.";
    builder.addFile(filePath1, fileContent1);
    //console.log(arrayBufferToPrintableString(builder.buildFilesArrayBuffer()));

    let filePath2 = "/project/src/folder/file2.txt";
    let fileContent2 = "File 2 content text.";
    builder.addFile(filePath2, fileContent2);
    //console.log(arrayBufferToPrintableString(builder.buildFilesArrayBuffer()));

    let filePath3 = "/project/src/folder/file3.txt";
    let fileContent3 = "File 3 content text.";
    builder.addFile(filePath3, fileContent3);
    //console.log(arrayBufferToPrintableString(builder.buildFilesArrayBuffer()));

    let filesArrayBuffer = builder.buildFilesArrayBuffer();

    let files = arrayBufferToFiles(filesArrayBuffer);

    expect(files).toBeDefined();
    expect(files).toBeInstanceOf(Array);
    expect(files.length).toBe(3);

    expect(files[0].path).toBe(filePath1);
    expect(files[0].content).toBe(fileContent1);

    expect(files[1].path).toBe(filePath2);
    expect(files[1].content).toBe(fileContent2);

    expect(files[2].path).toBe(filePath3);
    expect(files[2].content).toBe(fileContent3);
});


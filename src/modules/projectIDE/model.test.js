import {Folder} from "./model";

test("create file in root folder", () => {

    let root = new Folder("root");
    root.createChildFile("test.txt", "Text");

    expect(root.files).toBeDefined();
    expect(root.files.length).toBe(1);

    expect(root.files[0].type).toBe("FILE");
    expect(root.files[0].name).toBe("test.txt");
    expect(root.files[0].content).toBe("Text");
});

test("create folder in root folder", () => {

    let root = new Folder("root");
    root.createChildFolder("folder1");

    expect(root.folders).toBeDefined();
    expect(root.folders.length).toBe(1);

    expect(root.folders[0].type).toBe("FOLDER");
    expect(root.folders[0].name).toBe("folder1");
});

test("create files in root folder", () => {

    let root = new Folder("root");
    root.createChildFile("test1.txt", "Text1");
    root.createChildFile("test2.txt", "Text2");
    root.createChildFile("test3.txt", "Text3");

    expect(root.files).toBeDefined();
    expect(root.files.length).toBe(3);

    expect(root.files[0].type).toBe("FILE");
    expect(root.files[0].name).toBe("test1.txt");
    expect(root.files[0].content).toBe("Text1");

    expect(root.files[1].type).toBe("FILE");
    expect(root.files[1].name).toBe("test2.txt");
    expect(root.files[1].content).toBe("Text2");

    expect(root.files[2].type).toBe("FILE");
    expect(root.files[2].name).toBe("test3.txt");
    expect(root.files[2].content).toBe("Text3");
});

test("create folders in root folder", () => {

    let root = new Folder("root");
    root.createChildFolder("folder1");
    root.createChildFolder("folder2");
    root.createChildFolder("folder3");

    expect(root.folders).toBeDefined();
    expect(root.folders.length).toBe(3);

    expect(root.folders[0].type).toBe("FOLDER");
    expect(root.folders[0].name).toBe("folder1");

    expect(root.folders[1].type).toBe("FOLDER");
    expect(root.folders[1].name).toBe("folder2");

    expect(root.folders[2].type).toBe("FOLDER");
    expect(root.folders[2].name).toBe("folder3");
});

test("delete file in root folder", () => {

    let root = new Folder("root");
    root.createChildFile("test1.txt", "Text1");
    root.createChildFile("test2.txt", "Text2");
    root.createChildFile("test3.txt", "Text3");
    root.deleteChildFile("test2.txt");

    expect(root.files).toBeDefined();
    expect(root.files.length).toBe(2);

    expect(root.files[0].type).toBe("FILE");
    expect(root.files[0].name).toBe("test1.txt");
    expect(root.files[0].content).toBe("Text1");

    expect(root.files[1].type).toBe("FILE");
    expect(root.files[1].name).toBe("test3.txt");
    expect(root.files[1].content).toBe("Text3");
});

test("find by path", () => {

    let root = new Folder("root");
    root.createChildFolder("f1");
    root.createChildFolder("f2");
    root.createChildFolder("f3");

    root.folders[0].createChildFolder("f1f1");
    root.folders[0].createChildFolder("f1f2");
    root.folders[0].createChildFolder("f1f3");

    root.folders[0].folders[1].createChildFolder("f1f2f1");
    root.folders[0].folders[1].createChildFolder("f1f2f2");
    root.folders[0].folders[1].createChildFolder("f1f2f3");

    let test_root = root.findByPath("/root");
    expect(test_root).toBeDefined();
    expect(test_root.name).toBe("root");

    let test_empty = root.findByPath("");
    expect(test_empty).toBeUndefined();

    let test_undefined = root.findByPath();
    expect(test_undefined).toBeUndefined();

    let test_f1 = root.findByPath("/root/f1");
    expect(test_f1).toBeDefined();
    expect(test_f1.name).toBe("f1");

    let test_f3 = root.findByPath("/root/f3");
    expect(test_f3).toBeDefined();
    expect(test_f3.name).toBe("f3");

    let test_f4 = root.findByPath("/root/f4");
    expect(test_f4).toBeUndefined();
});



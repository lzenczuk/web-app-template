

export class File {

    constructor(name, content, parent){
        this.type = "FILE";
        this.name = name;
        this.parent = parent;
        this.content = content;
    }

    setName(newName) {
        this.name = newName;
    }
}

export class Folder {

    constructor(name, parent){
        this.type = "FOLDER";
        this.name = name;
        this.folders = [];
        this.files = [];
        this.parent = parent;
    }

    setName(newName) {
        this.name = newName;
    }

    createChildFolder(name) {
        this.folders.push(new Folder(name, this))
    }

    deleteChildFolder(name) {
        this.folders = this.folders.filter(folder => folder.name !== name)
    }

    createChildFile(name, content){
        this.files.push(new File(name, content, this))
    }

    deleteChildFile(name) {
        this.files = this.files.filter(file => file.name !== name)
    }

    findByPath(path){

        if(path === undefined){
            return undefined
        }

        if(typeof path === "string"){
            path = path.split("/").filter( v => v!=="")
        }

        if(path.length === 0){
            return undefined;
        }

        if(path[0] !== this.name){
            return undefined
        }

        if(path.length === 1){
            return this;
        }

        if(path.length === 2){
            // Only one more element in path so file...
            for(let i = 0; i<this.files.length; i++){
                if(this.files[i].name === path[1]){
                    return this.files[i]
                }
            }

            //... or folder
            for(let i = 0; i<this.folders.length; i++){
                if(this.folders[i].name === path[1]){
                    return this.folders[i]
                }
            }
        }else{
            // More elements in path then one so next have to be folder
            for(let i = 0; i<this.folders.length; i++){
                let node = this.folders[i].findByPath(path.slice(1));
                if(node !== undefined){
                    return node
                }
            }
        }

        return undefined;
    }

    createFolder(path, name){
        let node = this.findByPath(path);

        if(node !== undefined && node.type === "FOLDER"){
            node.createChildFolder(name);
        }
    }

    createFile(path, name, content){
        let node = this.findByPath(path);

        if(node !== undefined && node.type === "FOLDER"){
            node.createChildFile(name, content)
        }
    }

    delete(path){
        let node = this.findByPath(path);

        if(node !== undefined && node.parent !== undefined){
            switch (node.type) {
                case "FOLDER":
                    node.parent.deleteChildFolder(node.name);
                    break;
                case "FILE":
                    node.parent.deleteChildFile(node.name);
                    break;
            }
        }
    }
}

export class ActivePath {
    constructor(){
        this.__path=undefined;
    }

    isActivePathSet(){
        return this.__path!==undefined
    }

    getActivePath(){
        return this.__path
    }

    setActivePath(newPath){
        this.__path = newPath
    }

    clear(){
        this.__path = undefined
    }

    isAffectedByRename(pathToRename){

        if(this.__path===undefined){
            return false;
        }

        if(pathToRename===undefined){
            return false;
        }

        if(pathToRename.length===0){
            return false;
        }

        if(this.__path===pathToRename){
            return true;
        }

        let pathToRenameArray = pathToRename.split("/").filter( v => v!=="");
        let pathArray =  this.__path.split("/").filter( v => v!=="");

        if(pathToRenameArray.length > pathArray.length){
            return false;
        }

        for(let i=0;i<pathToRenameArray.length;i++){
            if(pathToRenameArray[i]!==pathArray[i]){
                return false;
            }
        }

        return true;
    }

    generateRenamedPath(activePath, path, newName){
        let activePathArray =  activePath.split("/").filter( v => v!=="");
        let pathArray =  path.split("/").filter( v => v!=="");

        activePathArray[pathArray.length-1] = newName;

        return "/"+activePathArray.join("/")
    }
}

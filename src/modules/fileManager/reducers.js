import _ from "lodash";
import { RENAME } from "./actions"

let initState = {
    root: {
        type: "FOLDER",
        name: "project name",
        folders: [
            {
                type: "FOLDER",
                name: "scheduler",
                folders: [
                    {
                        type: "FOLDER",
                        name: "local",
                        folders: [],
                        files: [
                            {
                                type: "FILE",
                                name: "local_scheduler.hpp",
                                content: "Test scheduler.hpp"
                            },
                            {
                                type: "FILE",
                                name: "local_scheduler.cpp",
                                content: "Test scheduler.cpp"
                            }
                        ]
                    },
                    {
                        type: "FOLDER",
                        name: "remote",
                        folders: [],
                        files: [
                            {
                                type: "FILE",
                                name: "remote_scheduler.hpp",
                                content: "Test scheduler.hpp"
                            },
                            {
                                type: "FILE",
                                name: "remote_scheduler.cpp",
                                content: "Test scheduler.cpp"
                            }
                        ]
                    }
                ],
                files: [
                    {
                        type: "FILE",
                        name: "scheduler.hpp",
                        content: "Test scheduler.hpp"
                    },
                    {
                        type: "FILE",
                        name: "scheduler.cpp",
                        content: "Test scheduler.cpp"
                    }
                ]
            },
            {
                type: "FOLDER",
                name: "hello",
                folders: [],
                files: [
                    {
                        type: "FILE",
                        name: "hello.hpp",
                        content: "Test hello.hpp"
                    },
                    {
                        type: "FILE",
                        name: "hello.cpp",
                        content: "Test hello.cpp"
                    }
                ]
            },
        ],
        files: [
            {
                type: "FILE",
                name: "scheduler.hpp",
                content: "Test scheduler.hpp"
            }
        ]
    }
};


function findTreeNodeByPath(root, path) {

    const lookingElementName = path[0];

    // last element in path
    if(path.length===1){

        let e = root.folders.find(folder => folder.name===lookingElementName);

        if(e===undefined){
            e =  root.files.find(file => file.name===lookingElementName);
        }

        return e;
    }else{
        let e = root.folders.find(folder => folder.name===lookingElementName);

        if(e===undefined){
            return e
        }else{
            return findTreeNodeByPath(e, path.slice(1))
        }
    }
}

function parentIdToPathArray(parentId) {
    return parentId.split("/").filter( v => v!=="");
}

const fileManager = (state=initState, action) => {

    switch (action.type) {

        case RENAME: {

            let newState = _.cloneDeep(state);

            const { parentId, newName } = action;

            let pathArray = parentIdToPathArray(parentId);

            if(pathArray.length!==0 && pathArray[0]===newState.root.name){

                const element = findTreeNodeByPath(newState.root, pathArray.slice(1));

                if(element!==undefined){
                    element.name = newName
                }

            }

            return newState;
        }

        default:
            return state
    }
};

export default fileManager

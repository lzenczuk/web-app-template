import _ from "lodash";
import { RENAME } from "./actions"

let initState = {
    root: {
        type: "FOLDER",
        name: "project name",
        files: [
            {
                type: "FOLDER",
                name: "scheduler",
                files: [
                    {
                        type: "FOLDER",
                        name: "local",
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
                    },
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
            {
                type: "FILE",
                name: "scheduler.hpp",
                content: "Test scheduler.hpp"
            }
        ]
    }
};

const findElementByParentId = (root, parentId) => {
    const pathArray = parentId.split("/");
    let index = 0;

    while (index < pathArray.length) {
        const p = pathArray[index];

        for (let fIndex = 0; fIndex < root.length; fIndex++) {
            let element = root[fIndex];

            if (element.name === p) {

                if (index === pathArray.length - 1) {
                    return element;
                }
                root = element.files;
                break;
            }

        }

        index++;
    }

    return null;
};

const fileManager = (state=initState, action) => {

    switch (action.type) {

        case RENAME: {

            let newState = _.cloneDeep(state);

            const { parentId, newName } = action;

            const element = findElementByParentId(newState.root.files, parentId);

            if(element!=null){
                element.name = newName
            }

            return newState;
        }

        default:
            return state
    }
};

export default fileManager

import _ from "lodash";
import { TOGGLE_FOLDER } from "../actions/actions"

let initState = {
    projectName: "test",
    files: [
        {
            type: "FOLDER",
            name: "scheduler",
            open: false,
            files: [
                {
                    type: "FOLDER",
                    name: "local",
                    open: false,
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
                    open: false,
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
            open: false,
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
};

const fileManager = (state=initState, action) => {

    switch (action.type) {
        case TOGGLE_FOLDER:

            let newState = _.cloneDeep(state);

            let path = action.path;

            let root = newState.files;
            const pathArray = path.split("/");
            let index = 0;

            while (index<pathArray.length) {
                const p = pathArray[index];

                for(let fIndex = 0; fIndex<root.length; fIndex++){
                    let element = root[fIndex];

                    if(element.type==='FOLDER' && element.name===p){

                        if(index===pathArray.length-1){
                            element.open = !element.open;
                        }else{
                            element.open = true;
                        }
                        root = element.files;
                        break;
                    }

                }

                index++;
            }


            return newState;

        default:
            return state
    }
};

export default fileManager

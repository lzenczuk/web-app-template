import React from "react";
import ReactDOM from "react-dom";


let projectModel = {
    lists: [
        {
            id: 100201,
            name: "Test list",
            tasks: [
                {id: 100, name: "task 1", done: false},
                {id: 101, name: "task 2", done: false},
                {id: 102, name: "task 3", done: true},
                {id: 103, name: "task 4", done: true},
                {id: 104, name: "task 5", done: false},
            ]
        },
        {
            id: 100202,
            name: "React project",
            tasks: [
                {id: 100, name: "Create node project", done: true},
                {id: 101, name: "Add webpack support", done: true},
                {id: 102, name: "Add react", done: true},
                {id: 103, name: "Create basic list component", done: false},
                {id: 104, name: "Add Material UI", done: false},
                {id: 104, name: "Rewrite list to MUI", done: false},
            ]
        },
        {
            id: 100203,
            name: "Shopping list",
            tasks: [
                {id: 100, name: "Collect prescription", done: true},
                {id: 101, name: "Buy vegetables", done: false},
                {id: 102, name: "Prepare meal for tomorrow", done: false},
            ]
        }
    ]
};

const Task = (props) => {

    let task = props.model;

    let doneButton = "";
    if(task.done){
        doneButton = <span>x</span>
    }

    return <li>
        <span>{task.name}</span>
        {doneButton}
    </li>
};

const List = (props) => {

    let list = props.model;

    return <div>
        <h3>{list.name}</h3>
        <ul>{list.tasks.map( task => <Task key={task.id} model={task}/>)}</ul>
    </div>
};

const Project = (props) => {
    let project = props.model;

    return <div>
        { project.lists.map( list => <List key={list.id} model={list}/>)}
    </div>
};

ReactDOM.render(<Project model={projectModel} />, document.getElementById("index"));



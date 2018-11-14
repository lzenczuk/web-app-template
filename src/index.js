import React, {Fragment} from "react";
import ReactDOM from "react-dom";

import CssBaseline from '@material-ui/core/CssBaseline';

import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';

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
                {id: 105, name: "Rewrite list to MUI", done: false},
            ]
        },
        {
            id: 100203,
            name: "Shopping list",
            tasks: [
                {id: 100, name: "Collect prescription", done: true},
                {id: 101, name: "Buy vegetables", done: false},
                {id: 102, name: "Prepare meal for tomorrow", done: false},
                {id: 103, name: "Very long test text. Very long test text. Very long test text.", done: false},
            ]
        }
    ]
};

const Task = (props) => {

    let task = props.model;

    return <ListItem button>
        <ListItemText primary={task.name}/>
        <Checkbox checked={task.done}/>
    </ListItem>
};

const TasksList = (props) => {

    let list = props.model;

    return <Grid item xs={12} sm={6} md={4} lg={3}>
        <Toolbar>
            <Typography variant="h6" color="inherit">
                {list.name}
            </Typography>
        </Toolbar>
        <List component="nav">{list.tasks.map( task => <Task key={task.id} model={task}/>)}</List>
    </Grid>
};

const Project = (props) => {
    let project = props.model;

    return <Grid container spacing={8}>
        { project.lists.map( list => <TasksList key={list.id} model={list}/>)}
    </Grid>
};

const App = () => {
    return <Fragment>
        <CssBaseline/>
        <Project model={projectModel}/>
    </Fragment>
};

ReactDOM.render(<App/>, document.getElementById("index"));



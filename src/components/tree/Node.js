import React, { Fragment } from "react";
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const Node = (props) => {

    let {name, nodes} = props;

    if(nodes==null){
        nodes = [];
    }

    return <Fragment>
        <ListItem><ListItemText primary={name}/></ListItem>

    </Fragment>
};

export default Node;

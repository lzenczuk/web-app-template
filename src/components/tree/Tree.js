import React from "react";
import List from '@material-ui/core/List';
import Node from "./components/tree/Node"

const Tree = (props) => {

    const {nodes} = props;

    return <List>{
        nodes.map((node, index) => <Node key={index} name={node.name} nodes={node.nodes}/> )
    }</List>
};

export default Tree;

import ToolBar from "@material-ui/core/Toolbar/Toolbar";
import Typography from "@material-ui/core/Typography/Typography";
import AppBar from "@material-ui/core/AppBar/AppBar";
import React, {Fragment} from "react";
import Button from "@material-ui/core/Button/Button";

export const ApplicationTopBar = (props) => {

    const { loggedIn } = props;

    let loginButton = null;

    if(loggedIn){
        const { userName, onLogout } = props;

        loginButton = <Fragment>
            <Typography variant="subtitle1" style={{marginRight: 10}}>{userName}</Typography>
            <Button onClick={onLogout}>Logout</Button>
        </Fragment>
    }else{
        const { onLogin } = props;

        loginButton = <Button onClick={onLogin}>Login</Button>
    }

    return <AppBar>
        <ToolBar variant="dense">
            <Typography variant="h6" style={{flexGrow: 1}}>Hello</Typography>
            {loginButton}
        </ToolBar>
    </AppBar>
}

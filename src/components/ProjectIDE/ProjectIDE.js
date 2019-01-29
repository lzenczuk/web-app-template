import * as React from "react";
import Grid from "@material-ui/core/Grid/Grid";
import Paper from "@material-ui/core/Paper/Paper";
import {FileManager} from "../../components/FileManager";
import {FileEditor} from "../../components/FileEditor";

export class ProjectIDE extends React.Component {

    render() {

        const { root, content, active, fileId} = this.props;
        const { onRename, onDelete, onNewFolder, onNewFile, onSelect, onChange } = this.props;

        return (
            <Grid container direction="row" justify="flex-start" alignItems="stretch" spacing={8}>
                <Grid item xs={3} container alignItems="stretch">
                    <Paper style={{flexGrow: 1}}>
                        <FileManager root={root} onRename={onRename} onDelete={onDelete} onNewFolder={onNewFolder} onNewFile={onNewFile} onSelect={onSelect}/>
                    </Paper>
                </Grid>
                <Grid item xs={9} container alignItems="stretch">
                    <FileEditor content={content} active={active} fileId={fileId} onChange={onChange}/>
                </Grid>
            </Grid>
        )
    }
}

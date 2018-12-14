import React from "react";
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import TextField from "@material-ui/core/TextField/TextField";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Button from "@material-ui/core/Button/Button";

export class RenameDialog extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            name: props.name
        }
    }

    handleNameChange(event) {
        this.setState({
            name: event.target.value
        })
    }

    render() {

        let name = this.state.name;

        const onRenameClick = (e) => {
            this.props.onRename(this.props.parentId, this.state.name)
        };

        return <Dialog open={true}>
            <DialogTitle>Rename file {this.props.name}</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="New file name"
                    type="email"
                    fullWidth
                    value={name}
                    onChange={this.handleNameChange.bind(this)}
                />
            </DialogContent>
            <DialogActions>
                <Button color="primary" onClick={onRenameClick}>
                    Rename
                </Button>
                <Button color="primary" onClick={this.props.onCancel}>
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    }
}

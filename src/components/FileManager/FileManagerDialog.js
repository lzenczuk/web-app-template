import React from "react";
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import TextField from "@material-ui/core/TextField/TextField";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Button from "@material-ui/core/Button/Button";

export class FileManagerDialog extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            value: props.value
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.value !== this.state.value) {
            this.setState({
                value: nextProps.value
            })
        }
    }

    handleValueChange(event) {
        this.setState({
            value: event.target.value
        })
    }

    handleAccept() {
        if (this.props.confirmationOnly) {
            this.props.onAccept()
        } else {
            this.props.onAccept(this.state.value)
        }
    }

    handleCancel() {
        this.setState({
            value: this.props.value
        });

        this.props.onCancel()
    }

    render() {

        if (!this.props.visible) {
            return null
        }

        let valueField = null;
        if (!this.props.confirmationOnly) {
            valueField = <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label={this.props.label}
                    type="email"
                    fullWidth
                    value={this.state.value}
                    onChange={this.handleValueChange.bind(this)}
                />
            </DialogContent>
        }

        return <Dialog open={true}>
            <DialogTitle>{this.props.title}</DialogTitle>
            {valueField}
            <DialogActions>
                <Button color="primary" onClick={this.handleAccept.bind(this)}>
                    Accept
                </Button>
                <Button color="primary" onClick={this.handleCancel.bind(this)}>
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    }
}

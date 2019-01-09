import * as React from "react";
import AceEditor from "react-ace";

// Import editor related files
import 'brace/mode/c_cpp';
import 'brace/snippets/c_cpp';
import 'brace/theme/textmate';
import 'brace/ext/language_tools';

export class FileEditor extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            content: props.content
        }
    }

    onChange(newValue){

        this.setState({
            content: newValue
        });
    }

    componentWillReceiveProps(nextProps, nextContext){

        // because we switching file dispatch update action on current one
        if(this.props.fileId!==nextProps.fileId){
            this.props.onChange(this.props.fileId, this.state.content)
        }

        this.setState({
            content: nextProps.content
        })
    }

    render(){
        if(this.props.active){
            return <AceEditor
                mode="c_cpp"
                theme="textmate"
                name="UNIQUE_ID_OF_DIV"
                value={this.state.content}
                onChange={this.onChange.bind(this)}
                editorProps={{$blockScrolling: true}}
                enableBasicAutocompletion={true}
                enableLiveAutocompletion={true}
                enableSnippets={true}
                style={{flexGrow: 1, height: "100%"}}
            />
        }else{
            return null
        }
    }
}

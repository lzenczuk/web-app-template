import * as React from "react";
import AceEditor from "react-ace";

// Import editor related files
import 'brace/mode/c_cpp';
import 'brace/snippets/c_cpp';
import 'brace/theme/textmate';
import 'brace/ext/language_tools';

export class FileEditor extends React.Component {

    constructor(props){
        super(props)
    }

    onChange(newValue, e){

        this.props.onChange(this.props.fileId, newValue)

    }

    render(){
        if(this.props.active){
            return <AceEditor
                mode="c_cpp"
                theme="textmate"
                name="UNIQUE_ID_OF_DIV"
                value={this.props.content}
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

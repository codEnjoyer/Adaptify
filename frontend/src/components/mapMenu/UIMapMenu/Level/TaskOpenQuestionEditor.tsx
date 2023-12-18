import {convertToRaw, EditorState} from "draft-js";
import React, {useState} from "react";
import {Editor} from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

interface ITaskOpenQuestionEditor {
    text: string,
    setText: (text: string) => void
}

const TaskOpenQuestionEditor: React.FC<ITaskOpenQuestionEditor> = ({text, setText}) => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const onEditorStateChange = function (editorState: EditorState) {
        setEditorState(editorState);
        let text = editorState.getCurrentContent().getPlainText("\u0001");
        setText(text);
    };

    return (
        <>
            <Editor
                editorState={editorState}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onEditorStateChange={onEditorStateChange}
                editorStyle={{color: "black"}}
            />
        </>
    );
}

export default TaskOpenQuestionEditor

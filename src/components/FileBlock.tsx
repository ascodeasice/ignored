import {
  Editable, EditableInput,
  EditablePreview, Input
} from "@chakra-ui/react";
import EditButton from "./EditButton";
import { useState } from "react";

type FileBlockProps = {
  fileName: string;
  ignored: boolean;
  invalid: boolean;
  index: number;
  autoFocusing: boolean;
  setAutoFocusing: React.Dispatch<React.SetStateAction<boolean>>;
  setFileNames: React.Dispatch<React.SetStateAction<string[]>>;
}

const FileBlock = ({ fileName, ignored, invalid, index, autoFocusing, setAutoFocusing, setFileNames }: FileBlockProps) => {
  const shouldFocus = autoFocusing && index === 0; // the newly created

  const [color, setColor] = useState<string>(shouldFocus || (!invalid) ? '' : 'red.500');
  const [opacity, setOpacity] = useState<number>(ignored ? 0.5 : 1);
  const onSubmit = (nextValue: string) => {
    setFileNames((prev) => {
      return [...prev.slice(0, index), nextValue, ...prev.slice(index + 1)]
    });
    setAutoFocusing(false);
  }

  const onChange = () => {
    // make sure user can edit normally
    setColor('');
    setOpacity(1);
  }

  const onCancel = () => {
    // set to red if it was invalid (value won't change)
    setColor(invalid ? 'red.500' : '')
    setOpacity(ignored ? 0.5 : 1)
  }


  return (
    <Editable defaultValue={fileName} fontSize={'lg'} isPreviewFocusable={false} opacity={opacity}
      onSubmit={onSubmit} onChange={onChange} placeholder="Enter file name" color={color} startWithEditView={shouldFocus}
      onCancel={onCancel}>
      <EditablePreview />
      <Input as={EditableInput} />
      <EditButton fileName={fileName} index={index} setFileNames={setFileNames} />
    </Editable>)
}

export default FileBlock
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
  const [color, setColor] = useState<string>(invalid ? 'red.500' : '');
  const onSubmit = (nextValue: string) => {
    setFileNames((prev) => {
      return [...prev.slice(0, index), nextValue, ...prev.slice(index + 1)]
    });
    setAutoFocusing(false);
  }

  const onEdit = () => {
    setColor('');
  }

  const shouldFocus = autoFocusing && index === 0; // the newly created

  return (
    <Editable defaultValue={fileName} fontSize={'lg'} isPreviewFocusable={false} opacity={ignored ? '0.5' : '1'}
      onSubmit={onSubmit} onEdit={onEdit} placeholder="Enter file name" color={color} startWithEditView={shouldFocus}>
      <EditablePreview />
      <Input as={EditableInput} />
      <EditButton fileName={fileName} index={index} setFileNames={setFileNames} />
    </Editable>)
}

export default FileBlock
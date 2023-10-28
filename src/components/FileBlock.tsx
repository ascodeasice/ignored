import {
  Editable, EditableInput,
  EditablePreview, Input
} from "@chakra-ui/react";
import EditButton from "./EditButton";

type FileBlockProps = {
  fileName: string;
  ignored: boolean;
  index: number;
  setFileNames: React.Dispatch<React.SetStateAction<string[]>>;
}

const FileBlock = ({ fileName, ignored, index, setFileNames }: FileBlockProps) => {

  return (
    <Editable defaultValue={fileName} fontSize={'lg'} isPreviewFocusable={false} opacity={ignored ? '0.5' : '1'}>
      <EditablePreview />
      <Input as={EditableInput} />
      <EditButton fileName={fileName} index={index} setFileNames={setFileNames} />
    </Editable>)
}

export default FileBlock
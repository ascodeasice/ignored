import { CheckIcon, CloseIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { ButtonGroup, IconButton, useEditableControls } from "@chakra-ui/react";

type EditButtonProps = {
  fileName: string;
  index: number;
  setFileNames: React.Dispatch<React.SetStateAction<string[]>>;
}

const EditButton = ({ fileName, index, setFileNames }: EditButtonProps) => {
  const {
    isEditing,
    getSubmitButtonProps,
    getCancelButtonProps,
    getEditButtonProps,
  } = useEditableControls()

  const deleteFile = () => {
    setFileNames((prev) => {
      const result = [...prev.slice(0, index), ...prev.slice(index + 1)];
      return result;
    });
  }

  if (isEditing) {
    return (
      <ButtonGroup justifyContent='center' size='sm' ml={'4'}>
        <IconButton icon={<CheckIcon />} aria-label="submit file name" {...getSubmitButtonProps()} />
        <IconButton icon={<CloseIcon />} aria-label="cancel edit file name" {...getCancelButtonProps()} />
      </ButtonGroup>
    )
  } else {
    return (
      <ButtonGroup justifyContent='center' size='sm' ml={'4'}>
        <IconButton icon={<EditIcon />} ml={'4'} aria-label={`edit file block with name ${fileName}`} {...getEditButtonProps()}>Click me</IconButton>
        <IconButton icon={<DeleteIcon />} aria-label={`delete file name ${fileName}`} onClick={deleteFile} />
      </ButtonGroup>
    )
  }
}

export default EditButton;
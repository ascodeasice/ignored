import {
  Button, ButtonGroup,
  Editable, EditableInput,
  EditablePreview, IconButton,
  Input, useEditableControls
} from "@chakra-ui/react"
import { CheckIcon, CloseIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons'

type FileBlockProps = {
  fileName: string;
  ignored: boolean;
}

const FileBlock = ({ fileName, ignored }: FileBlockProps) => {
  const EditButton = () => {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps,
    } = useEditableControls()

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
          <IconButton icon={<DeleteIcon />} aria-label="cancel edit file name" {...getCancelButtonProps()} />
        </ButtonGroup>
      )
    }
  }

  return (
    <Editable defaultValue={fileName} fontSize={'lg'} isPreviewFocusable={false} opacity={ignored ? '0.5' : '1'}>
      <EditablePreview />
      <Input as={EditableInput} />
      <EditButton />
    </Editable>)
}

export default FileBlock
import { Heading, Textarea, Grid, GridItem, Flex, IconButton, Link, ButtonGroup } from '@chakra-ui/react';
import FileBlock from './components/FileBlock';
import { useEffect, useState } from 'react';
import ignore, { Ignore } from 'ignore';
import { v4 as uuidv4 } from 'uuid';
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';
import { GithubIcon } from './components/icon/GithubIcon';

function App() {
  const fileNamesLsKey = 'fileNames';
  const ignoreFileLsKey = 'ignoreFiles';
  const initialFileNames = [
    'index.js',
    'index.html',
    'app.log',
    '#this-is-comment.js',
    '#not-comment.js',
    'relative.txt',
    'one/two',
    'foo',
    'src/foo',
    '.vscode/settings.json',
    '.vscode/tasks.json',
  ];

  const initialIgnore = `# match everything
index.*

# not something
!index.js

# comment/not comment
#this-is-comment.js
\\#not-comment.js

# relative path
/relative.txt
one/two

# match everything named with foo
**/foo

# ignore everything in a directory
.vscode/
`;

  let defaultFileNames = initialFileNames;
  try {
    const savedFileNames = localStorage.getItem(fileNamesLsKey);
    defaultFileNames = JSON.parse(savedFileNames as string) ?? initialFileNames; // invalid array/null
  } catch (error) {
    defaultFileNames = initialFileNames;
  }
  const defaultIgnoreFile = localStorage.getItem(ignoreFileLsKey) ?? initialIgnore;

  const [fileNames, setFileNames] = useState<string[]>(defaultFileNames);
  const [ignoreFile, setIgnoreFile] = useState<string>(defaultIgnoreFile);
  const [ig, setIg] = useState<Ignore>(ignore());
  const [autoFocusing, setAutoFocusing] = useState<boolean>(false); // new is created

  useEffect(() => {
    const newIg = ignore().add(ignoreFile);
    setIg(newIg);

    localStorage.setItem(ignoreFileLsKey, ignoreFile);
  }, [ignoreFile]);

  useEffect(() => {
    localStorage.setItem(fileNamesLsKey, JSON.stringify(fileNames));
  }, [fileNames])

  const createFile = () => {
    setFileNames(['', ...fileNames]); // place new one in the beginning
    setAutoFocusing(true)
  }

  const deleteAllFiles = () => {
    setFileNames([]);
  }

  return (
    <Grid minH={'100vh'} gridTemplateColumns={'1fr 1fr'} gridTemplateRows={'min-content 1fr'} rowGap={4} columnGap={8} mx={4}>
      {/* Header */}
      <GridItem mt={2} colSpan={2}>
        <Flex alignItems={'center'} gap={4}>
          <Heading>Ignored</Heading>
          <Link href='https://github.com/ascodeasice/ignored' target='blank'>
            <GithubIcon boxSize='8' />
          </Link>
        </Flex>
      </GridItem>
      {/* body */}
      <GridItem>
        <Heading size={'lg'} mb={4}>Ignore File</Heading>
        <Textarea variant={'filled'} size={'lg'} height={'80%'} value={ignoreFile}
          onChange={(e) => { setIgnoreFile(e.target.value) }} placeholder={initialIgnore} />
      </GridItem>
      <GridItem>
        <Heading size={'lg'} mb={'4'}>Files</Heading>
        <Flex direction={'column'} gap={2}>
          <Flex gap={2}>
            <ButtonGroup>
              <IconButton icon={<AddIcon />} aria-label='new file name' w={'min-content'} onClick={createFile}
                colorScheme='gray' />
              <IconButton icon={<DeleteIcon />} aria-label='delete all file name' w={'min-content'}
                onClick={deleteAllFiles} colorScheme='red' />
            </ButtonGroup>
          </Flex>
          {
            fileNames.map((name, index) => {
              try {
                return <FileBlock key={uuidv4()} invalid={false} autoFocusing={autoFocusing}
                  setAutoFocusing={setAutoFocusing} fileName={name} ignored={ig.ignores(name)} index={index}
                  setFileNames={setFileNames} />
              } catch (error) {
                return <FileBlock key={uuidv4()} invalid={true} autoFocusing={autoFocusing}
                  setAutoFocusing={setAutoFocusing} fileName={name} ignored={false} index={index}
                  setFileNames={setFileNames} />
              }
            })
          }
        </Flex>
      </GridItem>
    </Grid>
  )
}

export default App

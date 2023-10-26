import { Heading, Textarea, Grid, GridItem } from '@chakra-ui/react'

function App() {
  // TOOD: store input in localStorage
  return (
    <Grid minH={'100vh'} gridTemplateColumns={'1fr 1fr'} gridTemplateRows={'min-content 1fr'} rowGap={4} columnGap={4} mx={4}>
      {/* Header */}
      <GridItem mt={2} colSpan={2}>
        <Heading>Ignored</Heading>
        {/* TODO: sub title */}
        {/* TODO: github icon */}
      </GridItem>
      {/* body */}
      <GridItem>
        <Heading size={'lg'} mb={4}>.ignore File</Heading>
        <Textarea variant={'filled'} size={'lg'} height={'80%'} />
        {/* TODO: default value */}
      </GridItem>
      <GridItem>
        <Heading size={'lg'}>Files</Heading>
        {/* TODO: have file block */}
      </GridItem>
    </Grid>
  )
}

export default App

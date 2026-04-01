import { Box, Flex, Heading, Text } from '@chakra-ui/react'

const SectionHeader = ({ title, subtitle, actions }) => {
  return (
    <Flex direction={{ base: 'column', md: 'row' }} gap={3} justify="space-between">
      <Box>
        <Heading size="md">{title}</Heading>
        {subtitle ? (
          <Text color="gray.500" fontSize="sm" mt={1}>
            {subtitle}
          </Text>
        ) : null}
      </Box>
      {actions ? <Flex gap={2} wrap="wrap" align="center">{actions}</Flex> : null}
    </Flex>
  )
}

export default SectionHeader

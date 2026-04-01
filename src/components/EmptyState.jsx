import { Center, Heading, Text, VStack } from '@chakra-ui/react'

const EmptyState = ({ title, description }) => {
  return (
    <Center
      borderWidth="1px"
      borderStyle="dashed"
      borderColor="gray.200"
      borderRadius="2xl"
      py={10}
      bg="whiteAlpha.700"
      _dark={{ borderColor: 'gray.700', bg: 'gray.900' }}
    >
      <VStack spacing={2} textAlign="center">
        <Heading size="sm">{title}</Heading>
        <Text fontSize="sm" color="gray.500" maxW="sm">
          {description}
        </Text>
      </VStack>
    </Center>
  )
}

export default EmptyState

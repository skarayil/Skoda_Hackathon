import { 
  Box, 
  HStack, 
  Input, 
  InputGroup, 
  InputLeftElement, 
  Icon, 
  IconButton, 
  Badge,
  Select,
  Flex,
  Text
} from '@chakra-ui/react';
import { Search, Bell, Globe } from 'lucide-react';
import { useLang } from '../../hooks/useLang';

export const TopBar = () => {
  const { language, changeLanguage } = useLang();

  return (
    <Box
      h="64px"
      bg="white"
      borderBottom="1px solid"
      borderColor="gray.200"
      px={6}
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <InputGroup maxW="400px">
        <InputLeftElement pointerEvents="none">
          <Icon as={Search} w={4} h={4} color="gray.400" />
        </InputLeftElement>
        <Input
          placeholder="Search employees, skills, departments..."
          bg="gray.50"
          border="1px solid"
          borderColor="gray.200"
        />
      </InputGroup>

      <HStack spacing={4}>
        <Select
          value={language}
          onChange={(e) => changeLanguage(e.target.value as 'en' | 'cs')}
          w="100px"
          size="sm"
          icon={<Icon as={Globe} />}
        >
          <option value="en">EN</option>
          <option value="cs">CZ</option>
        </Select>

        <Box position="relative">
          <IconButton
            aria-label="Notifications"
            icon={<Icon as={Bell} w={5} h={5} />}
            variant="ghost"
            color="gray.600"
          />
          <Badge
            position="absolute"
            top="-1"
            right="-1"
            bg="skoda.green"
            color="white"
            borderRadius="full"
            fontSize="xs"
            px={1.5}
            minW="20px"
            h="20px"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            3
          </Badge>
        </Box>

        <Flex align="center" gap={2} px={3} py={1.5} bg="gray.100" borderRadius="lg">
          <Box w={2} h={2} bg="skoda.green" borderRadius="full" animation="pulse 2s infinite" />
          <Text fontSize="xs" color="gray.600">AI Active</Text>
        </Flex>
      </HStack>
    </Box>
  );
};

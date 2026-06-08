import { Box, VStack, HStack, Text, Icon, Avatar, Flex, Divider } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  UserCircle, 
  Target, 
  TrendingUp, 
  Sparkles,
  Network,
  Globe2,
  FlaskConical,
  Settings
} from 'lucide-react';
import { useLang } from '../../hooks/useLang';

export const Sidebar = () => {
  const { t } = useLang();

  const navItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: t('nav.dashboard'), path: '/' },
    { id: 'heatmap', icon: Users, label: t('nav.heatmap'), path: '/heatmap' },
    { id: 'employee', icon: UserCircle, label: t('nav.employee'), path: '/employees/1' },
    { id: 'succession', icon: Target, label: t('nav.succession'), path: '/succession' },
    { id: 'analytics', icon: TrendingUp, label: t('nav.analytics'), path: '/analytics' },
    { id: 'org', icon: Network, label: t('nav.org'), path: '/org' },
    { id: 'galaxy', icon: Globe2, label: t('nav.galaxy'), path: '/galaxy' },
    { id: 'simulator', icon: FlaskConical, label: t('nav.simulator'), path: '/simulator' },
    { id: 'ai', icon: Sparkles, label: t('nav.assistant'), path: '/assistant' },
  ];

  return (
    <Box
      position="fixed"
      left={0}
      top={0}
      h="100vh"
      w="260px"
      bg="skoda.navy"
      borderRight="1px solid"
      borderColor="skoda.navyLight"
      display="flex"
      flexDirection="column"
    >
      <Box p={6} borderBottom="1px solid" borderColor="skoda.navyLight">
        <HStack spacing={3} mb={1}>
          <Flex w={8} h={8} bg="skoda.green" borderRadius="md" align="center" justify="center">
            <Text color="white" fontWeight="bold">Š</Text>
          </Flex>
          <Box>
            <Text color="white" fontWeight="semibold" fontSize="lg">Skill Coach</Text>
            <Text color="gray.400" fontSize="xs">AI-Powered Talent Intelligence</Text>
          </Box>
        </HStack>
      </Box>

      <VStack flex={1} p={4} spacing={1} align="stretch" overflowY="auto">
        {navItems.map((item) => (
          <NavLink
            key={item.id}
            to={item.path}
            style={{ textDecoration: 'none' }}
          >
            {({ isActive }) => (
              <HStack
                px={3}
                py={2.5}
                borderRadius="lg"
                bg={isActive ? 'skoda.green' : 'transparent'}
                color={isActive ? 'white' : 'gray.300'}
                _hover={{ bg: isActive ? 'skoda.green' : 'skoda.navyLight', color: 'white' }}
                transition="all 0.2s"
                cursor="pointer"
              >
                <Icon as={item.icon} w={5} h={5} />
                <Text fontSize="sm">{item.label}</Text>
              </HStack>
            )}
          </NavLink>
        ))}
      </VStack>

      <Box p={4} borderTop="1px solid" borderColor="skoda.navyLight">
        <HStack spacing={3}>
          <Avatar size="sm" name="Martin Kovář" bg="skoda.green" />
          <Box flex={1} minW={0}>
            <Text color="white" fontSize="sm" fontWeight="medium" isTruncated>Martin Kovář</Text>
            <Text color="gray.400" fontSize="xs">Engineering Manager</Text>
          </Box>
          <Icon as={Settings} w={4} h={4} color="gray.400" cursor="pointer" _hover={{ color: 'white' }} />
        </HStack>
      </Box>
    </Box>
  );
};

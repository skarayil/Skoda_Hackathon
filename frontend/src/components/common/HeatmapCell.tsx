import { Box, Text, Tooltip } from '@chakra-ui/react';
import { motion } from 'motion/react';

const MotionBox = motion.create(Box);

interface HeatmapCellProps {
  value: number;
  employeeName?: string;
  skillName?: string;
}

export const HeatmapCell = ({ value, employeeName, skillName }: HeatmapCellProps) => {
  const getColor = (level: number) => {
    if (level === 5) return { bg: '#3a8234', color: 'white' };
    if (level === 4) return { bg: '#4da944', color: 'white' };
    if (level === 3) return { bg: '#9dd595', color: '#0d1b2a' };
    if (level === 2) return { bg: '#fed7aa', color: '#9a3412' };
    return { bg: '#fecaca', color: '#991b1b' };
  };

  const { bg, color } = getColor(value);

  return (
    <Tooltip label={`${employeeName} - ${skillName}: Level ${value}`} placement="top">
      <MotionBox
        w={12}
        h={12}
        bg={bg}
        color={color}
        borderRadius="lg"
        display="flex"
        alignItems="center"
        justifyContent="center"
        fontWeight="semibold"
        cursor="pointer"
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.2 }}
      >
        <Text>{value}</Text>
      </MotionBox>
    </Tooltip>
  );
};

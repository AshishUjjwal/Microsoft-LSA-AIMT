import React from "react";
import {
  Box,
  Skeleton,
  SkeletonText,
  SkeletonCircle,
  VStack,
  HStack,
  useColorModeValue,
} from "@chakra-ui/react";

const AdminBlogShimmer = () => {
  // Determine background and skeleton colors for light and dark modes
  const bgColor = useColorModeValue("white", "gray.800");
  const skeletonColor = useColorModeValue("gray.200", "gray.600");
  const skeletonTextColor = useColorModeValue("gray.300", "gray.700");

  return (
    <VStack
      spacing={4}
      align="flex-start"
      p={10}
      bg={bgColor} // Dynamic background color
      minW={{ base: "90%", md: "700px", lg: "1100px" }} // Adjust width for mobile, tablet, and desktop
      maxW="1100px"
      mx="auto"
      borderRadius="md"
      boxShadow="sm"
    >
      {/* Shimmer for Blog Header */}
      <Skeleton height="25px" width={{ base: "80%", md: "50%" }} startColor={skeletonColor} endColor={skeletonTextColor} />

      {/* Shimmer for Blog Image */}
      <Skeleton
        height="200px"
        width="100%"
        borderRadius="md"
        startColor={skeletonColor}
        endColor={skeletonTextColor}
      />

      {/* Shimmer for Blog Content */}
      <VStack spacing={3} align="flex-start" width="100%">
        {/* Title */}
        <Skeleton
          height="20px"
          width={{ base: "90%", md: "70%" }}
          startColor={skeletonColor}
          endColor={skeletonTextColor}
        />
        {/* Date */}
        <Skeleton
          height="15px"
          width={{ base: "60%", md: "40%" }}
          startColor={skeletonColor}
          endColor={skeletonTextColor}
        />
        {/* Description */}
        <SkeletonText
          mt="4"
          noOfLines={4}
          spacing="4"
          skeletonHeight="15px"
          width="100%"
          startColor={skeletonColor}
          endColor={skeletonTextColor}
        />
      </VStack>

      {/* Shimmer for Author Info */}
      <HStack spacing={4} mt={3} width="100%" align="center">
        <SkeletonCircle size="10" startColor={skeletonColor} endColor={skeletonTextColor} />
        <Box>
          <Skeleton height="15px" width="100px" startColor={skeletonColor} endColor={skeletonTextColor} />
          <Skeleton height="10px" width="80px" startColor={skeletonColor} endColor={skeletonTextColor} />
        </Box>
      </HStack>
    </VStack>
  );
};

export default AdminBlogShimmer;

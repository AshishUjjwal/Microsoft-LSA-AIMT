import React from 'react';
import {
  Box,
  Skeleton,
  SkeletonText,
  SkeletonCircle,
  VStack,
  HStack,
} from "@chakra-ui/react";

const AdminBlogShimmer = () => {
  return (
    <VStack spacing={4} align="flex-start" p={5} borderRadius="md" shadow="md" bg="white" minW={"1100px"} maxW={"1100px"} mx={'auto'}>
      {/* Shimmer for Blog Header */}
      <Skeleton height="25px" width="50%" />

      {/* Shimmer for Blog Image */}
      <Skeleton height="200px" width="100%" borderRadius="md" />

      {/* Shimmer for Blog Content */}
      <VStack spacing={3} align="flex-start" width="100%">
        {/* Title */}
        <Skeleton height="20px" width="70%" />
        {/* Date */}
        <Skeleton height="15px" width="40%" />
        {/* Description */}
        <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="15px" width="100%" />
      </VStack>

      {/* Shimmer for Author Info */}
      <HStack spacing={4} mt={3}>
        <SkeletonCircle size="10" />
        <Box>
          <Skeleton height="15px" width="100px" />
          <Skeleton height="10px" width="80px" />
        </Box>
      </HStack>
    </VStack>
  );
};

export default AdminBlogShimmer;

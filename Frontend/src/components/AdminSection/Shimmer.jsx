import React from "react";
import { Box, Skeleton, SkeletonText, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";

const TableShimmer = () => {
  return (
    <Table variant="simple" colorScheme="blue">
      {/* Table Header */}
      <Thead>
        <Tr>
          <Th>
            <Skeleton height="20px" width="50px" />
          </Th>
          <Th>
            <Skeleton height="20px" width="100px" />
          </Th>
          <Th>
            <Skeleton height="20px" width="150px" />
          </Th>
          <Th>
            <Skeleton height="20px" width="100px" />
          </Th>
          <Th>
            <Skeleton height="20px" width="75px" />
          </Th>
        </Tr>
      </Thead>

      {/* Table Body */}
      <Tbody>
        {[...Array(5)].map((_, index) => (
          <Tr key={index}>
            <Td>
              <Skeleton height="20px" width="50px" />
            </Td>
            <Td>
              <Skeleton height="20px" width="100px" />
            </Td>
            <Td>
              <Skeleton height="20px" width="150px" />
            </Td>
            <Td>
              <Skeleton height="20px" width="100px" />
            </Td>
            <Td>
              <Skeleton height="30px" width="75px" borderRadius="md" />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default TableShimmer;

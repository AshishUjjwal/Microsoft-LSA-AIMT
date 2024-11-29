import React from "react";
import {
  Box,
  Skeleton,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useBreakpointValue,
} from "@chakra-ui/react";

const TableShimmer = () => {
  // Determine visibility of columns based on screen size
  const showExtraColumns = useBreakpointValue({ base: false, md: true }); // `false` for mobile, `true` for tablets and larger

  return (
    <Box
      width="100%" // Full width for responsiveness
      overflowX="auto" // Enable horizontal scrolling if content overflows
    >
      <Table variant="simple" colorScheme="blue" size="sm">
        {/* Table Header */}
        <Thead>
          <Tr>
            <Th>
              <Skeleton height="20px" width="50px" />
            </Th>
            <Th>
              <Skeleton height="20px" width="100px" />
            </Th>
            {showExtraColumns && ( // Render these columns only for larger screens
              <>
                <Th>
                  <Skeleton height="20px" width="150px" />
                </Th>
                <Th>
                  <Skeleton height="20px" width="100px" />
                </Th>
              </>
            )}
            <Th>
              <Skeleton height="20px" width="75px" />
            </Th>
          </Tr>
        </Thead>

        {/* Table Body */}
        <Tbody>
          {[...Array(10)].map((_, index) => (
            <Tr key={index}>
              <Td>
                <Skeleton height="20px" width="50px" />
              </Td>
              <Td>
                <Skeleton height="20px" width="100px" />
              </Td>
              {showExtraColumns && ( // Render these cells only for larger screens
                <>
                  <Td>
                    <Skeleton height="20px" width="150px" />
                  </Td>
                  <Td>
                    <Skeleton height="20px" width="100px" />
                  </Td>
                </>
              )}
              <Td>
                <Skeleton height="30px" width="75px" borderRadius="md" />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default TableShimmer;

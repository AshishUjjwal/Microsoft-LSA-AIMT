import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  Box,
  Heading,
  Stack,
  Flex,
} from "@chakra-ui/react";
import apiClient from "../../api/axiosInstance";

const ITEMS_PER_PAGE = 5;

const UserManagement = () => {

  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(users.length / ITEMS_PER_PAGE);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await apiClient.get(`api/users/getalluser`, {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        });
        // console.log(`Response :`, response);
        setUsers(response.data.users || []); // Assuming the API returns users in `data.users`
        // setLoading(false);
      } catch (err) {
        console.error('Error fetching blogs:', err);
        // setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Generate pagination numbers with a maximum of 5 visible elements
  const getPaginationNumbers = () => {
    const pagination = [];

    // Always include the first page
    if (currentPage > 3) {
      pagination.push(1);
    }

    // Add ellipsis after the first page if needed
    if (currentPage > 4) {
      pagination.push("...");
    }

    // Add the current page and two pages around it
    const startPage = Math.max(1, currentPage - 1);
    const endPage = Math.min(totalPages, currentPage + 1);

    for (let i = startPage; i <= endPage; i++) {
      pagination.push(i);
    }

    // Add ellipsis before the last page if needed
    if (currentPage < totalPages - 2) {
      pagination.push("...");
    }

    // Always include the last page
    if (currentPage < totalPages - 1) {
      pagination.push(totalPages);
    }

    return pagination;
  };

  // Paginated data for the current page
  const currentUsers = users.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <Box>
      <Heading mb={5}>User Management</Heading>
      <Stack spacing={4}>
        <Button colorScheme="blue" onClick={() => alert("Add User Modal")}>
          Add User
        </Button>
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Role</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {currentUsers.map((user, index) => (
                <Tr key={user._id}>
                  <Td>{(currentPage - 1) * ITEMS_PER_PAGE + index + 1}</Td>
                  <Td>{user.name}</Td>
                  <Td>{user.email}</Td>
                  <Td>{user.role}</Td>
                  <Td>
                    <Button
                      colorScheme="green"
                      size="sm"
                      // onClick={() => handleDelete(user._id)}
                    >
                      View Profile
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <Flex justify="center" mt={4} gap={2}>
          <Button
            size="sm"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          {getPaginationNumbers().map((page, index) =>
            typeof page === "number" ? (
              <Button
                key={index}
                size="sm"
                onClick={() => handlePageChange(page)}
                bg={page === currentPage ? "blue.500" : "gray.200"}
                color={page === currentPage ? "white" : "black"}
              >
                {page}
              </Button>
            ) : (
              <Box key={index} px={2}>
                ...
              </Box>
            )
          )}
          <Button
            size="sm"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </Flex>
      </Stack>
    </Box>
  );
};

export default UserManagement;

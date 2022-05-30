import { Box, Icon, IconButton, Text } from "@chakra-ui/react";
// import { useState } from "react";
import { MdClose, MdEdit } from "react-icons/md";

const TodoItem = ({ id, title, onEdit, onDelete }) => {
  const handleEdit = () => {
    onEdit(id);
  };

  const handleDelete = () => {
    onDelete(id);
  };

  return (
    <Box
      border="2px"
      borderColor="green.500"
      px={5}
      py={3.5}
      rounded="lg"
      display="flex"
      alignItems="center"
    >
      <Text
        flex={1}
        mr={3.5}
      >
        {title}
      </Text>
      <IconButton
        colorScheme="yellow"
        icon={<Icon as={MdEdit} w={5} h={5} />}
        mr={2.5}
        onClick={handleEdit}
      />
      <IconButton
        colorScheme="red"
        icon={<Icon as={MdClose} w={5} h={5} />}
        onClick={handleDelete}
      />
    </Box>
  );
};

export default TodoItem;

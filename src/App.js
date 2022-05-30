import { Box, SimpleGrid, Text, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import AddForm from "./components/AddForm";
import DeleteAlertModal from "./components/DeleteAlertModal";
import EditFormModal from "./components/EditFormModal";
import TodoItem from "./components/TodoItem";

const App = () => {
  const [items, setItems] = useState([]);
  const [activeItem, setActiveItem] = useState(null);
  const editModal = useDisclosure();
  const deleteModal = useDisclosure();

  const handleAddItem = (item) => {
    setItems(items => [item, ...items]);
  };

  const handleEditItem = (id) => {
    setActiveItem(items.find((item) => item.id === id));
    editModal.onOpen();
  };

  const handleDeleteItem = (id) => {
    setActiveItem(items.find((item) => item.id === id));
    deleteModal.onOpen();
  };

  const handleEditSuccess = (newItem) => {
    const newItems = items.map(item => item.id === newItem.id ? newItem : item);
    setItems(newItems);
  };

  const handleDeleteSuccess = () => {
    const newItems = items.filter(item => item.id !== activeItem.id);
    setItems(newItems);
    deleteModal.onClose();
  };

  return (
    <Box px={7} py={20} w="3xl" mx="auto">
      <Text fontSize="4xl" fontWeight="bold" textAlign="center" mb={12}>
        Todos
      </Text>

      <AddForm onSubmit={handleAddItem} />

      <Box mb={10} />

      <SimpleGrid spacing={5}>
        {items.map((item) => (
          <TodoItem
            key={item.id}
            id={item.id}
            title={item.title}
            onEdit={handleEditItem}
            onDelete={handleDeleteItem}
          />
        ))}
      </SimpleGrid>

      <EditFormModal
        isOpen={editModal.isOpen}
        onClose={editModal.onClose}
        data={activeItem}
        onSuccess={handleEditSuccess}
      />

      <DeleteAlertModal
        isOpen={deleteModal.isOpen}
        onClose={deleteModal.onClose}
        onSubmit={handleDeleteSuccess}
      />
    </Box>
  );
};

export default App;

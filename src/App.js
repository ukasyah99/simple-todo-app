import { Box, SimpleGrid, Text, useDisclosure } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import AddForm from "./components/AddForm";
import DeleteAlertModal from "./components/DeleteAlertModal";
import EditFormModal from "./components/EditFormModal";
import TodoItem from "./components/TodoItem";
import { API_BASE_URL } from "./config";

const App = () => {
  const [items, setItems] = useState([]);
  const [activeItem, setActiveItem] = useState(null);
  const editModal = useDisclosure();
  const deleteModal = useDisclosure();

  useEffect(() => {
    (async () => {
      const result = await axios.get(API_BASE_URL + '/todo');
      setItems(result.data.data);
    })();
  }, []);

  const handleAddItem = async (item) => {
    const result = await axios.post(API_BASE_URL + '/todo', item);
    setItems(items => [result.data.data, ...items]);
  };

  const handleEditItem = (id) => {
    setActiveItem(items.find((item) => item.id === id));
    editModal.onOpen();
  };

  const handleDeleteItem = (id) => {
    setActiveItem(items.find((item) => item.id === id));
    deleteModal.onOpen();
  };

  const handleEditSuccess = async (newItem) => {
    await axios.put(API_BASE_URL + '/todo/' + newItem.id, {
      title: newItem.title,
    });
    const newItems = items.map(item => item.id === newItem.id ? newItem : item);
    setItems(newItems);
  };

  const handleDeleteSuccess = async () => {
    await axios.delete(API_BASE_URL + '/todo/' + activeItem.id);
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

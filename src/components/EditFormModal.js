import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const EditFormModal = ({
  isOpen,
  onClose,
  data,
  onSuccess,
}) => {
  const [form, setForm] = useState({ title: '' });

  const handleChangeInput = (e) => {
    setForm({ title: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    onSuccess({ ...data, ...form });
    onClose();
  };

  useEffect(() => {
    if (data) {
      setForm({ title: data.title });
    }
  }, [data]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Todo</ModalHeader>
        <ModalBody>
          <form id="todo-edit-form" onSubmit={handleSubmit}>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input
                placeholder="Title goes here"
                value={form.title}
                onChange={handleChangeInput}
              />
            </FormControl>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button mr={3.5} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="blue" type="submit" form="todo-edit-form">
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditFormModal;

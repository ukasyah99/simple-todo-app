import { Button, Flex, Input } from "@chakra-ui/react"
import { useState } from "react";
import { nanoid } from "nanoid";

const AddForm = ({ onSubmit }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    setTitle('');
    onSubmit({ id: nanoid(), title });
  };

  const handleTitleChange = e => {
    setTitle(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Flex>
        <Input
          placeholder="Type here..."
          variant="outline"
          mr={3.5}
          value={title}
          onChange={handleTitleChange}
        />
        <Button
          type="submit"
          colorScheme="blue"
          variant="solid"
        >
          Add
        </Button>
      </Flex>
    </form>
  );
};

export default AddForm;

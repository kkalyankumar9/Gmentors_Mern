import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTask, getTaskdata } from '../../Redux/Task/action';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import {
  Box,
  Button,
  Text,
  Image,
  SimpleGrid,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useToast,Flex,useBreakpointValue
} from '@chakra-ui/react';

const TaskBar = () => {
  const [selectedTask, setSelectedTask] = useState(null);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);

  const taskData = useSelector((store) => store.TaskReducer.taskData);
  const isLoading = useSelector((store) => store.TaskReducer.isLoading);
  const isError = useSelector((store) => store.TaskReducer.isError);
  const isAuth = useSelector((store) => store.AuthReducer.isAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    dispatch(getTaskdata());
  }, [dispatch]);

  const handleDelete = () => {
    if (selectedTask) {
      dispatch(deleteTask(selectedTask._id))
        .then(() => {
       
          toast({
            title: "Task Deleted",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
          dispatch(getTaskdata());
          setIsDeleteAlertOpen(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleEdit = (id) => {
    navigate(`/taskedit/${id}`);
  };

  const onCloseDeleteAlert = () => {
    setIsDeleteAlertOpen(false);
    setSelectedTask(null);
  };
  const columns = useBreakpointValue({ base: 1, sm: 2, md: 3, lg: 4 }); // Adjust as needed
  const spacing = useBreakpointValue({ base: 2, md: 4 }); // Adjust as needed
  
  return (
    <>
      <Navbar />
      
      <Box mx="auto" my="4" p="4" borderWidth="1px" borderRadius="lg"  mt={"100px"}>
        {isLoading && <p className="text-center">Loading...</p>}

        {isError && <p className="text-center text-red-500">Error fetching data</p>}

        {taskData && (
        <SimpleGrid columns={columns} spacing={spacing}>
        {taskData.map((task) => (
          <Box key={task._id} borderWidth="1px" borderRadius="lg" p="4">
            <Text fontSize="xl" fontWeight="bold" mt="4">
              Title: {task.title}
            </Text>
            <Text fontSize="md" fontWeight="bold" mt="4" color="gray">
              Description: {task.description}
            </Text>
           
            <Flex justify="space-evenly">
              <Button
                colorScheme="red"
                onClick={() => {
                  setSelectedTask(task);
                  setIsDeleteAlertOpen(true);
                }}
                mt="2"
                disabled={!isAuth}
              >
                Delete
              </Button>
              <Link to={`/taskedit/${task._id}`}>
                <Button colorScheme="blue" mt="2" disabled={!isAuth}>
                  Edit
                </Button>
              </Link>
            </Flex>
          </Box>
        ))}
      </SimpleGrid>
        )}
      </Box>

      {/* Delete Confirmation Alert */}
      <AlertDialog isOpen={isDeleteAlertOpen} onClose={onCloseDeleteAlert}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Task
            </AlertDialogHeader>
            <AlertDialogBody>
              Are you sure you want to delete this task?
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button onClick={onCloseDeleteAlert}>Cancel</Button>
              <Button colorScheme="red" onClick={handleDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default TaskBar;

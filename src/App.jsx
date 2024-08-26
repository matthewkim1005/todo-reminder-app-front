import { useState, createContext, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import SignupForm from './components/SignupForm/SignupForm';
import SigninForm from './components/SigninForm/SigninForm';
import TodoList from './components/TodoList/TodoList';
import TodoDetails from './components/TodoDetails/TodoDetails';
import TodoForm from './components/TodoForm/TodoForm';
import * as todoService from './services/todoService';
import * as authService from '../src/services/authService';

export const AuthedUserContext = createContext(null);

const App = () => {
  const [user, setUser] = useState(authService.getUser());
  const [todos, setTodos] = useState([]);
  const navigate = useNavigate();

  const handleSignout = () => {
    authService.signout();
    setUser(null);
  };

  const handleAddTodo = async (todoFormData) => {
    const newTodo = await todoService.create(todoFormData);
    setTodos([newTodo, ...todos]);
    navigate('/todos');
  };

  const handleDeleteTodo = async (todoId) => {
    const deletedTodo = await todoService.deleteTodo(todoId);
    setTodos(todos.filter((todo) => todo._id !== deletedTodo._id));
    navigate('/todos');
  };

  const handleUpdateTodo = async (todoId, todoFormData) => {
    const updatedTodo = await todoService.update(todoId, todoFormData);
    setTodos(todos.map((todo) => (todoId === todo._id ? updatedTodo : todo)));
    navigate(`/todos/${todoId}`);
  };

  //reloads when the dependency changes [user]
  //if user changes, run the userEffect again
  useEffect(() => {
    const fetchAllTodos = async () => {
      const todosData = await todoService.index();
      setTodos(todosData);
    };
    if (user) fetchAllTodos();
  }, [user]);

  return (
    <>
      <AuthedUserContext.Provider value={user}>
        <NavBar user={user} handleSignout={handleSignout} />
        <Routes>
          {user ? (
            // Protected Routes:
            <>
              <Route path="/" element={<Dashboard user={user} />} />
              <Route path="/todos" element={<TodoList todos={todos} />} />
              <Route path="/todos/:todoId" element={<TodoDetails handleDeleteTodo={handleDeleteTodo} />} />
              <Route path="/todos/new" element={<TodoForm handleAddTodo={handleAddTodo} />} />
              <Route path="/todos/:todoId/edit" element={<TodoForm handleUpdateTodo={handleUpdateTodo} />} />
            </>
          ) : (
            // Public Route:
            <Route path="/" element={<Landing />} />
          )}
          <Route path="/signup" element={<SignupForm setUser={setUser} />} />
          <Route path="/signin" element={<SigninForm setUser={setUser} />} />
        </Routes>
      </AuthedUserContext.Provider>
    </>
  );
};

export default App;
import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginScreen from "./screens/LoginScreen"
import SignUpScreen from './screens/SignUpScreen';
import HomeScreen from './screens/HomeScreen';
import BookForm from "./screens/BookForm"
import BookScreen from './screens/BookForm';
import BookIssueForm from './screens/bookIssueForm';
import BookIsuueScreen from './screens/BookIssueScreen';


const router = createBrowserRouter([
  { path: "/login", element: <LoginScreen /> },
  { path: "/signup", element: <SignUpScreen /> },
  { path: "/", element: <HomeScreen /> },
  { path: "/add-book", element: <BookForm /> },
  { path: "/books", element: <BookScreen /> },
  { path: "/book-issue", element: <BookIssueForm /> },
  {path: "/book-issue-list", element: <BookIsuueScreen />}
])

function App() {
  return <RouterProvider router={router} />;
}

export default App;

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup/signup";
import Login from "./components/Login/login";
import Logout from "./components/Logout/logout";
import NavBar from "./components/Navbar/navbar";
import Posts from "./components/Posts/posts";
import { Provider } from "react-redux";
import { store } from "./store";

const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <>
      <Provider store={store}>
        <Router>
          <NavBar />
          <QueryClientProvider client={client}>
            <Routes>
              <Route path="/" element={<h1>Home</h1>} />
              <Route path="/token" element={<h1>Token</h1>} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/posts" element={<Posts/>} />
              <Route path="*" element={<h1>Page Not Found 404</h1>} />
            </Routes>
          </QueryClientProvider>
        </Router>
      </Provider>
    </>
  );
}

export default App;

import { RouterProvider } from "react-router-dom";
import { RefProvider } from "./contexts/RefContext";
import "./styles/main.scss";
import { router } from "./routes";
import { UserProvider } from "./contexts/UserContext";
import { ModalDataProvider } from "./contexts/ModalDataContext";

function App() {
  return (
    <div className="App">
      <UserProvider>
        <ModalDataProvider>
          <RefProvider>
            <RouterProvider router={router} />
          </RefProvider>
        </ModalDataProvider>
      </UserProvider>
    </div>
  );
}

export default App;

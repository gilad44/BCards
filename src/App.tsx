import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import AppContent from "./comps/AppContent";
import store from "./store/store";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </Provider>
  );
}

export default App;

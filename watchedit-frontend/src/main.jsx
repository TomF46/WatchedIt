import ReactDOM from "react-dom/client";
import App from "./App";
import "./css/global.css";
import "./css/markdown-editor-styles.css";
import store from "./redux/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

document.body.classList.add("bg-background");

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
);

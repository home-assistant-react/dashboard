import "./css/index.css";
import ReactDOM from "react-dom/client";
import { App } from "./components/App";
import { init } from "./config/config";

init();

const root = ReactDOM.createRoot(
  document.getElementById("home-assistant-react-dashboard-root") as HTMLElement,
);

root.render(<App />);

import ReactDOM from "react-dom";
import { Pages } from "./pages/index";
import "./assets/style/index.scss";
import "./store/init";

process.env.TZ = "UTC";

ReactDOM.render(<Pages />, document.getElementById("root"));

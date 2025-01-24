import "./styles.css";
import initEventlisteners from "./events/events";

if (process.env.NODE_ENV !== "production") {
  console.log("Looks like we are in development mode!");
}

initEventlisteners();

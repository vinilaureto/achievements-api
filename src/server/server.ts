import express from "express";
import { globalConfiguration } from "../config";
import { routes } from "./routes";

export default function server() { 
  function start() {
    const app = express();
    const port = globalConfiguration.API_PORT;

    app.use(express.json())
    app.use(routes)
    
    app.listen(port, () => {
        console.log(`[SERVER] - Listen on port ${port}`)
    })
  }
  
  return {
    start,
  };
}

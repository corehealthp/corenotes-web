import { BrowserRouter } from "react-router-dom"
import Router from "./routes"
import '../index.css';

export default function App() {
    return (
        <BrowserRouter>
            <Router />
        </BrowserRouter>
    )
}
import App from "./App"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

const RouterManager = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<App />} />
            </Routes>
        </Router >
    )
}

export default RouterManager;
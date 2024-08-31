import App from "./App"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { ScoreProvider } from "./Clicker/ScoreContext";
import NavBar, { navItems } from "./Clicker/NavBar";
import Play from "./Clicker/Play";

const RouterManager = () => {
    return (
        <ScoreProvider>
            <Router>
                <NavBar />
                <div className="min-h-screen bg-gray-100 p-8">
                    <Play />
                    <div className="max-w-6xl mx-auto">
                        <Routes>
                            <Route path="/" element={<App />} />
                            {navItems.map(route => <Route key={route.name} path={route.path} element={route.element} />)}
                        </Routes>
                    </div>
                </div>
            </Router >
        </ScoreProvider>
    )
}

export default RouterManager;
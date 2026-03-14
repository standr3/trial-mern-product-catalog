import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import GameDetailsPage from "./pages/GameDetailsPage";
import EditGamePage from "./pages/EditGamePage";
import NotFoundPage from "./pages/NotFoundPage";
import Navbar from "./components/Navbar";

function App() {
	return (
		<>
			<Navbar />
			<Routes>
				<Route path='/' element={<HomePage />} />
				<Route path='/games' element={<HomePage />} />
				<Route path='/games/new' element={<CreatePage />} />
				<Route path='/games/:id' element={<GameDetailsPage />} />
				<Route path='/games/:id/edit' element={<EditGamePage />} />
				<Route path='*' element={<NotFoundPage />} />
			</Routes>
		</>
	);
}

export default App;
import Play from "./Clicker/Play";
import { ScoreProvider } from "./Clicker/ScoreContext";

function App() {
  return (
    <ScoreProvider>
      <Play />
    </ScoreProvider>
  );
}

export default App;

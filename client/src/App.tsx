import AuthModel from "./components/AuthModel";
import { useGeneralStore } from "./stores/generalStore";

function App() {
  const isLoginOpen = useGeneralStore((state) => state.isLoginOpen);
  return (
    <div>
      {isLoginOpen && <AuthModel />}
    </div>
  );
}

export default App;

import Form from "./components/Form";
import Connection from "./components/Connection";
import Citizenship from "./components/Citizenship";
import "../src/app.css";

function App() {
  return (
    <div className="container">
      <Connection />
      <Form />
      <Citizenship />
    </div>
  );
}

export default App;

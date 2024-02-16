import logo from "./logo.svg";
import "./App.css";
import MultiStepForm from "./component/MultiStepForm";
import { Provider } from "react-redux";
import store from "./store/store";

function App() {
  return (
    <>
      <Provider store={store}>
        <MultiStepForm />
      </Provider>
    </>
  );
}

export default App;

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserProvider } from "./context/UserContext";
import "./index.css";
import { Router } from "./routes";
import { FormStepsProvider } from "./context/UseFormSteps";

export function App() {
  return (
    <div className="font-[sans-serif] flex w-full min-h-screen bg-zinc-800">
      <FormStepsProvider>
        <UserProvider>
          <Router />
          <ToastContainer />
        </UserProvider>
      </FormStepsProvider>
    </div>
  );
}

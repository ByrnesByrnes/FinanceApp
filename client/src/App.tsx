import "antd/dist/reset.css";
import "./App.css";
import { Outlet } from "react-router-dom";
import { TopNavigation } from "modules/navigation";

function App() {

  return (
    <>
      <TopNavigation />
      <Outlet />
    </>
  );
}

export default App;

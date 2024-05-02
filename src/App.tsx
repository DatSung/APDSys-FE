import GlobalRouter from "./routes";
import {Toaster} from "react-hot-toast";

const App = () => {
    return (
        <div>
            <GlobalRouter/>
            <Toaster/>
        </div>
    )
}

export default App

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import ReduxProvider from "./redux/provider/provider.tsx";
import { BrowserRouter } from "react-router-dom";
import PrivateRoute from "./redux/provider/PrivateRoute.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<ReduxProvider>
			<BrowserRouter>
				<PrivateRoute>
					<App />
				</PrivateRoute>
			</BrowserRouter>
		</ReduxProvider>
	</React.StrictMode>
);

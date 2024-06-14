import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { store } from "./app/store";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/index.tsx";
import { MyProvider } from "./context/index.tsx";
import { Toaster } from "./components/ui/toaster.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <MyProvider>
        <RouterProvider router={router} />
        <Toaster/>
      </MyProvider>
    </Provider>
  </React.StrictMode>
);

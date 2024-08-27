import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { store } from "./app/store";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { MyProvider } from "./context/index.tsx";
import { Toaster } from "./components/ui/toaster.tsx";
import { router } from "./router/index.tsx";
import ProvidersClient from "./provider/client.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <MyProvider>
        <ProvidersClient>
          <RouterProvider router={router} />
        </ProvidersClient>
        <Toaster />
      </MyProvider>
    </Provider>
  </React.StrictMode>
);

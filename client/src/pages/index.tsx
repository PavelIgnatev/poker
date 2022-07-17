import { FC } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { AdminPage } from "./AdminPage";
import { InfoPage } from "./InfoPage";
import { MainPage } from "./MainPage";

export const Pages: FC = () => {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path="/admin" component={() => <AdminPage />} />
          <Route path="/info" component={() => <InfoPage />} />
          <Route path="/*" component={() => <MainPage />} />
        </Switch>
        <ToastContainer hideProgressBar={true} />
      </BrowserRouter>
      <div id="modal-root" />
    </>
  );
};

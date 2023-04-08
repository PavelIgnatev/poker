import { FC } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { styled } from "@mui/system";

import { AdminPage } from "./AdminPage";
import { InfoPage } from "./InfoPage";
import { MainPage } from "./MainPage";

const CustomToastContainer = styled(ToastContainer)({
  "& .Toastify__toast--error": {
    color: "black",
    borderRadius: "8px",
  },
  "& .Toastify__close-button": {
    color: "black",
  },
});

export const Pages: FC = () => {
  return (
    <>
        <BrowserRouter>
          <Switch>
            <Route path="/admin" component={() => <AdminPage />} />
            <Route path="/info" component={() => <InfoPage />} />
            <Route path="/*" component={() => <MainPage />} />
          </Switch>
          <CustomToastContainer hideProgressBar={true} />
        </BrowserRouter>
        <div id="modal-root" />
    </>
  );
};

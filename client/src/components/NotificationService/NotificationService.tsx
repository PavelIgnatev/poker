import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import classes from "./NotificationService.module.scss";

//Уведомление о успехе
export function SucNot(content: string) {
  toast.success(<div className={classes.NotificationContent}>{content}</div>, {
    className: classes.NotificationSuccess,
  });
}

//Уведомление о ошибке
export function ErrNot(content: string) {
  toast.error(<div className={classes.NotificationContent}>{content}</div>, {
    className: classes.NotificationError,
  });
}

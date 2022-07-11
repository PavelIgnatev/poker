import classNames from "classnames";
import { FC } from "react";
import classes from "./ComponentCategory.module.scss";

export const ComponentCategory: FC<{
  category: string;
  gorizontal?: boolean;
  className?: string;
}> = (props) => {
  const { category, children, gorizontal, className } = props;

  return (
    <div
      className={classNames(classes.wrapper, className)}
      style={{ flexDirection: gorizontal ? "column" : "inherit" }}
    >
      <div className={classes.category}>{category}</div>
      <div>{children}</div>
    </div>
  );
};

import classNames from "classnames";
import { FC } from "react";
import classes from "./ComponentCategory.module.scss";

export const ComponentCategory: FC<{
  category?: string;
  className?: string;
}> = (props) => {
  const { category, children, className } = props;

  return (
    <div className={classNames(classes.wrapper, className)}>
      {category && <div className={classes.category}>{category}</div>}
      <div className={classes.children}>{children}</div>
    </div>
  );
};

import classes from "./BaseFooter.module.scss";

export const BaseFooter = () => {
  return (
    <footer className={classes.footer}>
      <div className={classes.content}>
        Developed in{" "}
        <a
          href="https://growth-teams.ru"
          target="_blank"
          rel="noreferrer"
          className={classes.a}
        >
          growth-teams.ru
        </a>
      </div>
    </footer>
  );
};

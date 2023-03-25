import { useStore } from "effector-react";
import cx from "classnames";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import {
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
} from "@material-ui/core";
import { green, pink } from "@material-ui/core/colors";

import { $filtredTableState, fetchUserReposFx } from "../../store/Table";
import { useState } from "react";

const theme = createTheme({
  palette: {
    primary: green,
    secondary: pink,
  },
});

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      "& .MuiTable-root": {
        minWidth: 650,
      },
    },
    pagination: {
      display: "flex",
      justifyContent: "center",
      marginBottom: "15px",
    },
    head: {
      background: "#303F9F",
      fontWeight: 500,
    },
    tableContainer: {
      marginBottom: theme.spacing(2),
      boxShadow: "0px 1px 0px 0px rgba(34, 60, 80, 0.2)",
      maxHeight: "calc(100vh - 83px)",
    },
    tableRow: {
      "&:hover": {
        backgroundColor: theme.palette.action.hover,
      },
    },
    loaderContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "calc(100vh - 140px)",
    },
    cell: {
      maxWidth: "300px",
      textAlign: "center",
    },
    cellHead: {
      color: 'white'
    },
  })
);

export const BaseTournaments = () => {
  const loading = useStore(fetchUserReposFx.pending);
  const classes = useStyles();

  const tournaments = useStore($filtredTableState);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);

  const handleChangePage = (
    _: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const rows = tournaments.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <>
      <ThemeProvider theme={theme}>
        <TableContainer component={Paper} className={classes.tableContainer}>
          <Table>
            <TableHead className={classes.head}>
              <TableRow>
                <TableCell className={cx(classes.cell, classes.cellHead)}>
                  ID
                </TableCell>
                <TableCell className={cx(classes.cell, classes.cellHead)}>
                  Start Reg
                </TableCell>
                <TableCell className={cx(classes.cell, classes.cellHead)}>
                  Late Reg
                </TableCell>
                <TableCell className={cx(classes.cell, classes.cellHead)}>
                  Name
                </TableCell>
                <TableCell className={cx(classes.cell, classes.cellHead)}>
                  Network
                </TableCell>
                <TableCell className={cx(classes.cell, classes.cellHead)}>
                  Buy-in
                </TableCell>
                <TableCell className={cx(classes.cell, classes.cellHead)}>
                  Prizepool
                </TableCell>
                <TableCell className={cx(classes.cell, classes.cellHead)}>
                  Ability
                </TableCell>
                <TableCell className={cx(classes.cell, classes.cellHead)}>
                  Duration
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {!loading &&
                rows.map((item) => (
                  <TableRow
                    key={item["@id"]}
                    className={classes.tableRow}
                    style={{
                      background:
                        typeof item["percent"] !== "undefined"
                          ? item["percent"] >= 0
                            ? `rgba(140, 255, 0, ${Math.max(
                                0.15,
                                Number(item.percent) / 100
                              )})` //green
                            : `rgba(255, 0, 0, ${Math.max(
                                0.2,
                                Math.abs(item.percent) / 100
                              )})` //red
                          : "",
                    }}
                  >
                    <TableCell className={classes.cell}>
                      {item["@id"]}
                    </TableCell>
                    <TableCell className={classes.cell}>
                      {item["@scheduledStartDate"]}
                    </TableCell>
                    <TableCell className={classes.cell}>
                      {item["@lateRegEndDate"] ?? "-"}
                    </TableCell>
                    <TableCell className={classes.cell}>
                      {item["@name"]}
                    </TableCell>
                    <TableCell className={classes.cell}>
                      {item["@network"]}
                    </TableCell>
                    <TableCell className={classes.cell}>
                      {item["@bid"]}
                    </TableCell>
                    <TableCell className={classes.cell}>
                      {item["@prizepool"]}
                    </TableCell>
                    <TableCell className={classes.cell}>
                      {item["@ability"]}
                    </TableCell>
                    <TableCell className={classes.cell}>
                      {item["@duration"]}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        {loading && (
          <div className={classes.loaderContainer}>
            <CircularProgress />
          </div>
        )}
        {!rows.length && !loading && (
          <div className={classes.loaderContainer}>The list is empty</div>
        )}
        <TablePagination
          rowsPerPageOptions={[20, 50, 100]}
          component="div"
          count={tournaments.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          className={classes.pagination}
        />
      </ThemeProvider>
    </>
  );
};

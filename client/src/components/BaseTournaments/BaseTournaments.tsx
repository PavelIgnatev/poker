import { useStore } from "effector-react";
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
      background: "#b6ec9f",
      fontWight: 500,
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
                <TableCell className={classes.cell}>ID</TableCell>
                <TableCell className={classes.cell}>Start Reg</TableCell>
                <TableCell className={classes.cell}>Late Reg</TableCell>
                <TableCell className={classes.cell}>Name</TableCell>
                <TableCell className={classes.cell}>Network</TableCell>
                <TableCell className={classes.cell}>Buy-in</TableCell>
                <TableCell className={classes.cell}>Guarantee</TableCell>
                <TableCell className={classes.cell}>Ability</TableCell>
                <TableCell className={classes.cell}>Duration</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {!loading &&
                rows.map((item) => (
                  <TableRow key={item["@id"]} className={classes.tableRow}>
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

import b_ from "b_";
import { FC, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { Networks } from "../../../@types/common";
import { SelectOption } from "../../../@types/selectsModel";
import { LEVELS_ARRAY } from "../../../constants";
import { editableConfigEvents } from "../../../store/Config";

import { SingleSelect } from "../../SingleSelect";

interface Props {
  networks: Networks;
}

const b = b_.with("user-settings-table");

const levelsOptions: SelectOption<number>[] = LEVELS_ARRAY.map((level) => ({
  value: level,
  label: level,
}));

const useStyles = makeStyles({
  tableCell: {
    border: "1px solid rgba(0, 0, 0, 0.23)",
  },
});

export const UserSettingsTable: FC<Props> = ({ networks }) => {
  const classes = useStyles();

  const renderContent = useMemo(
    () =>
      Object.keys(networks).map((network) => {
        const { level } = networks[network];

        const defaultOption = levelsOptions.find(
          (option) => option.value === level
        );

        console.log(defaultOption);

        const handleLevelChange = (option: SelectOption<number>) =>
          editableConfigEvents.handleChangeLevel({
            network,
            level: option.value,
          });

        return (
          <TableRow key={network}>
            <TableCell className={classes.tableCell}><b>{network}</b></TableCell>
            <TableCell className={classes.tableCell}>
              <SingleSelect
                label="Level"
                options={levelsOptions as any}
                value={defaultOption?.value as any}
                defaultValue={defaultOption as any}
                className={b("select")}
                onSingleChange={handleLevelChange as any}
              />
            </TableCell>
          </TableRow>
        );
      }),
    [networks, classes.tableCell]
  );

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table" className={classes.tableCell}>
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableCell}><b>Network</b></TableCell>
            <TableCell className={classes.tableCell}><b>Level</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{renderContent}</TableBody>
      </Table>
    </TableContainer>
  );
};

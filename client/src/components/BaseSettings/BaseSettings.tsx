import { useState } from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import RefreshIcon from "@mui/icons-material/Refresh";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Divider,
  Grid,
  Box,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import {
  $tournamentsSettings,
  editableTournamentsSettings,
  NETWORKS,
  TIMERANGE,
} from "../../store/Select";
import { useStore } from "effector-react";
import { NumberInput } from "../NumberInput";

import classes from "./BaseSettings.module.scss";
import { MultiSelect } from "../MultiSelect";
import { SingleSelect } from "../SingleSelect";
import { Checkbox } from "../Checkbox";
import { fetchUserReposFx } from "../../store/Table";
import { fetchFilterContent } from "../../store/Filter";

const SettingsWidgetWrapper = styled(Box)(({ theme }) => ({
  position: "fixed",
  bottom: theme.spacing(2),
  right: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  borderRadius: "50%",
  boxShadow: theme.shadows[3],
  padding: theme.spacing(0.5),
}));

const UpdateWidgetWrapper = styled(Box)(({ theme }) => ({
  position: "fixed",
  bottom: theme.spacing(2),
  right: theme.spacing(9),
  backgroundColor: theme.palette.background.paper,
  borderRadius: "50%",
  boxShadow: theme.shadows[3],
  padding: theme.spacing(0.5),
}));

export const BaseSettings = () => {
  const [isOpen, setIsOpen] = useState(true);
  const tournamentsSettings = useStore($tournamentsSettings);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    fetchFilterContent().then(() => fetchUserReposFx());
  };

  return (
    <>
      <SettingsWidgetWrapper>
        <IconButton onClick={handleOpen} style={{ transform: "scale(1.4)" }}>
          <SettingsIcon />
        </IconButton>
        <Dialog open={isOpen} onClose={handleClose}>
          <DialogTitle className={classes.title}>Settings</DialogTitle>
          <DialogContent>
            <div className={classes.menu}>
              <MultiSelect
                value={tournamentsSettings.network as any}
                label="Networks"
                options={NETWORKS}
                onMultiChange={editableTournamentsSettings.handleChangeNetwork}
              />
              <SingleSelect
                defaultValue={tournamentsSettings.time as any}
                label="Time interval"
                options={TIMERANGE}
                onSingleChange={editableTournamentsSettings.handleChangeTime}
              />
              <div className={classes.inputWrapper}>
                <NumberInput
                  label="bid FROM"
                  value={tournamentsSettings.moneyStart}
                  onChange={editableTournamentsSettings.handleChangeMoneyStart}
                  max={tournamentsSettings.moneyEnd}
                  className={classes.inputBuyIn}
                />
                <NumberInput
                  label="bid To"
                  value={tournamentsSettings.moneyEnd}
                  onChange={editableTournamentsSettings.handleChangeMoneyEnd}
                  className={classes.inputBuyIn}
                />
              </div>
              <div className={classes.inputWrapper}>
                <NumberInput
                  label="prizepool FROM"
                  value={tournamentsSettings.prizepoolStart}
                  onChange={
                    editableTournamentsSettings.handleChangePrizepoolStart
                  }
                  max={tournamentsSettings.prizepoolEnd}
                  className={classes.inputBuyIn}
                />
                <NumberInput
                  label="prizepool TO"
                  value={tournamentsSettings.prizepoolEnd}
                  onChange={
                    editableTournamentsSettings.handleChangePrizepoolEnd
                  }
                  max={100000000}
                  className={classes.inputBuyIn}
                />
              </div>
              <div className={classes.checkboxWrapper}>
                <Grid container>
                  <Grid item xs={12}>
                    <Checkbox
                      label="Knockout"
                      selected={tournamentsSettings.KO}
                      onChange={() =>
                        editableTournamentsSettings.handleChangeKo(
                          !tournamentsSettings.KO
                        )
                      }
                    />
                    <Checkbox
                      label="Vanila"
                      selected={tournamentsSettings.freezout}
                      onChange={() =>
                        editableTournamentsSettings.handleChangeFreezout(
                          !tournamentsSettings.freezout
                        )
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                  <Grid item xs={12}>
                    <Checkbox
                      label="Normal"
                      selected={tournamentsSettings.normal}
                      onChange={() =>
                        editableTournamentsSettings.handleChangeNormal(
                          !tournamentsSettings.normal
                        )
                      }
                    />
                    <Checkbox
                      label="Turbo"
                      selected={tournamentsSettings.turbo}
                      onChange={() =>
                        editableTournamentsSettings.handleChangeTurbo(
                          !tournamentsSettings.turbo
                        )
                      }
                    />
                    <Checkbox
                      label="SuperTurbo"
                      selected={tournamentsSettings.superTurbo}
                      onChange={() =>
                        editableTournamentsSettings.handleChangeSuperTurbo(
                          !tournamentsSettings.superTurbo
                        )
                      }
                    />
                  </Grid>
                </Grid>
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" size="large" onClick={handleClose}>
              Apply
            </Button>
          </DialogActions>
        </Dialog>
      </SettingsWidgetWrapper>
      <UpdateWidgetWrapper>
        <IconButton onClick={handleClose} style={{ transform: "scale(1.4)" }}>
          <RefreshIcon />
        </IconButton>
      </UpdateWidgetWrapper>
    </>
  );
};

import { FC, useEffect } from "react";
import b_ from "b_";
import { TextField, Typography } from "@mui/material";

import { SelectOption } from "../../../@types/selectsModel";
import { ConfigModel } from "../../../@types/configModel";
import { editableConfigEvents } from "../../../store/Config";
import { editableTournamentsSettings, TIMEZONES } from "../../../store/Select";

import { LEVELS_ARRAY } from "../../../constants";
import { SingleSelect } from "../../SingleSelect";

const levelsOptions: SelectOption<number>[] = LEVELS_ARRAY.map((level) => ({
  value: level,
  label: level,
}));

interface Props {
  config: ConfigModel;
  isAdminPage?: boolean;
}

const b = b_.with("user-settings-info");

export const UserSettingsInfo: FC<Props> = ({ config, isAdminPage }) => {
  const { alias, password, timezone } = config;

  const defaultTimezoneOption =
    TIMEZONES.find((option) => option.value === timezone) || TIMEZONES[12];

  const handlePasswordChange = (password: string) =>
    editableConfigEvents.handleChangePassword(password);
  const handleTimezoneChange = (option: SelectOption<typeof TIMEZONES[12]>) =>
    editableConfigEvents.handleTimezoneChange(option.value);
  const handleLevelChange = (option: SelectOption<number>) => {
    editableConfigEvents.handleAllLevelsChange(option.value as any);
  };

  useEffect(() => {
    editableTournamentsSettings.handleChangeTimezone(defaultTimezoneOption);
  }, [defaultTimezoneOption]);

  return (
    <div className={b()}>
      <div className={b("header")}>
        <div className={b("header-conent")}>
          <Typography variant="h5">Alias: {alias}</Typography>
        </div>
      </div>
      <div className={b("settings")}>
        <div className={b("settings-wrapper")}>
          <div className={b("timezones-wrapper")}>
            <SingleSelect
              label="Change all levels"
              options={levelsOptions as any}
              defaultValue={null}
              className={b("select")}
              onSingleChange={handleLevelChange as any}
            />
          </div>
        </div>
      </div>
      <div className={b("settings")}>
        <div className={b("settings-wrapper")}>
          <div className={b("password-wrapper")}>
            <SingleSelect
              label="Timezone"
              className={b("select")}
              options={TIMEZONES}
              required
              autoComplete="off"
              defaultValue={defaultTimezoneOption}
              onSingleChange={handleTimezoneChange as any}
            />
          </div>
        </div>
      </div>
      {isAdminPage && (
        <div className={b("password-wrapper")}>
          <TextField
            label="Password"
            name="password"
            value={password}
            onChange={(e) => handlePasswordChange(e.currentTarget.value)}
            autoComplete="off"
            required
            fullWidth
          />
        </div>
      )}
    </div>
  );
};

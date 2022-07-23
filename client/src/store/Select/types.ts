import { SingleValue } from "react-select";
import { selectModel } from "./../../@types/selectsModel";
import { MultiValue } from "react-select";

export interface tournamentsSettingsProps {
  network: MultiValue<selectModel> | null;
  time: SingleValue<selectModel> | null;
  timezone: SingleValue<selectModel> | null;
  timezoneTable: string | null;
  moneyStart: number | null;
  moneyEnd: number | null;
  KO: boolean;
  turbo: boolean;
  superTurbo: boolean;
  freezout: boolean;
  normal: boolean;
  dateStart: string;
  dateEnd: string;
}

import { rulesType } from "../../@types/rulesModel";

// если здесь чет меняем то меняем и на сервере
export const RULES_TYPES_TO_FIELDS = {
  BidEqual: [
    {
      type: "number",
      placeholder: "Equal",
      options: null,
    },
  ],
  BidFrom: [
    {
      type: "number",
      placeholder: "From",
      options: null,
    },
  ],
  BidTo: [
    {
      type: "number",
      placeholder: "To",
      options: null,
    },
  ],
  PrizepoolEqual: [
    {
      type: "number",
      placeholder: "Equal",
      options: null,
    },
  ],
  PrizepoolFrom: [
    {
      type: "number",
      placeholder: "From",
      options: null,
    },
  ],
  PrizepoolTo: [
    {
      type: "number",
      placeholder: "To",
      options: null,
    },
  ],
  Name: [
    {
      type: "string",
      placeholder: "Includes",
      options: null,
    },
  ],
  StartDay: [
    {
      type: "string",
      placeholder: "Weekday",
      options: [
        "Sunday",
        "Monday",
        "Thusday",
        "Webnesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
    },
  ],
  Flags: [
    {
      type: "string",
      options: [
        "rebuy",
        "od",
        "sng",
        "deepstack",
        "sat",
        "!rebuy",
        "!od",
        "!sng",
        "!deepstack",
        "!sat",
      ],
      placeholder: "Flags",
    },
  ],
  Entrants: [
    {
      type: "number",
      placeholder: "Count",
      options: null,
    },
  ],
};

export const RULES_TYPES = Object.keys(RULES_TYPES_TO_FIELDS) as rulesType[];

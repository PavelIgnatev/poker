import { rulesType } from "../../@types/rulesModel";

// если здесь чет меняем то меняем и на сервере
export const RULES_TYPES_TO_FIELDS = {
  MELE: [
    {
      type: "number",
      placeholder: "From",
      options: null,
    },
    {
      type: "number",
      placeholder: "To",
      options: null,
    },
  ],
  MELEI: [
    {
      type: "number",
      placeholder: "From",
      options: null,
    },
    {
      type: "number",
      placeholder: "To",
      options: null,
    },
    {
      type: "string",
      placeholder: "Includes",
      options: null,
    },
  ],
  EME: [
    {
      type: "number",
      placeholder: "Bid",
      options: null,
    },
    {
      type: "number",
      placeholder: "Guarantee",
      options: null,
    },
  ],
  TEMEI: [
    {
      type: "number",
      placeholder: "Bid",
      options: null,
    },
    {
      type: "number",
      placeholder: "Tickets",
      options: null,
    },
    {
      type: "string",
      placeholder: "Includes",
      options: null,
    },
  ],
  EMEI: [
    {
      type: "number",
      placeholder: "Bid",
      options: null,
    },
    {
      type: "number",
      placeholder: "Guarantee",
      options: null,
    },
    {
      type: "string",
      placeholder: "includes",
      options: null,
    },
  ],
  MELEME: [
    {
      type: "number",
      placeholder: "From",
      options: null,
    },
    {
      type: "number",
      placeholder: "To",
      options: null,
    },
    {
      type: "number",
      placeholder: "Guarantee",
      options: null,
    },
  ],
  EI: [
    {
      type: "number",
      placeholder: "Bid",
      options: null,
    },
    {
      type: "string",
      placeholder: "Includes",
      options: null,
    },
  ],
  eI: [
    {
      type: "string",
      placeholder: "Includes",
      options: null,
    },
  ],
  FLAGS: [
    {
      type: "string",
      options: ["rebuy", "!rebuy", "od", "!od", "sng", "!sng", "deepstack", "!deepstack"],
      placeholder: "Flags",
    },
  ],
  StartDay: [
    {
      type: "string",
      placeholder: "Weekday",
      options: ["Sunday", "Monday", "Thusday", "Webnesday", "Thursday", "Friday", "Saturday"],
    },
  ],
};

export const RULES_TYPES = Object.keys(RULES_TYPES_TO_FIELDS) as rulesType[];

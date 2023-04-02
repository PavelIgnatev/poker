import classes from "./TextTier.module.scss";


export const TextTier = ({ levelAndEffmu }: any) => {
  const textTierOptions: any = {
    "AA": {
        "title": "You may late register and/or re-enter if you will have: 50+ big blinds in KO's, 10+ big blinds in non-KO's with 1,500+ entrants, >40 or <15 big blinds in non-KO's with 1499- entrants",
        "subtitle": ""
    },
    "AB": {
        "title": "You may late register and/or re-enter if you will have: 50+ big blinds in KO's, 10+ big blinds in non-KO's with 1,500+ entrants, >40 or <15 big blinds in non-KO's with 1499- entrants",
        "subtitle": ""
    },
    "AC": {
        "title": "You may late register and/or re-enter if you will have: 50+ big blinds in KO's, 10+ big blinds in non-KO's with 1,500+ entrants, >40 or <15 big blinds in non-KO's with 1499- entrants",
        "subtitle": ""
    },
    "BA": {
        "title": "TIER A: Enter and/or re-enter if you will have: 50+ big blinds in KO's, 10+ big blinds in non-KO's with 1,500+ entrants, >40 or <15 big blinds in non-KO's with 1499- entrants",
        "subtitle": ""
    },
    "BB": {
        "title": "TIER B: Enter and/or re-enter if you will have: 50+ big blinds in any on-stake tournament (unless ***ONE BULLET*** is specified)",
        "subtitle": ""
    },
    "BC": {
        "title": "TIER C: Enter if you will have 50+ big blinds in any on-stake tournament. Re-Enter if you will have 50+ big blinds AND there are 2,000+ entrants (unless ***ONE BULLET*** is specified)",
        "subtitle": ""
    },
    "0A": {
        "title": "TIER A: Enter and/or re-enter if you will have: 50+ big blinds in KO's, 10+ big blinds in non-KO's with 1,500+ entrants, >40 or <15 big blinds in non-KO's with 1499- entrants",
        "subtitle": ""
    },
    "0B": {
        "title": "TIER B: Enter and/or re-enter if you will have: 50+ big blinds in any on-stake tournament (unless ONE BULLET is specified)",
        "subtitle": ""
    },
    "0C": {
        "title": "TIER C: Enter if you will have 50+ big blinds in any on-stake tournament. Re-Enter if you will have 50+ big blinds AND there are 2,000+ entrants (unless ONE BULLET is specified)",
        "subtitle": ""
    },
    "1A": {
        "title": "TIER A: Enter and/or re-enter if you will have: 50+ big blinds in KO's, 10+ big blinds in non-KO's with 1,500+ entrants, >40 or <15 big blinds in non-KO's with 1499- entrants",
        "subtitle": ""
    },
    "1B": {
        "title": "TIER B: Enter and/or re-enter if you will have: 50+ big blinds in any on-stake tournament (unless ONE BULLET is specified)",
        "subtitle": ""
    },
    "1C": {
        "title": "TIER C: Enter if you will have 50+ big blinds in any on-stake tournament. Re-Enter if you will have 50+ big blinds AND there are 2,000+ entrants (unless ONE BULLET is specified)",
        "subtitle": ""
    },
    "2A": {
        "title": "TIER A: Enter and/or re-enter if you will have: 50+ big blinds in KO's, 10+ big blinds in non-KO's with 1,500+ entrants, >40 or <15 big blinds in non-KO's with 1499- entrants",
        "subtitle": ""
    },
    "2B": {
        "title": "TIER B: Enter and/or re-enter if you will have: 50+ big blinds in any on-stake tournament (unless ONE BULLET is specified)",
        "subtitle": ""
    },
    "2C": {
        "title": "TIER C: Enter if you will have 50+ big blinds in any on-stake tournament. Re-Enter if you will have 50+ big blinds AND there are 2,000+ entrants (unless ONE BULLET is specified)",
        "subtitle": ""
    },
    "3A": {
        "title": "TIER A: Enter and/or re-enter if you will have: 50+ big blinds in KO's, 10+ big blinds in non-KO's with 1,500+ entrants, >40 or <15 big blinds in non-KO's with 1499- entrants",
        "subtitle": ""
    },
    "3B": {
        "title": "TIER B: Enter and/or re-enter if you will have: 50+ big blinds in any on-stake tournament (unless ONE BULLET is specified)",
        "subtitle": ""
    },
    "3C": {
        "title": "TIER C: Enter if you will have 50+ big blinds in any on-stake tournament. Re-Enter if you will have 50+ big blinds AND there are 2,000+ entrants (unless ONE BULLET is specified)",
        "subtitle": ""
    },
    "4A": {
        "title": "TIER A: Enter and/or re-enter if you will have: 50+ big blinds in KO's, 10+ big blinds in non-KO's with 1,500+ entrants, >40 or <15 big blinds in non-KO's with 1499- entrants",
        "subtitle": ""
    },
    "4B": {
        "title": "TIER B: Enter and/or re-enter if you will have: 50+ big blinds in any on-stake tournament (unless ONE BULLET is specified)",
        "subtitle": ""
    },
    "4C": {
        "title": "TIER C: Enter if you will have 50+ big blinds in any on-stake tournament. Re-Enter if you will have 50+ big blinds AND there are 2,000+ entrants (unless ONE BULLET is specified)",
        "subtitle": ""
    },
    "5A": {
        "title": "TIER A: Enter and/or re-enter if you will have: 50+ big blinds in KO's, 10+ big blinds in non-KO's with 1,500+ entrants, >40 or <15 big blinds in non-KO's with 1499- entrants",
        "subtitle": ""
    },
    "5B": {
        "title": "TIER B: Enter and/or re-enter if you will have: 50+ big blinds in any on-stake tournament (unless ONE BULLET is specified)",
        "subtitle": ""
    },
    "5C": {
        "title": "TIER C: Enter if you will have 50+ big blinds in any on-stake tournament. Re-Enter if you will have 50+ big blinds AND there are 2,000+ entrants (unless ONE BULLET is specified)",
        "subtitle": ""
    },
    "6A": {
        "title": "TIER A: Enter and/or re-enter if you will have: 50+ big blinds in KO's, 10+ big blinds in non-KO's with 1,500+ entrants, >40 or <15 big blinds in non-KO's with 1499- entrants",
        "subtitle": ""
    },
    "6B": {
        "title": "TIER B: Enter and/or re-enter if you will have: 50+ big blinds in any on-stake tournament (unless ONE BULLET is specified)",
        "subtitle": ""
    },
    "6C": {
        "title": "TIER C: Enter if you will have 50+ big blinds in any on-stake tournament. Re-Enter if you will have 50+ big blinds AND there are 2,000+ entrants (unless ONE BULLET is specified)",
        "subtitle": ""
    },
    "7A": {
        "title": "TIER A: Enter and/or re-enter if you will have: 50+ big blinds in KO's, 10+ big blinds in non-KO's with 1,500+ entrants, >40 or <15 big blinds in non-KO's with 1499- entrants",
        "subtitle": ""
    },
    "7B": {
        "title": "TIER B: Enter and/or re-enter if you will have: 50+ big blinds in any on-stake tournament (unless ONE BULLET is specified)",
        "subtitle": ""
    },
    "7C": {
        "title": "TIER C: Enter if you will have 50+ big blinds in any on-stake tournament. Re-Enter if you will have 50+ big blinds AND there are 2,000+ entrants (unless ONE BULLET is specified)",
        "subtitle": ""
    },
    "8A": {
        "title": "TIER A: Enter and/or re-enter if you will have: 50+ big blinds in KO's, 10+ big blinds in non-KO's with 1,500+ entrants, >40 or <15 big blinds in non-KO's with 1499- entrants",
        "subtitle": ""
    },
    "8B": {
        "title": "TIER B: Enter and/or re-enter if you will have: 50+ big blinds in any on-stake tournament (unless ONE BULLET is specified)",
        "subtitle": ""
    },
    "8C": {
        "title": "TIER C: Enter if you will have 50+ big blinds in any on-stake tournament. Re-Enter if you will have 50+ big blinds AND there are 2,000+ entrants (unless ONE BULLET is specified)",
        "subtitle": ""
    },
    "9A": {
        "title": "TIER A: Enter and/or re-enter if you will have: 50+ big blinds in KO's, 10+ big blinds in non-KO's with 1,500+ entrants, >40 or <15 big blinds in non-KO's with 1499- entrants",
        "subtitle": "TIER A: $22- Non-KO MTT's: Enter/Re-Enter with >40 or <15 big blinds, any field size."
    },
    "9B": {
        "title": "TIER B: Enter and/or re-enter if you will have: 50+ big blinds in any on-stake tournament (unless ***ONE BULLET*** is specified)",
        "subtitle": "TIER B: $22- Non-KO MTT's: Enter/Re-Enter with >40 or <15 big blinds, any field size."
    },
    "9C": {
        "title": "TIER C: Enter if you will have 50+ big blinds in any on-stake tournament. Re-Enter if you will have 50+ big blinds AND there are 2,000+ entrants (unless ***ONE BULLET*** is specified)",
        "subtitle": "TIER C: $16.50- Non-KO MTT's: Enter/Re-Enter with >40 or <15 big blinds, any field size."
    },
    "10A": {
        "title": "TIER A: Enter and/or re-enter if you will have: 50+ big blinds in KO's, 10+ big blinds in non-KO's with 1,500+ entrants, >40 or <15 big blinds in non-KO's with 1499- entrants",
        "subtitle": "TIER A: $22- Non-KO MTT's: Enter/Re-Enter with >40 or <15 big blinds, any field size."
    },
    "10B": {
        "title": "TIER B: Enter and/or re-enter if you will have: 50+ big blinds in any on-stake tournament (unless ***ONE BULLET*** is specified)",
        "subtitle": "TIER B: $22- Non-KO MTT's: Enter/Re-Enter with >40 or <15 big blinds, any field size."
    },
    "10C": {
        "title": "TIER C: Enter if you will have 50+ big blinds in any on-stake tournament. Re-Enter if you will have 50+ big blinds AND there are 2,000+ entrants (unless ***ONE BULLET*** is specified)",
        "subtitle": "TIER C: $22- Non-KO MTT's: Enter/Re-Enter with >40 or <15 big blinds, any field size."
    },
    "11A": {
        "title": "TIER A: Enter and/or re-enter if you will have: 50+ big blinds in KO's, 10+ big blinds in non-KO's with 1,500+ entrants, >40 or <15 big blinds in non-KO's with 1499- entrants",
        "subtitle": "TIER A: $33- Non-KO MTT's: Enter/Re-Enter with >40 or <15 big blinds, any field size."
    },
    "11B": {
        "title": "TIER B: Enter and/or re-enter if you will have: 50+ big blinds in any on-stake tournament (unless ***ONE BULLET*** is specified)",
        "subtitle": "TIER B: $25- Non-KO MTT's: Enter/Re-Enter with >40 or <15 big blinds, any field size."
    },
    "11C": {
        "title": "TIER C: Enter if you will have 50+ big blinds in any on-stake tournament. Re-Enter if you will have 50+ big blinds AND there are 2,000+ entrants (unless ***ONE BULLET*** is specified)",
        "subtitle": "TIER C: $22- Non-KO MTT's: Enter/Re-Enter with >40 or <15 big blinds, any field size."
    },
    "12A": {
        "title": "TIER A: Enter and/or re-enter if you will have: 50+ big blinds in KO's, 10+ big blinds in non-KO's with 1,500+ entrants, >40 or <15 big blinds in non-KO's with 1499- entrants",
        "subtitle": "TIER A: $33- Non-KO MTT's: Enter/Re-Enter with >40 or <15 big blinds, any field size."
    },
    "12B": {
        "title": "TIER B: Enter and/or re-enter if you will have: 50+ big blinds in any on-stake tournament (unless ***ONE BULLET*** is specified)",
        "subtitle": "TIER B: $33- Non-KO MTT's: Enter/Re-Enter with >40 or <15 big blinds, any field size."
    },
    "12C": {
        "title": "TIER C: Enter if you will have 50+ big blinds in any on-stake tournament. Re-Enter if you will have 50+ big blinds AND there are 2,000+ entrants (unless ***ONE BULLET*** is specified)",
        "subtitle": "TIER C: $33- Non-KO MTT's: Enter/Re-Enter with >40 or <15 big blinds, any field size."
    },
    "13A": {
        "title": "TIER A: Enter and/or re-enter if you will have: 50+ big blinds in KO's, 10+ big blinds in non-KO's with 1,500+ entrants, >40 or <15 big blinds in non-KO's with 1499- entrants",
        "subtitle": "TIER A: $55- Non-KO MTT's: Enter/Re-Enter with >40 or <15 big blinds, any field size."
    },
    "13B": {
        "title": "TIER B: Enter and/or re-enter if you will have: 50+ big blinds in any on-stake tournament (unless ***ONE BULLET*** is specified)",
        "subtitle": "TIER B: $33- Non-KO MTT's: Enter/Re-Enter with >40 or <15 big blinds, any field size."
    },
    "13C": {
        "title": "TIER C: Enter if you will have 50+ big blinds in any on-stake tournament. Re-Enter if you will have 50+ big blinds AND there are 2,000+ entrants (unless ***ONE BULLET*** is specified)",
        "subtitle": "TIER C: $33- Non-KO MTT's: Enter/Re-Enter with >40 or <15 big blinds, any field size."
    },
    "14A": {
        "title": "TIER A: Enter and/or re-enter if you will have: 50+ big blinds in KO's, 10+ big blinds in non-KO's with 1,500+ entrants, >40 or <15 big blinds in non-KO's with 1499- entrants",
        "subtitle": "TIER A: $55- Non-KO MTT's: Enter/Re-Enter with >40 or <15 big blinds, any field size."
    },
    "14B": {
        "title": "TIER B: Enter and/or re-enter if you will have: 50+ big blinds in any on-stake tournament (unless ***ONE BULLET*** is specified)",
        "subtitle": "TIER B: $55- Non-KO MTT's: Enter/Re-Enter with >40 or <15 big blinds, any field size."
    },
    "14C": {
        "title": "TIER C: Register with 50+ big blinds and re-enter if you will have: 50+ big blinds AND there are 2,000+ entrants (unless ***ONE BULLET*** is specified)",
        "subtitle": "TIER C: $55- Non-KO MTT's: Enter/Re-Enter with >40 or <15 big blinds, any field size."
    },
    "15SuperA": {
        "title": "Register and/or re-enter if you will have: 50+ big blinds in KO's, 10+ big blinds in non-KO's with 1,500+ entrants, >40 or <15 big blinds in non-KO's with 1499- entrants",
        "subtitle": "TIER Super A: $55- Non-KO MTT's: Enter/Re-Enter with >40 or <15 big blinds, any field size."
    },
    "15A": {
        "title": "Register and/or re-enter if you will have: 50+ big blinds in KO's, 10+ big blinds in non-KO's with 1,500+ entrants, >40 or <15 big blinds in non-KO's with 1499- entrants",
        "subtitle": "TIER A: $55- Non-KO MTT's: Enter/Re-Enter with >40 or <15 big blinds, any field size."
    },
    "15B": {
        "main title": "Register and/or re-enter if you will have: 50+ big blinds in KO's, 10+ big blinds in non-KO's with 1,500+ entrants, >40 or <15 big blinds in non-KO's with 1499- entrants",
        "title": "TIER B: Purple Enter with 50bb+, Re-Enter with 50bb+, Orange follow Tier A rules.",
        "subtitle": "TIER B: $55- Non-KO MTT's: Enter/Re-Enter with >40 or <15 big blinds, any field size."
    },
    "15C": {
        "main title": "Register and/or re-enter if you will have: 50+ big blinds in KO's, 10+ big blinds in non-KO's with 1,500+ entrants, >40 or <15 big blinds in non-KO's with 1499- entrants",
        "title": "TIER C: Purple Enter with 50bb+, Re-Enter with 50bb+, Orange follow Tier A rules.",
        "subtitle": "TIER C: $55- Non-KO MTT's: Enter/Re-Enter with >40 or <15 big blinds, any field size."
    },
    "16A": {
        "title": "TIER A: Enter and/or re-enter if you will have: 50+ big blinds in KO's, 10+ big blinds in non-KO's with 1,500+ entrants, >40 or <15 big blinds in non-KO's with 1499- entrants",
        "subtitle": ""
    },
    "16B": {
        "title": "TIER B: Enter and/or re-enter if you will have: 50+ big blinds in any on-stake tournament (unless ONE BULLET is specified)",
        "subtitle": ""
    },
    "16C": {
        "title": "TIER C: Enter if you will have 50+ big blinds in any on-stake tournament. Re-Enter if you will have 50+ big blinds AND there are 2,000+ entrants (unless ONE BULLET is specified)",
        "subtitle": ""
    }
  };

  return (
    <div style={{height: 'auto', minHeight: 100}} className={classes.div}>
      <div style={{color: 'black'}}>{textTierOptions?.[levelAndEffmu]?.["main title"] ?? ""}</div>
      <div>{textTierOptions?.[levelAndEffmu]?.title ?? ""}</div>
      <div className={classes.red}>{textTierOptions?.[levelAndEffmu]?.subtitle ?? ""}</div>
    </div>
  );
};

import { FC } from "react";

export const AdmissibleStatusSection: FC = () => {
  return (
    <section>
      <h2>Admissible status: </h2>
      <ul>
        <li>!KONormal</li>
        <li>KONormal</li>
        <li>!KOTurbo</li>
        <li>KOTurbo</li>
        <li>
          !KOSuperTurbo <span>(only WNMX)</span>
        </li>
        <li>
          KOSuperTurbo <span>(only WNMX)</span>
        </li>
      </ul>
    </section>
  );
};

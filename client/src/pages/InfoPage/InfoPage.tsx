import { FC, useEffect, useState } from "react";

import api from "../../api";
import { BaseTable } from "../../components/BaseTable";

import { tableCellModel } from "../../@types/tableCellModel";

export const InfoPage: FC = () => {
  // на null не править, не выйдет
  const [result, setResult] = useState<tableCellModel[] | undefined>(undefined);

  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());

  useEffect(() => {
    const fetchData = async () => {
      const data = await api.get<tableCellModel[]>("/api/info", params);

      setResult(data);
    };

    fetchData();
  }, []);

  return <BaseTable data={result} loading={!result} />;
};

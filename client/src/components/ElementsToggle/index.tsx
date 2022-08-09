import b_ from "b_";
import cx from "classnames";
import { FC, useState } from "react";

import { EFFMU } from "../../constants";
import { Effmu } from "../../@types/common";

import { BaseButton } from "../BaseButton";

import "./index.scss";

interface Props {
  selectedElement: string;
  onElementChange: (element: any) => () => void;
  elements: string[];
  mix?: string;
}

const b = b_.with("elements-toggle");

export const ElementsToggle = ({ selectedElement, onElementChange, elements, mix }: Props) => (
  <div className={cx(b(), mix)}>
    {elements.map((elem) => (
      <BaseButton
        className={b("button")}
        onClick={onElementChange(elem)}
        clear={elem !== selectedElement}
        key={elem}
      >
        {elem}
      </BaseButton>
    ))}
  </div>
);

// @ts-ignore ругается на T = "", типа T может не быть стрингой (но она extends от нее!!)
export function useElementsToggle<T extends string>(defaultElem: T = "") {
  const [selectedElement, setElement] = useState(defaultElem);
  const handleElementChange = (elem: T) => () => {
    if (elem !== selectedElement) {
      setElement(elem);
    }
  };

  return { selectedElement, handleElementChange };
}

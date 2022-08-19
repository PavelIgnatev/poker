import b_ from "b_";
import cx from "classnames";
import { useState } from "react";

import { BaseButton } from "../BaseButton";

import "./index.scss";

interface ColorPaletteProps {
  selectedElement: string;
  onElementChange: (element: any) => () => void;
  elements: string[];
  mix?: string;
}

const b = b_.with("color-palette");

export const ColorPalette = ({
  selectedElement,
  onElementChange,
  elements,
  mix,
}: ColorPaletteProps) => (
  <div className={cx(b(), mix)}>
    {elements.map((elem) => (
      <BaseButton
        className={b("button")}
        onClick={onElementChange(elem)}
        clear={elem !== selectedElement}
        key={elem}
        style={{ background: elem }}
      />
    ))}
  </div>
);

// components/parts/CustomButton.tsx

import React from "react";
import { Button, ButtonProps } from "@mui/material";

interface CustomButtonProps extends ButtonProps {
  variantType?: "primary" | "secondary" | "danger";
}

const CustomButton: React.FC<CustomButtonProps> = ({
  variantType = "primary",
  ...props
}) => {
  let color: ButtonProps["color"] = "primary";

  // TODO: variantTypeに応じてcolorを変化させる
  // colorに設定する色は調べて実装する

  // variantType に応じて MUI の color を切り替える
  switch (variantType) {
    case "primary":
      color = "primary"; // MUIのprimary色
      break;
    case "secondary":
      color = "secondary"; // MUIのsecondary色
      break;
    case "danger":
      color = "error"; // MUIのerror色（赤）
      break;
    default:
      color = "primary";
  }
  return (
    // TODO: <Button>の実装
    <Button color={color} variant="contained" {...props}>
      {props.children}
    </Button>
    // プロップスには[color][variant]を設定し、{...props}を最後に設定する
  );
};

export default CustomButton;

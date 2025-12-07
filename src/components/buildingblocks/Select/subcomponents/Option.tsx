import React, { ReactNode } from "react";

export interface OptionProps {
  value: string;
  children: ReactNode;
}

const Option: React.FC<OptionProps> = ({ value, children }) => {
  return <option value={value}>{children}</option>;
};

export default Option;

import React, { ReactNode } from "react";
import Options from "./subcomponents/Options";

export interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  children: ReactNode;
  className?: string;
}

const SelectComponent: React.FC<SelectProps> = ({
  value,
  onChange,
  children,
  className = "",
}) => {
  return (
    <div className={className}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          // Pass value and onChange to Options component
          if (child.type === Options) {
            return React.cloneElement(child as React.ReactElement<any>, {
              value,
              onChange,
            });
          }
        }
        return child;
      })}
    </div>
  );
};

const Select = SelectComponent as React.FC<SelectProps> & {
  Label: React.ComponentType<{ children: ReactNode; className?: string }>;
  Options: React.ComponentType<{
    value?: string;
    onChange?: (value: string) => void;
    children: ReactNode;
    className?: string;
  }>;
  Option: React.ComponentType<{ value: string; children: ReactNode }>;
};

export default Select;

/* eslint-disable @typescript-eslint/no-unused-vars */
// src/components/ui/Switch.tsx
import { Switch as HeadlessSwitch } from "@headlessui/react";
import classNames from "classnames";

interface Props {
  checked: boolean;
  onCheckedChange: (value: boolean) => void;
}

export const Switch = ({ checked, onCheckedChange }: Props) => {
  return (
    <HeadlessSwitch
      checked={checked}
      onChange={onCheckedChange}
      className={classNames(
        "relative inline-flex items-center h-6 w-11 transition-colors duration-300 ease-in-out rounded-full",
        checked ? "bg-blue-600" : "bg-gray-300"
      )}
    >
      <span
        className={classNames(
          "inline-block w-4 h-4 transform bg-white rounded-full transition duration-300 ease-in-out",
          checked ? "translate-x-6" : "translate-x-1"
        )}
      />
    </HeadlessSwitch>
  );
};

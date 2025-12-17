import React from "react";
import style from "./style.module.css";

export type RadioButtonProps = {
  id: string;
  name: string;
  value: string;
  label: string;
  checked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const RadioButton: React.FC<RadioButtonProps> = ({
  id,
  name,
  value,
  label,
  checked = false,
  onChange,
}) => {
  return (
    <div className={style.radioButton}>
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className={style.radioButton__input}
      />
      <label htmlFor={id} className={style.radioButton__label}>
        {label}
      </label>
    </div>
  );
};

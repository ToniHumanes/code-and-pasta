import { JSX } from "react";
import styles from "./style.module.css";

type Props = {
  value: string;
  onChange: (value: string) => void;
  rows?: number;
  cols?: number;
};

export const Textarea = ({
  value,
  onChange,
  rows = 10,
  cols = 50,
}: Props): JSX.Element => {
  return (
    <textarea
      className={styles.textarea}
      rows={rows}
      cols={cols}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

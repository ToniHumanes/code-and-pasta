import styles from "./style.module.css";

type LabelProps = {
  text: string;
  color?: "red" | "blue" | "green" | "yellow";
};

export const Label = ({ text, color }: LabelProps) => {
  return (
    <span className={`${styles.label} ${color ? styles[color] : ""}`}>
      {text}
    </span>
  );
};

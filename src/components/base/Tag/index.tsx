import styles from "./style.module.css";

type TagProps = {
  text: string;
  color?: "red" | "blue" | "green" | "yellow";
};

export const Tag = ({ text, color }: TagProps) => {
  return (
    <span className={`${styles.label} ${color ? styles[color] : ""}`}>
      {text}
    </span>
  );
};

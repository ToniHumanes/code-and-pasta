import styles from "./style.module.css";

type Props = {
  label: string;
  onClick: () => void;
  color?: "primary" | "secondary";
  type?: "button" | "submit" | "reset";
};

export const Button = ({
  label,
  onClick,
  color = "primary",
  type = "button",
}: Props) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${styles.btn} ${styles[`btn-${color}`]}`}
    >
      {label}
    </button>
  );
};

import styles from "./style.module.css";

type Props = {
  placeholder?: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errorMessage?: string;
  className?: string;
  name?: string;
};

export const Input = ({
  placeholder,
  type,
  value,
  onChange,
  errorMessage,
  className,
  name,
}: Props) => {
  return (
    <div className={`${className || ""}`}>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`${styles.input} ${
          errorMessage ? styles["input--error"] : ""
        }`}
      />
      {errorMessage && (
        <span className={styles["input-error__message"]}>{errorMessage}</span>
      )}
    </div>
  );
};

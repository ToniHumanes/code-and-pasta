type LabelProps = {
  text: string;
  color?: "red" | "blue" | "green" | "yellow";
  className?: string;
};

const Label = ({ text, color, className }: LabelProps) => {
  return (
    <span
      className={`label ${color ? `label--${color}` : ""} ${className ?? ""}`}
    >
      {text}
    </span>
  );
};

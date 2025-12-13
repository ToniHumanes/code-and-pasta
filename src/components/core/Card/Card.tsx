import style from "./style.module.css";

type Props = {
  image: string;
  title: string;
  content?: string;
};

export const Card = ({ image, title, content }: Props) => {
  return (
    <div className={style.card}>
      <img src={image} alt={title} className={style.card__image} />
      <h3 className={style.card__title}>{title}</h3>
      {content && <p className={style.card__content}>{content}</p>}
    </div>
  );
};

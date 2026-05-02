import style from "./style.module.css";
import {
  ResponsiveImage,
  type ResponsiveImageSource,
} from "../ResponsiveImage";

type Props = {
  image: ResponsiveImageSource;
  title: string;
  content?: string;
};

export const MediaCard = ({ image, title, content }: Props) => {
  return (
    <div className={style.card}>
      <ResponsiveImage {...image} className={style.card__image} />
      <h3 className={style.card__title}>{title}</h3>
      {content && <p className={style.card__content}>{content}</p>}
    </div>
  );
};

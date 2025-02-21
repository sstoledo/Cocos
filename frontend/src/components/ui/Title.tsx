import { BodyFont, TitleFont } from "@config/fonts";

interface Props{
  title:string;
  subTitle?:string;
}

export const Title = ({title,subTitle}:Props) => {
  return (
    <div className="mb-2">
      <h3 className={`${TitleFont.className} font-bold capitalize am:text-2xl sm:text-3xl md:text-4xl xl:text-5xl text-light-text-primary dark:text-dark-text-primary`}>
        {title}
      </h3>
      <h4 className={`${BodyFont.className} text-light-text-secondary dark:text-dark-text-secondary`}>{subTitle}</h4>
    </div>
  );
}

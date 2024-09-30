import { BodyFont } from "@/config/fonts";


interface Props{
  title:string;
  subTitle?:string;
}

export const Title = ({title,subTitle}:Props) => {
  return (
    <div className="mb-2">
      <h3 className={`${BodyFont.className} font-bold capitalize text-2xl`}>{title}</h3>
      <h4>{subTitle}</h4>
    </div>
  )
}

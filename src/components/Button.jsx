import ArrowTop from "/images/arrow-top.png";

export const ButtonForGoTop = () => {
  return (
    <div className="bg-[#403D58] dark:bg-[#5BC0EB] p-2 rounded-full">
      <a href="#top">
        <img src={ArrowTop} alt="" className="scale-75" />
      </a>
    </div>
  );
};

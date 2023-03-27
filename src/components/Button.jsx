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

export const ButtonPrimaryA = (props) => {
  return (
    <a
      href={"#" + props.ayat}
      className="text-white py-2 px-5 rounded bg-biru-tua dark:bg-biru-muda"
    >
      {props.name}
    </a>
  );
};

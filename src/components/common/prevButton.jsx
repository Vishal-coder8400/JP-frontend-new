import { Link } from "react-router-dom";

const PrevButton = ({ link }) => {
  return (
    <Link
      to={link}
      className="cursor-pointer px-10 py-2.5 bg-[#000] rounded-3xl inline-flex justify-center items-center gap-2.5"
    >
      <div className="justify-start text-white text-sm font-medium capitalize">
        Back
      </div>
    </Link>
  );
};

export default PrevButton;

import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { Link } from "react-router-dom";
import { useWindowSize } from "react-use";
import useAuthStore from "../../stores/useAuthStore";

const Congratulation = () => {
  const { width, height } = useWindowSize();
  const [showConfetti, setShowConfetti] = useState(false);
  const { user } = useAuthStore();
  useEffect(() => {
    setShowConfetti(true);
  }, []);

  return (
    <div className="relative flex min-h-screen items-center justify-center w-full">
      {/* Confetti Animation */}
      {showConfetti && (
        <Confetti
          width={width}
          height={height}
          recycle={true} // Stop after one burst
          numberOfPieces={200} // Number of confetti pieces
          gravity={0.2} // How fast confetti falls
          colors={["#ff0a54", "#ff477e", "#ff85a1", "#fbb1bd", "#fed7da"]} // Pink gradient colors
          className="absolute top-0 left-0 z-10"
        />
      )}

      {/* Congratulations Content */}
      <div className="w-full h-full relative bg-white inline-flex flex-col justify-center items-center overflow-hidden">
        <div className="self-stretch px-[20px] py-[20px] lg:px-36 lg:py-24 flex flex-col justify-center items-center gap-20">
          <div className="flex flex-col justify-start items-start gap-8">
            <div className="flex flex-col justify-start items-start gap-7">
              <div className="self-stretch text-center justify-start text-gray-900 text-xl lg:text-3xl font-bold leading-10">
                Congratulations, You’re In!
              </div>
              <div className="self-stretch text-center justify-start text-gray-900 text-lg lg:text-2xl font-bold leading-loose">
                Welcome aboard,{" "}
                {user?.name || user?.basicInformation?.companyName}
              </div>
              <div className="self-stretch text-center justify-start text-neutral-900 text-base font-normal leading-snug">
                Your journey towards exciting opportunities starts now. Let’s
                set up your profile and get you noticed by top employers!
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-start items-end gap-10">
            <Link
              to={`/${user?.role}/dashboard`}
              className="w-64 px-5 py-2.5 bg-violet-600 rounded-3xl inline-flex justify-center items-center gap-2.5"
            >
              <div className="justify-start text-white text-sm font-medium capitalize">
                Proceed
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Congratulation;

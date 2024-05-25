import React from "react";

function CheckPassword({
  isEightToThirtyTwoLetters,
  containsNumber,
  containsSymbol,
}: {
  isEightToThirtyTwoLetters: boolean;
  containsNumber: boolean;
  containsSymbol: boolean;
}) {
  return (
    <div className="flex justify-center items-center mx-auto gap-3 my-3 mt-5 text-xs">
      <div className="flex gap-1.5">
        <div
          className={`w-[18px] h-[18px] rounded-[18px] font-extralight text-white text-center pt-0.5 ${
            isEightToThirtyTwoLetters ? "bg-[#68BEA1]" : "bg-[#F0F0F0]"
          }`}
        >
          {isEightToThirtyTwoLetters && "✔"}
        </div>
        <div className="text-[#aaa9a9]">8-32 letters</div>
      </div>
      <div className="flex gap-1.5">
        <div
          className={`w-[18px] h-[18px] rounded-[18px] font-extralight text-white text-center pt-0.5 ${
            containsNumber ? "bg-[#68BEA1] " : "bg-[#F0F0F0]"
          }`}
        >
          {containsNumber && "✔"}
        </div>
        <div className="text-[#aaa9a9]">Number</div>
      </div>
      <div className="flex gap-1.5">
        <div
          className={`w-[18px] h-[18px] rounded-[18px] font-extralight text-white text-center pt-0.5 ${
            containsSymbol ? "bg-[#68BEA1] text-white" : "bg-[#F0F0F0]"
          }`}
        >
          {containsSymbol && "✔"}
        </div>
        <div className="text-[#aaa9a9]">Symbol</div>
      </div>
    </div>
  );
}

export default CheckPassword;

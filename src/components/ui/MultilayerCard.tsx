import React, { ReactNode } from "react";

type MultilayerCardProps = {
  children: ReactNode;
};

export const MultilayerCard: React.FC<MultilayerCardProps> = ({ children }) => {
  return (
    <div className="py-14">
      <div className="relative mx-auto h-72 sm:h-52">
        <div
          className="dark:bg-zinc-900 bg-zinc-100 absolute size-full rounded-3xl border border-neutral-200 dark:border-zinc-800 scale-y-[1.15] scale-x-90 -top-4"
          style={{
            transformOrigin: "top center",
          }}
        ></div>
        <div
          className="absolute bg-white size-full rounded-3xl p-2  shadow-[0px_0px_16px_#D4D4D8]"
          style={{
            transformOrigin: "top center",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

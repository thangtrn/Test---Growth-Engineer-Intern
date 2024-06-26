"use client";
import React from "react";
import ArcProgress from "react-arc-progress";
import { cn } from "~/lib/cn";

interface ICircularProgress {
   progress: number;
}

const CircularProgress: React.FC<ICircularProgress> = ({ progress }) => {
   return (
      <div className="f-center">
         <div className="relative size-[300px] f-center">
            <ArcProgress progress={progress} size={250} fillColor="#ffbb10" />
            <div className="absolute f-center flex-col bottom-1/4">
               <h4 className="font-medium text-2xl">5.5</h4>
               <span>Score</span>
            </div>

            <span className="absolute bottom-[35%] left-0 -translate-x-1/2 rotate-[270deg]">
               Sơ khai
            </span>
            <span className="absolute left-0 top-[20%] -translate-x-1/2 rotate-[300deg]">
               Thành lập
            </span>
            <span className="absolute -top-3">Vận hành</span>
            <span className="absolute right-0 top-[20%] translate-x-1/2 rotate-[55deg]">
               Tối ưu
            </span>
            <span className="absolute bottom-[35%] right-0 translate-x-1/2 rotate-90 whitespace-nowrap">
               Thấm nhuần
            </span>
         </div>
      </div>
   );
};

export default CircularProgress;

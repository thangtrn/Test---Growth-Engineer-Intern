import React from "react";
import Button from "./Button";
import GlassCardWrapper from "./GlassCardWrapper";
import { ArrowLeft, ArrowRight } from "lucide-react";

type Option = {
   id: number;
   text: string;
   score: number;
};

interface AssessmentCardProps {
   // for title
   currentQuestion: number;
   totalQuestion: number;
   // for option
   options: Option[];
   selectedOption: number;
   onPreviousClick: () => void;
   onNextClick: () => void;
   onSubmit: () => void;
}

const AssessmentCard: React.FC<AssessmentCardProps> = ({
   currentQuestion,
   totalQuestion,
   options,
   selectedOption,
   onPreviousClick,
   onNextClick,
   onSubmit,
}) => {
   return (
      <GlassCardWrapper
         header={
            <div className="f-center gap-2 mb-4">
               <span className="inline-block size-2 rounded-full bg-primary" />
               <h6 className="text-md uppercase">
                  Câu hỏi {currentQuestion}/{totalQuestion}
               </h6>
            </div>
         }
      >
         <div className="space-y-3">
            <h3 className="font-medium">
               Có một nhóm chuyên trách về việc thu thập, phân tích nguyên nhân
               gốc rễ vấn đề của khách hàng và truyền thông về phản hồi của
               khách hàng đến quản lý và ban lãnh đạo cấp cao.
            </h3>

            <div className="space-y-3">
               {options.map((item) => (
                  <Button
                     key={item.id}
                     variant="ghost"
                     selected={selectedOption === item.id}
                  >
                     {item.text}
                  </Button>
               ))}
            </div>

            <div className="flex justify-between gap-4">
               <Button
                  variant="flat"
                  leftIcon={<ArrowLeft size={16} />}
                  onClick={onPreviousClick}
               >
                  Quay lại
               </Button>
               {currentQuestion === totalQuestion ? (
                  <Button onClick={onSubmit}>Gửi đánh giá</Button>
               ) : (
                  <Button
                     rightIcon={<ArrowRight size={16} />}
                     onClick={onNextClick}
                  >
                     Tiếp theo
                  </Button>
               )}
            </div>
         </div>
      </GlassCardWrapper>
   );
};

export default AssessmentCard;

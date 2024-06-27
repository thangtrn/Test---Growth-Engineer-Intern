import React, { memo } from "react";
import Button from "./Button";
import GlassCardWrapper from "./GlassCardWrapper";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { IQuestion } from "~/interfaces/assessment";

interface AssessmentCardProps {
   // for title
   currentQuestion: number;
   totalQuestion: number;
   // for option
   question: IQuestion;
   selectedOption: number | null;
   onPreviousClick: () => void;
   onNextClick: () => void;
   onSubmit: () => void;
   onSelectedQuestion: (id: number) => void;
   isLoading: boolean;
}

const AssessmentCard: React.FC<AssessmentCardProps> = ({
   currentQuestion,
   totalQuestion,
   question,
   selectedOption,
   onPreviousClick,
   onNextClick,
   onSubmit,
   onSelectedQuestion,
   isLoading,
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
            <h3 className="font-medium">{question?.title}</h3>

            <div className="space-y-3">
               {question?.options.map((item) => (
                  <Button
                     key={item.id}
                     variant="ghost"
                     selected={selectedOption === item.id}
                     onClick={() => onSelectedQuestion(item.id)}
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
                  disabled={isLoading}
               >
                  Quay lại
               </Button>
               {currentQuestion === totalQuestion ? (
                  <Button onClick={onSubmit} loading={isLoading}>
                     Gửi đánh giá
                  </Button>
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

export default memo(AssessmentCard);

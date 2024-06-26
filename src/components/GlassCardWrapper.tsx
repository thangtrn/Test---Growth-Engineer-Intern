import React from "react";

interface AssessmentCardProps {
   header: React.ReactNode;
   children: React.ReactNode;
}

const GlassCardWrapper: React.FC<AssessmentCardProps> = ({
   header,
   children,
}) => {
   return (
      <section className="glass-card">
         <div>{header}</div>
         <div className="space-y-3">{children}</div>
      </section>
   );
};

export default GlassCardWrapper;

import React from "react";

interface SectionHeaderProps {
  title: string;
  description?: string;
  centered?: boolean;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  description,
  centered = true,
}) => {
  return (
    <div className={`max-w-5xl ${centered ? "mx-auto text-center" : ""} mb-12`}>
      <h2 className="font-montserrat text-3xl lg:text-[40px] font-semibold text-gray-900 mb-4">
        {title}
      </h2>
      {description && (
        <p className="text-gray-600 leading-relaxed">{description}</p>
      )}
    </div>
  );
};

export default SectionHeader;

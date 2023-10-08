"use client"

import React, { useState } from 'react';

interface AccordionItem {
  title: string;
  content: string;
}

interface AccordionProps {
  items: AccordionItem[];
}

const Accordion: React.FC<AccordionProps> = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="space-y-2">
      {items.map((item, index) => (
        <div key={index} className="p-2 font-bold">
          <div
            onClick={() => toggleAccordion(index)}
            className={`cursor-pointer ${
              activeIndex === index
                ? 'bg-head text-black'
                : 'bg-gray-200 text-gray-700'
            } p-2 rounded-lg`}
          >
            {item.title}
          </div>
          <div
            className={`transition-all font-normal ${
              activeIndex === index ? 'h-auto max-h-screen' : 'h-0 max-h-0'
            } overflow-hidden`}
          >
            <p className="p-2">{item.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Accordion;
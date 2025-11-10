import React, { useState } from "react";
import * as i18n from "../i18n/utils";

export const FAQSection = ({ lang }) => {
  const safeLang = lang === 'en' ? 'en' : 'es';
  const t = i18n.useTranslations(safeLang);
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: t('faq.q1'),
      answer: t('faq.a1')
    },
    {
      question: t('faq.q2'),
      answer: t('faq.a2')
    },
    {
      question: t('faq.q3'),
      answer: t('faq.a3')
    },
    {
      question: t('faq.q4'),
      answer: t('faq.a4')
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-[#faf1ea] py-16 md:py-20 lg:py-24">
      <div className="max-w-2xl lg:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Título */}
        <h2 className="[font-family:'Bricolage_Grotesque',Helvetica] font-bold text-3xl md:text-4xl lg:text-5xl text-[#13243c] mb-12 text-center lg:text-left">
          {t('faq.title')}
        </h2>

        {/* Lista de Preguntas */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`
                rounded-2xl border-2 overflow-hidden cursor-pointer
                transition-all duration-300 ease-in-out
                ${openIndex === index 
                  ? 'bg-[#13243c] border-[#4e3aff]' 
                  : 'bg-white border-[#13243c]'
                }
              `}
              onClick={() => toggleFAQ(index)}
            >
              {/* Pregunta */}
              <div className="p-6 md:p-8">
                <h3 className={`
                  [font-family:'Be_Vietnam',Helvetica] font-medium text-base md:text-lg leading-relaxed
                  transition-colors duration-300
                  ${openIndex === index 
                    ? 'text-white' 
                    : 'text-[#13243c]'
                  }
                `}>
                  {faq.question}
                </h3>
              </div>

              {/* Respuesta (se expande al hacer click) */}
              <div
                className={`
                  overflow-hidden transition-all duration-300 ease-in-out
                  ${openIndex === index 
                    ? 'max-h-96 opacity-100' 
                    : 'max-h-0 opacity-0'
                  }
                `}
              >
                {/* Línea separadora blanca */}
                {openIndex === index && (
                  <div className="h-[2px] bg-white mx-6 md:mx-8" />
                )}
                
                {/* Contenido de la respuesta */}
                <div className="p-6 md:p-8 pt-6">
                  <p className="[font-family:'Be_Vietnam',Helvetica] font-normal text-base md:text-lg text-white leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;

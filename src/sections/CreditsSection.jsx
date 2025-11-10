import React from 'react';
import * as i18n from "../i18n/utils";

export default function CreditsSection({ lang }) {
  const safeLang = lang === 'en' ? 'en' : 'es';
  const t = i18n.useTranslations(safeLang);
  const creditTiers = [
    {
      title: t('credits.tiers.low'),
      amount: "1.00",
      label: t('credits.tiers.label')
    },
    {
      title: t('credits.tiers.medium'),
      amount: "1.25",
      label: t('credits.tiers.label')
    },
    {
      title: t('credits.tiers.high'),
      amount: "1.50",
      label: t('credits.tiers.label')
    }
  ];
  const creditSteps = [
    {
      text: t('credits.steps.1')
    },
    {
      text: t('credits.steps.2')
    },
    {
      text: t('credits.steps.3')
    }
  ];

  return (
    <section className="bg-[#faf1ea] pb-4 pt-6 md:pb-4 md:pt-8">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        {/* Título */}
        <h2 className="[font-family:'Bricolage_Grotesque',Helvetica] font-bold text-3xl md:text-4xl lg:text-5xl text-[#13243c] text-center mb-12">
          {t('credits.howTitle')}
        </h2>

        {/* Cajas de información */}
        <div className="flex flex-col gap-6 md:gap-8 mt-16 max-w-4xl mx-auto">
          {creditSteps.map((step, index) => (
            <div
              key={index}
              style={{ border: '2px solid #000000' }}
              className="rounded-3xl p-6 md:p-8 bg-[#faf1ea]"
            >
              <p className="[font-family:'Be_Vietnam',Helvetica] text-base md:text-lg text-[#13243c] text-center leading-relaxed">
                {step.text}
              </p>
            </div>
          ))}
        </div>
        <div className="w-full mb-12">
          <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
            <div className="w-full space-y-8">
              {creditTiers.map((tier, index) => (
                <div key={index} className="w-full">
                  <div className="w-full bg-[#faf1ea] py-6">
                    <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-4">
                      <div className="col-span-1 lg:col-span-7">
                        <h3 className="[font-family:'Be_Vietnam',Helvetica] font-bold text-base md:text-lg lg:text-xl xl:text-2xl text-[#13243c] leading-tight">
                          {tier.title}
                        </h3>
                      </div>

                      <div className="col-span-1 lg:col-span-5 flex justify-start lg:justify-end">
                        <div className="flex items-baseline gap-3">
                          <span className="[font-family:'Bricolage_Grotesque',Helvetica] font-bold text-[#211EE1] leading-none" style={{fontSize: 'clamp(2.25rem, 3.5vw, 4.5rem)'}}>
                            {tier.amount}
                          </span>
                          <span className="[font-family:'Be_Vietnam',Helvetica] font-medium text-[#211EE1]" style={{fontSize: 'clamp(0.95rem, 1.2vw, 1.5rem)'}}>
                            {tier.label}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="w-full h-px bg-[#13243c] opacity-40" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

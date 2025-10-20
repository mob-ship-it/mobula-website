import React from 'react';

export default function CreditsSection() {
  const creditTiers = [
    {
      title: "Servicio Profesional de complejidad baja",
      amount: "1.00",
      label: "Crédito /Hora"
    },
    {
      title: "Servicio Profesional de complejidad media",
      amount: "1.25",
      label: "Crédito /Hora"
    },
    {
      title: "Servicio Profesional de complejidad alta",
      amount: "1.50",
      label: "Crédito /Hora"
    }
  ];
  const creditSteps = [
    {
      text: "Cada solicitud se evalúa según su complejidad para definir cuántos créditos requiere."
    },
    {
      text: "Una vez aprobada la estimación, se inicia el proyecto."
    },
    {
      text: "Si no usás todos tus créditos en el mes, no los perdés: se acumulan hasta por 3 meses, dándote la flexibilidad de utilizarlos cuando más los necesités."
    }
  ];

  return (
    <section className="bg-[#faf1ea] pb-4 pt-6 md:pb-4 md:pt-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Título */}
        <h2 className="[font-family:'Bricolage_Grotesque',Helvetica] font-bold text-3xl md:text-4xl lg:text-5xl text-[#13243c] text-center mb-12">
          ¿Cómo funcionan los créditos?
        </h2>

        {/* Cajas de información */}
        <div className="flex flex-col gap-6 md:gap-8 mt-16">
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
        {/* Tarjetas de Créditos */}
        <div className="flex flex-col gap-0 mb-12 max-w-md mx-auto">
          {creditTiers.map((tier, index) => (
            <div key={index} className="flex flex-col items-center">
              {/* Tarjeta */}
              <div className="w-full bg-[#faf1ea] py-8 px-6 text-center">
                {/* Título */}
                <h3 className="[font-family:'Be_Vietnam',Helvetica] font-bold text-lg md:text-xl text-[#13243c] mb-4 leading-tight">
                  {tier.title}
                </h3>
                {/* Monto del crédito */}
                <div className="flex items-baseline justify-center gap-2">
                  <span className="[font-family:'Bricolage_Grotesque',Helvetica] font-bold text-6xl md:text-7xl text-[#211EE1] leading-none">
                    {tier.amount}
                  </span>
                  <span className="[font-family:'Be_Vietnam',Helvetica] font-medium text-xl md:text-2xl text-[#211EE1]">
                    {tier.label}
                  </span>
                </div>
              </div>
              {/* Línea separadora (no mostrar después del último) */}
              {index < creditTiers.length - 1 && (
                <div className="w-4/5 h-px bg-[#13243c]" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

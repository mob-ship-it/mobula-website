import React from 'react';

export default function CreditsSection() {
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
    <section className="bg-[#faf1ea] py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Título */}
        <h2 className="[font-family:'Bricolage_Grotesque',Helvetica] font-bold text-3xl md:text-4xl lg:text-5xl text-[#13243c] text-center mb-12">
          ¿Cómo funcionan los créditos?
        </h2>

        {/* Cajas de información */}
        <div className="flex flex-col gap-6 md:gap-8">
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
      </div>
    </section>
  );
}

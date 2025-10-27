import React, { useState } from "react";
import { Button } from "../components/Button";
import EmblaCarousel from "../components/EmblaCarousel";
import { SubscriptionModal } from "../components/SubscriptionModal";
import { useModal } from "../hooks/useModal";
import { planService } from "../services/api";

export const PlansSection = () => {
  const plans = planService.getPlans();
  const { isOpen, openModal, closeModal } = useModal();
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handleSubscribe = (plan) => {
    setSelectedPlan(plan);
    openModal();
  };

  const formatPrice = (price) => {
    if (typeof price === 'number') {
      return `$${price.toLocaleString()} / mes`;
    }
    return price;
  };

  const PlanCard = ({ plan, isDesktop = false }) => (
    <div className={isDesktop ? "w-full" : "w-[244px] h-[325.9px] flex-shrink-0"}>
      <div className={`${isDesktop ? 'h-[280px]' : 'h-[326px]'} rounded-2xl border-2 border-solid border-[#13243c] bg-white hover:shadow-xl hover:border-[#3b82f6] transition-all duration-300 ease-out`}>
        <div className={`flex flex-col ${isDesktop ? 'w-[90%] gap-4' : 'w-[203px] gap-6'} items-start relative top-5 ${isDesktop ? 'left-[5%]' : 'left-[22px]'}`}>
          <div className="flex flex-col items-start gap-3 relative self-stretch w-full flex-[0_0_auto]">
            <div className="h-[17.08px] text-base leading-[19.5px] relative self-stretch mt-[-1.00px] [font-family:'Be_Vietnam',Helvetica] font-normal text-[#13243c] tracking-[0] whitespace-nowrap">
              {plan.name}
            </div>

            <div className="relative self-stretch h-[29.89px] [font-family:'Bricolage_Grotesque',Helvetica] font-normal text-[#13243c] text-3xl tracking-[0] leading-[36.6px] whitespace-nowrap">
              {formatPrice(plan.price)}
            </div>

            <div className="relative self-stretch h-[17.08px] [font-family:'Be_Vietnam',Helvetica] font-normal text-[#13243c] text-base tracking-[0] leading-[19.5px] whitespace-nowrap">
              {typeof plan.credits === 'number' ? `${plan.credits} Créditos` : plan.credits}
            </div>
          </div>

          <Button
            variant="primary"
            onClick={() => handleSubscribe(plan)}
            className={`w-full ${isDesktop ? 'h-[40px] text-lg' : 'h-[45px] text-xl'} rounded-[60px]`}
          >
            Suscribirse
          </Button>

          <div className={`flex flex-col ${isDesktop ? 'w-full gap-2' : 'w-[181.43px] gap-3'} relative flex-[0_0_auto]`}>
            {plan.features.map((feature, featureIndex) => (
              <div key={featureIndex} className={`relative ${isDesktop ? 'w-full h-[30px]' : 'w-[183.43px] h-[34.61px] mr-[-2.00px]'} flex items-center`}>
                <img
                  className="w-[11px] h-[13px] mr-3 flex-shrink-0"
                  alt="Check"
                  src="https://c.animaapp.com/ZTuOwSBY/img/vector-24-3.svg"
                />
                <p className={`flex-1 [font-family:'Be_Vietnam',Helvetica] font-normal text-[#13243c] ${isDesktop ? 'text-sm' : 'text-base'} tracking-[0] leading-[19.5px]`}>
                  {feature}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="relative w-full" data-section="plans">
      <div className="relative w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-12 lg:py-16">
        {/* Header Section */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="[font-family:'Bricolage_Grotesque',Helvetica] font-medium text-[#13243c] text-3xl sm:text-4xl lg:text-5xl mb-6">
            Planes
          </h2>

          <p className="[font-family:'Be_Vietnam',Helvetica] font-normal text-[#13243c] text-lg sm:text-xl lg:text-2xl leading-relaxed max-w-2xl mx-auto">
            Nuestros planes te dan acceso a todos nuestros servicios
            <br />
            ¡Escogé el tuyo!
          </p>
        </div>

        {/* Plans Container */}
        <div className="relative">
          <div className="lg:hidden">
            <EmblaCarousel
              options={{
                align: 'center',
                containScroll: 'trimSnaps',
                slidesToScroll: 1
              }}
              showDots={true}
              showArrows={false}
              slideClassName="pl-3 pr-3"
              slideStyle={{
                flex: '0 0 auto'
              }}
            >
              {plans.map((plan) => (
                <PlanCard key={plan.id} plan={plan} />
              ))}
            </EmblaCarousel>
          </div>
          <div className="hidden lg:grid lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {plans.map((plan) => (
              <PlanCard key={plan.id} plan={plan} isDesktop={true} />
            ))}
          </div>
        </div>
      </div>

      {/* Modal de suscripción */}
      <SubscriptionModal
        isOpen={isOpen}
        onClose={closeModal}
        selectedPlan={selectedPlan}
      />
    </div>
  );
};

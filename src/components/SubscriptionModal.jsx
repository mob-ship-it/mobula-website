import React, { useState } from "react";
import { Button } from "./Button";
import { useFormState } from "../hooks/useFormState";
import { emailService, planService } from "../services/api";
import * as i18n from "../i18n/utils";
import blueMobula from '../assets/images/services/blue-mobula.png';

export const SubscriptionModal = ({ isOpen, onClose, selectedPlan, lang, showPlanSelector = false }) => {
  const safeLang = lang === 'en' ? 'en' : 'es';
  const t = i18n.useTranslations(safeLang);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [internalSelectedPlan, setInternalSelectedPlan] = useState(selectedPlan || null);
  const availablePlans = planService.getPlans(safeLang);
  const inputIds = {
    name: 'subscription-name',
    email: 'subscription-email',
    phone: 'subscription-phone',
    message: 'subscription-message'
  };
  
  const { formData, errors, isSubmitting, setIsSubmitting, updateField, validateForm, resetForm } = useFormState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const validationRules = {
    name: { required: true },
    email: { required: true, email: true },
    phone: { required: true, phone: true },
    message: { required: true }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm(validationRules)) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    const activePlan = showPlanSelector ? internalSelectedPlan : selectedPlan;
    
    if (showPlanSelector && !internalSelectedPlan) {
      setSubmitStatus({ type: 'error', message: t('form.selectPlan') || 'Por favor selecciona un plan' });
      setIsSubmitting(false);
      return;
    }
    try {
      const submitData = {
        ...formData,
        plan: activePlan?.id || 'unknown',
        planName: activePlan?.name || 'Unknown Plan'
      };

    await emailService.sendSubscriptionForm(submitData);
    setSubmitStatus({ type: 'success', message: t('form.success') });
      resetForm();
      
      setTimeout(() => {
        onClose();
        setSubmitStatus(null);
      }, 3000);
      
    } catch (error) {
      setSubmitStatus({ type: 'error', message: t('form.error') });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePhoneChange = (value) => {
    const digits = value.replace(/\D/g, '');
    
    if (digits.length <= 4) {
      updateField('phone', digits);
    } else {
      const formatted = `${digits.slice(0, 4)}-${digits.slice(4, 8)}`;
      updateField('phone', formatted);
    }
  };

  const handleClose = () => {
    resetForm();
    setSubmitStatus(null);
    setInternalSelectedPlan(selectedPlan || null);
    onClose();
  };

  const activePlan = showPlanSelector ? internalSelectedPlan : selectedPlan;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={handleClose}
      />

      <div className="relative bg-[#13243CE5] rounded-[32px] shadow-2xl max-h-[90vh] overflow-hidden mx-4 max-w-lg w-full">
        <img
          src={blueMobula.src}
          alt="Mobula"
          className="md:hidden absolute left-1/2 -translate-x-1/2 bottom-[-60px] w-48 h-48 object-contain pointer-events-none z-0"
        />

        <div className="flex items-center justify-between p-6 border-b border-white/20">
          <h2 id="subscription-modal-title" className="[font-family:'Bricolage_Grotesque',Helvetica] font-semibold text-white text-2xl">
            {activePlan ? activePlan.name : t('form.title')}
          </h2>
          <button
            onClick={handleClose}
            className="text-white/70 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6 pb-28 md:pb-6 overflow-y-auto max-h-[calc(90vh-120px)] relative z-10">
          <form onSubmit={handleSubmit} className="space-y-6" aria-labelledby="subscription-modal-title">
            {showPlanSelector && (
              <div className="flex flex-col items-start gap-3 relative w-full">
                <label htmlFor="plan-selector" className="[font-family:'Be_Vietnam',Helvetica] font-normal text-white text-base">
                  {safeLang === 'en' ? 'Select a Plan' : 'Selecciona un Plan'}
                </label>
                <select
                  id="plan-selector"
                  value={internalSelectedPlan?.id || ''}
                  onChange={(e) => {
                    const plan = availablePlans.find(p => p.id === e.target.value);
                    setInternalSelectedPlan(plan);
                    setSubmitStatus(null);
                  }}
                  className="flex h-[50px] items-center px-4 py-2.5 w-full bg-white rounded-xl border border-transparent focus:outline-none focus:ring-2 focus:ring-white/50 [font-family:'Be_Vietnam',Helvetica] text-base text-[#13243c] transition-all"
                >
                  <option value="">{safeLang === 'en' ? 'Choose a plan...' : 'Elegí un plan...'}</option>
                  {availablePlans.map(plan => (
                    <option key={plan.id} value={plan.id}>
                      {plan.name} - {typeof plan.price === 'number' ? `$${plan.price}` : plan.price}
                    </option>
                  ))}
                </select>
              </div>
            )}
            {activePlan && !showPlanSelector && (
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-4 rounded-xl mb-2">
                <p className="[font-family:'Be_Vietnam',Helvetica] text-white/90 text-base font-medium">
                  {typeof activePlan.price === 'number' 
                    ? `$${activePlan.price.toLocaleString()}${t('form.plan.perMonth')}` 
                    : activePlan.price
                  }
                </p>
                <p className="[font-family:'Be_Vietnam',Helvetica] text-white/70 text-sm mt-1">
                  {typeof activePlan.credits === 'number' 
                    ? `${activePlan.credits} ${t('form.plan.creditsIncluded')}` 
                    : activePlan.credits
                  }
                </p>
              </div>
            )}
            {activePlan && showPlanSelector && (
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-4 rounded-xl mb-2">
                <p className="[font-family:'Be_Vietnam',Helvetica] text-white/90 text-base font-medium">
                  {typeof activePlan.price === 'number' 
                    ? `$${activePlan.price.toLocaleString()}${t('form.plan.perMonth')}` 
                    : activePlan.price
                  }
                </p>
                <p className="[font-family:'Be_Vietnam',Helvetica] text-white/70 text-sm mt-1">
                  {typeof activePlan.credits === 'number' 
                    ? `${activePlan.credits} ${t('form.plan.creditsIncluded')}` 
                    : activePlan.credits
                  }
                </p>
              </div>
            )}

            <div className="space-y-6">
              <div className="flex flex-col items-start gap-3 relative w-full">
                <label htmlFor={inputIds.name} className="[font-family:'Be_Vietnam',Helvetica] font-normal text-white text-base">
                  Nombre
                </label>
                <div className="relative w-full">
                  <input
                    id={inputIds.name}
                    type="text"
                    value={formData.name}
                    onChange={(e) => updateField('name', e.target.value)}
                    placeholder="juan@correo.com"
                    aria-required="true"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'error-subscription-name' : undefined}
                    className={`flex h-[50px] items-center px-4 py-2.5 w-full bg-white rounded-xl border ${errors.name ? 'border-red-500' : 'border-transparent'} focus:outline-none focus:ring-2 focus:ring-white/50 [font-family:'Be_Vietnam',Helvetica] text-base text-[#13243c] placeholder:text-gray-400 transition-all`}
                  />
                  {errors.name && (
                    <div id="error-subscription-name" className="absolute -bottom-6 left-0 text-red-400 text-sm [font-family:'Be_Vietnam',Helvetica]">{errors.name}</div>
                  )}
                </div>
              </div>

              <div className="flex flex-col items-start gap-3 relative w-full">
                <label htmlFor={inputIds.email} className="[font-family:'Be_Vietnam',Helvetica] font-normal text-white text-base">
                  Email
                </label>
                <div className="relative w-full">
                  <input
                    id={inputIds.email}
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    placeholder="juan@correo.com"
                    aria-required="true"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'error-subscription-email' : undefined}
                    className={`flex h-[50px] items-center px-4 py-2.5 w-full bg-white rounded-xl border ${errors.email ? 'border-red-500' : 'border-transparent'} focus:outline-none focus:ring-2 focus:ring-white/50 [font-family:'Be_Vietnam',Helvetica] text-base text-[#13243c] placeholder:text-gray-400 transition-all`}
                  />
                  {errors.email && (
                    <div id="error-subscription-email" className="absolute -bottom-6 left-0 text-red-400 text-sm [font-family:'Be_Vietnam',Helvetica]">{errors.email}</div>
                  )}
                </div>
              </div>

              <div className="flex flex-col items-start gap-3 relative w-full">
                <label htmlFor={inputIds.phone} className="[font-family:'Be_Vietnam',Helvetica] font-normal text-white text-base">
                  Teléfono
                </label>
                <div className="relative w-full">
                  <input
                    id={inputIds.phone}
                    type="text"
                    value={formData.phone}
                    onChange={(e) => handlePhoneChange(e.target.value)}
                    placeholder="8888-8888"
                    aria-required="true"
                    aria-invalid={!!errors.phone}
                    aria-describedby={errors.phone ? 'error-subscription-phone' : undefined}
                    className={`flex h-[50px] items-center px-4 py-2.5 w-full bg-white rounded-xl border ${errors.phone ? 'border-red-500' : 'border-transparent'} focus:outline-none focus:ring-2 focus:ring-white/50 [font-family:'Be_Vietnam',Helvetica] text-base text-[#13243c] placeholder:text-gray-400 transition-all`}
                  />
                  {errors.phone && (
                    <div id="error-subscription-phone" className="absolute -bottom-6 left-0 text-red-400 text-sm [font-family:'Be_Vietnam',Helvetica]">{errors.phone}</div>
                  )}
                </div>
              </div>

              <div className="flex flex-col items-start gap-3 relative w-full">
                <label htmlFor={inputIds.message} className="[font-family:'Be_Vietnam',Helvetica] font-normal text-white text-base">
                  Mensaje
                </label>
                <div className="relative w-full">
                  <textarea
                    id={inputIds.message}
                    rows={4}
                    value={formData.message}
                    onChange={(e) => updateField('message', e.target.value)}
                    placeholder="Por favor indícanos cómo podemos ayudarteacomo podemos ayudarte"
                    aria-required="true"
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? 'error-subscription-message' : undefined}
                    className={`px-4 py-4 w-full bg-white rounded-xl border ${errors.message ? 'border-red-500' : 'border-transparent'} focus:outline-none focus:ring-2 focus:ring-white/50 [font-family:'Be_Vietnam',Helvetica] text-base text-[#13243c] placeholder:text-gray-400 transition-all resize-none`}
                  />
                  {errors.message && (
                    <div id="error-subscription-message" className="absolute -bottom-6 left-0 text-red-400 text-sm [font-family:'Be_Vietnam',Helvetica]">{errors.message}</div>
                  )}
                </div>
              </div>
            </div>

        {submitStatus && (
          <div className={`
            w-full p-4 rounded-lg text-center [font-family:'Be_Vietnam',Helvetica]
            ${submitStatus.type === 'success' 
              ? 'bg-green-500/20 text-green-200 border border-green-400/30' 
              : 'bg-red-500/20 text-red-200 border border-red-400/30'
            }
          `} role="status" aria-live="polite">
            {submitStatus.message}
          </div>
        )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-[50px] bg-[#211EE1] hover:bg-[#1a17b8] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold [font-family:'Bricolage_Grotesque',Helvetica] text-lg rounded-full transition-all mb-32 md:mb-0"
            >
              {isSubmitting ? t('form.sending') : 'Enviar'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

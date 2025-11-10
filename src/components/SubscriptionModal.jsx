import React, { useState } from "react";
import { Button } from "./Button";
import { useFormState } from "../hooks/useFormState";
import { emailService } from "../services/api";
import * as i18n from "../i18n/utils";

export const SubscriptionModal = ({ isOpen, onClose, selectedPlan, lang }) => {
  const safeLang = lang === 'en' ? 'en' : 'es';
  const t = i18n.useTranslations(safeLang);
  const [submitStatus, setSubmitStatus] = useState(null);
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

    try {
      const submitData = {
        ...formData,
        plan: selectedPlan?.id || 'unknown',
        planName: selectedPlan?.name || 'Unknown Plan'
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
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={handleClose}
      />

      <div className="relative bg-white rounded-2xl shadow-lg max-h-[90vh] overflow-hidden mx-4 max-w-lg w-full">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 id="subscription-modal-title" className="[font-family:'Bricolage_Grotesque',Helvetica] font-medium text-[#13243c] text-2xl">
            {selectedPlan ? `${t('form.subscribeTo')} ${selectedPlan.name}` : t('form.title')}
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <form onSubmit={handleSubmit} className="space-y-6" aria-labelledby="subscription-modal-title">
        {selectedPlan && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="[font-family:'Bricolage_Grotesque',Helvetica] font-medium text-[#13243c] text-lg mb-2">
              {selectedPlan.name}
            </h3>
            <p className="[font-family:'Be_Vietnam',Helvetica] text-[#13243c] text-lg font-medium">
              {typeof selectedPlan.price === 'number' 
                ? `$${selectedPlan.price.toLocaleString()}${t('form.plan.perMonth')}` 
                : selectedPlan.price
              }
            </p>
            <p className="[font-family:'Be_Vietnam',Helvetica] text-[#13243c] text-sm">
              {typeof selectedPlan.credits === 'number' 
                ? `${selectedPlan.credits} ${t('form.plan.creditsIncluded')}` 
                : selectedPlan.credits
              }
            </p>
          </div>
        )}

            <div className="space-y-6">
              <div className="flex flex-col items-start gap-5 relative w-full">
                <label htmlFor={inputIds.name} className="[font-family:'Be_Vietnam',Helvetica] font-normal text-[#13243c] text-2xl leading-[29.3px]">
                  {t('form.fullname')} <span className="text-red-500">*</span>
                </label>
                <div className="relative w-full">
                  <input
                    id={inputIds.name}
                    type="text"
                    value={formData.name}
                    onChange={(e) => updateField('name', e.target.value)}
                    placeholder={t('form.placeholder.fullname')}
                    aria-required="true"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'error-subscription-name' : undefined}
                    className={`flex h-[60px] items-center pl-[30px] pr-2.5 py-2.5 w-full bg-white rounded-xl border ${errors.name ? 'border-red-500' : 'border-[#13243cb5]'} focus:outline-none focus:ring-2 focus:ring-[#211ee1] focus:border-[#211ee1] [font-family:'Be_Vietnam',Helvetica] text-xl text-[#13243c] placeholder:text-[#13243cb5] transition-all`}
                  />
                  {errors.name && (
                    <div id="error-subscription-name" className="absolute -bottom-6 left-0 text-red-500 text-sm [font-family:'Be_Vietnam',Helvetica]">{errors.name}</div>
                  )}
                </div>
              </div>

              <div className="flex flex-col items-start gap-5 relative w-full">
                <label htmlFor={inputIds.email} className="[font-family:'Be_Vietnam',Helvetica] font-normal text-[#13243c] text-2xl leading-[29.3px]">
                  {t('form.email')} <span className="text-red-500">*</span>
                </label>
                <div className="relative w-full">
                  <input
                    id={inputIds.email}
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    placeholder={t('form.placeholder.email')}
                    aria-required="true"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'error-subscription-email' : undefined}
                    className={`flex h-[60px] items-center pl-[30px] pr-2.5 py-2.5 w-full bg-white rounded-xl border ${errors.email ? 'border-red-500' : 'border-[#13243cb5]'} focus:outline-none focus:ring-2 focus:ring-[#211ee1] focus:border-[#211ee1] [font-family:'Be_Vietnam',Helvetica] text-xl text-[#13243c] placeholder:text-[#13243cb5] transition-all`}
                  />
                  {errors.email && (
                    <div id="error-subscription-email" className="absolute -bottom-6 left-0 text-red-500 text-sm [font-family:'Be_Vietnam',Helvetica]">{errors.email}</div>
                  )}
                </div>
              </div>

              <div className="flex flex-col items-start gap-5 relative w-full">
                <label htmlFor={inputIds.phone} className="[font-family:'Be_Vietnam',Helvetica] font-normal text-[#13243c] text-2xl leading-[29.3px]">
                  {t('form.phone')} <span className="text-red-500">*</span>
                </label>
                <div className="relative w-full">
                  <input
                    id={inputIds.phone}
                    type="text"
                    value={formData.phone}
                    onChange={(e) => handlePhoneChange(e.target.value)}
                    placeholder={t('form.placeholder.phone')}
                    aria-required="true"
                    aria-invalid={!!errors.phone}
                    aria-describedby={errors.phone ? 'error-subscription-phone' : undefined}
                    className={`flex h-[60px] items-center pl-[30px] pr-2.5 py-2.5 w-full bg-white rounded-xl border ${errors.phone ? 'border-red-500' : 'border-[#13243cb5]'} focus:outline-none focus:ring-2 focus:ring-[#211ee1] focus:border-[#211ee1] [font-family:'Be_Vietnam',Helvetica] text-xl text-[#13243c] placeholder:text-[#13243cb5] transition-all`}
                  />
                  {errors.phone && (
                    <div id="error-subscription-phone" className="absolute -bottom-6 left-0 text-red-500 text-sm [font-family:'Be_Vietnam',Helvetica]">{errors.phone}</div>
                  )}
                </div>
              </div>

              <div className="flex flex-col items-start gap-5 relative w-full">
                <label htmlFor={inputIds.message} className="[font-family:'Be_Vietnam',Helvetica] font-normal text-[#13243c] text-2xl leading-[29.3px]">
                  {t('form.message')} <span className="text-red-500">*</span>
                </label>
                <div className="relative w-full">
                  <textarea
                    id={inputIds.message}
                    rows={4}
                    value={formData.message}
                    onChange={(e) => updateField('message', e.target.value)}
                    placeholder={t('form.placeholder.message')}
                    aria-required="true"
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? 'error-subscription-message' : undefined}
                    className={`pl-[30px] pr-2.5 pt-[30px] pb-2.5 w-full bg-white rounded-[20px] border ${errors.message ? 'border-red-500' : 'border-[#13243cb5]'} focus:outline-none focus:ring-2 focus:ring-[#211ee1] focus:border-[#211ee1] [font-family:'Be_Vietnam',Helvetica] text-xl text-[#13243c] placeholder:text-[#13243cb5] transition-all resize-none`}
                  />
                  {errors.message && (
                    <div id="error-subscription-message" className="absolute -bottom-6 left-0 text-red-500 text-sm [font-family:'Be_Vietnam',Helvetica]">{errors.message}</div>
                  )}
                </div>
              </div>
            </div>

        {submitStatus && (
          <div className={`
            w-full p-4 rounded-lg text-center [font-family:'Be_Vietnam',Helvetica]
            ${submitStatus.type === 'success' 
              ? 'bg-green-100 text-green-800 border border-green-300' 
              : 'bg-red-100 text-red-800 border border-red-300'
            }
          `} role="status" aria-live="polite">
            {submitStatus.message}
          </div>
        )}

            <div className="flex gap-3 justify-end pt-4">
              <Button
                variant="ghost"
                onClick={handleClose}
                disabled={isSubmitting}
              >
                {t('form.cancel')}
              </Button>
              <Button
                type="submit"
                variant="primary"
                loading={isSubmitting}
              >
                {isSubmitting ? t('form.sending') : t('form.sendRequest')}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

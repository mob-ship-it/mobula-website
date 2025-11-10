import React, { useState } from "react";
import { useFormState } from "../hooks/useFormState";
import { emailService } from "../services/api";
import * as i18n from "../i18n/utils";

export const SubscriptionSection = ({ lang }) => {
  const safeLang = lang === 'en' ? 'en' : 'es';
  const t = i18n.useTranslations(safeLang);
  const [submitStatus, setSubmitStatus] = useState(null);
  
  const { formData, errors, isSubmitting, setIsSubmitting, updateField, validateForm, resetForm } = useFormState({
    name: '',
    email: '',
    phone: '',
    plan: '',
    message: ''
  });

  const validationRules = {
    name: { required: true },
    email: { required: true, email: true },
    phone: { required: true, phone: true },
    plan: { required: false },
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
  const result = await emailService.sendSubscriptionForm(formData);
  setSubmitStatus({ type: 'success', message: t('form.success') });
      resetForm();
      
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
      
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

  return (
    <section className="bg-[#faf1ea] py-16 md:py-20 lg:py-24">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        <div className="bg-[#faf1ea] rounded-3xl p-8 md:p-10">
          <h3
            id="subscription-form-title"
            className="[font-family:'Bricolage_Grotesque',Helvetica] font-semibold text-[#13243c] text-2xl md:text-3xl mb-8 text-center lg:text-left"
          >
            {t('form.title')}
          </h3>

          <form
            onSubmit={handleSubmit}
            className="space-y-6 lg:space-y-8"
            aria-labelledby="subscription-form-title"
            noValidate
          >
            <div className="grid gap-6 lg:gap-8 lg:grid-cols-2">
              <div className="space-y-2">
                <label
                  htmlFor="subscription-name"
                  className="[font-family:'Be_Vietnam',Helvetica] font-normal text-[#13243c] text-base block"
                >
                  {t('form.name')}
                </label>
                <input
                  id="subscription-name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  placeholder={t('form.placeholder.name')}
                  required
                  aria-required="true"
                  aria-invalid={errors.name ? 'true' : 'false'}
                  aria-describedby={errors.name ? 'subscription-name-error' : undefined}
                  className={`
                    w-full h-[52px] px-5 bg-white rounded-xl border-2 border-solid 
                    ${errors.name ? 'border-red-500' : 'border-[#13243c]/30'}
                    focus:outline-none focus:ring-2 focus:ring-[#211ee1] focus:border-[#211ee1]
                    [font-family:'Be_Vietnam',Helvetica] font-normal text-base text-[#13243c]
                    placeholder:text-[#13243c]/50 transition-all duration-200
                  `}
                />
                {errors.name && (
                  <p
                    id="subscription-name-error"
                    className="text-red-500 text-sm [font-family:'Be_Vietnam',Helvetica]"
                    role="alert"
                  >
                    {errors.name}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="subscription-email"
                  className="[font-family:'Be_Vietnam',Helvetica] font-normal text-[#13243c] text-base block"
                >
                  {t('form.email')}
                </label>
                <input
                  id="subscription-email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  placeholder={t('form.placeholder.email')}
                  required
                  aria-required="true"
                  aria-invalid={errors.email ? 'true' : 'false'}
                  aria-describedby={errors.email ? 'subscription-email-error' : undefined}
                  className={`
                    w-full h-[52px] px-5 bg-white rounded-xl border-2 border-solid 
                    ${errors.email ? 'border-red-500' : 'border-[#13243c]/30'}
                    focus:outline-none focus:ring-2 focus:ring-[#211ee1] focus:border-[#211ee1]
                    [font-family:'Be_Vietnam',Helvetica] font-normal text-base text-[#13243c]
                    placeholder:text-[#13243c]/50 transition-all duration-200
                  `}
                />
                {errors.email && (
                  <p
                    id="subscription-email-error"
                    className="text-red-500 text-sm [font-family:'Be_Vietnam',Helvetica]"
                    role="alert"
                  >
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="subscription-message"
                  className="[font-family:'Be_Vietnam',Helvetica] font-normal text-[#13243c] text-base block"
                >
                  {t('form.message')}
                </label>
                <textarea
                  id="subscription-message"
                  value={formData.message}
                  onChange={(e) => updateField('message', e.target.value)}
                  placeholder={t('form.placeholder.message')}
                  rows={4}
                  required
                  aria-required="true"
                  aria-invalid={errors.message ? 'true' : 'false'}
                  aria-describedby={errors.message ? 'subscription-message-error' : undefined}
                  className={`
                    w-full px-5 py-4 bg-white rounded-xl border-2 border-solid 
                    ${errors.message ? 'border-red-500' : 'border-[#13243c]/30'}
                    focus:outline-none focus:ring-2 focus:ring-[#211ee1] focus:border-[#211ee1]
                    [font-family:'Be_Vietnam',Helvetica] font-normal text-base text-[#13243c]
                    placeholder:text-[#13243c]/50 transition-all duration-200 resize-none
                  `}
                />
                {errors.message && (
                  <p
                    id="subscription-message-error"
                    className="text-red-500 text-sm [font-family:'Be_Vietnam',Helvetica]"
                    role="alert"
                  >
                    {errors.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-4">
                <div className="space-y-2">
                  <label
                    htmlFor="subscription-phone"
                    className="[font-family:'Be_Vietnam',Helvetica] font-normal text-[#13243c] text-base block"
                  >
                    {t('form.phone')}
                  </label>
                  <div className="flex flex-col">
                    <input
                      id="subscription-phone"
                      type="text"
                      value={formData.phone}
                      onChange={(e) => handlePhoneChange(e.target.value)}
                      placeholder={t('form.placeholder.phone')}
                      required
                      aria-required="true"
                      aria-invalid={errors.phone ? 'true' : 'false'}
                      aria-describedby={errors.phone ? 'subscription-phone-error' : undefined}
                      className={`
                        w-full h-[52px] px-5 bg-white rounded-xl border-2 border-solid 
                        ${errors.phone ? 'border-red-500' : 'border-[#13243c]/30'}
                        focus:outline-none focus:ring-2 focus:ring-[#211ee1] focus:border-[#211ee1]
                        [font-family:'Be_Vietnam',Helvetica] font-normal text-base text-[#13243c]
                        placeholder:text-[#13243c]/50 transition-all duration-200
                      `}
                    />
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`
                        hidden lg:flex mt-3 h-[58px] px-10 bg-[#211ee1] hover:bg-[#1a18c4] active:bg-[#151199]
                        text-white rounded-full font-semibold text-xl [font-family:'Be_Vietnam',Helvetica]
                        transition-all duration-200 shadow-lg hover:shadow-xl items-center justify-center gap-2 w-fit
                        ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}
                      `}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          {t('form.sending')}
                        </>
                      ) : (
                        t('form.send')
                      )}
                    </button>
                  </div>
                  {errors.phone && (
                    <p
                      id="subscription-phone-error"
                      className="text-red-500 text-sm [font-family:'Be_Vietnam',Helvetica]"
                      role="alert"
                    >
                      {errors.phone}
                    </p>
                  )}
                </div>
                <div className="space-y-2 lg:hidden">
                  <label
                    htmlFor="subscription-plan"
                    className="[font-family:'Be_Vietnam',Helvetica] font-normal text-[#13243c] text-base block"
                  >
                    {t('form.plan')}
                  </label>
                  <div className="relative">
                    <select
                      id="subscription-plan"
                      value={formData.plan}
                      onChange={(e) => updateField('plan', e.target.value)}
                      aria-required="false"
                      aria-invalid={errors.plan ? 'true' : 'false'}
                      aria-describedby={errors.plan ? 'subscription-plan-error' : undefined}
                      className={`
                        w-full h-[52px] px-5 bg-white rounded-xl border-2 border-solid 
                        ${errors.plan ? 'border-red-500' : 'border-[#13243c]/30'}
                        focus:outline-none focus:ring-2 focus:ring-[#211ee1] focus:border-[#211ee1]
                        [font-family:'Be_Vietnam',Helvetica] font-normal text-base text-[#13243c]
                        appearance-none cursor-pointer transition-all duration-200
                        ${!formData.plan ? 'text-[#13243c]/50' : 'text-[#13243c]'}
                      `}
                    >
                      <option value="">{t('form.select')}</option>
                      <option value="starter">Plan Starter</option>
                      <option value="growth">Plan Growth</option>
                      <option value="pro">Plan Pro</option>
                      <option value="enterprise">Plan Enterprise</option>
                      <option value="otro">{t('form.other')}</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                      <svg className="w-5 h-5 text-[#13243c]/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                  {errors.plan && (
                    <p
                      id="subscription-plan-error"
                      className="text-red-500 text-sm [font-family:'Be_Vietnam',Helvetica]"
                      role="alert"
                    >
                      {errors.plan}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Submit Status */}
            {submitStatus && (
              <div
                role="status"
                aria-live="polite"
                className={`
                  w-full p-4 rounded-xl text-center [font-family:'Be_Vietnam',Helvetica] text-sm
                  ${submitStatus.type === 'success' 
                    ? 'bg-green-100 text-green-800 border-2 border-green-300' 
                    : 'bg-red-100 text-red-800 border-2 border-red-300'
                  }
                `}
              >
                {submitStatus.message}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className={`
                lg:hidden w-full h-[56px] bg-[#211ee1] hover:bg-[#1a18c4] active:bg-[#151199]
                text-white rounded-full font-semibold text-lg
                [font-family:'Be_Vietnam',Helvetica]
                transition-all duration-200 shadow-lg hover:shadow-xl
                flex items-center justify-center gap-2
                ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}
              `}
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  {t('form.sending')}
                </>
              ) : (
                t('form.send')
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SubscriptionSection;

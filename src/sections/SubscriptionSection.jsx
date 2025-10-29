import React, { useState } from "react";
import { useFormState } from "../hooks/useFormState";
import { emailService } from "../services/api";

export const SubscriptionSection = () => {
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
      setSubmitStatus({ type: 'success', message: '¡Gracias! Te contactaremos pronto.' });
      resetForm();
      
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
      
    } catch (error) {
      setSubmitStatus({ type: 'error', message: 'Hubo un error. Por favor intenta nuevamente.' });
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
          <h3 className="[font-family:'Bricolage_Grotesque',Helvetica] font-semibold text-[#13243c] text-2xl md:text-3xl mb-8 text-center lg:text-left">
            Suscribirse
          </h3>

          <form onSubmit={handleSubmit} className="space-y-6 lg:space-y-8">
            <div className="grid gap-6 lg:gap-8 lg:grid-cols-2">
              <div className="space-y-2">
              <label className="[font-family:'Be_Vietnam',Helvetica] font-normal text-[#13243c] text-base block">
                Nombre
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => updateField('name', e.target.value)}
                placeholder="Juan Jose"
                className={`
                  w-full h-[52px] px-5 bg-white rounded-xl border-2 border-solid 
                  ${errors.name ? 'border-red-500' : 'border-[#13243c]/30'}
                  focus:outline-none focus:ring-2 focus:ring-[#211ee1] focus:border-[#211ee1]
                  [font-family:'Be_Vietnam',Helvetica] font-normal text-base text-[#13243c]
                  placeholder:text-[#13243c]/50 transition-all duration-200
                `}
              />
              {errors.name && (
                <p className="text-red-500 text-sm [font-family:'Be_Vietnam',Helvetica]">{errors.name}</p>
              )}
              </div>

              <div className="space-y-2">
              <label className="[font-family:'Be_Vietnam',Helvetica] font-normal text-[#13243c] text-base block">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => updateField('email', e.target.value)}
                placeholder="Juan@correo.com"
                className={`
                  w-full h-[52px] px-5 bg-white rounded-xl border-2 border-solid 
                  ${errors.email ? 'border-red-500' : 'border-[#13243c]/30'}
                  focus:outline-none focus:ring-2 focus:ring-[#211ee1] focus:border-[#211ee1]
                  [font-family:'Be_Vietnam',Helvetica] font-normal text-base text-[#13243c]
                  placeholder:text-[#13243c]/50 transition-all duration-200
                `}
              />
              {errors.email && (
                <p className="text-red-500 text-sm [font-family:'Be_Vietnam',Helvetica]">{errors.email}</p>
              )}
              </div>

              <div className="space-y-2">
              <label className="[font-family:'Be_Vietnam',Helvetica] font-normal text-[#13243c] text-base block">
                Mensaje
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => updateField('message', e.target.value)}
                placeholder="Por favor indícanos cómo podemos ayudarte"
                rows={4}
                className={`
                  w-full px-5 py-4 bg-white rounded-xl border-2 border-solid 
                  ${errors.message ? 'border-red-500' : 'border-[#13243c]/30'}
                  focus:outline-none focus:ring-2 focus:ring-[#211ee1] focus:border-[#211ee1]
                  [font-family:'Be_Vietnam',Helvetica] font-normal text-base text-[#13243c]
                  placeholder:text-[#13243c]/50 transition-all duration-200 resize-none
                `}
              />
              {errors.message && (
                <p className="text-red-500 text-sm [font-family:'Be_Vietnam',Helvetica]">{errors.message}</p>
              )}
              </div>
              <div className="flex flex-col gap-4">
                <div className="space-y-2">
                  <label className="[font-family:'Be_Vietnam',Helvetica] font-normal text-[#13243c] text-base block">
                    Teléfono
                  </label>
                  <div className="flex flex-col">
                    <input
                      type="text"
                      value={formData.phone}
                      onChange={(e) => handlePhoneChange(e.target.value)}
                      placeholder="8888-8888"
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
                          Enviando...
                        </>
                      ) : (
                        'Enviar'
                      )}
                    </button>
                  </div>
                  {errors.phone && (
                    <p className="text-red-500 text-sm [font-family:'Be_Vietnam',Helvetica]">{errors.phone}</p>
                  )}
                </div>
                <div className="space-y-2 lg:hidden">
                  <label className="[font-family:'Be_Vietnam',Helvetica] font-normal text-[#13243c] text-base block">
                    Plan Mensual
                  </label>
                  <div className="relative">
                    <select
                      value={formData.plan}
                      onChange={(e) => updateField('plan', e.target.value)}
                      className={`
                        w-full h-[52px] px-5 bg-white rounded-xl border-2 border-solid 
                        ${errors.plan ? 'border-red-500' : 'border-[#13243c]/30'}
                        focus:outline-none focus:ring-2 focus:ring-[#211ee1] focus:border-[#211ee1]
                        [font-family:'Be_Vietnam',Helvetica] font-normal text-base text-[#13243c]
                        appearance-none cursor-pointer transition-all duration-200
                        ${!formData.plan ? 'text-[#13243c]/50' : 'text-[#13243c]'}
                      `}
                    >
                      <option value="">Seleccionar</option>
                      <option value="starter">Plan Starter</option>
                      <option value="growth">Plan Growth</option>
                      <option value="pro">Plan Pro</option>
                      <option value="enterprise">Plan Enterprise</option>
                      <option value="otro">Otro</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                      <svg className="w-5 h-5 text-[#13243c]/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                  {errors.plan && (
                    <p className="text-red-500 text-sm [font-family:'Be_Vietnam',Helvetica]">{errors.plan}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Submit Status */}
            {submitStatus && (
              <div className={`
                w-full p-4 rounded-xl text-center [font-family:'Be_Vietnam',Helvetica] text-sm
                ${submitStatus.type === 'success' 
                  ? 'bg-green-100 text-green-800 border-2 border-green-300' 
                  : 'bg-red-100 text-red-800 border-2 border-red-300'
                }
              `}>
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
                  Enviando...
                </>
              ) : (
                'Enviar'
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SubscriptionSection;

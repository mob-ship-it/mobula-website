import React, { useState } from "react";
import { Modal } from "./Modal";
import { Button } from "./Button";
import { Input } from "./Input";
import { TextArea } from "./TextArea";
import { useFormState } from "../hooks/useFormState";
import { emailService } from "../services/api";

export const SubscriptionModal = ({ isOpen, onClose, selectedPlan }) => {
  const [submitStatus, setSubmitStatus] = useState(null);
  
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
        planName: selectedPlan?.name || 'Plan desconocido'
      };

      const result = await emailService.sendSubscriptionForm(submitData);
      setSubmitStatus({ type: 'success', message: result.message });
      resetForm();
      
      setTimeout(() => {
        onClose();
        setSubmitStatus(null);
      }, 3000);
      
    } catch (error) {
      setSubmitStatus({ type: 'error', message: error.message });
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

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={selectedPlan ? `Suscribirse a ${selectedPlan.name}` : 'Suscribirse'}
      size="default"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {selectedPlan && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="[font-family:'Bricolage_Grotesque',Helvetica] font-medium text-[#13243c] text-lg mb-2">
              {selectedPlan.name}
            </h3>
            <p className="[font-family:'Be_Vietnam',Helvetica] text-[#13243c] text-lg font-medium">
              {typeof selectedPlan.price === 'number' 
                ? `$${selectedPlan.price.toLocaleString()} / mes` 
                : selectedPlan.price
              }
            </p>
            <p className="[font-family:'Be_Vietnam',Helvetica] text-[#13243c] text-sm">
              {typeof selectedPlan.credits === 'number' 
                ? `${selectedPlan.credits} créditos incluidos` 
                : selectedPlan.credits
              }
            </p>
          </div>
        )}

        <div className="space-y-6">
          <Input
            label="Nombre completo"
            value={formData.name}
            onChange={(value) => updateField('name', value)}
            placeholder="Tu nombre"
            error={errors.name}
            required
          />

          <Input
            label="Email"
            type="email"
            value={formData.email}
            onChange={(value) => updateField('email', value)}
            placeholder="tu@correo.com"
            error={errors.email}
            required
          />

          <Input
            label="Teléfono"
            value={formData.phone}
            onChange={handlePhoneChange}
            placeholder="8888-8888"
            error={errors.phone}
            required
          />

          <TextArea
            label="Mensaje"
            value={formData.message}
            onChange={(value) => updateField('message', value)}
            placeholder="Cuéntanos sobre tu proyecto y cómo podemos ayudarte"
            error={errors.message}
            required
            rows={4}
          />
        </div>

        {submitStatus && (
          <div className={`
            w-full p-4 rounded-lg text-center [font-family:'Be_Vietnam',Helvetica]
            ${submitStatus.type === 'success' 
              ? 'bg-green-100 text-green-800 border border-green-300' 
              : 'bg-red-100 text-red-800 border border-red-300'
            }
          `}>
            {submitStatus.message}
          </div>
        )}

        <div className="flex gap-3 justify-end pt-4">
          <Button
            variant="ghost"
            onClick={handleClose}
            disabled={isSubmitting}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="primary"
            loading={isSubmitting}
          >
            {isSubmitting ? 'Enviando...' : 'Enviar solicitud'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

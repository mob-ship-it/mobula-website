const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const emailService = {
  async sendContactForm(data) {
    await delay(2000); 
    

    console.log('Formulario de contacto enviado:', data);
    

    if (Math.random() > 0.1) {
      return {
        success: true,
        message: 'Tu mensaje ha sido enviado exitosamente. Te contactaremos pronto.'
      };
    } else {
      throw new Error('Error al enviar el mensaje. Por favor intenta nuevamente.');
    }
  },

  async sendSubscriptionForm(data) {
    await delay(1500);
    
    console.log('Formulario de suscripción enviado:', data);
    
    if (Math.random() > 0.1) {
      return {
        success: true,
        message: 'Tu suscripción ha sido procesada exitosamente. Te contactaremos para coordinar los próximos pasos.'
      };
    } else {
      throw new Error('Error al procesar la suscripción. Por favor intenta nuevamente.');
    }
  },

  async scheduleCall(email) {
    await delay(1000);
    
    console.log('Llamada agendada para:', email);
    
    if (Math.random() > 0.1) {
      return {
        success: true,
        message: 'Te hemos enviado un enlace para agendar tu llamada.',
        calendlyLink: 'https://calendly.com/mobula-studio/consultation' // Example
      };
    } else {
      throw new Error('Error al agendar la llamada. Por favor intenta nuevamente.');
    }
  }
};


export const planService = {
  getPlans(lang = 'es') {
    const isEn = lang === 'en';
    if (isEn) {
      return [
        {
          id: 'basic',
          name: 'Basic Plan',
          price: 500,
          credits: 15,
          features: [
            'Access to all services',
            'Assigned Project Manager'
          ]
        },
        {
          id: 'essential',
          name: 'Essential Plan',
          price: 700,
          credits: 25,
          features: [
            'Access to all services',
            'Assigned Project Manager'
          ]
        },
        {
          id: 'starter',
          name: 'Starter Plan',
          price: 1300,
          credits: 25,
          features: [
            'Access to all services',
            'Assigned Project Manager'
          ]
        },
        {
          id: 'growth',
          name: 'Growth Plan',
          price: 2200,
          credits: 15,
          features: [
            'Access to all services',
            'Assigned Project Manager'
          ]
        },
        {
          id: 'enterprise',
          name: 'Enterprise Plan',
          price: 'Custom',
          credits: 'Unlimited',
          features: [
            'Access to all services',
            'Assigned Project Manager'
          ]
        },
        {
          id: 'social',
          name: 'Social Impact',
          price: 'Free',
          credits: 'Limited',
          features: [
            'Access to all services',
            'Assigned Project Manager'
          ]
        }
      ];
    }
    
    // Spanish (default)
    return [
      {
        id: 'basic',
        name: 'Plan Basic',
        price: 500,
        credits: 15,
        features: [
          'Acceso a todos los servicios',
          'Project Manager asignado'
        ]
      },
      {
        id: 'essential',
        name: 'Plan Esencial',
        price: 700,
        credits: 25,
        features: [
          'Acceso a todos los servicios',
          'Project Manager asignado'
        ]
      },
      {
        id: 'starter',
        name: 'Plan Starter',
        price: 1300,
        credits: 25,
        features: [
          'Acceso a todos los servicios',
          'Project Manager asignado'
        ]
      },
      {
        id: 'growth',
        name: 'Plan Growth',
        price: 2200,
        credits: 15,
        features: [
          'Acceso a todos los servicios',
          'Project Manager asignado'
        ]
      },
      {
        id: 'enterprise',
        name: 'Plan Enterprise',
        price: 'Personalizado',
        credits: 'Ilimitados',
        features: [
          'Acceso a todos los servicios',
          'Project Manager asignado'
        ]
      },
      {
        id: 'social',
        name: 'Impacto Social',
        price: 'Gratuito',
        credits: 'Limitados',
        features: [
          'Acceso a todos los servicios',
          'Project Manager asignado'
        ]
      }
    ];
  }
};

import React, { useState } from 'react';
import { useFormState } from '../hooks/useFormState';
import { emailService } from '../services/api';
import * as i18n from '../i18n/utils';

const PROJECT_GOAL_OPTIONS = [
  { id: 'darAConocer', es: 'Dar a conocer el negocio', en: 'Make the business known' },
  { id: 'masConsultas', es: 'Generar más consultas', en: 'Generate more inquiries' },
  { id: 'aumentarVentas', es: 'Aumentar ventas', en: 'Increase sales' },
  { id: 'aumentarReservas', es: 'Aumentar reservas o citas', en: 'Increase reservations or appointments' },
  { id: 'mejorarImagen', es: 'Mejorar la imagen de marca', en: 'Improve brand image' },
  { id: 'promocionarProducto', es: 'Promocionar un producto o servicio específico', en: 'Promote a specific product or service' },
];

const AUDIENCE_INTERESTS_OPTIONS = [
  { id: 'precio', es: 'Precio', en: 'Price' },
  { id: 'calidad', es: 'Calidad', en: 'Quality' },
  { id: 'confianza', es: 'Confianza', en: 'Trust' },
  { id: 'cercania', es: 'Cercanía', en: 'Closeness' },
  { id: 'rapidez', es: 'Rapidez', en: 'Speed' },
  { id: 'experiencia', es: 'Experiencia', en: 'Experience' },
  { id: 'facilidadPago', es: 'Facilidad de pago', en: 'Ease of payment' },
  { id: 'ubicacion', es: 'Ubicación', en: 'Location' },
];

const AVAILABLE_MATERIALS_OPTIONS = [
  { id: 'logo', es: 'Logo', en: 'Logo' },
  { id: 'fotos', es: 'Fotos', en: 'Photos' },
  { id: 'videos', es: 'Videos', en: 'Videos' },
  { id: 'menu', es: 'Menú / catálogo / precios', en: 'Menu / catalog / prices' },
  { id: 'artesAnteriores', es: 'Artes anteriores', en: 'Previous arts' },
  { id: 'website', es: 'Website', en: 'Website' },
  { id: 'manualMarca', es: 'Manual de marca', en: 'Brand manual' },
  { id: 'nadaTodavia', es: 'Nada todavía', en: 'Nothing yet' },
];

const VISUAL_STYLE_ACTION_OPTIONS = [
  { id: 'mantenerlo', es: 'Mantenerlo', en: 'Keep it' },
  { id: 'mejorarlo', es: 'Mejorarlo', en: 'Improve it' },
  { id: 'cambiarlo', es: 'Cambiarlo', en: 'Change it' },
  { id: 'noDefinido', es: 'No tengo estilo definido', en: 'I don\'t have a defined style' },
];

const TONE_OF_VOICE_OPTIONS = [
  { id: 'cercana', es: 'Cercana', en: 'Close' },
  { id: 'profesional', es: 'Profesional', en: 'Professional' },
  { id: 'divertida', es: 'Divertida', en: 'Fun' },
  { id: 'directa', es: 'Directa', en: 'Direct' },
  { id: 'educativa', es: 'Educativa', en: 'Educational' },
  { id: 'promocional', es: 'Promocional', en: 'Promotional' },
  { id: 'elegante', es: 'Elegante', en: 'Elegant' },
  { id: 'simple', es: 'Simple', en: 'Simple' },
];

const PRONOUN_OPTIONS = [
  { id: 'vos', es: 'Vos', en: 'Vos' },
  { id: 'tu', es: 'Tú', en: 'Tú' },
  { id: 'usted', es: 'Usted', en: 'Usted' },
  { id: 'noSeguro', es: 'No estoy seguro/a', en: 'Not sure' },
];

const NEEDS_TO_DEVELOP_OPTIONS = [
  { id: 'estrategia', es: 'Estrategia / plan de contenido', en: 'Strategy / content plan' },
  { id: 'concepto', es: 'Concepto creativo para campaña', en: 'Creative concept for campaign' },
  { id: 'disenoRedes', es: 'Diseño para redes sociales', en: 'Social media design' },
  { id: 'copies', es: 'Copies para redes o anuncios', en: 'Copies for social or ads' },
  { id: 'animacion', es: 'Animación / motion graphics', en: 'Animation / motion graphics' },
  { id: 'edicionVideo', es: 'Edición de video', en: 'Video editing' },
  { id: 'reels', es: 'Reels o videos cortos', en: 'Reels or short videos' },
  { id: 'banners', es: 'Banners digitales', en: 'Digital banners' },
  { id: 'adaptacion', es: 'Adaptación de piezas existentes', en: 'Adaptation of existing pieces' },
];

const CHANNELS_OPTIONS = [
  { id: 'instagram', es: 'Instagram', en: 'Instagram' },
  { id: 'facebook', es: 'Facebook', en: 'Facebook' },
  { id: 'linkedin', es: 'LinkedIn', en: 'LinkedIn' },
  { id: 'tiktok', es: 'TikTok', en: 'TikTok' },
  { id: 'youtube', es: 'YouTube', en: 'YouTube' },
  { id: 'googleAds', es: 'Google Ads', en: 'Google Ads' },
  { id: 'website', es: 'Website', en: 'Website' },
  { id: 'email', es: 'Email', en: 'Email' },
];

const FORMATS_OPTIONS = [
  { id: 'post', es: 'Post', en: 'Post' },
  { id: 'story', es: 'Story', en: 'Story' },
  { id: 'reel', es: 'Reel', en: 'Reel' },
  { id: 'carrusel', es: 'Carrusel', en: 'Carousel' },
  { id: 'banner', es: 'Banner', en: 'Banner' },
  { id: 'video', es: 'Video', en: 'Video' },
  { id: 'animacion', es: 'Animación', en: 'Animation' },
];

export const BriefContentForm = ({ lang }) => {
  const safeLang = lang === 'en' ? 'en' : 'es';
  const t = i18n.useTranslations(safeLang);
  const [submitStatus, setSubmitStatus] = useState(null);

  const { formData, errors, isSubmitting, setIsSubmitting, updateField, validateForm, resetForm } = useFormState({
    companyName: '',
    contactName: '',
    email: '',
    socialMedia: '',
    website: '',
    location: '',
    whatYouSell: '',
    mainProduct: '',
    whyChooseYou: '',
    projectGoal: [],
    projectGoalOther: '',
    targetAudience: '',
    audienceInterests: [],
    audienceInterestsOther: '',
    availableMaterials: [],
    materialsLink: '',
    visualStyleAction: '',
    visualStyleLookingFor: '',
    visualReferences: '',
    visualDislikes: '',
    toneOfVoice: [],
    pronoun: '',
    needsToDevelop: [],
    needsToDevelopOther: '',
    channels: [],
    channelsOther: '',
    formats: [],
    formatsOther: '',
    quantity: '',
    deliveryDate: '',
    additionalInfo: '',
  });

  const validationRules = {
    companyName: { required: true },
    contactName: { required: true },
    email: { required: true, email: true },
    whatYouSell: { required: true },
    mainProduct: { required: true },
    whyChooseYou: { required: true },
    projectGoal: { required: true },
    targetAudience: { required: true },
    audienceInterests: { required: true },
    visualStyleAction: { required: true },
    toneOfVoice: { required: true },
    pronoun: { required: true },
    needsToDevelop: { required: true },
  };

  const handleCheckboxGroup = (field, optionId, checked, maxAllowed = null) => {
    const current = Array.isArray(formData[field]) ? formData[field] : [];
    let next = [];
    if (checked) {
      if (maxAllowed && current.length >= maxAllowed) {
        return; // limit reached
      }
      next = [...current, optionId];
    } else {
      next = current.filter((id) => id !== optionId);
    }
    updateField(field, next);
  };

  const handleRadioGroup = (field, optionId) => {
    updateField(field, optionId);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm(validationRules)) {
        // focus first error roughly
        return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const payload = {
        ...formData,
        projectGoal: Array.isArray(formData.projectGoal) ? formData.projectGoal.join(', ') : '',
        audienceInterests: Array.isArray(formData.audienceInterests) ? formData.audienceInterests.join(', ') : '',
        availableMaterials: Array.isArray(formData.availableMaterials) ? formData.availableMaterials.join(', ') : '',
        toneOfVoice: Array.isArray(formData.toneOfVoice) ? formData.toneOfVoice.join(', ') : '',
        needsToDevelop: Array.isArray(formData.needsToDevelop) ? formData.needsToDevelop.join(', ') : '',
        channels: Array.isArray(formData.channels) ? formData.channels.join(', ') : '',
        formats: Array.isArray(formData.formats) ? formData.formats.join(', ') : '',
      };
      await emailService.sendBriefContentForm(payload);
      setSubmitStatus({ type: 'success', message: t('brief.form.success') });
      resetForm();
      setTimeout(() => setSubmitStatus(null), 6000);
    } catch (error) {
      setSubmitStatus({ type: 'error', message: error.message || t('brief.form.error') });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-[#faf1ea] py-16 md:py-20 lg:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1
          id="brief-form-title"
          className="[font-family:'Bricolage_Grotesque',Helvetica] font-medium text-[#13243c] text-3xl md:text-4xl lg:text-5xl mb-4 text-center"
        >
          {t('briefContent.form.title')}
        </h1>
        <p className="[font-family:'Be_Vietnam',Helvetica] text-[#13243c]/80 text-base md:text-lg text-center mb-10">
          {t('briefContent.form.subtitle')}
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-10"
          aria-labelledby="brief-form-title"
          noValidate
        >
          {/* 1. Datos básicos */}
          <div className="space-y-6">
            <h2 className="[font-family:'Bricolage_Grotesque',Helvetica] font-semibold text-[#13243c] text-xl border-b border-[#13243c]/10 pb-2">
              {t('briefContent.form.section1')}
            </h2>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="[font-family:'Be_Vietnam',Helvetica] text-[#13243c] text-sm block">
                  {t('brief.form.companyName')} *
                </label>
                <input
                  type="text"
                  value={formData.companyName}
                  onChange={(e) => updateField('companyName', e.target.value)}
                  className={`w-full h-[52px] px-4 bg-white rounded-xl border-2 ${errors.companyName ? 'border-red-500' : 'border-[#13243c]/20'} focus:outline-none focus:ring-2 focus:ring-[#211ee1] [font-family:'Be_Vietnam',Helvetica] text-base`}
                />
                {errors.companyName && <p className="text-red-500 text-sm">{errors.companyName}</p>}
              </div>
              <div className="space-y-2">
                <label className="[font-family:'Be_Vietnam',Helvetica] text-[#13243c] text-sm block">
                  {t('brief.form.contactName')} *
                </label>
                <input
                  type="text"
                  value={formData.contactName}
                  onChange={(e) => updateField('contactName', e.target.value)}
                  className={`w-full h-[52px] px-4 bg-white rounded-xl border-2 ${errors.contactName ? 'border-red-500' : 'border-[#13243c]/20'} focus:outline-none focus:ring-2 focus:ring-[#211ee1] [font-family:'Be_Vietnam',Helvetica] text-base`}
                />
                {errors.contactName && <p className="text-red-500 text-sm">{errors.contactName}</p>}
              </div>
              <div className="space-y-2">
                <label className="[font-family:'Be_Vietnam',Helvetica] text-[#13243c] text-sm block">
                  Email *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  className={`w-full h-[52px] px-4 bg-white rounded-xl border-2 ${errors.email ? 'border-red-500' : 'border-[#13243c]/20'} focus:outline-none focus:ring-2 focus:ring-[#211ee1] [font-family:'Be_Vietnam',Helvetica] text-base`}
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>
              <div className="space-y-2">
                <label className="[font-family:'Be_Vietnam',Helvetica] text-[#13243c] text-sm block">
                  {t('briefContent.form.socialMedia')}
                </label>
                <input
                  type="text"
                  value={formData.socialMedia}
                  onChange={(e) => updateField('socialMedia', e.target.value)}
                  className={`w-full h-[52px] px-4 bg-white rounded-xl border-2 border-[#13243c]/20 focus:outline-none focus:ring-2 focus:ring-[#211ee1] [font-family:'Be_Vietnam',Helvetica] text-base`}
                />
              </div>
              <div className="space-y-2">
                <label className="[font-family:'Be_Vietnam',Helvetica] text-[#13243c] text-sm block">
                  {t('brief.form.website')}
                </label>
                <input
                  type="url"
                  value={formData.website}
                  onChange={(e) => updateField('website', e.target.value)}
                  className={`w-full h-[52px] px-4 bg-white rounded-xl border-2 border-[#13243c]/20 focus:outline-none focus:ring-2 focus:ring-[#211ee1] [font-family:'Be_Vietnam',Helvetica] text-base`}
                />
              </div>
              <div className="space-y-2">
                <label className="[font-family:'Be_Vietnam',Helvetica] text-[#13243c] text-sm block">
                  {t('briefContent.form.location')}
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => updateField('location', e.target.value)}
                  className={`w-full h-[52px] px-4 bg-white rounded-xl border-2 border-[#13243c]/20 focus:outline-none focus:ring-2 focus:ring-[#211ee1] [font-family:'Be_Vietnam',Helvetica] text-base`}
                />
              </div>
            </div>
          </div>

          {/* 2. Sobre el negocio */}
          <div className="space-y-6">
            <h2 className="[font-family:'Bricolage_Grotesque',Helvetica] font-semibold text-[#13243c] text-xl border-b border-[#13243c]/10 pb-2">
              {t('briefContent.form.section2')}
            </h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="[font-family:'Be_Vietnam',Helvetica] text-[#13243c] text-sm block">
                  {t('briefContent.form.whatYouSell')} *
                </label>
                <textarea
                  rows={2}
                  value={formData.whatYouSell}
                  onChange={(e) => updateField('whatYouSell', e.target.value)}
                  className={`w-full px-4 py-3 bg-white rounded-xl border-2 resize-none ${errors.whatYouSell ? 'border-red-500' : 'border-[#13243c]/20'} focus:outline-none focus:ring-2 focus:ring-[#211ee1] [font-family:'Be_Vietnam',Helvetica] text-base`}
                />
                {errors.whatYouSell && <p className="text-red-500 text-sm">{errors.whatYouSell}</p>}
              </div>
              <div className="space-y-2">
                <label className="[font-family:'Be_Vietnam',Helvetica] text-[#13243c] text-sm block">
                  {t('briefContent.form.mainProduct')} *
                </label>
                <textarea
                  rows={2}
                  value={formData.mainProduct}
                  onChange={(e) => updateField('mainProduct', e.target.value)}
                  className={`w-full px-4 py-3 bg-white rounded-xl border-2 resize-none ${errors.mainProduct ? 'border-red-500' : 'border-[#13243c]/20'} focus:outline-none focus:ring-2 focus:ring-[#211ee1] [font-family:'Be_Vietnam',Helvetica] text-base`}
                />
                {errors.mainProduct && <p className="text-red-500 text-sm">{errors.mainProduct}</p>}
              </div>
              <div className="space-y-2">
                <label className="[font-family:'Be_Vietnam',Helvetica] text-[#13243c] text-sm block">
                  {t('briefContent.form.whyChooseYou')} *
                </label>
                <textarea
                  rows={2}
                  value={formData.whyChooseYou}
                  onChange={(e) => updateField('whyChooseYou', e.target.value)}
                  className={`w-full px-4 py-3 bg-white rounded-xl border-2 resize-none ${errors.whyChooseYou ? 'border-red-500' : 'border-[#13243c]/20'} focus:outline-none focus:ring-2 focus:ring-[#211ee1] [font-family:'Be_Vietnam',Helvetica] text-base`}
                />
                {errors.whyChooseYou && <p className="text-red-500 text-sm">{errors.whyChooseYou}</p>}
              </div>
            </div>
          </div>

          {/* 3. Objetivo del proyecto */}
          <div className="space-y-6">
            <h2 className="[font-family:'Bricolage_Grotesque',Helvetica] font-semibold text-[#13243c] text-xl border-b border-[#13243c]/10 pb-2">
              {t('briefContent.form.section3')}
            </h2>
            <div className="space-y-3">
              <label className="[font-family:'Be_Vietnam',Helvetica] text-[#13243c] text-sm block">
                {t('briefContent.form.projectGoal')} *
              </label>
              <div className="grid gap-3 sm:grid-cols-2">
                {PROJECT_GOAL_OPTIONS.map((opt) => (
                  <label key={opt.id} className="flex items-start gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={(formData.projectGoal || []).includes(opt.id)}
                      onChange={(e) => handleCheckboxGroup('projectGoal', opt.id, e.target.checked)}
                      className="mt-1 w-4 h-4 rounded border-[#13243c]/30 text-[#211ee1] focus:ring-[#211ee1]"
                    />
                    <span className="[font-family:'Be_Vietnam',Helvetica] text-sm text-[#13243c] leading-tight">
                      {safeLang === 'es' ? opt.es : opt.en}
                    </span>
                  </label>
                ))}
              </div>
              <div className="mt-2 space-y-2">
                <label className="[font-family:'Be_Vietnam',Helvetica] text-[#13243c]/70 text-xs block">
                  {t('brief.form.otro')}
                </label>
                <input
                  type="text"
                  value={formData.projectGoalOther}
                  onChange={(e) => updateField('projectGoalOther', e.target.value)}
                  className="w-full h-[44px] px-4 bg-white rounded-xl border-2 border-[#13243c]/20 focus:outline-none focus:ring-2 focus:ring-[#211ee1] [font-family:'Be_Vietnam',Helvetica] text-sm"
                />
              </div>
              {errors.projectGoal && <p className="text-red-500 text-sm">{errors.projectGoal}</p>}
            </div>
          </div>

          {/* 4. Público objetivo */}
          <div className="space-y-6">
            <h2 className="[font-family:'Bricolage_Grotesque',Helvetica] font-semibold text-[#13243c] text-xl border-b border-[#13243c]/10 pb-2">
              {t('briefContent.form.section4')}
            </h2>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="[font-family:'Be_Vietnam',Helvetica] text-[#13243c] text-sm block">
                  {t('briefContent.form.targetAudience')} *
                </label>
                <textarea
                  rows={2}
                  value={formData.targetAudience}
                  onChange={(e) => updateField('targetAudience', e.target.value)}
                  className={`w-full px-4 py-3 bg-white rounded-xl border-2 resize-none ${errors.targetAudience ? 'border-red-500' : 'border-[#13243c]/20'} focus:outline-none focus:ring-2 focus:ring-[#211ee1] [font-family:'Be_Vietnam',Helvetica] text-base`}
                />
                {errors.targetAudience && <p className="text-red-500 text-sm">{errors.targetAudience}</p>}
              </div>

              <div className="space-y-3">
                <label className="[font-family:'Be_Vietnam',Helvetica] text-[#13243c] text-sm block">
                  {t('briefContent.form.audienceInterests')} *
                </label>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {AUDIENCE_INTERESTS_OPTIONS.map((opt) => (
                    <label key={opt.id} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={(formData.audienceInterests || []).includes(opt.id)}
                        onChange={(e) => handleCheckboxGroup('audienceInterests', opt.id, e.target.checked, 2)}
                        className="w-4 h-4 rounded border-[#13243c]/30 text-[#211ee1] focus:ring-[#211ee1]"
                      />
                      <span className="[font-family:'Be_Vietnam',Helvetica] text-sm text-[#13243c]">
                        {safeLang === 'es' ? opt.es : opt.en}
                      </span>
                    </label>
                  ))}
                </div>
                <div className="mt-2 space-y-2">
                  <label className="[font-family:'Be_Vietnam',Helvetica] text-[#13243c]/70 text-xs block">
                    {t('brief.form.otro')}
                  </label>
                  <input
                    type="text"
                    value={formData.audienceInterestsOther}
                    onChange={(e) => updateField('audienceInterestsOther', e.target.value)}
                    className="w-full h-[44px] px-4 bg-white rounded-xl border-2 border-[#13243c]/20 focus:outline-none focus:ring-2 focus:ring-[#211ee1] [font-family:'Be_Vietnam',Helvetica] text-sm"
                  />
                </div>
                {errors.audienceInterests && <p className="text-red-500 text-sm">{errors.audienceInterests}</p>}
              </div>
            </div>
          </div>

          {/* 5. Material disponible */}
          <div className="space-y-6">
            <h2 className="[font-family:'Bricolage_Grotesque',Helvetica] font-semibold text-[#13243c] text-xl border-b border-[#13243c]/10 pb-2">
              {t('briefContent.form.section5')}
            </h2>
            <div className="space-y-3">
              <label className="[font-family:'Be_Vietnam',Helvetica] text-[#13243c] text-sm block">
                {t('briefContent.form.availableMaterials')}
              </label>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {AVAILABLE_MATERIALS_OPTIONS.map((opt) => (
                  <label key={opt.id} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={(formData.availableMaterials || []).includes(opt.id)}
                      onChange={(e) => handleCheckboxGroup('availableMaterials', opt.id, e.target.checked)}
                      className="w-4 h-4 rounded border-[#13243c]/30 text-[#211ee1] focus:ring-[#211ee1]"
                    />
                    <span className="[font-family:'Be_Vietnam',Helvetica] text-sm text-[#13243c]">
                      {safeLang === 'es' ? opt.es : opt.en}
                    </span>
                  </label>
                ))}
              </div>
              <div className="mt-4 space-y-2">
                <label className="[font-family:'Be_Vietnam',Helvetica] text-[#13243c] text-sm block">
                  {t('briefContent.form.materialsLink')}
                </label>
                <input
                  type="url"
                  value={formData.materialsLink}
                  onChange={(e) => updateField('materialsLink', e.target.value)}
                  className="w-full h-[52px] px-4 bg-white rounded-xl border-2 border-[#13243c]/20 focus:outline-none focus:ring-2 focus:ring-[#211ee1] [font-family:'Be_Vietnam',Helvetica] text-base"
                />
              </div>
            </div>
          </div>

          {/* 6. Estilo visual */}
          <div className="space-y-6">
            <h2 className="[font-family:'Bricolage_Grotesque',Helvetica] font-semibold text-[#13243c] text-xl border-b border-[#13243c]/10 pb-2">
              {t('briefContent.form.section6')}
            </h2>
            <div className="space-y-6">
              <div className="space-y-3">
                <label className="[font-family:'Be_Vietnam',Helvetica] text-[#13243c] text-sm block">
                  {t('briefContent.form.visualStyleAction')} *
                </label>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {VISUAL_STYLE_ACTION_OPTIONS.map((opt) => (
                    <label key={opt.id} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="visualStyleAction"
                        checked={formData.visualStyleAction === opt.id}
                        onChange={() => handleRadioGroup('visualStyleAction', opt.id)}
                        className="w-4 h-4 text-[#211ee1] focus:ring-[#211ee1] border-[#13243c]/30"
                      />
                      <span className="[font-family:'Be_Vietnam',Helvetica] text-sm text-[#13243c]">
                        {safeLang === 'es' ? opt.es : opt.en}
                      </span>
                    </label>
                  ))}
                </div>
                {errors.visualStyleAction && <p className="text-red-500 text-sm">{errors.visualStyleAction}</p>}
              </div>

              <div className="space-y-2">
                <label className="[font-family:'Be_Vietnam',Helvetica] text-[#13243c] text-sm block">
                  {t('briefContent.form.visualStyleLookingFor')}
                </label>
                <textarea
                  rows={2}
                  value={formData.visualStyleLookingFor}
                  onChange={(e) => updateField('visualStyleLookingFor', e.target.value)}
                  className="w-full px-4 py-3 bg-white rounded-xl border-2 resize-none border-[#13243c]/20 focus:outline-none focus:ring-2 focus:ring-[#211ee1] [font-family:'Be_Vietnam',Helvetica] text-base"
                />
              </div>

              <div className="space-y-2">
                <label className="[font-family:'Be_Vietnam',Helvetica] text-[#13243c] text-sm block">
                  {t('briefContent.form.visualReferences')}
                </label>
                <textarea
                  rows={2}
                  value={formData.visualReferences}
                  onChange={(e) => updateField('visualReferences', e.target.value)}
                  className="w-full px-4 py-3 bg-white rounded-xl border-2 resize-none border-[#13243c]/20 focus:outline-none focus:ring-2 focus:ring-[#211ee1] [font-family:'Be_Vietnam',Helvetica] text-base"
                />
              </div>

              <div className="space-y-2">
                <label className="[font-family:'Be_Vietnam',Helvetica] text-[#13243c] text-sm block">
                  {t('briefContent.form.visualDislikes')}
                </label>
                <textarea
                  rows={2}
                  value={formData.visualDislikes}
                  onChange={(e) => updateField('visualDislikes', e.target.value)}
                  className="w-full px-4 py-3 bg-white rounded-xl border-2 resize-none border-[#13243c]/20 focus:outline-none focus:ring-2 focus:ring-[#211ee1] [font-family:'Be_Vietnam',Helvetica] text-base"
                />
              </div>
            </div>
          </div>

          {/* 7. Tono de comunicación */}
          <div className="space-y-6">
            <h2 className="[font-family:'Bricolage_Grotesque',Helvetica] font-semibold text-[#13243c] text-xl border-b border-[#13243c]/10 pb-2">
              {t('briefContent.form.section7')}
            </h2>
            <div className="space-y-6">
              <div className="space-y-3">
                <label className="[font-family:'Be_Vietnam',Helvetica] text-[#13243c] text-sm block">
                  {t('briefContent.form.toneOfVoice')} *
                </label>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {TONE_OF_VOICE_OPTIONS.map((opt) => (
                    <label key={opt.id} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={(formData.toneOfVoice || []).includes(opt.id)}
                        onChange={(e) => handleCheckboxGroup('toneOfVoice', opt.id, e.target.checked, 2)}
                        className="w-4 h-4 rounded border-[#13243c]/30 text-[#211ee1] focus:ring-[#211ee1]"
                      />
                      <span className="[font-family:'Be_Vietnam',Helvetica] text-sm text-[#13243c]">
                        {safeLang === 'es' ? opt.es : opt.en}
                      </span>
                    </label>
                  ))}
                </div>
                {errors.toneOfVoice && <p className="text-red-500 text-sm">{errors.toneOfVoice}</p>}
              </div>

              <div className="space-y-3">
                <label className="[font-family:'Be_Vietnam',Helvetica] text-[#13243c] text-sm block">
                  {t('briefContent.form.pronoun')} *
                </label>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {PRONOUN_OPTIONS.map((opt) => (
                    <label key={opt.id} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="pronoun"
                        checked={formData.pronoun === opt.id}
                        onChange={() => handleRadioGroup('pronoun', opt.id)}
                        className="w-4 h-4 text-[#211ee1] focus:ring-[#211ee1] border-[#13243c]/30"
                      />
                      <span className="[font-family:'Be_Vietnam',Helvetica] text-sm text-[#13243c]">
                        {safeLang === 'es' ? opt.es : opt.en}
                      </span>
                    </label>
                  ))}
                </div>
                {errors.pronoun && <p className="text-red-500 text-sm">{errors.pronoun}</p>}
              </div>
            </div>
          </div>

          {/* 8. Solicitud del proyecto */}
          <div className="space-y-6">
            <h2 className="[font-family:'Bricolage_Grotesque',Helvetica] font-semibold text-[#13243c] text-xl border-b border-[#13243c]/10 pb-2">
              {t('briefContent.form.section8')}
            </h2>
            <div className="space-y-6">
              <div className="space-y-3">
                <label className="[font-family:'Be_Vietnam',Helvetica] text-[#13243c] text-sm block">
                  {t('briefContent.form.needsToDevelop')} *
                </label>
                <div className="grid gap-3 sm:grid-cols-2">
                  {NEEDS_TO_DEVELOP_OPTIONS.map((opt) => (
                    <label key={opt.id} className="flex items-start gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={(formData.needsToDevelop || []).includes(opt.id)}
                        onChange={(e) => handleCheckboxGroup('needsToDevelop', opt.id, e.target.checked)}
                        className="mt-1 w-4 h-4 rounded border-[#13243c]/30 text-[#211ee1] focus:ring-[#211ee1]"
                      />
                      <span className="[font-family:'Be_Vietnam',Helvetica] text-sm text-[#13243c] leading-tight">
                        {safeLang === 'es' ? opt.es : opt.en}
                      </span>
                    </label>
                  ))}
                </div>
                <div className="mt-2 space-y-2">
                  <label className="[font-family:'Be_Vietnam',Helvetica] text-[#13243c]/70 text-xs block">
                    {t('brief.form.otro')}
                  </label>
                  <input
                    type="text"
                    value={formData.needsToDevelopOther}
                    onChange={(e) => updateField('needsToDevelopOther', e.target.value)}
                    className="w-full h-[44px] px-4 bg-white rounded-xl border-2 border-[#13243c]/20 focus:outline-none focus:ring-2 focus:ring-[#211ee1] [font-family:'Be_Vietnam',Helvetica] text-sm"
                  />
                </div>
                {errors.needsToDevelop && <p className="text-red-500 text-sm">{errors.needsToDevelop}</p>}
              </div>

              <div className="space-y-3">
                <label className="[font-family:'Be_Vietnam',Helvetica] text-[#13243c] text-sm block">
                  {t('briefContent.form.channels')}
                </label>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {CHANNELS_OPTIONS.map((opt) => (
                    <label key={opt.id} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={(formData.channels || []).includes(opt.id)}
                        onChange={(e) => handleCheckboxGroup('channels', opt.id, e.target.checked)}
                        className="w-4 h-4 rounded border-[#13243c]/30 text-[#211ee1] focus:ring-[#211ee1]"
                      />
                      <span className="[font-family:'Be_Vietnam',Helvetica] text-sm text-[#13243c]">
                        {safeLang === 'es' ? opt.es : opt.en}
                      </span>
                    </label>
                  ))}
                </div>
                <div className="mt-2 space-y-2">
                  <label className="[font-family:'Be_Vietnam',Helvetica] text-[#13243c]/70 text-xs block">
                    {t('brief.form.otro')}
                  </label>
                  <input
                    type="text"
                    value={formData.channelsOther}
                    onChange={(e) => updateField('channelsOther', e.target.value)}
                    className="w-full h-[44px] px-4 bg-white rounded-xl border-2 border-[#13243c]/20 focus:outline-none focus:ring-2 focus:ring-[#211ee1] [font-family:'Be_Vietnam',Helvetica] text-sm"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="[font-family:'Be_Vietnam',Helvetica] text-[#13243c] text-sm block">
                  {t('briefContent.form.formats')}
                </label>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {FORMATS_OPTIONS.map((opt) => (
                    <label key={opt.id} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={(formData.formats || []).includes(opt.id)}
                        onChange={(e) => handleCheckboxGroup('formats', opt.id, e.target.checked)}
                        className="w-4 h-4 rounded border-[#13243c]/30 text-[#211ee1] focus:ring-[#211ee1]"
                      />
                      <span className="[font-family:'Be_Vietnam',Helvetica] text-sm text-[#13243c]">
                        {safeLang === 'es' ? opt.es : opt.en}
                      </span>
                    </label>
                  ))}
                </div>
                <div className="mt-2 space-y-2">
                  <label className="[font-family:'Be_Vietnam',Helvetica] text-[#13243c]/70 text-xs block">
                    {t('brief.form.otro')}
                  </label>
                  <input
                    type="text"
                    value={formData.formatsOther}
                    onChange={(e) => updateField('formatsOther', e.target.value)}
                    className="w-full h-[44px] px-4 bg-white rounded-xl border-2 border-[#13243c]/20 focus:outline-none focus:ring-2 focus:ring-[#211ee1] [font-family:'Be_Vietnam',Helvetica] text-sm"
                  />
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="[font-family:'Be_Vietnam',Helvetica] text-[#13243c] text-sm block">
                    {t('briefContent.form.quantity')}
                  </label>
                  <input
                    type="text"
                    value={formData.quantity}
                    onChange={(e) => updateField('quantity', e.target.value)}
                    className="w-full h-[52px] px-4 bg-white rounded-xl border-2 border-[#13243c]/20 focus:outline-none focus:ring-2 focus:ring-[#211ee1] [font-family:'Be_Vietnam',Helvetica] text-base"
                  />
                </div>
                <div className="space-y-2">
                  <label className="[font-family:'Be_Vietnam',Helvetica] text-[#13243c] text-sm block">
                    {t('briefContent.form.deliveryDate')}
                  </label>
                  <input
                    type="text"
                    value={formData.deliveryDate}
                    onChange={(e) => updateField('deliveryDate', e.target.value)}
                    className="w-full h-[52px] px-4 bg-white rounded-xl border-2 border-[#13243c]/20 focus:outline-none focus:ring-2 focus:ring-[#211ee1] [font-family:'Be_Vietnam',Helvetica] text-base"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 9. Información adicional */}
          <div className="space-y-6">
            <h2 className="[font-family:'Bricolage_Grotesque',Helvetica] font-semibold text-[#13243c] text-xl border-b border-[#13243c]/10 pb-2">
              {t('briefContent.form.section9')}
            </h2>
            <div className="space-y-2">
              <label className="[font-family:'Be_Vietnam',Helvetica] text-[#13243c] text-sm block">
                {t('briefContent.form.additionalInfo')}
              </label>
              <textarea
                rows={4}
                value={formData.additionalInfo}
                onChange={(e) => updateField('additionalInfo', e.target.value)}
                className="w-full px-4 py-3 bg-white rounded-xl border-2 resize-none border-[#13243c]/20 focus:outline-none focus:ring-2 focus:ring-[#211ee1] [font-family:'Be_Vietnam',Helvetica] text-base"
              />
            </div>
          </div>

          {submitStatus && (
            <div
              role="status"
              className={`p-4 rounded-xl text-center [font-family:'Be_Vietnam',Helvetica] ${
                submitStatus.type === 'success'
                  ? 'bg-green-100 text-green-800 border-2 border-green-300'
                  : 'bg-red-100 text-red-800 border-2 border-red-300'
              }`}
            >
              {submitStatus.message}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-[56px] bg-[#211ee1] hover:bg-[#1a18c4] disabled:opacity-70 disabled:cursor-not-allowed text-white rounded-full font-semibold text-lg [font-family:'Be_Vietnam',Helvetica] transition-all flex items-center justify-center gap-2"
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

        <p className="mt-8 [font-family:'Be_Vietnam',Helvetica] text-[#13243c]/70 text-sm text-center">
          {t('briefContent.form.finalNote')}
        </p>
      </div>
    </section>
  );
};

export default BriefContentForm;

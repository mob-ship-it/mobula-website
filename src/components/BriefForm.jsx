import React, { useState } from 'react';
import { useFormState } from '../hooks/useFormState';
import { emailService } from '../services/api';
import * as i18n from '../i18n/utils';

const SERVICES_OPTIONS = [
  { id: 'seo', es: 'SEO', en: 'SEO' },
  { id: 'redes', es: 'Manejo de redes sociales', en: 'Social media management' },
  { id: 'paid', es: 'Paid Media (Facebook, Google, Instagram, TikTok, YouTube)', en: 'Paid Media (Facebook, Google, Instagram, TikTok, YouTube)' },
  { id: 'diseno', es: 'Diseño web', en: 'Web design' },
  { id: 'creatividad', es: 'Creatividad y diseño (artes, reels, videos, identidad)', en: 'Creativity and design (arts, reels, videos, identity)' },
  { id: 'automatizacion', es: 'Automatización / AI', en: 'Automation / AI' },
  { id: 'capacitacion', es: 'Capacitación en marketing digital', en: 'Digital marketing training' },
];

const EXPECTED_RESULTS = [
  { id: 'ventas', es: 'Aumentar las ventas', en: 'Increase sales' },
  { id: 'clientes', es: 'Aumentar los clientes', en: 'Increase customers' },
  { id: 'posicionamiento', es: 'Mejorar el posicionamiento de la marca', en: 'Improve brand positioning' },
  { id: 'expansion', es: 'Expansión de la marca', en: 'Brand expansion' },
  { id: 'mercados', es: 'Entrar en nuevos mercados', en: 'Enter new markets' },
];

const BUDGET_OPTIONS = [
  { id: '501-1000', es: 'De $501 hasta $1.000', en: '$501 to $1,000' },
  { id: '1000-3000', es: 'De $1.000 hasta $3.000', en: '$1,000 to $3,000' },
  { id: '3000-5000', es: 'De $3.000 a $5.000', en: '$3,000 to $5,000' },
  { id: 'mayor', es: 'Mayor inversión', en: 'Higher investment' },
  { id: 'recomendar', es: 'Prefiero que me recomienden', en: 'Prefer recommendations' },
];

const PUNTOS_DOLOR_OPTIONS = [
  { id: 'bajaConversion', es: 'Baja conversión', en: 'Low conversion' },
  { id: 'faltaVisibilidad', es: 'Falta de visibilidad', en: 'Lack of visibility' },
  { id: 'campanasBajoRendimiento', es: 'Campañas de bajo rendimiento', en: 'Low-performing campaigns' },
  { id: 'problemasProcesos', es: 'Problemas con procesos', en: 'Process problems' },
];

const HOW_FOUND = [
  { id: 'redes', es: 'Redes Sociales', en: 'Social Media' },
  { id: 'google', es: 'Google', en: 'Google' },
  { id: 'chatgpt', es: 'Chat GPT', en: 'Chat GPT' },
  { id: 'perplexity', es: 'Perplexity', en: 'Perplexity' },
  { id: 'youtube', es: 'Youtube', en: 'YouTube' },
  { id: 'tiktok', es: 'TikTok', en: 'TikTok' },
  { id: 'x', es: 'X', en: 'X' },
  { id: 'recomendacion', es: 'Recomendación', en: 'Recommendation' },
];

export const BriefForm = ({ lang }) => {
  const safeLang = lang === 'en' ? 'en' : 'es';
  const t = i18n.useTranslations(safeLang);
  const [submitStatus, setSubmitStatus] = useState(null);

  const { formData, errors, isSubmitting, setIsSubmitting, updateField, validateForm, resetForm } = useFormState({
    companyName: '',
    contactName: '',
    email: '',
    website: '',
    sectorIndustria: '',
    tiempoEnMercado: '',
    productoEstrella: '',
    valorPromedio: '',
    serviciosInteres: [],
    resultadosEsperados: [],
    puntosDolor: [],
    puntosDolorOtro: '',
    estrategiasIntentadas: '',
    publicoObjetivo: '',
    competencia: '',
    diferenciacion: '',
    presupuesto: '',
    comoSupo: '',
  });

  const validationRules = {
    companyName: { required: true },
    contactName: { required: true },
    email: { required: true, email: true },
    website: { required: true, url: true },
    sectorIndustria: { required: true },
    tiempoEnMercado: { required: true },
    productoEstrella: { required: true },
    valorPromedio: { required: true },
    puntosDolor: { required: true },
    publicoObjetivo: { required: true },
    competencia: { required: true },
    diferenciacion: { required: true },
    presupuesto: { required: true },
    comoSupo: { required: true },
  };

  const handleCheckboxGroup = (field, optionId, checked) => {
    const current = Array.isArray(formData[field]) ? formData[field] : [];
    const next = checked
      ? [...current, optionId]
      : current.filter((id) => id !== optionId);
    updateField(field, next);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm(validationRules)) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const payload = {
        ...formData,
        serviciosInteres: Array.isArray(formData.serviciosInteres) ? formData.serviciosInteres.join(', ') : '',
        resultadosEsperados: Array.isArray(formData.resultadosEsperados) ? formData.resultadosEsperados.join(', ') : '',
        puntosDolor: Array.isArray(formData.puntosDolor) ? formData.puntosDolor.join(', ') : '',
      };
      await emailService.sendBriefForm(payload);
      setSubmitStatus({ type: 'success', message: t('brief.form.success') });
      resetForm();
      setTimeout(() => setSubmitStatus(null), 6000);
    } catch (error) {
      setSubmitStatus({ type: 'error', message: error.message || t('brief.form.error') });
    } finally {
      setIsSubmitting(false);
    }
  };

  const servicesLabel = safeLang === 'es' ? 'Servicios de interés' : 'Services of interest';
  const resultsLabel = safeLang === 'es' ? 'Resultados esperados' : 'Expected results';

  return (
    <section className="bg-[#faf1ea] py-16 md:py-20 lg:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1
          id="brief-form-title"
          className="[font-family:'Bricolage_Grotesque',Helvetica] font-medium text-[#13243c] text-3xl md:text-4xl lg:text-5xl mb-4 text-center"
        >
          {t('brief.form.title')}
        </h1>
        <p className="[font-family:'Be_Vietnam',Helvetica] text-[#13243c]/80 text-base md:text-lg text-center mb-10">
          {t('brief.form.subtitle')}
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-8"
          aria-labelledby="brief-form-title"
          noValidate
        >
          {/* Datos Generales */}
          <div className="space-y-6">
            <h2 className="[font-family:'Bricolage_Grotesque',Helvetica] font-semibold text-[#13243c] text-xl">
              {t('brief.form.sectionGeneral')}
            </h2>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="brief-company" className="[font-family:'Be_Vietnam',Helvetica] text-[#13243c] text-sm block">
                  {t('brief.form.companyName')} *
                </label>
                <input
                  id="brief-company"
                  type="text"
                  value={formData.companyName}
                  onChange={(e) => updateField('companyName', e.target.value)}
                  placeholder={t('brief.form.placeholder.company')}
                  className={`w-full h-[52px] px-4 bg-white rounded-xl border-2 ${errors.companyName ? 'border-red-500' : 'border-[#13243c]/20'} focus:outline-none focus:ring-2 focus:ring-[#211ee1] [font-family:'Be_Vietnam',Helvetica] text-base`}
                />
                {errors.companyName && <p className="text-red-500 text-sm">{errors.companyName}</p>}
              </div>
              <div className="space-y-2">
                <label htmlFor="brief-contact" className="[font-family:'Be_Vietnam',Helvetica] text-[#13243c] text-sm block">
                  {t('brief.form.contactName')} *
                </label>
                <input
                  id="brief-contact"
                  type="text"
                  value={formData.contactName}
                  onChange={(e) => updateField('contactName', e.target.value)}
                  placeholder={t('brief.form.placeholder.contact')}
                  className={`w-full h-[52px] px-4 bg-white rounded-xl border-2 ${errors.contactName ? 'border-red-500' : 'border-[#13243c]/20'} focus:outline-none focus:ring-2 focus:ring-[#211ee1] [font-family:'Be_Vietnam',Helvetica] text-base`}
                />
                {errors.contactName && <p className="text-red-500 text-sm">{errors.contactName}</p>}
              </div>
              <div className="space-y-2">
                <label htmlFor="brief-email" className="[font-family:'Be_Vietnam',Helvetica] text-[#13243c] text-sm block">
                  Email *
                </label>
                <input
                  id="brief-email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  placeholder="contacto@empresa.com"
                  className={`w-full h-[52px] px-4 bg-white rounded-xl border-2 ${errors.email ? 'border-red-500' : 'border-[#13243c]/20'} focus:outline-none focus:ring-2 focus:ring-[#211ee1] [font-family:'Be_Vietnam',Helvetica] text-base`}
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>
              <div className="space-y-2">
                <label htmlFor="brief-website" className="[font-family:'Be_Vietnam',Helvetica] text-[#13243c] text-sm block">
                  {t('brief.form.website')} *
                </label>
                <input
                  id="brief-website"
                  type="url"
                  value={formData.website}
                  onChange={(e) => updateField('website', e.target.value)}
                  placeholder={t('brief.form.placeholder.website')}
                  className={`w-full h-[52px] px-4 bg-white rounded-xl border-2 ${errors.website ? 'border-red-500' : 'border-[#13243c]/20'} focus:outline-none focus:ring-2 focus:ring-[#211ee1] [font-family:'Be_Vietnam',Helvetica] text-base`}
                />
                {errors.website && <p className="text-red-500 text-sm">{errors.website}</p>}
              </div>
            </div>
          </div>

          {/* Antecedentes - 4 campos en grid 2x2 */}
          <div className="space-y-6">
            <h2 className="[font-family:'Bricolage_Grotesque',Helvetica] font-semibold text-[#13243c] text-xl">
              {t('brief.form.antecedentes')}
            </h2>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="brief-sector" className="[font-family:'Be_Vietnam',Helvetica] text-[#13243c] text-sm block">
                  {t('brief.form.sectorIndustria')} *
                </label>
                <input
                  id="brief-sector"
                  type="text"
                  value={formData.sectorIndustria}
                  onChange={(e) => updateField('sectorIndustria', e.target.value)}
                  placeholder={t('brief.form.placeholder.sector')}
                  className={`w-full h-[52px] px-4 bg-white rounded-xl border-2 ${errors.sectorIndustria ? 'border-red-500' : 'border-[#13243c]/20'} focus:outline-none focus:ring-2 focus:ring-[#211ee1] [font-family:'Be_Vietnam',Helvetica] text-base`}
                />
                {errors.sectorIndustria && <p className="text-red-500 text-sm">{errors.sectorIndustria}</p>}
              </div>
              <div className="space-y-2">
                <label htmlFor="brief-tiempo" className="[font-family:'Be_Vietnam',Helvetica] text-[#13243c] text-sm block">
                  {t('brief.form.tiempoEnMercado')} *
                </label>
                <input
                  id="brief-tiempo"
                  type="text"
                  value={formData.tiempoEnMercado}
                  onChange={(e) => updateField('tiempoEnMercado', e.target.value)}
                  placeholder={t('brief.form.placeholder.tiempo')}
                  className={`w-full h-[52px] px-4 bg-white rounded-xl border-2 ${errors.tiempoEnMercado ? 'border-red-500' : 'border-[#13243c]/20'} focus:outline-none focus:ring-2 focus:ring-[#211ee1] [font-family:'Be_Vietnam',Helvetica] text-base`}
                />
                {errors.tiempoEnMercado && <p className="text-red-500 text-sm">{errors.tiempoEnMercado}</p>}
              </div>
              <div className="space-y-2">
                <label htmlFor="brief-producto" className="[font-family:'Be_Vietnam',Helvetica] text-[#13243c] text-sm block">
                  {t('brief.form.productoEstrella')} *
                </label>
                <input
                  id="brief-producto"
                  type="text"
                  value={formData.productoEstrella}
                  onChange={(e) => updateField('productoEstrella', e.target.value)}
                  placeholder={t('brief.form.placeholder.producto')}
                  className={`w-full h-[52px] px-4 bg-white rounded-xl border-2 ${errors.productoEstrella ? 'border-red-500' : 'border-[#13243c]/20'} focus:outline-none focus:ring-2 focus:ring-[#211ee1] [font-family:'Be_Vietnam',Helvetica] text-base`}
                />
                {errors.productoEstrella && <p className="text-red-500 text-sm">{errors.productoEstrella}</p>}
              </div>
              <div className="space-y-2">
                <label htmlFor="brief-valor" className="[font-family:'Be_Vietnam',Helvetica] text-[#13243c] text-sm block">
                  {t('brief.form.valorPromedio')} *
                </label>
                <input
                  id="brief-valor"
                  type="text"
                  value={formData.valorPromedio}
                  onChange={(e) => updateField('valorPromedio', e.target.value)}
                  placeholder={t('brief.form.placeholder.valor')}
                  className={`w-full h-[52px] px-4 bg-white rounded-xl border-2 ${errors.valorPromedio ? 'border-red-500' : 'border-[#13243c]/20'} focus:outline-none focus:ring-2 focus:ring-[#211ee1] [font-family:'Be_Vietnam',Helvetica] text-base`}
                />
                {errors.valorPromedio && <p className="text-red-500 text-sm">{errors.valorPromedio}</p>}
              </div>
            </div>
          </div>

          {/* Servicios de interés */}
          <div className="space-y-3">
            <label className="[font-family:'Be_Vietnam',Helvetica] text-[#13243c] text-sm block">
              {servicesLabel} *
            </label>
            <div className="flex flex-wrap gap-3">
              {(safeLang === 'es' ? SERVICES_OPTIONS : SERVICES_OPTIONS).map((opt) => (
                <label key={opt.id} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={(formData.serviciosInteres || []).includes(opt.id)}
                    onChange={(e) => handleCheckboxGroup('serviciosInteres', opt.id, e.target.checked)}
                    className="w-4 h-4 rounded border-[#13243c]/30 text-[#211ee1] focus:ring-[#211ee1]"
                  />
                  <span className="[font-family:'Be_Vietnam',Helvetica] text-sm text-[#13243c]">{safeLang === 'es' ? opt.es : opt.en}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Resultados esperados */}
          <div className="space-y-3">
            <label className="[font-family:'Be_Vietnam',Helvetica] text-[#13243c] text-sm block">
              {resultsLabel} *
            </label>
            <div className="flex flex-wrap gap-3">
              {(safeLang === 'es' ? EXPECTED_RESULTS : EXPECTED_RESULTS).map((opt) => (
                <label key={opt.id} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={(formData.resultadosEsperados || []).includes(opt.id)}
                    onChange={(e) => handleCheckboxGroup('resultadosEsperados', opt.id, e.target.checked)}
                    className="w-4 h-4 rounded border-[#13243c]/30 text-[#211ee1] focus:ring-[#211ee1]"
                  />
                  <span className="[font-family:'Be_Vietnam',Helvetica] text-sm text-[#13243c]">{safeLang === 'es' ? opt.es : opt.en}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Puntos de dolor - checkboxes */}
          <div className="space-y-3">
            <label className="[font-family:'Be_Vietnam',Helvetica] text-[#13243c] text-sm block">
              {t('brief.form.puntosDolor')} *
            </label>
            <div className="flex flex-wrap gap-x-6 gap-y-3">
              {(safeLang === 'es' ? PUNTOS_DOLOR_OPTIONS : PUNTOS_DOLOR_OPTIONS).map((opt) => (
                <label key={opt.id} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={(formData.puntosDolor || []).includes(opt.id)}
                    onChange={(e) => handleCheckboxGroup('puntosDolor', opt.id, e.target.checked)}
                    className="w-4 h-4 rounded border-[#13243c]/30 text-[#211ee1] focus:ring-[#211ee1]"
                  />
                  <span className="[font-family:'Be_Vietnam',Helvetica] text-sm text-[#13243c]">{safeLang === 'es' ? opt.es : opt.en}</span>
                </label>
              ))}
            </div>
            <div className="mt-2 space-y-2">
              <label htmlFor="brief-puntos-otro" className="[font-family:'Be_Vietnam',Helvetica] text-[#13243c]/70 text-xs block">
                {t('brief.form.otro')}
              </label>
              <input
                id="brief-puntos-otro"
                type="text"
                value={formData.puntosDolorOtro}
                onChange={(e) => updateField('puntosDolorOtro', e.target.value)}
                placeholder={t('brief.form.placeholder.otro')}
                className="w-full h-[44px] px-4 bg-white rounded-xl border-2 border-[#13243c]/20 focus:outline-none focus:ring-2 focus:ring-[#211ee1] [font-family:'Be_Vietnam',Helvetica] text-sm"
              />
            </div>
            {errors.puntosDolor && <p className="text-red-500 text-sm">{errors.puntosDolor}</p>}
          </div>

          {/* Estrategias intentadas */}
          <div className="space-y-2">
            <label htmlFor="brief-estrategias" className="[font-family:'Be_Vietnam',Helvetica] text-[#13243c] text-sm block">
              {t('brief.form.estrategias')}
            </label>
            <textarea
              id="brief-estrategias"
              rows={3}
              value={formData.estrategiasIntentadas}
              onChange={(e) => updateField('estrategiasIntentadas', e.target.value)}
              placeholder={t('brief.form.placeholder.estrategias')}
              className="w-full px-4 py-3 bg-white rounded-xl border-2 border-[#13243c]/20 resize-none focus:outline-none focus:ring-2 focus:ring-[#211ee1] [font-family:'Be_Vietnam',Helvetica] text-base"
            />
          </div>

          {/* Público objetivo */}
          <div className="space-y-2">
            <label htmlFor="brief-publico" className="[font-family:'Be_Vietnam',Helvetica] text-[#13243c] text-sm block">
              {t('brief.form.publicoObjetivo')} *
            </label>
            <textarea
              id="brief-publico"
              rows={2}
              value={formData.publicoObjetivo}
              onChange={(e) => updateField('publicoObjetivo', e.target.value)}
              placeholder={t('brief.form.placeholder.publico')}
              className={`w-full px-4 py-3 bg-white rounded-xl border-2 resize-none ${errors.publicoObjetivo ? 'border-red-500' : 'border-[#13243c]/20'} focus:outline-none focus:ring-2 focus:ring-[#211ee1] [font-family:'Be_Vietnam',Helvetica] text-base`}
            />
            {errors.publicoObjetivo && <p className="text-red-500 text-sm">{errors.publicoObjetivo}</p>}
          </div>

          {/* Competencia */}
          <div className="space-y-2">
            <label htmlFor="brief-competencia" className="[font-family:'Be_Vietnam',Helvetica] text-[#13243c] text-sm block">
              {t('brief.form.competencia')} *
            </label>
            <textarea
              id="brief-competencia"
              rows={2}
              value={formData.competencia}
              onChange={(e) => updateField('competencia', e.target.value)}
              placeholder={t('brief.form.placeholder.competencia')}
              className={`w-full px-4 py-3 bg-white rounded-xl border-2 resize-none ${errors.competencia ? 'border-red-500' : 'border-[#13243c]/20'} focus:outline-none focus:ring-2 focus:ring-[#211ee1] [font-family:'Be_Vietnam',Helvetica] text-base`}
            />
            {errors.competencia && <p className="text-red-500 text-sm">{errors.competencia}</p>}
          </div>

          {/* Diferenciación */}
          <div className="space-y-2">
            <label htmlFor="brief-diferenciacion" className="[font-family:'Be_Vietnam',Helvetica] text-[#13243c] text-sm block">
              {t('brief.form.diferenciacion')} *
            </label>
            <textarea
              id="brief-diferenciacion"
              rows={2}
              value={formData.diferenciacion}
              onChange={(e) => updateField('diferenciacion', e.target.value)}
              placeholder={t('brief.form.placeholder.diferenciacion')}
              className={`w-full px-4 py-3 bg-white rounded-xl border-2 resize-none ${errors.diferenciacion ? 'border-red-500' : 'border-[#13243c]/20'} focus:outline-none focus:ring-2 focus:ring-[#211ee1] [font-family:'Be_Vietnam',Helvetica] text-base`}
            />
            {errors.diferenciacion && <p className="text-red-500 text-sm">{errors.diferenciacion}</p>}
          </div>

          {/* Presupuesto y Cómo supo */}
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="brief-presupuesto" className="[font-family:'Be_Vietnam',Helvetica] text-[#13243c] text-sm block">
                {t('brief.form.presupuesto')} *
              </label>
              <select
                id="brief-presupuesto"
                value={formData.presupuesto}
                onChange={(e) => updateField('presupuesto', e.target.value)}
                className={`w-full h-[52px] px-4 bg-white rounded-xl border-2 ${errors.presupuesto ? 'border-red-500' : 'border-[#13243c]/20'} focus:outline-none focus:ring-2 focus:ring-[#211ee1] [font-family:'Be_Vietnam',Helvetica] text-base`}
              >
                <option value="">{t('form.select')}</option>
                {(safeLang === 'es' ? BUDGET_OPTIONS : BUDGET_OPTIONS).map((opt) => (
                  <option key={opt.id} value={opt.id}>{safeLang === 'es' ? opt.es : opt.en}</option>
                ))}
              </select>
              {errors.presupuesto && <p className="text-red-500 text-sm">{errors.presupuesto}</p>}
            </div>
            <div className="space-y-2">
              <label htmlFor="brief-comosupo" className="[font-family:'Be_Vietnam',Helvetica] text-[#13243c] text-sm block">
                {t('brief.form.comoSupo')} *
              </label>
              <select
                id="brief-comosupo"
                value={formData.comoSupo}
                onChange={(e) => updateField('comoSupo', e.target.value)}
                className={`w-full h-[52px] px-4 bg-white rounded-xl border-2 ${errors.comoSupo ? 'border-red-500' : 'border-[#13243c]/20'} focus:outline-none focus:ring-2 focus:ring-[#211ee1] [font-family:'Be_Vietnam',Helvetica] text-base`}
              >
                <option value="">{t('form.select')}</option>
                {(safeLang === 'es' ? HOW_FOUND : HOW_FOUND).map((opt) => (
                  <option key={opt.id} value={opt.id}>{safeLang === 'es' ? opt.es : opt.en}</option>
                ))}
              </select>
              {errors.comoSupo && <p className="text-red-500 text-sm">{errors.comoSupo}</p>}
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

        <p className="mt-6 [font-family:'Be_Vietnam',Helvetica] text-[#13243c]/70 text-sm text-center">
          {t('brief.form.footer')}
        </p>
      </div>
    </section>
  );
};

export default BriefForm;

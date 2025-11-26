import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { supabase } from '../lib/supabase'

const formSchema = z.object({
  nome: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  email: z.string().email('Email inválido'),
  whatsapp: z.string().min(14, 'WhatsApp inválido').max(15, 'WhatsApp inválido'),
  nps: z.number().min(0).max(10, 'Por favor, selecione uma nota'),
  nps_comentario: z.string().optional(),
  area_atuacao: z.string().min(3, 'Área de atuação é obrigatória'),
  desafios: z.string().min(10, 'Descreva seus principais desafios'),
  perguntas_palestrante: z.string().min(10, 'Descreva suas perguntas'),
  lgpd: z.boolean().refine((val) => val === true, {
    message: 'Você deve aceitar os termos de LGPD'
  }),
})

type FormData = z.infer<typeof formSchema>

const LeadCaptureForm = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [leadId, setLeadId] = useState<string | null>(null)
  
  // Função para aplicar máscara de telefone
  const formatPhoneNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, '')
    const match = cleaned.match(/^(\d{0,2})(\d{0,5})(\d{0,4})$/)
    if (match) {
      const formatted = !match[2] ? match[1] : 
        `(${match[1]}) ${match[2]}${match[3] ? `-${match[3]}` : ''}`
      return formatted
    }
    return value
  }
  
  const { register, handleSubmit, watch, setValue, formState: { errors }, trigger } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nps: 0,
      lgpd: false,
    }
  })

  const watchNps = watch('nps')
  const watchNome = watch('nome')
  const watchEmail = watch('email')
  const watchWhatsapp = watch('whatsapp')
  const watchArea = watch('area_atuacao')
  const watchDesafios = watch('desafios')
  const watchPerguntas = watch('perguntas_palestrante')

  // Auto-save functionality
  useEffect(() => {
    const saveData = async () => {
      if (!watchNome && !watchEmail && !watchWhatsapp) return

      try {
        const dataToSave = {
          nome: watchNome,
          email: watchEmail,
          whatsapp: watchWhatsapp,
          nps: watchNps,
          area_atuacao: watchArea,
          desafios: watchDesafios,
          perguntas_palestrante: watchPerguntas,
          etapa_atual: currentStep,
          data_ultima_atualizacao: new Date().toISOString()
        }

        if (leadId) {
          await supabase
            .from('leads_reforma_tributaria')
            .update(dataToSave)
            .eq('id', leadId)
        } else {
          try {
            const { data, error } = await supabase
              .from('leads_reforma_tributaria')
              .insert([dataToSave])
              .select()
            
            if (data && data[0]) {
              setLeadId(data[0].id)
            }
          } catch (error) {
            // Handle demo mode or connection errors
            console.log('Demo mode: Dados salvos localmente')
            if (!leadId) {
              setLeadId('demo-' + Date.now())
            }
          }
        }
      } catch (error) {
        console.error('Erro ao salvar dados:', error)
      }
    }

    const timeoutId = setTimeout(saveData, 2000) // Save after 2 seconds of inactivity
    return () => clearTimeout(timeoutId)
  }, [watchNome, watchEmail, watchWhatsapp, watchNps, watchArea, watchDesafios, watchPerguntas, currentStep, leadId])

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    
    try {
      // Update final data
      if (leadId) {
        try {
          await supabase
            .from('leads_reforma_tributaria')
            .update({
              ...data,
              etapa_completa: true,
              data_envio: new Date().toISOString()
            })
            .eq('id', leadId)
        } catch (error) {
          console.log('Demo mode: Final submission')
        }
      }

      // Show comprehensive thank you messages
      toast.success('🎉 Obrigado por compartilhar suas informações!', {
        description: 'Seu material exclusivo está pronto para download.'
      })
      
      toast.info('📧 Em breve você receberá mais informações no email cadastrado', {
        description: 'Fique atento à sua caixa de entrada!'
      })

      setShowSuccess(true)
    } catch (error) {
      toast.error('❌ Erro ao enviar formulário. Tente novamente.')
      console.error('Erro:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const nextStep = async () => {
    const fieldsToValidate = currentStep === 1 ? ['nome', 'email', 'whatsapp', 'nps', 'lgpd'] : ['area_atuacao', 'desafios', 'perguntas_palestrante']
    const isValid = await trigger(fieldsToValidate as any)
    
    if (isValid) {
      setCurrentStep(2)
    }
  }

  const prevStep = () => {
    setCurrentStep(1)
  }

  if (showSuccess) {
    return (
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 md:p-8 shadow-2xl text-center animate-fade-in border border-green-200">
        <div className="text-5xl md:text-6xl mb-4 animate-bounce">🎉</div>
        <h3 className="text-xl md:text-2xl font-bold text-green-800 mb-3">
          Muito Obrigado! 🙏
        </h3>
        <div className="bg-white rounded-lg p-4 mb-6 border border-green-100">
          <p className="text-green-700 mb-3 text-sm md:text-base leading-relaxed">
            <strong>Parabéns!</strong> Seu cadastro foi realizado com sucesso e seu material exclusivo está pronto para download.
          </p>
          <p className="text-green-600 text-sm md:text-base mb-2">
            📧 <strong>Importante:</strong> Em breve você receberá mais informações e novidades sobre a Reforma Tributária no email cadastrado.
          </p>
          <p className="text-green-600 text-xs md:text-sm">
            💡 <strong>Dica:</strong> Fique atento à sua caixa de entrada e não deixe de aproveitar todo o conteúdo exclusivo que preparamos para você!
          </p>
        </div>
        
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-green-800 mb-3">Seu Próximo Passo:</h4>
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
            <p className="text-blue-800 font-medium mb-2">📚 Baixe agora seu material completo:</p>
            <p className="text-blue-700 text-sm mb-3">
              Um guia exclusivo com tudo o que você precisa saber sobre a Reforma Tributária e seus impactos.
            </p>
            <a
              href="https://drive.google.com/file/d/1BP8KXsooNvj5-EOOkAFZHK11iDIiqzen/view?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold text-base md:text-lg px-6 md:px-8 py-3 md:py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <span className="mr-2">📄</span>
              Baixar Material Completo (PDF)
            </a>
          </div>
        </div>

        <div className="bg-yellow-50 rounded-lg p-3 border border-yellow-200">
          <p className="text-yellow-800 text-xs md:text-sm font-medium">
            ⚡ O download começará automaticamente em alguns segundos
          </p>
          <p className="text-yellow-700 text-xs mt-1">
            Caso não inicie automaticamente, clique no botão acima.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-br from-white to-blue-50 rounded-xl p-3 md:p-4 shadow-lg border border-blue-100">
      {/* Progress Bar */}
      {currentStep === 2 && (
        <div className="mb-3 md:mb-4">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium text-blue-600">Progresso</span>
            <span className="text-xs font-bold text-blue-600">50%</span>
          </div>
          <div className="w-full bg-blue-100 rounded-full h-1">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-1 rounded-full w-1/2 transition-all duration-300"></div>
          </div>
          <p className="text-center text-blue-600 font-medium mt-1 text-xs">🎯 Quase lá!</p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 md:space-y-4">
        {/* Step 1 */}
        {currentStep === 1 && (
          <div className="space-y-3 md:space-y-4 animate-fade-in">

            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Nome Completo *
              </label>
              <input
                {...register('nome')}
                type="text"
                className="w-full px-3 py-2 border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white shadow-sm text-sm"
                placeholder="Seu nome completo"
              />
              {errors.nome && (
                <p className="text-red-500 text-sm mt-1">{errors.nome.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Email *
              </label>
              <input
                {...register('email')}
                type="email"
                className="w-full px-3 py-2 border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white shadow-sm text-sm"
                placeholder="seu@email.com"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* WhatsApp */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                WhatsApp *
              </label>
              <input
                {...register('whatsapp')}
                type="tel"
                className="w-full px-3 py-2 border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white shadow-sm text-sm"
                placeholder="(00) 00000-0000"
                onInput={(e) => {
                  const target = e.target as HTMLInputElement
                  target.value = formatPhoneNumber(target.value)
                }}
                maxLength={15}
              />
              {errors.whatsapp && (
                <p className="text-red-500 text-sm mt-1">{errors.whatsapp.message}</p>
              )}
            </div>

            {/* NPS Rating */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Como você avalia o conteúdo da palestra? *</label>
              <div className="flex justify-center space-x-1 mb-2">
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((number) => (
                  <button
                    key={number}
                    type="button"
                    onClick={() => setValue('nps', number)}
                    className={`w-7 h-7 md:w-8 md:h-8 rounded-full font-bold text-xs md:text-sm transition-all duration-200 ${
                      watchNps === number
                        ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white scale-110 shadow-lg'
                        : 'bg-slate-200 text-slate-700 hover:bg-slate-300 hover:scale-105'
                    }`}
                  >
                    {number}
                  </button>
                ))}
              </div>
              <div className="flex justify-between text-xs text-slate-500 px-1">
                <span className="text-red-500">Ruim</span>
                <span className="text-green-600">Ótimo</span>
              </div>
              {errors.nps && (
                <p className="text-red-500 text-xs mt-1 text-center">{errors.nps.message}</p>
              )}
            </div>

            {/* NPS Comment */}
            {watchNps > 0 && (
              <div className="animate-fade-in">
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Por que essa nota? (opcional)
                </label>
                <textarea
                  {...register('nps_comentario')}
                  rows={2}
                  className="w-full px-2 py-1 border border-slate-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white text-xs"
                  placeholder="Motivo da nota..."
                />
              </div>
            )}

            {/* LGPD */}
            <div className="space-y-2">
              <div className="flex items-start space-x-2">
                <input
                  {...register('lgpd')}
                  type="checkbox"
                  className="mt-0.5 w-3 h-3 text-blue-600 border-slate-300 rounded"
                />
                <label className="text-xs text-slate-600 leading-tight">
                  Concordo com os <Link to="/terms" className="text-blue-600 hover:underline">termos</Link> e{' '}
                  <Link to="/terms" className="text-blue-600 hover:underline">privacidade</Link> *
                </label>
              </div>
              {errors.lgpd && (
                <p className="text-red-500 text-xs">{errors.lgpd.message}</p>
              )}

              
            </div>

            <button
              type="button"
              onClick={nextStep}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-2 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md text-sm"
            >Continuar →</button>
          </div>
        )}

        {/* Step 2 */}
        {currentStep === 2 && (
          <div className="space-y-3 md:space-y-4 animate-fade-in">

            {/* Area of Expertise */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Área de atuação *
              </label>
              <select
                {...register('area_atuacao')}
                className="w-full px-3 py-2 border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white shadow-sm text-sm"
              >
                <option value="">Selecione sua área</option>
                <option value="contabilidade">Contabilidade</option>
                <option value="direito-tributario">Direito Tributário</option>
                <option value="gestao-fiscal">Gestão Fiscal</option>
                <option value="imobiliario">Setor Imobiliário</option>
                <option value="financeiro">Financeiro</option>
                <option value="empresario">Empresário</option>
                <option value="estudante">Estudante</option>
                <option value="outro">Outro</option>
              </select>
              {errors.area_atuacao && (
                <p className="text-red-500 text-xs mt-1">{errors.area_atuacao.message}</p>
              )}
            </div>

            {/* Challenges */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Principais desafios na sua área? *
              </label>
              <textarea
                {...register('desafios')}
                rows={2}
                className="w-full px-3 py-2 border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white shadow-sm text-sm"
                placeholder="Descreva os principais desafios que você enfrenta..."
              />
              {errors.desafios && (
                <p className="text-red-500 text-xs mt-1">{errors.desafios.message}</p>
              )}
            </div>

            {/* Questions for Speaker */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Perguntas para o palestrante? *
              </label>
              <textarea
                {...register('perguntas_palestrante')}
                rows={2}
                className="w-full px-3 py-2 border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white shadow-sm text-sm"
                placeholder="Quais dúvidas você gostaria de esclarecer?..."
              />
              {errors.perguntas_palestrante && (
                <p className="text-red-500 text-xs mt-1">{errors.perguntas_palestrante.message}</p>
              )}
            </div>

            <div className="flex space-x-2 pt-2">
              <button
                type="button"
                onClick={prevStep}
                className="flex-1 bg-gradient-to-r from-slate-400 to-slate-500 hover:from-slate-500 hover:to-slate-600 text-white font-medium py-2 rounded-lg transition-all duration-300 text-sm"
              >
                ← Voltar
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                aria-label="Baixar material gratuito"
                className="flex-1 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:from-slate-400 disabled:to-slate-400 text-white font-semibold py-2 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:transform-none shadow-lg hover:shadow-emerald-500/40 ring-2 ring-emerald-300/40 focus-visible:outline-none focus-visible:ring-4 text-sm"
              >
                <span className="text-base">📥</span>
                {isSubmitting ? 'Enviando...' : 'Baixar Material'}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  )
}

export default LeadCaptureForm
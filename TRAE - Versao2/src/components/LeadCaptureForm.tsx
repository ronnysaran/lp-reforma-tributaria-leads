import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { IMaskInput } from 'react-imask'
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
  comunicacoes: z.boolean().optional()
})

type FormData = z.infer<typeof formSchema>

const LeadCaptureForm = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [leadId, setLeadId] = useState<string | null>(null)
  
  const { register, handleSubmit, watch, setValue, formState: { errors }, trigger } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nps: 0,
      lgpd: false,
      comunicacoes: false
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

      setShowSuccess(true)
      toast.success('✅ Cadastro realizado com sucesso!')
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
      <div className="bg-white rounded-2xl p-8 shadow-2xl text-center animate-fade-in">
        <div className="text-6xl mb-4">🎉</div>
        <h3 className="text-2xl font-bold text-gray-800 mb-4">
          Parabéns! Seu material está pronto!
        </h3>
        <p className="text-gray-600 mb-8">
          Obrigado por compartilhar suas informações. Clique no botão abaixo para baixar seu material exclusivo.
        </p>
        <a
          href="/material-reforma-tributaria-desttrava-brasil.html"
          download="material-reforma-tributaria-desttrava-brasil.html"
          className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white font-bold text-lg px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          <span className="mr-2">📄</span>
          Baixar Material Completo (PDF)
        </a>
        <p className="text-sm text-gray-500 mt-4">
          O download começará automaticamente em alguns segundos
        </p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl p-8 shadow-2xl">
      {/* Progress Bar */}
      {currentStep === 2 && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-blue-600">Progresso</span>
            <span className="text-sm font-bold text-blue-600">50%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full w-1/2 transition-all duration-300"></div>
          </div>
          <p className="text-center text-blue-600 font-semibold mt-2">Quase lá!</p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Step 1 */}
        {currentStep === 1 && (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-gray-800">Dados Básicos</h3>
              <p className="text-gray-600">Preencha seus dados para acessar o material</p>
            </div>

            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nome Completo *
              </label>
              <input
                {...register('nome')}
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Seu nome completo"
              />
              {errors.nome && (
                <p className="text-red-500 text-sm mt-1">{errors.nome.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email *
              </label>
              <input
                {...register('email')}
                type="email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="seu@email.com"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* WhatsApp */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                WhatsApp *
              </label>
              <IMaskInput
                {...register('whatsapp')}
                mask="(00) 00000-0000"
                type="tel"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="(00) 00000-0000"
              />
              {errors.whatsapp && (
                <p className="text-red-500 text-sm mt-1">{errors.whatsapp.message}</p>
              )}
            </div>

            {/* NPS Rating */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Como você avalia a palestra sobre Reforma Tributária? *
              </label>
              <div className="flex justify-center space-x-2 mb-4">
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((number) => (
                  <button
                    key={number}
                    type="button"
                    onClick={() => setValue('nps', number)}
                    className={`w-10 h-10 rounded-full font-bold transition-all ${
                      watchNps === number
                        ? 'bg-blue-600 text-white scale-110'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {number}
                  </button>
                ))}
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>Péssimo</span>
                <span>Excelente</span>
              </div>
              {errors.nps && (
                <p className="text-red-500 text-sm mt-2 text-center">{errors.nps.message}</p>
              )}
            </div>

            {/* NPS Comment */}
            {watchNps > 0 && (
              <div className="animate-fade-in">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Por que você deu essa nota? (opcional)
                </label>
                <textarea
                  {...register('nps_comentario')}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Conte-nos o motivo da sua avaliação..."
                />
              </div>
            )}

            {/* LGPD */}
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <input
                  {...register('lgpd')}
                  type="checkbox"
                  className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label className="text-sm text-gray-700">
                  Concordo com os <a href="#" className="text-blue-600 hover:underline">termos de uso</a> e{' '}
                  <a href="#" className="text-blue-600 hover:underline">política de privacidade</a> *
                </label>
              </div>
              {errors.lgpd && (
                <p className="text-red-500 text-sm">{errors.lgpd.message}</p>
              )}

              <div className="flex items-start space-x-3">
                <input
                  {...register('comunicacoes')}
                  type="checkbox"
                  className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label className="text-sm text-gray-700">
                  Desejo receber comunicações sobre Reforma Tributária e outros conteúdos do Destrava Brasil
                </label>
              </div>
            </div>

            <button
              type="button"
              onClick={nextStep}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              Avançar →
            </button>
          </div>
        )}

        {/* Step 2 */}
        {currentStep === 2 && (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-gray-800">Complete seu cadastro</h3>
              <p className="text-gray-600">Queremos conhecer você melhor</p>
            </div>

            {/* Area of Expertise */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Área de atuação *
              </label>
              <select
                {...register('area_atuacao')}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
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
                <p className="text-red-500 text-sm mt-1">{errors.area_atuacao.message}</p>
              )}
            </div>

            {/* Challenges */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quais são seus principais desafios na sua área hoje? *
              </label>
              <textarea
                {...register('desafios')}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Descreva os principais desafios que você enfrenta..."
              />
              {errors.desafios && (
                <p className="text-red-500 text-sm mt-1">{errors.desafios.message}</p>
              )}
            </div>

            {/* Questions for Speaker */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Se você pudesse ter 1h de conversa com o Palestrante, quais perguntas você gostaria de fazer a ele? *
              </label>
              <textarea
                {...register('perguntas_palestrante')}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Quais dúvidas você gostaria de esclarecer?..."
              />
              {errors.perguntas_palestrante && (
                <p className="text-red-500 text-sm mt-1">{errors.perguntas_palestrante.message}</p>
              )}
            </div>

            <div className="flex space-x-4">
              <button
                type="button"
                onClick={prevStep}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-4 rounded-lg transition-all duration-300"
              >
                ← Voltar
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-bold py-4 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:transform-none"
              >
                {isSubmitting ? 'Enviando...' : 'Baixar Material Gratuito'}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  )
}

export default LeadCaptureForm
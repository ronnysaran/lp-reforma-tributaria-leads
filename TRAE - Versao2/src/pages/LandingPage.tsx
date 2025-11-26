import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Toaster } from 'sonner'
import LeadCaptureForm from '../components/LeadCaptureForm'

const LandingPage = () => {
  const [showForm, setShowForm] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(120,119,198,0.1),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,215,0,0.1),transparent_50%)]"></div>
      
      <div className="container mx-auto px-4 py-4 md:py-8 relative z-10">
        {/* Mobile-First Header - Compact for first fold */}
        <div className="text-center mb-6 md:mb-12">
          <div className="inline-block bg-gradient-to-r from-yellow-400 to-yellow-500 text-slate-900 px-3 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-bold mb-4 md:mb-6 shadow-lg animate-bounce-subtle">
            #DestravaBrasil
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-3 md:mb-6 leading-tight">
            Reforma Tributária: Baixe o Comparativo "Antes e Depois" do{' '}
            <span className="text-yellow-400">PLP 108/2024</span> e{' '}
            <span className="text-yellow-400">LC 214/2025</span>
          </h1>
          <p className="text-base md:text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed px-2">
            Entenda o que mudou na fiscalização do IBS, regras do ITCMD, Setor Imobiliário e Processo Administrativo com o material oficial do #DestravaBrasil.
          </p>
        </div>

        {/* Mobile-First CTA - Shows immediately on mobile */}
        <div className="lg:hidden mb-6">
          {!showForm && (
            <div className="text-center space-y-4">
              <button
                onClick={() => setShowForm(true)}
                className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-slate-900 font-bold text-lg md:text-xl px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-yellow-500/40 ring-2 ring-yellow-300/40 focus-visible:outline-none focus-visible:ring-4 w-full max-w-xs mx-auto block animate-float"
              >
                🎯 Quero Baixar o Material Gratuito
              </button>
              <p className="text-blue-200 text-xs md:text-sm">
                📄 PDF completo • 100% gratuito • Atualizado
              </p>
            </div>
          )}
          
          {/* Mobile Form - First fold */}
          <div className={`transition-all duration-700 ${showForm ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'}`}>
            {showForm && <LeadCaptureForm />}
          </div>
        </div>

        {/* Main Content - Desktop Layout */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Content */}
          <div className="space-y-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 glass">
              <h2 className="text-2xl font-bold text-white mb-6">
                O que você vai encontrar neste material:
              </h2>
              <ul className="space-y-4 text-blue-100">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span><strong className="text-white">Fiscalização Compartilhada:</strong> As novas regras de competência e delegação entre Estados e Municípios no Comitê Gestor.</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span><strong className="text-white">ITCMD:</strong> Mudanças críticas na base de cálculo de cotas societárias e remissão de dívidas como fato gerador.</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span><strong className="text-white">Setor Imobiliário & FIIs:</strong> O impacto nos Fundos Imobiliários, FIAGRO e novas deduções para locações residenciais.</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span><strong className="text-white">Novo Recurso Especial:</strong> A criação da ferramenta para uniformizar decisões divergentes entre o CG-IBS e a RFB.</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span><strong className="text-white">Alíquotas e Serviços Financeiros:</strong> A tabela progressiva de alíquotas de 2027 a 2033 e as travas para o Imposto Seletivo.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Side - Form or CTA Button */}
          <div className="flex items-center justify-center">
            {showForm ? (
              <div className={`transition-all duration-700 opacity-100 translate-y-0 w-full`}>
                <LeadCaptureForm />
              </div>
            ) : (
              <div className={`transition-all duration-700 opacity-100 translate-y-0 text-center`}>
                <button
                  onClick={() => setShowForm(true)}
                  className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-slate-900 font-bold text-xl px-12 py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-yellow-500/40 ring-2 ring-yellow-300/40 focus-visible:outline-none focus-visible:ring-4 animate-float"
                >
                  🎯 Quero Baixar o Material Gratuito
                </button>
                <p className="text-blue-200 text-sm mt-4">
                  📄 PDF completo • 100% gratuito • Atualizado com as últimas mudanças
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-8 md:mt-16 text-center">
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 text-blue-200 text-sm md:text-base">
            <div className="flex items-center space-x-1 md:space-x-2">
              <span className="text-lg md:text-2xl">🔒</span>
              <span>Seus dados estão protegidos</span>
            </div>
            <div className="flex items-center space-x-1 md:space-x-2">
              <span className="text-lg md:text-2xl">📧</span>
              <span>Não enviamos spam</span>
            </div>
            <div className="flex items-center space-x-1 md:space-x-2">
              <span className="text-lg md:text-2xl">⚡</span>
              <span>Download instantâneo</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 md:mt-20 text-center border-t border-white/20 pt-6 md:pt-8">
          <div className="flex flex-col md:flex-row justify-center items-center gap-2 md:gap-6 text-blue-300 text-xs md:text-sm">
            <span className="text-white/60">© 2024 Destrava Brasil</span>
            <div className="flex gap-4 md:gap-6">
              <Link to="/terms" className="hover:text-yellow-400 transition-colors duration-200">
                Termos de Uso
              </Link>
              <Link to="/terms" className="hover:text-yellow-400 transition-colors duration-200">
                Política de Privacidade
              </Link>
            </div>
          </div>
          <p className="text-blue-400/60 text-xs mt-3">
            Seus dados estão protegidos conforme a Lei Geral de Proteção de Dados (LGPD)
          </p>
        </div>
      </div>

      <Toaster position="top-right" />
    </div>
  )
}

export default LandingPage
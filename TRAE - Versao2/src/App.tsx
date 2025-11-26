import { useState } from 'react'
import { Toaster } from 'sonner'
import LeadCaptureForm from './components/LeadCaptureForm'

function App() {
  const [showForm, setShowForm] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block bg-yellow-400 text-blue-900 px-4 py-2 rounded-full text-sm font-bold mb-6">
            #DestravaBrasil
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Reforma Tributária: Baixe o Comparativo "Antes e Depois" do{' '}
            <span className="text-yellow-400">PLP 108/2024</span> e{' '}
            <span className="text-yellow-400">LC 214/2025</span>
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Entenda o que mudou na fiscalização do IBS, regras do ITCMD, Setor Imobiliário e Processo Administrativo com o material oficial do #DestravaBrasil.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Content */}
          <div className="space-y-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
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

            {/* CTA Button */}
            {!showForm && (
              <div className="text-center">
                <button
                  onClick={() => setShowForm(true)}
                  className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold text-xl px-12 py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-2xl"
                >
                  🎯 Quero Baixar o Material Gratuito
                </button>
                <p className="text-blue-200 text-sm mt-4">
                  📄 PDF completo • 100% gratuito • Atualizado com as últimas mudanças
                </p>
              </div>
            )}
          </div>

          {/* Right Side - Form */}
          <div className={`transition-all duration-700 ${showForm ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'}`}>
            {showForm && <LeadCaptureForm />}
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <div className="flex flex-wrap justify-center items-center gap-8 text-blue-200">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🔒</span>
              <span>Seus dados estão protegidos</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-2xl">📧</span>
              <span>Não enviamos spam</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-2xl">⚡</span>
              <span>Download instantâneo</span>
            </div>
          </div>
        </div>
      </div>

      <Toaster position="top-right" />
    </div>
  )
}

export default App
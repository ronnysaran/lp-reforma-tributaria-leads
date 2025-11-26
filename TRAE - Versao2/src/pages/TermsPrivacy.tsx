import { ArrowLeft } from 'lucide-react'

const TermsPrivacy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <a 
            href="/" 
            className="inline-flex items-center text-blue-300 hover:text-blue-200 transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar para Home
          </a>
          <div className="inline-block bg-gradient-to-r from-yellow-400 to-yellow-500 text-slate-900 px-4 py-2 rounded-full text-sm font-bold mb-4">
            #DestravaBrasil
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Política de Privacidade e Termos de Uso de Dados
          </h1>
          <p className="text-blue-200 text-lg">
            Plataforma: Destrava Brasil – Atualizada em 26 de Novembro de 2024
          </p>
        </div>

        {/* Content */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/20">
          <div className="prose prose-invert prose-blue max-w-none text-blue-100">
            
            <section className="mb-8">
              <h2 className="text-xl md:text-2xl font-bold text-white mb-4">
                1. Introdução e Compromisso
              </h2>
              <p className="text-blue-100 leading-relaxed">
                O Destrava Brasil ("Nós" ou "Controlador") tem o compromisso de proteger a privacidade e os dados pessoais de seus usuários ("Você" ou "Titular"), em estrita conformidade com a Lei Geral de Proteção de Dados Pessoais (Lei nº 13.709/2018 - "LGPD").
              </p>
              <p className="text-blue-100 leading-relaxed mt-4">
                Este documento detalha como coletamos, utilizamos, armazenamos e compartilhamos seus dados ao interagir com nossas páginas de captura, site e materiais promocionais. Ao fornecer seus dados pessoais, você declara ciência e aceite pleno das condições aqui expostas.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl md:text-2xl font-bold text-white mb-4">
                2. Dados Coletados
              </h2>
              <p className="text-blue-100 mb-4">
                Para viabilizar a entrega de nossos conteúdos e comunicações, coletamos duas categorias de dados:
              </p>
              
              <h3 className="text-lg font-semibold text-white mb-2">2.1. Dados fornecidos por você:</h3>
              <ul className="list-disc list-inside text-blue-100 space-y-2 mb-4">
                <li><strong>Informações de identificação:</strong> Nome completo, e-mail, número de telefone (WhatsApp).</li>
                <li><strong>Informações profissionais (opcionais):</strong> Cargo, nome da empresa e segmento de atuação.</li>
              </ul>

              <h3 className="text-lg font-semibold text-white mb-2">2.2. Dados coletados automaticamente:</h3>
              <ul className="list-disc list-inside text-blue-100 space-y-2 mb-4">
                <li><strong>Informações de navegação:</strong> Endereço IP, tipo de navegador, geolocalização aproximada, tempo de permanência na página e histórico de interações com nossos e-mails (aberturas e cliques).</li>
                <li><strong>Cookies e Pixels:</strong> Utilizamos tecnologias de monitoramento (como Pixel do Facebook e Google Analytics) para entender seus interesses e personalizar a publicidade exibida a você.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl md:text-2xl font-bold text-white mb-4">
                3. Finalidade e Base Legal do Tratamento
              </h2>
              <p className="text-blue-100 mb-4">
                Nós tratamos seus dados fundamentados nas seguintes bases legais da LGPD:
              </p>
              <ul className="list-disc list-inside text-blue-100 space-y-2 mb-4">
                <li><strong>Execução de Contrato e Procedimentos Preliminares:</strong> Para entregar o material (e-book, webinar, aula) que você solicitou.</li>
                <li><strong>Consentimento (Art. 7º, I, LGPD):</strong> Para o envio de marketing, promoções e compartilhamento de dados com parceiros.</li>
                <li><strong>Legítimo Interesse (Art. 7º, IX, LGPD):</strong> Para análises estatísticas, melhoria de nossos serviços e apoio e promoção das atividades do controlador.</li>
              </ul>
              <p className="text-blue-100 leading-relaxed">
                Os dados serão utilizados especificamente para: Enviar conteúdos informativos, newsletters e materiais educacionais. Realizar contatos comerciais via e-mail ou WhatsApp sobre produtos e serviços do Destrava Brasil. Personalizar anúncios (remarketing) em redes sociais e sites parceiros.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl md:text-2xl font-bold text-white mb-4">
                4. Compartilhamento de Dados com Terceiros
              </h2>
              <p className="text-blue-100 mb-4">
                A transparência é fundamental. Ao aceitar esta política, você autoriza expressamente o compartilhamento dos seus dados nas seguintes situações:
              </p>
              <ul className="list-disc list-inside text-blue-100 space-y-2 mb-4">
                <li><strong>Empresas do Grupo e Parceiros Estratégicos:</strong> Seus dados de contato poderão ser compartilhados com empresas parceiras selecionadas pelo Destrava Brasil, com o objetivo de oferecer produtos, serviços ou oportunidades de negócios que complementem o seu perfil e interesse.</li>
                <li><strong>Fornecedores de Tecnologia:</strong> Utilizamos ferramentas de terceiros para processamento de dados (ex: plataformas de automação de marketing, gateways de pagamento e servidores de hospedagem). Esses parceiros atuam como "Operadores" e seguem nossas diretrizes de segurança.</li>
                <li><strong>Obrigação Legal:</strong> Mediante requisição judicial ou de autoridade competente.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl md:text-2xl font-bold text-white mb-4">
                5. Transferência Internacional de Dados
              </h2>
              <p className="text-blue-100 leading-relaxed">
                Alguns de nossos fornecedores (como servidores de nuvem e plataformas de e-mail marketing) podem estar localizados fora do Brasil. Nesses casos, garantimos que a transferência ocorra apenas para países que possuam leis de proteção de dados adequadas ou mediante garantias contratuais de segurança, em conformidade com a LGPD.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl md:text-2xl font-bold text-white mb-4">
                6. Seus Direitos como Titular (Art. 18 da LGPD)
              </h2>
              <p className="text-blue-100 mb-4">
                Você possui pleno controle sobre seus dados e pode, a qualquer momento, solicitar:
              </p>
              <ul className="list-disc list-inside text-blue-100 space-y-2 mb-4">
                <li>A confirmação da existência de tratamento de dados.</li>
                <li>O acesso aos dados que possuímos sobre você.</li>
                <li>A correção de dados incompletos, inexatos ou desatualizados.</li>
                <li>A revogação do consentimento: Você pode optar por não receber mais nossas comunicações clicando no link de "descadastro" (unsubscribe) presente em todos os nossos e-mails, ou solicitando a exclusão do compartilhamento com parceiros.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl md:text-2xl font-bold text-white mb-4">
                7. Segurança e Retenção
              </h2>
              <p className="text-blue-100 leading-relaxed">
                Armazenamos seus dados em ambientes seguros, utilizando criptografia e protocolos de segurança de mercado para prevenir acessos não autorizados. Manteremos seus dados armazenados: Pelo tempo necessário para cumprir as finalidades descritas nesta política. Até que você solicite a exclusão (revogação de consentimento), ressalvada a guarda para cumprimento de obrigação legal.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl md:text-2xl font-bold text-white mb-4">
                8. Disposições Gerais e Contato
              </h2>
              <p className="text-blue-100 mb-4">
                Esta política pode ser atualizada a qualquer momento para refletir mudanças na legislação ou em nossas práticas comerciais.
              </p>
              <p className="text-blue-100 leading-relaxed">
                Para exercer seus direitos ou esclarecer dúvidas sobre esta Política de Privacidade, entre em contato com nosso Encarregado de Proteção de Dados (DPO) através do canal: <strong>E-mail: contato@destravabrasil.com.br</strong>
              </p>
            </section>

          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <div className="inline-block bg-gradient-to-r from-yellow-400 to-yellow-500 text-slate-900 px-6 py-3 rounded-full font-bold">
            #DestravaBrasil - Transformando o Conhecimento Tributário
          </div>
        </div>
      </div>
    </div>
  )
}

export default TermsPrivacy
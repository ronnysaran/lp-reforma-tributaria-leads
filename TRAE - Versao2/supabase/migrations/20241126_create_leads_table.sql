-- Create leads_reforma_tributaria table
CREATE TABLE IF NOT EXISTS public.leads_reforma_tributaria (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    whatsapp VARCHAR(20) NOT NULL,
    nps INTEGER CHECK (nps >= 0 AND nps <= 10),
    nps_comentario TEXT,
    area_atuacao VARCHAR(100) NOT NULL,
    desafios TEXT NOT NULL,
    perguntas_palestrante TEXT NOT NULL,
    lgpd BOOLEAN DEFAULT FALSE NOT NULL,
    comunicacoes BOOLEAN DEFAULT FALSE,
    etapa_atual INTEGER DEFAULT 1,
    etapa_completa BOOLEAN DEFAULT FALSE,
    data_ultima_atualizacao TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    data_envio TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_leads_email ON public.leads_reforma_tributaria(email);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON public.leads_reforma_tributaria(created_at);
CREATE INDEX IF NOT EXISTS idx_leads_etapa_completa ON public.leads_reforma_tributaria(etapa_completa);

-- Enable Row Level Security
ALTER TABLE public.leads_reforma_tributaria ENABLE ROW LEVEL SECURITY;

-- Create policies for anon and authenticated roles
CREATE POLICY "Permitir leitura pública para leads completos" ON public.leads_reforma_tributaria
    FOR SELECT USING (etapa_completa = TRUE);

CREATE POLICY "Permitir inserção para todos" ON public.leads_reforma_tributaria
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Permitir atualização para todos" ON public.leads_reforma_tributaria
    FOR UPDATE USING (true);

-- Grant permissions
GRANT SELECT ON public.leads_reforma_tributaria TO anon;
GRANT INSERT ON public.leads_reforma_tributaria TO anon;
GRANT UPDATE ON public.leads_reforma_tributaria TO anon;

GRANT SELECT ON public.leads_reforma_tributaria TO authenticated;
GRANT INSERT ON public.leads_reforma_tributaria TO authenticated;
GRANT UPDATE ON public.leads_reforma_tributaria TO authenticated;
GRANT DELETE ON public.leads_reforma_tributaria TO authenticated;
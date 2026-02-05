-- =====================================================
-- FASE 1: Estrutura do Banco de Dados para Mentorias e Lucy AI
-- =====================================================

-- 1. Tabela mentorship_tiers (níveis de mentoria)
CREATE TABLE public.mentorship_tiers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  tier_key TEXT NOT NULL UNIQUE,
  name_pt TEXT NOT NULL,
  name_en TEXT NOT NULL,
  description_pt TEXT,
  description_en TEXT,
  price TEXT,
  features_pt JSONB DEFAULT '[]'::jsonb,
  features_en JSONB DEFAULT '[]'::jsonb,
  is_available BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 2. Tabela mentorship_leads (leads qualificados)
CREATE TABLE public.mentorship_leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  interest_tier TEXT REFERENCES public.mentorship_tiers(tier_key),
  qualification_score INTEGER DEFAULT 0,
  conversation JSONB DEFAULT '[]'::jsonb,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'qualified', 'contacted', 'converted', 'archived')),
  qualified_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 3. Tabela lucy_knowledge (base de conhecimento da Lucy)
CREATE TABLE public.lucy_knowledge (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  category TEXT NOT NULL,
  question_pt TEXT NOT NULL,
  question_en TEXT NOT NULL,
  answer_pt TEXT NOT NULL,
  answer_en TEXT NOT NULL,
  priority INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 4. Tabela site_settings (configurações do site)
CREATE TABLE public.site_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  value JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_by UUID REFERENCES auth.users(id)
);

-- 5. Tabela lucy_conversations (conversas da Lucy)
CREATE TABLE public.lucy_conversations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT NOT NULL,
  messages JSONB DEFAULT '[]'::jsonb,
  user_info JSONB DEFAULT '{}'::jsonb,
  lead_id UUID REFERENCES public.mentorship_leads(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- =====================================================
-- TRIGGERS para updated_at automático
-- =====================================================

CREATE TRIGGER update_mentorship_tiers_updated_at
  BEFORE UPDATE ON public.mentorship_tiers
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_mentorship_leads_updated_at
  BEFORE UPDATE ON public.mentorship_leads
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_lucy_knowledge_updated_at
  BEFORE UPDATE ON public.lucy_knowledge
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_site_settings_updated_at
  BEFORE UPDATE ON public.site_settings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_lucy_conversations_updated_at
  BEFORE UPDATE ON public.lucy_conversations
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- =====================================================
-- ROW LEVEL SECURITY
-- =====================================================

-- Habilitar RLS em todas as tabelas
ALTER TABLE public.mentorship_tiers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mentorship_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lucy_knowledge ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lucy_conversations ENABLE ROW LEVEL SECURITY;

-- MENTORSHIP_TIERS: SELECT público, INSERT/UPDATE/DELETE apenas admin
CREATE POLICY "Anyone can view mentorship tiers"
  ON public.mentorship_tiers
  FOR SELECT
  USING (true);

CREATE POLICY "Admins can insert mentorship tiers"
  ON public.mentorship_tiers
  FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update mentorship tiers"
  ON public.mentorship_tiers
  FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete mentorship tiers"
  ON public.mentorship_tiers
  FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- MENTORSHIP_LEADS: Apenas admin pode ver e gerenciar
CREATE POLICY "Admins can view all leads"
  ON public.mentorship_leads
  FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert leads"
  ON public.mentorship_leads
  FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update leads"
  ON public.mentorship_leads
  FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete leads"
  ON public.mentorship_leads
  FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- LUCY_KNOWLEDGE: SELECT público, INSERT/UPDATE/DELETE apenas admin
CREATE POLICY "Anyone can view lucy knowledge"
  ON public.lucy_knowledge
  FOR SELECT
  USING (true);

CREATE POLICY "Admins can insert lucy knowledge"
  ON public.lucy_knowledge
  FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update lucy knowledge"
  ON public.lucy_knowledge
  FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete lucy knowledge"
  ON public.lucy_knowledge
  FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- SITE_SETTINGS: SELECT público, UPDATE apenas admin
CREATE POLICY "Anyone can view site settings"
  ON public.site_settings
  FOR SELECT
  USING (true);

CREATE POLICY "Admins can insert site settings"
  ON public.site_settings
  FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update site settings"
  ON public.site_settings
  FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- LUCY_CONVERSATIONS: INSERT público (via service role), SELECT apenas admin
CREATE POLICY "Admins can view all conversations"
  ON public.lucy_conversations
  FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Anyone can insert conversations"
  ON public.lucy_conversations
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can update conversations"
  ON public.lucy_conversations
  FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- =====================================================
-- DADOS INICIAIS
-- =====================================================

-- Inserir tiers iniciais
INSERT INTO public.mentorship_tiers (tier_key, name_pt, name_en, description_pt, description_en, price, features_pt, features_en, display_order) VALUES
('strategic_insight', 'Consultoria Pontual', 'Strategic Insight', 
 'Sessão estratégica para resolver desafios específicos do seu negócio digital.',
 'Strategic session to solve specific challenges in your digital business.',
 'R$ 497',
 '["1 sessão de 60 minutos", "Análise do cenário atual", "Plano de ação personalizado", "Follow-up por email"]'::jsonb,
 '["1 x 60-minute session", "Current scenario analysis", "Personalized action plan", "Email follow-up"]'::jsonb,
 1),
('ecosystem_builder', 'Mentoria de Ecossistema', 'Ecosystem Builder',
 'Acompanhamento mensal para construir e escalar seu ecossistema digital.',
 'Monthly mentorship to build and scale your digital ecosystem.',
 'R$ 1.997/mês',
 '["4 sessões mensais de 45 minutos", "Acesso prioritário via WhatsApp", "Revisão de projetos e estratégias", "Networking com outros mentorados"]'::jsonb,
 '["4 monthly 45-minute sessions", "Priority WhatsApp access", "Project and strategy review", "Networking with other mentees"]'::jsonb,
 2),
('private_partnership', 'Parceria Privada', 'Private Partnership',
 'Consultoria exclusiva para projetos de alto impacto com dedicação total.',
 'Exclusive consulting for high-impact projects with full dedication.',
 'Sob consulta',
 '["Dedicação personalizada", "Acesso direto e ilimitado", "Participação estratégica no projeto", "Resultados compartilhados"]'::jsonb,
 '["Personalized dedication", "Direct and unlimited access", "Strategic project participation", "Shared results"]'::jsonb,
 3);

-- Inserir configurações iniciais
INSERT INTO public.site_settings (key, value) VALUES
('maintenance_mode', '{"enabled": false}'::jsonb),
('mentorship_availability', '{"strategic_insight": true, "ecosystem_builder": true, "private_partnership": true}'::jsonb),
('lucy_enabled', '{"enabled": true}'::jsonb);

-- Inserir conhecimento inicial da Lucy
INSERT INTO public.lucy_knowledge (category, question_pt, question_en, answer_pt, answer_en, priority) VALUES
('servicos', 'Quais são os serviços oferecidos?', 'What services are offered?',
 'O Nauiter Master oferece três níveis de mentoria: Consultoria Pontual para desafios específicos, Mentoria de Ecossistema para acompanhamento mensal, e Parceria Privada para projetos exclusivos.',
 'Nauiter Master offers three mentorship levels: Strategic Insight for specific challenges, Ecosystem Builder for monthly guidance, and Private Partnership for exclusive projects.',
 100),
('experiencia', 'Qual é a experiência do Nauiter Master?', 'What is Nauiter Master''s experience?',
 'Com mais de 10 anos de experiência em desenvolvimento e estratégia digital, incluindo passagens por Google e Blizzard Entertainment, além de múltiplos projetos próprios no ecossistema Sweet Life.',
 'With over 10 years of experience in development and digital strategy, including roles at Google and Blizzard Entertainment, plus multiple personal projects in the Sweet Life ecosystem.',
 90),
('agendamento', 'Como posso agendar uma sessão?', 'How can I schedule a session?',
 'Para agendar, primeiro me conte um pouco sobre seu projeto e objetivos. Assim posso indicar o melhor formato de mentoria para você.',
 'To schedule, first tell me a bit about your project and goals. This way I can recommend the best mentorship format for you.',
 80);
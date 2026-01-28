import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { MessageCircle, Zap, TrendingUp, Users, Target, BarChart3, Award, Instagram, Facebook, Linkedin, ChevronLeft, ChevronRight } from 'lucide-react';

const CountUpMetric = ({ end, duration = 2, prefix = '', suffix = '', decimals = 0 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const increment = end / (duration * 60);
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(start);
        }
      }, 1000 / 60);
      return () => clearInterval(timer);
    }
  }, [isInView, end, duration]);

  let displayValue;
  if (decimals > 0) {
    // Para valores com decimais, formata com vírgula brasileira
    displayValue = count.toLocaleString('pt-BR', { 
      minimumFractionDigits: decimals, 
      maximumFractionDigits: decimals 
    });
  } else {
    // Para valores inteiros, formata com pontos de milhar
    displayValue = Math.floor(count).toLocaleString('pt-BR');
  }
  
  return <span ref={ref}>{prefix}{displayValue}{suffix}</span>;
};

const FadeInSection = ({ children, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 }
      }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  );
};

export default function LandingPage() {
  const headlines = [
    { text: "Escale Seu Negócio Para", highlight: "O Próximo Nível" },
    { text: "Aumente Suas Vendas Com", highlight: "Marketing de Alto Impacto" },
    { text: "Escale Sua Marca e", highlight: "Domine Seu Mercado" },
    { text: "Multiplique Seus Resultados Com", highlight: "Estratégias Vencedoras" },
    { text: "Transforme Cliques em", highlight: "Clientes Reais" }
  ];

  const [currentHeadline, setCurrentHeadline] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeadline((prev) => (prev + 1) % headlines.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const services = [
    {
      icon: <Target className="w-8 h-8" />,
      title: "Tráfego Pago",
      description: "Campanhas estratégicas que convertem. ROI mensurável, escala previsível e crescimento acelerado para seu negócio."
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Gestão de Mídias Sociais",
      description: "Presença digital que engaja e vende. Conteúdo estratégico que transforma seguidores em clientes fiéis."
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Consultoria de Marketing",
      description: "Estratégias personalizadas de branding e posicionamento. Transforme sua marca em referência no mercado."
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Sites",
      description: "Landing pages de alta conversão, sites institucionais e lojas virtuais. Design moderno e otimizado para resultados."
    }
  ];

  const resultsData = [
    {
      title: "Case 1",
      metrics: [
        { label: "Visualizações", value: 21349 },
        { label: "Alcance", value: 18679 },
        { label: "Impressões", value: 22903 },
        { label: "Valor usado", value: 232.66, prefix: "R$ ", decimals: 2 },
        { label: "Cliques", value: 734 },
        { label: "CPC", value: 0.32, prefix: "R$ ", decimals: 2 }
      ]
    },
    {
      title: "Case 2",
      metrics: [
        { label: "Alcance", value: 124473 },
        { label: "Impressões", value: 193969 },
        { label: "Valor usado", value: 1054.37, prefix: "R$ ", decimals: 2 },
        { label: "Cliques", value: 1199 },
        { label: "Visualizações", value: 206481 }
      ]
    },
    {
      title: "Case 3",
      metrics: [
        { label: "Impressões", value: 173545 },
        { label: "Cliques", value: 4733 },
        { label: "Valor usado", value: 14564.00, prefix: "R$ ", decimals: 2 },
        { label: "Receita", value: 260878.98, prefix: "R$ ", decimals: 2 },
        { label: "ROAS", value: 17.91, suffix: "x", decimals: 2 },
        { label: "CPC", value: 3.08, prefix: "R$ ", decimals: 2 }
      ]
    },
    {
      title: "Case 4",
      metrics: [
        { label: "ROAS", value: 40, suffix: "x" },
        { label: "Cliques", value: 38542 },
        { label: "Impressões", value: 2007641 },
        { label: "Valor usado", value: 136395.10, prefix: "R$ ", decimals: 2 },
        { label: "CPC", value: 3, prefix: "R$ ", decimals: 2 },
        { label: "Receita Gerada", value: 6886387.00, prefix: "R$ ", decimals: 2 }
      ]
    }
  ];

  const [currentCase, setCurrentCase] = useState(0);

  const nextCase = () => {
    setCurrentCase((prev) => (prev + 1) % resultsData.length);
  };

  const prevCase = () => {
    setCurrentCase((prev) => (prev - 1 + resultsData.length) % resultsData.length);
  };

  return (
    <div className="bg-black text-white min-h-screen overflow-hidden">
      <motion.a
        href="https://wa.me/5511988933102"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 text-white p-4 rounded-full shadow-2xl hover:bg-green-600 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute -top-1 -right-1 w-4 h-4 rounded-full"
          style={{ backgroundColor: '#f6c500' }}
        />
        <MessageCircle className="w-7 h-7" />
      </motion.a>

      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-radial from-yellow-900/20 via-black to-black" />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center max-w-5xl mx-auto"
        >
          {/* Logo */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="mb-8 flex justify-center"
          >
            <img 
              src="images/logo.png" 
              alt="Logo" 
              className="h-32 sm:h-40 lg:h-48 w-auto object-contain"
              onError={(e) => {
                console.error('Erro ao carregar logo');
                e.target.style.display = 'none';
              }}
            />
          </motion.div>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-block mb-6 px-6 py-2 rounded-full"
            style={{ 
              border: '1px solid rgba(246, 197, 0, 0.5)',
              backgroundColor: 'rgba(246, 197, 0, 0.1)'
            }}
          >
            <span className="font-semibold text-sm sm:text-base" style={{ color: '#f6c500' }}>RESULTADOS REAIS • CRESCIMENTO EXPONENCIAL</span>
          </motion.div>
          
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <motion.span
              key={currentHeadline}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="block"
            >
              {headlines[currentHeadline].text}{' '}
              <span 
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: 'linear-gradient(to right, #f6c500, rgba(246, 197, 0, 0.8))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                {headlines[currentHeadline].highlight}
              </span>
            </motion.span>
          </h1>
          
          <p className="text-lg sm:text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
            Estratégias de marketing digital que geram resultados mensuráveis. 
            Não vendemos promessas, entregamos performance.
          </p>
          
          <motion.a
            href="https://wa.me/5511988933102"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block text-black font-bold text-lg px-10 py-4 rounded-full transition-all shadow-lg"
            style={{
              backgroundColor: '#f6c500',
              boxShadow: '0 10px 40px rgba(246, 197, 0, 0.5)'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(246, 197, 0, 0.9)'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#f6c500'}
          >
            Quero Escalar Agora
          </motion.a>
        </motion.div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 rounded-full flex justify-center" style={{ borderColor: '#f6c500' }}>
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full mt-2"
              style={{ backgroundColor: '#f6c500' }}
            />
          </div>
        </motion.div>
      </section>

      {/* Client Logos */}
      <FadeInSection>
        <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ borderTop: '1px solid rgba(246, 197, 0, 0.2)', borderBottom: '1px solid rgba(246, 197, 0, 0.2)' }}>
          <div className="max-w-7xl mx-auto">
            <h3 className="text-center text-gray-400 text-sm sm:text-base font-semibold mb-12 tracking-wider">
              RESULTADOS REAIS DOS NOSSOS CLIENTES
            </h3>
            
            <div className="relative max-w-4xl mx-auto">
              {/* Carousel Container */}
              <div className="overflow-hidden">
                <motion.div
                  key={currentCase}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                  className="rounded-2xl p-8 sm:p-10 transition-all duration-300"
                  style={{
                    border: '1px solid rgba(246, 197, 0, 0.3)'
                  }}
                  onMouseEnter={(e) => e.target.style.borderColor = 'rgba(246, 197, 0, 0.6)'}
                  onMouseLeave={(e) => e.target.style.borderColor = 'rgba(246, 197, 0, 0.3)'}
                >
                  <h4 className="text-white text-2xl sm:text-3xl font-bold mb-8 text-center uppercase">
                    {resultsData[currentCase].title}
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8">
                    {resultsData[currentCase].metrics.map((metric, metricIndex) => (
                      <motion.div
                        key={metricIndex}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: metricIndex * 0.1 }}
                        className="text-center flex flex-col items-center justify-center"
                      >
                        <p className="text-gray-400 text-sm sm:text-base lg:text-lg mb-2 sm:mb-3">{metric.label}</p>
                        <p className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight" style={{ color: '#f6c500' }}>
                          <CountUpMetric 
                            end={metric.value} 
                            prefix={metric.prefix || ''} 
                            suffix={metric.suffix || ''}
                            decimals={metric.decimals || 0}
                          />
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>

              <button
                onClick={prevCase}
                className="absolute left-0 sm:left-2 top-1/2 -translate-y-1/2 -translate-x-14 sm:-translate-x-16 text-black p-2 sm:p-3 rounded-full transition-all shadow-lg z-10"
                style={{ backgroundColor: '#f6c500' }}
                onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(246, 197, 0, 0.9)'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#f6c500'}
                aria-label="Case anterior"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
              
              <button
                onClick={nextCase}
                className="absolute right-0 sm:right-2 top-1/2 -translate-y-1/2 translate-x-14 sm:translate-x-16 text-black p-2 sm:p-3 rounded-full transition-all shadow-lg z-10"
                style={{ backgroundColor: '#f6c500' }}
                onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(246, 197, 0, 0.9)'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#f6c500'}
                aria-label="Próximo case"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              {/* Indicators */}
              <div className="flex justify-center gap-2 mt-8">
                {resultsData.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentCase(index)}
                    className="w-3 h-3 rounded-full transition-all"
                    style={{
                      backgroundColor: index === currentCase ? '#f6c500' : 'rgba(246, 197, 0, 0.3)',
                      width: index === currentCase ? '32px' : '12px'
                    }}
                    aria-label={`Ir para case ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      </FadeInSection>

      <FadeInSection>
        <section className="py-24 px-4 sm:px-6 lg:px-8" style={{ background: 'linear-gradient(to bottom, #181816, rgba(246, 197, 0, 0.05), #181816)' }}>
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
              <div>
                <div className="text-5xl sm:text-6xl font-bold mb-4" style={{ color: '#f6c500' }}>
                  <CountUpMetric end={1} prefix="+R$ " suffix="M" />
                </div>
                <p className="text-xl text-gray-400">Investidos em Mídia</p>
              </div>
              <div>
                <div className="text-5xl sm:text-6xl font-bold mb-4" style={{ color: '#f6c500' }}>
                  <CountUpMetric end={10} prefix="+" suffix="M" />
                </div>
                <p className="text-xl text-gray-400">Visualizações Geradas</p>
              </div>
              <div>
                <div className="text-5xl sm:text-6xl font-bold mb-4" style={{ color: '#f6c500' }}>
                  <CountUpMetric end={100} prefix="+" suffix="K" />
                </div>
                <p className="text-xl text-gray-400">Leads Gerados</p>
              </div>
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* Services */}
      <FadeInSection>
        <section className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold mb-6">
                O Que <span style={{ color: '#f6c500' }}>Entregamos</span>
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Soluções completas de marketing digital focadas em performance e resultados tangíveis
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  whileHover={{ y: -8 }}
                  className="relative p-6 rounded-2xl backdrop-blur-sm transition-all duration-300 group"
                  style={{
                    background: 'linear-gradient(to bottom right, rgba(246, 197, 0, 0.1), transparent)',
                    border: '1px solid rgba(246, 197, 0, 0.2)'
                  }}
                  onMouseEnter={(e) => e.target.style.borderColor = '#f6c500'}
                  onMouseLeave={(e) => e.target.style.borderColor = 'rgba(246, 197, 0, 0.2)'}
                >
                  <div className="mb-4 group-hover:scale-110 transition-transform" style={{ color: '#f6c500' }}>
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                  <p className="text-gray-400 leading-relaxed text-sm">{service.description}</p>
                  
                  <div className="absolute inset-0 rounded-2xl transition-all duration-300 pointer-events-none group-hover:bg-gradient-to-br group-hover:from-[rgba(246,197,0,0.05)] group-hover:to-[rgba(246,197,0,0.1)]" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* Final CTA */}
      <FadeInSection>
        <section className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center rounded-3xl p-12 sm:p-16 shadow-2xl" style={{
            background: 'linear-gradient(to bottom right, #f6c500, rgba(246, 197, 0, 0.8))',
            boxShadow: '0 25px 50px rgba(246, 197, 0, 0.2)'
          }}>
            <Award className="w-16 h-16 mx-auto mb-6 text-black" />
            <h2 className="text-3xl sm:text-5xl font-bold mb-6 text-black">
              Pronto Para Dominar Seu Mercado?
            </h2>
            <p className="text-xl mb-8 text-black/80">
              Junte-se ao movimento HIVE e transforme seus resultados com nossas estratégias.
            </p>
            <motion.a
              href="https://wa.me/5511988933102"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block bg-black font-bold text-lg px-10 py-4 rounded-full hover:bg-gray-900 transition-all shadow-lg"
              style={{ color: '#f6c500' }}
            >
              Falar Com Especialista
            </motion.a>
          </div>
        </section>
      </FadeInSection>

      <footer className="py-12 px-4 sm:px-6 lg:px-8" style={{ borderTop: '1px solid rgba(246, 197, 0, 0.2)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <img 
                src="images/logo.png" 
                alt="Logo" 
                className="h-10 sm:h-12 w-auto object-contain mx-auto md:mx-0"
                onError={(e) => {
                  console.error('Erro ao carregar logo no footer');
                  e.target.style.display = 'none';
                }}
              />
              <p className="text-gray-400 mt-2">Performance que transforma negócios</p>
            </div>
            
            <div className="flex gap-6">
              <motion.a 
                whileHover={{ scale: 1.2 }} 
                href="#" 
                className="text-gray-400 transition-colors"
                onMouseEnter={(e) => e.target.style.color = '#f6c500'}
                onMouseLeave={(e) => e.target.style.color = 'rgb(156, 163, 175)'}
              >
                <Instagram className="w-6 h-6" />
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.2 }} 
                href="#" 
                className="text-gray-400 transition-colors"
                onMouseEnter={(e) => e.target.style.color = '#f6c500'}
                onMouseLeave={(e) => e.target.style.color = 'rgb(156, 163, 175)'}
              >
                <Facebook className="w-6 h-6" />
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.2 }} 
                href="#" 
                className="text-gray-400 transition-colors"
                onMouseEnter={(e) => e.target.style.color = '#f6c500'}
                onMouseLeave={(e) => e.target.style.color = 'rgb(156, 163, 175)'}
              >
                <Linkedin className="w-6 h-6" />
              </motion.a>
            </div>
          </div>
          
          <div className="mt-8 pt-8 text-center text-gray-500 text-sm" style={{ borderTop: '1px solid rgba(246, 197, 0, 0.2)' }}>
            © 2026 Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}

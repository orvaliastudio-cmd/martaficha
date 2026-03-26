/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect } from 'react';
import { Printer, Trash2, Save, FileText } from 'lucide-react';
import { motion } from 'motion/react';

interface ChakraData {
  equilibrado: boolean;
  desequilibrio: boolean;
  observacoes: string;
}

interface FormData {
  cliente: {
    dataAtendimento: string;
    dataNascimento: string;
    nomeCompleto: string;
  };
  numerologia: {
    alma: string;
    personalidade: string;
    destino: string;
  };
  leitura: {
    licaoDeVida: string;
    anoPessoal: string;
  };
  planosConsciencia: {
    fisico: string;
    emocional: string;
    mental: string;
    intuitivo: string;
  };
  karma: string;
  darma: string;
  chakras: {
    coronario: ChakraData;
    frontal: ChakraData;
    laringeo: ChakraData;
    cardiaco: ChakraData;
    plexoSolar: ChakraData;
    esplenico: ChakraData;
    basico: ChakraData;
  };
  pinaculos: {
    p1: string;
    p2: string;
    p3: string;
    p4: string;
    notasCalculos: string;
  };
}

const initialChakra = { equilibrado: false, desequilibrio: false, observacoes: '' };

const initialData: FormData = {
  cliente: { dataAtendimento: '', dataNascimento: '', nomeCompleto: '' },
  numerologia: { alma: '', personalidade: '', destino: '' },
  leitura: { licaoDeVida: '', anoPessoal: '' },
  planosConsciencia: { fisico: '', emocional: '', mental: '', intuitivo: '' },
  karma: '',
  darma: '',
  chakras: {
    coronario: { ...initialChakra },
    frontal: { ...initialChakra },
    laringeo: { ...initialChakra },
    cardiaco: { ...initialChakra },
    plexoSolar: { ...initialChakra },
    esplenico: { ...initialChakra },
    basico: { ...initialChakra },
  },
  pinaculos: { p1: '', p2: '', p3: '', p4: '', notasCalculos: '' },
};

export default function App() {
  const [formData, setFormData] = useState<FormData>(initialData);
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  const handlePrintBlank = () => {
    const currentData = { ...formData };
    setFormData(initialData);
    // Small timeout to ensure the UI updates before the print dialog opens
    setTimeout(() => {
      window.print();
      setFormData(currentData);
    }, 100);
  };

  const handleClear = () => {
    if (window.confirm('Tem certeza que deseja limpar todos os campos?')) {
      setFormData(initialData);
    }
  };

  const updateField = (section: keyof FormData, field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...(prev[section] as any),
        [field]: value,
      },
    }));
  };

  const updateChakra = (key: keyof FormData['chakras'], field: keyof ChakraData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      chakras: {
        ...prev.chakras,
        [key]: {
          ...prev.chakras[key],
          [field]: value,
        },
      },
    }));
  };

  // Dynamic Title for PDF Filename
  useEffect(() => {
    const clientName = formData.cliente.nomeCompleto.trim();
    if (clientName) {
      document.title = `Ficha de Atendimento - ${clientName}`;
    } else {
      document.title = "Ficha de Atendimento";
    }
  }, [formData.cliente.nomeCompleto]);

  return (
    <div className="min-h-screen bg-brand-beige text-brand-dark font-sans selection:bg-rose-gold/10">
      {/* Top Navigation / Header */}
      <header className="no-print sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-rose-neutral px-6 py-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="h-10 flex items-center">
              <img 
                src="https://i.ibb.co/NQym5vN/C-pia-de-marta-perfil-fundo-transparente.png" 
                alt="Logo Marta" 
                className="h-full w-auto object-contain rounded-full border border-rose-neutral"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={handleClear}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-brand-dark/60 hover:text-rose-600 hover:bg-rose-50 rounded-full transition-all duration-300"
              title="Limpar todos os campos"
            >
              <Trash2 size={16} />
              <span className="hidden md:inline">Limpar</span>
            </button>
            <button
              onClick={handlePrintBlank}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-brand-dark/60 hover:text-brand-dark hover:bg-rose-neutral/50 rounded-full transition-all duration-300"
              title="Imprimir ficha em branco"
            >
              <FileText size={16} />
              <span className="hidden md:inline">Ficha em Branco</span>
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-6 py-2 bg-rose-gold text-white text-sm font-medium rounded-full hover:bg-rose-gold/90 hover:shadow-xl active:scale-95 transition-all duration-300 shadow-lg shadow-rose-gold/20"
            >
              <Printer size={16} />
              <span>Imprimir / PDF</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12 pb-24">
        {/* Hero / Intro Section */}
        <section className="no-print mb-16 text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-10 flex justify-center"
          >
            <img 
              src="https://i.ibb.co/3mVPmrm8/marta-perfil-fundo-transparente.png" 
              alt="Marta Banner" 
              className="w-full max-w-2xl shadow-2xl border border-rose-neutral rounded-3xl bg-white"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-4xl md:text-5xl font-serif italic text-brand-dark mb-6">
              Ficha de Atendimento
            </h2>
            <p className="text-brand-dark/70 leading-relaxed text-lg font-light">
              Um espaço dedicado para organizar informações terapêuticas, numerológicas e energéticas, 
              criando um registro fluido e elegante para seus atendimentos.
            </p>
          </motion.div>
        </section>

        {/* Instructions Bento Grid */}
        <section className="no-print instructions-section mb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { 
                step: "01", 
                title: "Preenchimento", 
                desc: "Insira os dados do cliente e as informações numerológicas nos campos abaixo.",
                color: "bg-white border border-rose-neutral"
              },
              { 
                step: "02", 
                title: "Análise Energética", 
                desc: "Marque os planos de consciência e o estado dos chakras durante a sessão.",
                color: "bg-rose-gold-pale border border-rose-gold/10"
              },
              { 
                step: "03", 
                title: "Finalização", 
                desc: "Revise tudo e clique em imprimir para gerar o PDF ou a ficha física.",
                color: "bg-rose-gold text-white shadow-lg shadow-rose-gold/20"
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`${item.color} p-8 rounded-3xl flex flex-col justify-between min-h-[200px] shadow-sm hover:shadow-md transition-shadow duration-300`}
              >
                <span className={`text-xs font-bold tracking-widest ${item.color.includes('rose-gold') ? 'opacity-70' : 'opacity-50 text-rose-gold'}`}>{item.step}</span>
                <div>
                  <h3 className="text-xl font-serif font-medium mb-2">{item.title}</h3>
                  <p className={`text-sm leading-relaxed ${item.color.includes('rose-gold') ? 'text-white/80' : 'text-brand-dark/70'}`}>
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* The Form - Print Container */}
        <div ref={printRef} className="print-container mx-auto">
          
          {/* PAGE 1: CLIENTE & NUMEROLOGIA */}
          <div className="print-page-1 bg-white shadow-2xl shadow-rose-gold/5 rounded-[2rem] overflow-hidden mb-12 border border-rose-neutral flex flex-col">
            <div className="p-8 md:p-16 flex-1 flex flex-col justify-between">
              {/* Header inside print */}
              <div className="border-b border-rose-neutral pb-8 mb-8 flex flex-col items-center">
                <img 
                  src="https://i.ibb.co/3mVPmrm8/marta-perfil-fundo-transparente.png" 
                  alt="Marta Banner" 
                  className="w-full max-w-xl h-auto object-contain mb-6"
                  referrerPolicy="no-referrer"
                />
                <div className="flex justify-between w-full items-end">
                  <div>
                    <h2 className="text-2xl font-serif italic text-brand-dark">Ficha de Atendimento</h2>
                    <p className="text-rose-gold uppercase tracking-[0.2em] text-[9px] font-bold">Registro Terapêutico & Numerológico</p>
                  </div>
                  <div className="text-right">
                    <p className="text-rose-gold text-[10px] uppercase font-bold mb-1">Data do Atendimento</p>
                    <input
                      type="date"
                      value={formData.cliente.dataAtendimento}
                      onChange={(e) => updateField('cliente', 'dataAtendimento', e.target.value)}
                      className="text-right bg-transparent border-none focus:ring-0 text-brand-dark font-medium cursor-pointer focus:bg-rose-gold-pale rounded px-2 transition-colors border-b border-transparent focus:border-rose-gold/30"
                    />
                  </div>
                </div>
              </div>

              {/* Section: Cliente */}
              <div className="mb-10 secao-form">
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-rose-gold/40 font-serif italic text-2xl">01</span>
                  <h3 className="text-xl font-serif font-medium text-brand-dark">Informações do Cliente</h3>
                  <div className="flex-1 h-px bg-rose-neutral"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[11px] uppercase tracking-widest font-bold text-brand-dark ml-1">Nome Completo (Nome de Batismo)</label>
                    <input
                      type="text"
                      placeholder="Ex: Maria Silva"
                      value={formData.cliente.nomeCompleto}
                      onChange={(e) => updateField('cliente', 'nomeCompleto', e.target.value)}
                      className="w-full bg-rose-gold-pale/30 border-b-2 border-rose-neutral px-4 py-3 focus:border-rose-gold focus:bg-white transition-all outline-none text-brand-dark placeholder:text-brand-dark/20 rounded-t-lg shadow-sm focus:shadow-md border-x border-t border-transparent"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] uppercase tracking-widest font-bold text-brand-dark ml-1">Data de Nascimento</label>
                    <input
                      type="date"
                      value={formData.cliente.dataNascimento}
                      onChange={(e) => updateField('cliente', 'dataNascimento', e.target.value)}
                      className="w-full bg-rose-gold-pale/30 border-b-2 border-rose-neutral px-4 py-3 focus:border-rose-gold focus:bg-white transition-all outline-none text-brand-dark rounded-t-lg cursor-pointer shadow-sm focus:shadow-md border-x border-t border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Section: Numerologia */}
              <div className="mb-10 secao-form">
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-rose-gold/40 font-serif italic text-2xl">02</span>
                  <h3 className="text-xl font-serif font-medium text-brand-dark">Mapa Numerológico</h3>
                  <div className="flex-1 h-px bg-rose-neutral"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { label: "Alma", field: "alma", color: "border-rose-gold/20", focus: "focus:border-rose-gold" },
                    { label: "Personalidade", field: "personalidade", color: "border-rose-gold/20", focus: "focus:border-rose-gold" },
                    { label: "Destino", field: "destino", color: "border-rose-neutral", focus: "focus:border-rose-gold" }
                  ].map((item) => (
                    <div key={item.field} className={`bg-white border ${item.color} p-6 rounded-2xl shadow-sm transition-all hover:shadow-md`}>
                      <label className="text-[11px] uppercase tracking-widest font-bold text-brand-dark mb-3 block">{item.label}</label>
                      <input
                        type="text"
                        value={formData.numerologia[item.field as keyof typeof formData.numerologia]}
                        onChange={(e) => updateField('numerologia', item.field, e.target.value)}
                        className={`w-full text-2xl font-serif text-center bg-transparent border-none focus:ring-0 text-brand-dark outline-none rounded-lg transition-colors focus:bg-rose-gold-pale/20 focus:shadow-inner`}
                        placeholder="0"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Section: Leitura */}
              <div className="secao-form">
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-rose-gold/40 font-serif italic text-2xl">03</span>
                  <h3 className="text-xl font-serif font-medium text-brand-dark">Leitura & Ciclos</h3>
                  <div className="flex-1 h-px bg-rose-neutral"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[11px] uppercase tracking-widest font-bold text-brand-dark ml-1">Lição de Vida</label>
                    <textarea
                      rows={4}
                      value={formData.leitura.licaoDeVida}
                      onChange={(e) => updateField('leitura', 'licaoDeVida', e.target.value)}
                      className="w-full bg-rose-gold-pale/20 border border-rose-neutral rounded-2xl p-4 focus:border-rose-gold focus:bg-white transition-all outline-none text-brand-dark leading-relaxed resize-none shadow-inner focus:shadow-md"
                      placeholder="Descreva os principais aprendizados..."
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[11px] uppercase tracking-widest font-bold text-brand-dark ml-1">Ano Pessoal</label>
                    <textarea
                      rows={4}
                      value={formData.leitura.anoPessoal}
                      onChange={(e) => updateField('leitura', 'anoPessoal', e.target.value)}
                      className="w-full bg-rose-gold-pale/20 border border-rose-neutral rounded-2xl p-4 focus:border-rose-gold focus:bg-white transition-all outline-none text-brand-dark leading-relaxed resize-none shadow-inner focus:shadow-md"
                      placeholder="Tendências para o ciclo atual..."
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* PAGE 2: PLANOS & KARMA/DARMA */}
          <div className="print-page-2 bg-white shadow-2xl shadow-rose-gold/5 rounded-[2rem] overflow-hidden mb-12 border border-rose-neutral flex flex-col">
            <div className="p-8 md:p-16 flex-1 flex flex-col justify-between">
              {/* Section: Planos de Consciência */}
              <div className="mb-12 secao-form">
                <div className="flex items-center gap-4 mb-8">
                  <span className="text-rose-gold/40 font-serif italic text-2xl">04</span>
                  <h3 className="text-xl font-serif font-medium text-brand-dark">Planos de Consciência</h3>
                  <div className="flex-1 h-px bg-rose-neutral"></div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { label: 'Físico', field: 'fisico', numbers: '4, 5' },
                    { label: 'Emocional', field: 'emocional', numbers: '2, 3, 6' },
                    { label: 'Mental', field: 'mental', numbers: '1, 8' },
                    { label: 'Intuitivo', field: 'intuitivo', numbers: '7, 9' }
                  ].map((item) => (
                    <div key={item.field} className="group flex flex-col gap-3 p-6 rounded-3xl border border-rose-neutral hover:border-rose-gold/20 transition-all duration-300 bg-rose-gold-pale/10">
                      <div className="flex justify-between items-center">
                        <label className="text-[11px] uppercase tracking-widest font-bold text-brand-dark">{item.label}</label>
                        <span className="text-[10px] text-rose-gold font-bold bg-white px-2 py-0.5 rounded-full border border-rose-gold/10 shadow-sm">({item.numbers})</span>
                      </div>
                      <input
                        type="text"
                        value={(formData.planosConsciencia as any)[item.field]}
                        onChange={(e) => updateField('planosConsciencia', item.field, e.target.value)}
                        className="w-full bg-white border border-rose-neutral rounded-xl px-4 py-3 focus:border-rose-gold focus:ring-2 focus:ring-rose-gold/5 transition-all outline-none text-brand-dark font-medium text-center text-lg"
                        placeholder="-"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Section: Karma e Darma */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 secao-form flex-1">
                <div className="flex flex-col">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-rose-gold/40 font-serif italic text-2xl">05</span>
                    <h3 className="text-xl font-serif font-medium text-brand-dark">Karma</h3>
                    <div className="flex-1 h-px bg-rose-neutral"></div>
                  </div>
                  <div className="flex-1 bg-rose-gold-pale/20 border border-rose-neutral rounded-[2rem] p-8 relative overflow-hidden transition-all focus-within:bg-white focus-within:border-rose-gold/30 focus-within:shadow-lg min-h-[350px]">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-rose-gold/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
                    <textarea
                      className="w-full h-full bg-transparent border-none focus:ring-0 text-brand-dark leading-relaxed resize-none outline-none"
                      placeholder="Desafios e lições pendentes..."
                      value={formData.karma}
                      onChange={(e) => setFormData({ ...formData, karma: e.target.value })}
                    />
                  </div>
                </div>

                <div className="flex flex-col">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-rose-gold/40 font-serif italic text-2xl">06</span>
                    <h3 className="text-xl font-serif font-medium text-brand-dark">Darma</h3>
                    <div className="flex-1 h-px bg-rose-neutral"></div>
                  </div>
                  <div className="flex-1 bg-rose-gold-pale/20 border border-rose-neutral rounded-[2rem] p-8 relative overflow-hidden transition-all focus-within:bg-white focus-within:border-rose-gold/30 focus-within:shadow-lg min-h-[350px]">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-rose-gold/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
                    <textarea
                      className="w-full h-full bg-transparent border-none focus:ring-0 text-brand-dark leading-relaxed resize-none outline-none"
                      placeholder="Dons, talentos e propósitos..."
                      value={formData.darma}
                      onChange={(e) => setFormData({ ...formData, darma: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* PAGE 3: PINÁCULOS */}
          <div className="print-page-3 bg-white shadow-2xl shadow-rose-gold/5 rounded-[2rem] overflow-hidden mb-12 border border-rose-neutral flex flex-col">
            <div className="p-8 md:p-16 flex-1 flex flex-col justify-between">
              <div className="flex items-center gap-4 mb-8">
                <span className="text-rose-gold/40 font-serif italic text-2xl">07</span>
                <h3 className="text-xl font-serif font-medium text-brand-dark">Pináculos da Vida</h3>
                <div className="flex-1 h-px bg-rose-neutral"></div>
              </div>

              <div className="relative py-8 secao-form">
                {/* Decorative Path */}
                <div className="absolute top-1/2 left-0 w-full h-px bg-rose-neutral -translate-y-1/2 hidden md:block"></div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 relative z-10">
                  {[
                    { id: 'p1', label: '1º Pináculo', age: '0 - 28 anos', color: 'bg-rose-gold-pale/50' },
                    { id: 'p2', label: '2º Pináculo', age: '29 - 37 anos', color: 'bg-rose-gold-pale' },
                    { id: 'p3', label: '3º Pináculo', age: '38 - 46 anos', color: 'bg-rose-gold-soft/20' },
                    { id: 'p4', label: '4º Pináculo', age: '47+ anos', color: 'bg-rose-gold text-white' }
                  ].map((p, idx) => (
                    <div key={p.id} className="flex flex-col items-center">
                      <div className={`${p.color} w-full aspect-square rounded-[2.5rem] p-6 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md transition-all duration-300 border border-rose-neutral focus-within:ring-2 focus-within:ring-rose-gold focus-within:ring-offset-2`}>
                        <span className="text-[10px] uppercase tracking-widest font-bold opacity-50 mb-2">{p.label}</span>
                        <input
                          type="text"
                          value={formData.pinaculos[p.id as keyof typeof formData.pinaculos]}
                          onChange={(e) => updateField('pinaculos', p.id, e.target.value)}
                          className="w-full text-4xl font-serif text-center bg-transparent border-none focus:ring-0 mb-1 outline-none"
                          placeholder="0"
                        />
                        <span className="text-[10px] font-medium opacity-60">{p.age}</span>
                      </div>
                      {idx < 3 && (
                        <div className="md:hidden h-6 w-px bg-rose-neutral my-2"></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mt-8 secao-form flex-1 flex flex-col">
                <div className="flex items-center gap-4 mb-4">
                  <h4 className="text-sm font-bold uppercase tracking-widest text-brand-dark/60">Cálculos e Anotações dos Pináculos</h4>
                  <div className="flex-1 h-px bg-rose-neutral/50"></div>
                </div>
                <div className="relative bg-white border border-rose-neutral rounded-3xl overflow-hidden shadow-inner flex-1">
                  {/* Lined Paper Effect */}
                  <div className="absolute inset-0 pointer-events-none" style={{ 
                    backgroundImage: 'linear-gradient(transparent 31px, #f1e4e1 32px)',
                    backgroundSize: '100% 32px',
                    opacity: 0.5
                  }}></div>
                  <textarea
                    value={formData.pinaculos.notasCalculos}
                    onChange={(e) => updateField('pinaculos', 'notasCalculos', e.target.value)}
                    placeholder="Espaço para cálculos e anotações detalhadas..."
                    className="w-full h-full min-h-[13cm] bg-transparent p-8 font-serif text-lg leading-[32px] text-brand-dark focus:ring-0 border-none relative z-10 resize-none pinaculos-notes"
                  />
                </div>
                <p className="text-[10px] text-brand-dark/40 mt-3 text-center italic">
                  Este espaço foi ampliado para permitir cálculos manuais e anotações detalhadas de cada ciclo.
                </p>
              </div>
              
              <div className="mt-8 p-6 bg-rose-gold-pale/30 rounded-3xl border border-rose-neutral">
                <p className="text-brand-dark/50 text-sm italic text-center">
                  "Os pináculos representam os ciclos de realização e as influências predominantes em cada fase da jornada."
                </p>
              </div>
            </div>
          </div>

          {/* PAGE 4: CHAKRAS */}
          <div className="print-page-4 bg-white shadow-2xl shadow-rose-gold/5 rounded-[2rem] overflow-hidden border border-rose-neutral flex flex-col">
            <div className="p-8 md:p-16 flex-1 flex flex-col justify-between">
              <div className="flex items-center gap-4 mb-10">
                <span className="text-rose-gold/40 font-serif italic text-2xl">08</span>
                <h3 className="text-xl font-serif font-medium text-brand-dark">Alinhamento dos Chakras</h3>
                <div className="flex-1 h-px bg-rose-neutral"></div>
              </div>

              <div className="space-y-4 secao-form flex-1 flex flex-col justify-between">
                {[
                  { id: 'coronario', name: 'Coronário', color: 'text-purple-600', bg: 'bg-purple-50', icon: '✧' },
                  { id: 'frontal', name: 'Frontal', color: 'text-indigo-600', bg: 'bg-indigo-50', icon: '👁' },
                  { id: 'laringeo', name: 'Laríngeo', color: 'text-blue-500', bg: 'bg-blue-50', icon: '☊' },
                  { id: 'cardiaco', name: 'Cardíaco', color: 'text-emerald-500', bg: 'bg-emerald-50', icon: '❤' },
                  { id: 'plexoSolar', name: 'Plexo Solar', color: 'text-amber-500', bg: 'bg-amber-50', icon: '☀' },
                  { id: 'esplenico', name: 'Esplênico', color: 'text-orange-500', bg: 'bg-orange-50', icon: '☽' },
                  { id: 'basico', name: 'Básico', color: 'text-rose-600', bg: 'bg-rose-50', icon: '⊕' }
                ].map((chakra) => (
                  <div key={chakra.id} className="group flex flex-col md:flex-row items-center gap-4 p-4 rounded-2xl border border-rose-neutral hover:border-rose-gold/20 transition-all duration-300 focus-within:bg-rose-gold-pale/30">
                    <div className={`flex items-center gap-4 md:w-40 shrink-0`}>
                      <span className={`text-xl ${chakra.color} w-8 h-8 ${chakra.bg} rounded-full flex items-center justify-center font-serif shadow-inner`}>
                        {chakra.icon}
                      </span>
                      <span className="font-serif font-medium text-brand-dark text-sm">{chakra.name}</span>
                    </div>
                    
                    <div className="flex items-center gap-6 px-4 md:border-l border-rose-neutral">
                      <label className="flex items-center gap-2 cursor-pointer group/check">
                        <div className={`w-4 h-4 rounded-full border-2 transition-all ${
                          formData.chakras[chakra.id as keyof typeof formData.chakras].equilibrado 
                            ? 'bg-emerald-500 border-emerald-500 scale-110' 
                            : 'border-rose-neutral group-hover/check:border-emerald-300'
                        }`}>
                          {formData.chakras[chakra.id as keyof typeof formData.chakras].equilibrado && (
                            <div className="w-full h-full flex items-center justify-center text-white text-[8px]">✓</div>
                          )}
                        </div>
                        <input
                          type="checkbox"
                          className="hidden"
                          checked={formData.chakras[chakra.id as keyof typeof formData.chakras].equilibrado}
                          onChange={(e) => {
                            const val = e.target.checked;
                            const newChakras = { ...formData.chakras };
                            (newChakras as any)[chakra.id].equilibrado = val;
                            if (val) (newChakras as any)[chakra.id].desequilibrio = false;
                            setFormData({ ...formData, chakras: newChakras });
                          }}
                        />
                        <span className="text-[10px] uppercase tracking-widest font-bold text-brand-dark/60 group-hover/check:text-brand-dark transition-colors">Equilibrado</span>
                      </label>

                      <label className="flex items-center gap-2 cursor-pointer group/check">
                        <div className={`w-4 h-4 rounded-full border-2 transition-all ${
                          formData.chakras[chakra.id as keyof typeof formData.chakras].desequilibrio 
                            ? 'bg-rose-500 border-rose-500 scale-110' 
                            : 'border-rose-neutral group-hover/check:border-rose-300'
                        }`}>
                          {formData.chakras[chakra.id as keyof typeof formData.chakras].desequilibrio && (
                            <div className="w-full h-full flex items-center justify-center text-white text-[8px]">!</div>
                          )}
                        </div>
                        <input
                          type="checkbox"
                          className="hidden"
                          checked={formData.chakras[chakra.id as keyof typeof formData.chakras].desequilibrio}
                          onChange={(e) => {
                            const val = e.target.checked;
                            const newChakras = { ...formData.chakras };
                            (newChakras as any)[chakra.id].desequilibrio = val;
                            if (val) (newChakras as any)[chakra.id].equilibrado = false;
                            setFormData({ ...formData, chakras: newChakras });
                          }}
                        />
                        <span className="text-[10px] uppercase tracking-widest font-bold text-brand-dark/60 group-hover/check:text-brand-dark transition-colors">Desequilíbrio</span>
                      </label>
                    </div>

                    <div className="flex-1 w-full">
                      <input
                        type="text"
                        placeholder="Observações..."
                        value={formData.chakras[chakra.id as keyof typeof formData.chakras].observacoes}
                        onChange={(e) => {
                          const newChakras = { ...formData.chakras };
                          (newChakras as any)[chakra.id].observacoes = e.target.value;
                          setFormData({ ...formData, chakras: newChakras });
                        }}
                        className="w-full bg-transparent border-none focus:ring-0 text-xs text-brand-dark italic placeholder:text-rose-neutral/50 outline-none focus:bg-white rounded px-2 transition-colors border-b border-transparent focus:border-rose-gold/30"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="no-print border-t border-rose-neutral py-12 text-center">
        <div className="mb-8">
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-2 px-8 py-3 bg-rose-gold text-white text-sm font-medium rounded-full hover:bg-rose-gold/90 hover:shadow-xl active:scale-95 transition-all duration-300"
          >
            <Printer size={18} />
            <span>Gerar PDF Agora</span>
          </button>
        </div>
        <p className="text-rose-gold text-xs uppercase tracking-[0.3em] font-bold mb-2">Marta Ficha</p>
        <p className="text-brand-dark/40 text-[10px]">© 2026 • Atendimento Holístico & Numerologia</p>
      </footer>

      {/* Global Styles for Print & Customization */}
      <style>{`
        @media print {
          @page {
            size: A4;
            margin: 0;
          }
          header, .no-print, footer, .instructions-section {
            display: none !important;
          }
          html, body {
            height: auto !important;
            background: white !important;
          }
          body {
            margin: 0 !important;
            padding: 0 !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .print-container {
            width: 210mm !important;
            margin: 0 !important;
            padding: 0 !important;
            box-shadow: none !important;
            background: white !important;
          }
          .print-page-1, .print-page-2, .print-page-3, .print-page-4 {
            padding: 10mm 15mm !important;
            min-height: 297mm !important;
            height: 297mm !important;
            page-break-after: always !important;
            break-after: page !important;
            display: flex !important;
            flex-direction: column !important;
            justify-content: space-between !important;
            box-sizing: border-box !important;
            position: relative !important;
            border: none !important;
            box-shadow: none !important;
            border-radius: 0 !important;
            background: white !important;
          }
          .print-page-4 {
            page-break-after: auto !important;
            break-after: auto !important;
          }
          .secao-form {
            page-break-inside: avoid !important;
            break-inside: avoid !important;
            margin-bottom: 5mm !important;
          }
          textarea {
            border: none !important;
            background-image: linear-gradient(transparent 31px, #f1e4e1 32px) !important;
            background-size: 100% 32px !important;
            line-height: 32px !important;
            color: #444 !important;
            resize: none !important;
            overflow: hidden !important;
            display: block !important;
            width: 100% !important;
            padding: 5mm !important;
          }
          .pinaculos-notes {
            min-height: 130mm !important;
            height: auto !important;
          }
          input {
            border: none !important;
            border-bottom: 1px solid #e5e7eb !important;
            color: #111 !important;
          }
          input::placeholder {
            color: transparent !important;
          }
          .bg-rose-gold-pale\\/50, .bg-rose-gold-pale\\/30, .bg-rose-gold-pale {
            background-color: #FFF9F8 !important;
          }
          .shadow-2xl, .shadow-md, .shadow-lg, .shadow-sm {
            box-shadow: none !important;
          }
          .rounded-3xl, .rounded-2xl, .rounded-xl, .rounded-\\[2rem\\] {
            border-radius: 0 !important;
          }
          .border-rose-neutral, .border-rose-gold\\/20 {
            border-color: #F5E6E3 !important;
          }
        }

        /* Custom Scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #FAF3F2;
        }
        ::-webkit-scrollbar-thumb {
          background: #E0BFB8;
          border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #B76E79;
        }
      `}</style>
    </div>
  );
}

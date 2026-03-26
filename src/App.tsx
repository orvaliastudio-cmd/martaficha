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
  planosConsciencia: boolean[];
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
  };
}

const initialChakra = { equilibrado: false, desequilibrio: false, observacoes: '' };

const initialData: FormData = {
  cliente: { dataAtendimento: '', dataNascimento: '', nomeCompleto: '' },
  numerologia: { alma: '', personalidade: '', destino: '' },
  leitura: { licaoDeVida: '', anoPessoal: '' },
  planosConsciencia: Array(9).fill(false),
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
  pinaculos: { p1: '', p2: '', p3: '', p4: '' },
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

  const togglePlano = (index: number) => {
    const newPlanos = [...formData.planosConsciencia];
    newPlanos[index] = !newPlanos[index];
    setFormData((prev) => ({ ...prev, planosConsciencia: newPlanos }));
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
    <div className="min-h-screen bg-[#FDFCFB] text-stone-800 font-sans selection:bg-stone-200">
      {/* Top Navigation / Header */}
      <header className="no-print sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-100 px-6 py-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-stone-900 rounded-full flex items-center justify-center text-white shadow-lg">
              <FileText size={20} />
            </div>
            <div>
              <h1 className="text-xl font-serif font-semibold tracking-tight text-stone-900">Marta Ficha</h1>
              <p className="text-xs text-stone-500 uppercase tracking-widest font-medium">Atendimento Integrativo</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={handleClear}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-stone-600 hover:text-rose-600 hover:bg-rose-50 rounded-full transition-all duration-300"
              title="Limpar todos os campos"
            >
              <Trash2 size={16} />
              <span className="hidden md:inline">Limpar</span>
            </button>
            <button
              onClick={handlePrintBlank}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-full transition-all duration-300"
              title="Imprimir ficha em branco"
            >
              <FileText size={16} />
              <span className="hidden md:inline">Ficha em Branco</span>
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-6 py-2 bg-stone-900 text-white text-sm font-medium rounded-full hover:bg-stone-800 hover:shadow-xl active:scale-95 transition-all duration-300 shadow-lg shadow-stone-200"
            >
              <Printer size={16} />
              <span>Imprimir / PDF</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12 pb-24">
        {/* Hero / Intro Section */}
        <section className="no-print mb-16 text-center max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-serif italic text-stone-900 mb-6">
              Ficha de Atendimento
            </h2>
            <p className="text-stone-600 leading-relaxed text-lg font-light">
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
                color: "bg-stone-100"
              },
              { 
                step: "02", 
                title: "Análise Energética", 
                desc: "Marque os planos de consciência e o estado dos chakras durante a sessão.",
                color: "bg-stone-200"
              },
              { 
                step: "03", 
                title: "Finalização", 
                desc: "Revise tudo e clique em imprimir para gerar o PDF ou a ficha física.",
                color: "bg-stone-900 text-white"
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`${item.color} p-8 rounded-3xl flex flex-col justify-between min-h-[200px] shadow-sm hover:shadow-md transition-shadow duration-300`}
              >
                <span className="text-xs font-bold tracking-widest opacity-50">{item.step}</span>
                <div>
                  <h3 className="text-xl font-serif font-medium mb-2">{item.title}</h3>
                  <p className={`text-sm leading-relaxed ${item.color.includes('900') ? 'text-stone-300' : 'text-stone-600'}`}>
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
          <div className="print-page-1 bg-white shadow-2xl shadow-stone-200/50 rounded-[2rem] overflow-hidden mb-12 border border-stone-100">
            <div className="p-12 md:p-16">
              {/* Header inside print */}
              <div className="flex justify-between items-start border-b border-stone-100 pb-12 mb-12">
                <div>
                  <h2 className="text-3xl font-serif italic text-stone-900 mb-2">Ficha de Atendimento</h2>
                  <p className="text-stone-500 uppercase tracking-[0.2em] text-[10px] font-semibold">Registro Terapêutico & Numerológico</p>
                </div>
                <div className="text-right">
                  <p className="text-stone-400 text-[10px] uppercase font-bold mb-1">Data do Atendimento</p>
                  <input
                    type="date"
                    value={formData.cliente.dataAtendimento}
                    onChange={(e) => updateField('cliente', 'dataAtendimento', e.target.value)}
                    className="text-right bg-transparent border-none focus:ring-0 text-stone-900 font-medium cursor-pointer focus:bg-white rounded px-2 transition-colors border-b border-transparent focus:border-stone-200"
                  />
                </div>
              </div>

              {/* Section: Cliente */}
              <div className="mb-16 secao-form">
                <div className="flex items-center gap-4 mb-8">
                  <span className="text-stone-300 font-serif italic text-2xl">01</span>
                  <h3 className="text-xl font-serif font-medium text-stone-900">Informações do Cliente</h3>
                  <div className="flex-1 h-px bg-stone-100"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-stone-400 ml-1">Nome Completo</label>
                    <input
                      type="text"
                      placeholder="Ex: Maria Silva"
                      value={formData.cliente.nomeCompleto}
                      onChange={(e) => updateField('cliente', 'nomeCompleto', e.target.value)}
                      className="w-full bg-stone-50/50 border-b-2 border-stone-200 px-4 py-3 focus:border-stone-900 focus:bg-white transition-all outline-none text-stone-900 placeholder:text-stone-300 rounded-t-lg shadow-sm focus:shadow-md border-x border-t border-transparent"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-stone-400 ml-1">Data de Nascimento</label>
                    <input
                      type="date"
                      value={formData.cliente.dataNascimento}
                      onChange={(e) => updateField('cliente', 'dataNascimento', e.target.value)}
                      className="w-full bg-stone-50/50 border-b-2 border-stone-200 px-4 py-3 focus:border-stone-900 focus:bg-white transition-all outline-none text-stone-900 rounded-t-lg cursor-pointer shadow-sm focus:shadow-md border-x border-t border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Section: Numerologia */}
              <div className="mb-16 secao-form">
                <div className="flex items-center gap-4 mb-8">
                  <span className="text-stone-300 font-serif italic text-2xl">02</span>
                  <h3 className="text-xl font-serif font-medium text-stone-900">Mapa Numerológico</h3>
                  <div className="flex-1 h-px bg-stone-100"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                    { label: "Alma", field: "alma", color: "border-purple-100", focus: "focus:border-purple-400" },
                    { label: "Personalidade", field: "personalidade", color: "border-indigo-100", focus: "focus:border-indigo-400" },
                    { label: "Destino", field: "destino", color: "border-blue-100", focus: "focus:border-blue-400" }
                  ].map((item) => (
                    <div key={item.field} className={`bg-white border ${item.color} p-6 rounded-2xl shadow-sm transition-all hover:shadow-md`}>
                      <label className="text-[10px] uppercase tracking-widest font-bold text-stone-400 mb-3 block">{item.label}</label>
                      <input
                        type="text"
                        value={formData.numerologia[item.field as keyof typeof formData.numerologia]}
                        onChange={(e) => updateField('numerologia', item.field, e.target.value)}
                        className={`w-full text-2xl font-serif text-center bg-transparent border-none focus:ring-0 text-stone-900 outline-none rounded-lg transition-colors focus:bg-stone-50 focus:shadow-inner`}
                        placeholder="0"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Section: Leitura */}
              <div className="secao-form">
                <div className="flex items-center gap-4 mb-8">
                  <span className="text-stone-300 font-serif italic text-2xl">03</span>
                  <h3 className="text-xl font-serif font-medium text-stone-900">Leitura & Ciclos</h3>
                  <div className="flex-1 h-px bg-stone-100"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-4">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-stone-400 ml-1">Lição de Vida</label>
                    <textarea
                      rows={4}
                      value={formData.leitura.licaoDeVida}
                      onChange={(e) => updateField('leitura', 'licaoDeVida', e.target.value)}
                      className="w-full bg-stone-50/30 border border-stone-100 rounded-2xl p-5 focus:border-stone-900 focus:bg-white transition-all outline-none text-stone-700 leading-relaxed resize-none shadow-inner focus:shadow-md"
                      placeholder="Descreva os principais aprendizados..."
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-stone-400 ml-1">Ano Pessoal</label>
                    <textarea
                      rows={4}
                      value={formData.leitura.anoPessoal}
                      onChange={(e) => updateField('leitura', 'anoPessoal', e.target.value)}
                      className="w-full bg-stone-50/30 border border-stone-100 rounded-2xl p-5 focus:border-stone-900 focus:bg-white transition-all outline-none text-stone-700 leading-relaxed resize-none shadow-inner focus:shadow-md"
                      placeholder="Tendências para o ciclo atual..."
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* PAGE 2: PLANOS & KARMA/DARMA */}
          <div className="print-page-2 bg-white shadow-2xl shadow-stone-200/50 rounded-[2rem] overflow-hidden mb-12 border border-stone-100">
            <div className="p-12 md:p-16">
              {/* Section: Planos de Consciência */}
              <div className="mb-20 secao-form">
                <div className="flex items-center gap-4 mb-10">
                  <span className="text-stone-300 font-serif italic text-2xl">04</span>
                  <h3 className="text-xl font-serif font-medium text-stone-900">Planos de Consciência</h3>
                  <div className="flex-1 h-px bg-stone-100"></div>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-4">
                  {formData.planosConsciencia.map((checked, idx) => (
                    <label key={idx} className="flex flex-col items-center gap-3 cursor-pointer group">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg font-serif transition-all duration-300 border-2 ${
                          checked 
                            ? 'bg-stone-900 border-stone-900 text-white shadow-md' 
                            : 'bg-white border-stone-100 text-stone-400 group-hover:border-stone-300'
                        }`}
                      >
                        {idx + 1}
                        <input
                          type="checkbox"
                          className="hidden"
                          checked={checked}
                          onChange={() => {
                            const newPlanos = [...formData.planosConsciencia];
                            newPlanos[idx] = !newPlanos[idx];
                            setFormData({ ...formData, planosConsciencia: newPlanos });
                          }}
                        />
                      </div>
                      <span className="text-[9px] uppercase tracking-tighter font-bold text-stone-400 group-hover:text-stone-600 transition-colors">Plano {idx + 1}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Section: Karma e Darma */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16 secao-form">
                <div className="relative">
                  <div className="flex items-center gap-4 mb-8">
                    <span className="text-rose-200 font-serif italic text-2xl">05</span>
                    <h3 className="text-xl font-serif font-medium text-stone-900">Karma</h3>
                    <div className="flex-1 h-px bg-rose-50"></div>
                  </div>
                  <div className="bg-rose-50/30 border border-rose-100 rounded-[2rem] p-8 min-h-[300px] relative overflow-hidden transition-all focus-within:bg-white focus-within:border-rose-300 focus-within:shadow-lg">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-rose-100/20 rounded-full -mr-16 -mt-16 blur-3xl"></div>
                    <textarea
                      className="w-full h-full bg-transparent border-none focus:ring-0 text-stone-700 leading-relaxed resize-none outline-none"
                      placeholder="Desafios e lições pendentes..."
                      value={formData.karma}
                      onChange={(e) => setFormData({ ...formData, karma: e.target.value })}
                    />
                  </div>
                </div>

                <div className="relative">
                  <div className="flex items-center gap-4 mb-8">
                    <span className="text-emerald-200 font-serif italic text-2xl">06</span>
                    <h3 className="text-xl font-serif font-medium text-stone-900">Darma</h3>
                    <div className="flex-1 h-px bg-emerald-50"></div>
                  </div>
                  <div className="bg-emerald-50/30 border border-emerald-100 rounded-[2rem] p-8 min-h-[300px] relative overflow-hidden transition-all focus-within:bg-white focus-within:border-emerald-300 focus-within:shadow-lg">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-100/20 rounded-full -mr-16 -mt-16 blur-3xl"></div>
                    <textarea
                      className="w-full h-full bg-transparent border-none focus:ring-0 text-stone-700 leading-relaxed resize-none outline-none"
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
          <div className="print-page-3 bg-white shadow-2xl shadow-stone-200/50 rounded-[2rem] overflow-hidden mb-12 border border-stone-100">
            <div className="p-12 md:p-16">
              <div className="flex items-center gap-4 mb-12">
                <span className="text-stone-300 font-serif italic text-2xl">07</span>
                <h3 className="text-xl font-serif font-medium text-stone-900">Pináculos da Vida</h3>
                <div className="flex-1 h-px bg-stone-100"></div>
              </div>

              <div className="relative py-10 md:py-20 secao-form">
                {/* Decorative Path */}
                <div className="absolute top-1/2 left-0 w-full h-px bg-stone-100 -translate-y-1/2 hidden md:block"></div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 relative z-10">
                  {[
                    { id: 'p1', label: '1º Pináculo', age: '0 - 28 anos', color: 'bg-stone-50' },
                    { id: 'p2', label: '2º Pináculo', age: '29 - 37 anos', color: 'bg-stone-100' },
                    { id: 'p3', label: '3º Pináculo', age: '38 - 46 anos', color: 'bg-stone-200' },
                    { id: 'p4', label: '4º Pináculo', age: '47+ anos', color: 'bg-stone-900 text-white' }
                  ].map((p, idx) => (
                    <div key={p.id} className="flex flex-col items-center">
                      <div className={`${p.color} w-full aspect-square rounded-[2.5rem] p-8 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md transition-all duration-300 border border-stone-100 focus-within:ring-2 focus-within:ring-stone-400 focus-within:ring-offset-2`}>
                        <span className="text-[10px] uppercase tracking-widest font-bold opacity-50 mb-2">{p.label}</span>
                        <input
                          type="text"
                          value={formData.pinaculos[p.id as keyof typeof formData.pinaculos]}
                          onChange={(e) => updateField('pinaculos', p.id, e.target.value)}
                          className="w-full text-4xl font-serif text-center bg-transparent border-none focus:ring-0 mb-2 outline-none"
                          placeholder="0"
                        />
                        <span className="text-[10px] font-medium opacity-60">{p.age}</span>
                      </div>
                      {idx < 3 && (
                        <div className="md:hidden h-8 w-px bg-stone-200 my-4"></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mt-12 p-8 bg-stone-50/50 rounded-3xl border border-stone-100">
                <p className="text-stone-500 text-sm italic text-center">
                  "Os pináculos representam os ciclos de realização e as influências predominantes em cada fase da jornada."
                </p>
              </div>
            </div>
          </div>

          {/* PAGE 4: CHAKRAS */}
          <div className="print-page-4 bg-white shadow-2xl shadow-stone-200/50 rounded-[2rem] overflow-hidden border border-stone-100">
            <div className="p-12 md:p-16">
              <div className="flex items-center gap-4 mb-12">
                <span className="text-stone-300 font-serif italic text-2xl">08</span>
                <h3 className="text-xl font-serif font-medium text-stone-900">Alinhamento dos Chakras</h3>
                <div className="flex-1 h-px bg-stone-100"></div>
              </div>

              <div className="space-y-6 secao-form">
                {[
                  { id: 'coronario', name: 'Coronário', color: 'text-purple-600', bg: 'bg-purple-50', icon: '✧' },
                  { id: 'frontal', name: 'Frontal', color: 'text-indigo-600', bg: 'bg-indigo-50', icon: '👁' },
                  { id: 'laringeo', name: 'Laríngeo', color: 'text-blue-500', bg: 'bg-blue-50', icon: '☊' },
                  { id: 'cardiaco', name: 'Cardíaco', color: 'text-emerald-500', bg: 'bg-emerald-50', icon: '❤' },
                  { id: 'plexoSolar', name: 'Plexo Solar', color: 'text-amber-500', bg: 'bg-amber-50', icon: '☀' },
                  { id: 'esplenico', name: 'Esplênico', color: 'text-orange-500', bg: 'bg-orange-50', icon: '☽' },
                  { id: 'basico', name: 'Básico', color: 'text-rose-600', bg: 'bg-rose-50', icon: '⊕' }
                ].map((chakra) => (
                  <div key={chakra.id} className="group flex flex-col md:flex-row items-stretch gap-6 p-6 rounded-3xl border border-stone-100 hover:border-stone-200 transition-all duration-300 focus-within:bg-stone-50/30">
                    <div className={`flex items-center gap-4 md:w-48 shrink-0`}>
                      <span className={`text-2xl ${chakra.color} w-10 h-10 ${chakra.bg} rounded-full flex items-center justify-center font-serif shadow-inner`}>
                        {chakra.icon}
                      </span>
                      <span className="font-serif font-medium text-stone-900">{chakra.name}</span>
                    </div>
                    
                    <div className="flex items-center gap-8 px-4 border-l border-stone-100">
                      <label className="flex items-center gap-3 cursor-pointer group/check">
                        <div className={`w-5 h-5 rounded-full border-2 transition-all ${
                          formData.chakras[chakra.id as keyof typeof formData.chakras].equilibrado 
                            ? 'bg-emerald-500 border-emerald-500 scale-110' 
                            : 'border-stone-200 group-hover/check:border-stone-400'
                        }`}>
                          {formData.chakras[chakra.id as keyof typeof formData.chakras].equilibrado && (
                            <div className="w-full h-full flex items-center justify-center text-white text-[10px]">✓</div>
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
                        <span className="text-[10px] uppercase tracking-widest font-bold text-stone-500 group-hover/check:text-stone-800 transition-colors">Equilibrado</span>
                      </label>

                      <label className="flex items-center gap-3 cursor-pointer group/check">
                        <div className={`w-5 h-5 rounded-full border-2 transition-all ${
                          formData.chakras[chakra.id as keyof typeof formData.chakras].desequilibrio 
                            ? 'bg-rose-500 border-rose-500 scale-110' 
                            : 'border-stone-200 group-hover/check:border-stone-400'
                        }`}>
                          {formData.chakras[chakra.id as keyof typeof formData.chakras].desequilibrio && (
                            <div className="w-full h-full flex items-center justify-center text-white text-[10px]">!</div>
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
                        <span className="text-[10px] uppercase tracking-widest font-bold text-stone-500 group-hover/check:text-stone-800 transition-colors">Desequilíbrio</span>
                      </label>
                    </div>

                    <div className="flex-1">
                      <input
                        type="text"
                        placeholder="Observações..."
                        value={formData.chakras[chakra.id as keyof typeof formData.chakras].observacoes}
                        onChange={(e) => {
                          const newChakras = { ...formData.chakras };
                          (newChakras as any)[chakra.id].observacoes = e.target.value;
                          setFormData({ ...formData, chakras: newChakras });
                        }}
                        className="w-full bg-transparent border-none focus:ring-0 text-sm text-stone-600 italic placeholder:text-stone-200 outline-none focus:bg-white rounded px-2 transition-colors border-b border-transparent focus:border-stone-200"
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
      <footer className="no-print border-t border-stone-100 py-12 text-center">
        <div className="mb-8">
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-2 px-8 py-3 bg-stone-900 text-white text-sm font-medium rounded-full hover:bg-stone-800 hover:shadow-xl active:scale-95 transition-all duration-300"
          >
            <Printer size={18} />
            <span>Gerar PDF Agora</span>
          </button>
        </div>
        <p className="text-stone-400 text-xs uppercase tracking-[0.3em] font-bold mb-2">Marta Ficha</p>
        <p className="text-stone-300 text-[10px]">© 2026 • Atendimento Holístico & Numerologia</p>
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
            padding: 15mm 20mm !important;
            min-height: 297mm !important;
            page-break-after: always !important;
            break-after: page !important;
            display: flex !important;
            flex-direction: column !important;
            box-sizing: border-box !important;
            position: relative !important;
            border: none !important;
            box-shadow: none !important;
            border-radius: 0 !important;
          }
          .print-page-4 {
            page-break-after: auto !important;
            break-after: auto !important;
          }
          .secao-form {
            page-break-inside: avoid !important;
            break-inside: avoid !important;
          }
          textarea {
            border: none !important;
            background-image: linear-gradient(transparent, transparent 31px, #f3f4f6 31px) !important;
            line-height: 32px !important;
            color: #444 !important;
            resize: none !important;
            overflow: hidden !important;
          }
          input {
            border: none !important;
            border-bottom: 1px solid #e5e7eb !important;
            color: #111 !important;
          }
          input::placeholder {
            color: transparent !important;
          }
          .bg-stone-50\\/50, .bg-stone-50\\/30, .bg-stone-50 {
            background-color: #f9fafb !important;
          }
          .shadow-2xl, .shadow-md, .shadow-lg, .shadow-sm {
            box-shadow: none !important;
          }
          .rounded-3xl, .rounded-2xl, .rounded-xl, .rounded-\\[2rem\\] {
            border-radius: 0 !important;
          }
          .border-stone-100, .border-stone-200 {
            border-color: #f3f4f6 !important;
          }
        }

        /* Custom Scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        ::-webkit-scrollbar-thumb {
          background: #d6d3d1;
          border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #a8a29e;
        }
      `}</style>
    </div>
  );
}

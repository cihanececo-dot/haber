import { useState, useEffect } from 'react';
import { Step } from './components/Scrolly';
import { AlertTriangle, Crosshair, Users, Activity, ExternalLink, ArrowDown } from 'lucide-react';
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from 'motion/react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const adaletData = [
  { year: '2016', karar: 215000 },
  { year: '2017', karar: 285000 },
  { year: '2018', karar: 340000 },
  { year: '2019', karar: 410000 },
  { year: '2020', karar: 530000 },
  { year: '2021', karar: 680000 },
  { year: '2022', karar: 810000 },
  { year: '2023', karar: 920000 },
  { year: '2024', karar: 980000 },
  { year: '2025', karar: 1045000 },
];

// Sayı animasyonu için Counter componenti
const Counter = ({ to, duration = 2 }: { to: number, duration?: number }) => {
  const count = useMotionValue(0);
  const formatted = useTransform(count, (latest) => Math.round(latest).toLocaleString('tr-TR'));
  
  useEffect(() => {
      const controls = animate(count, to, { duration, ease: "easeOut" });
      return controls.stop;
  }, [count, to, duration]);

  return <motion.span>{formatted}</motion.span>;
};

export default function App() {
  const [activeStep, setActiveStep] = useState(0);

  const VisualGraphics = ({ step }: { step: number }) => {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-slate-50 text-slate-800 relative overflow-hidden font-mono">
        <div className="bg-noise" />
        
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div key="v0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center">
              <h1 className="text-[12vw] md:text-[6vw] font-bold tracking-tighter uppercase leading-none text-slate-200">
                <span className="glitch opacity-30" data-text="ÇÜRÜME">ÇÜRÜME</span>
              </h1>
              <div className="mt-8 border border-slate-300 p-4 text-xs text-brand tracking-widest uppercase bg-white/50 backdrop-blur">
                Anomali Tespiti
              </div>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div key="v1" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ opacity: 0 }} className="w-full max-w-lg">
              <div className="grid grid-cols-1 gap-6 text-center">
                <div className="border border-brand/30 bg-white p-8 relative overflow-hidden shadow-sm">
                  <div className="text-slate-400 mb-2 text-sm uppercase tracking-widest">Kayıp Canlar</div>
                  <div className="text-7xl font-sans text-brand tracking-tighter font-bold">
                    <Counter to={2225} duration={1.5} />
                  </div>
                  <div className="absolute top-0 right-0 p-2 text-[10px] text-slate-400">2025</div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="border border-slate-200 bg-white p-6 text-left flex flex-col justify-between shadow-sm">
                    <div className="text-slate-400 text-xs uppercase mb-4">Vaka Sayısı</div>
                    <div className="text-4xl text-slate-800 font-bold tracking-tighter">
                      <Counter to={3422} duration={1.8} />
                    </div>
                  </div>
                  <div className="border border-slate-200 bg-slate-100 p-6 text-left flex flex-col justify-between shadow-sm">
                    <div className="text-slate-400 text-xs uppercase mb-4">Yaralı</div>
                    <div className="text-4xl text-slate-600 font-bold tracking-tighter">
                      <Counter to={3167} duration={2} />
                    </div>
                  </div>
                </div>   
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="v2" initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ opacity: 0, x: -50 }} className="w-full flex-col flex items-center justify-center">
               <div className="text-slate-400 mb-2 uppercase tracking-widest text-sm relative bg-white/80 px-4 py-1 rounded">
                  Verilen Tedbir Kararı (Son 9 Yıl)
               </div>
               <div className="relative border-b-8 border-brand/20 pb-2 mb-8">
                 <h2 className="text-5xl md:text-6xl font-sans font-bold text-slate-800 tracking-tighter tabular-nums z-10 relative">
                   <Counter to={1045000} duration={2.5} /><span className="text-brand">+</span>
                 </h2>
                 <motion.div 
                    initial={{ width: 0 }} 
                    animate={{ width: '100%' }} 
                    transition={{ duration: 2, ease: "circInOut" }}
                    className="absolute -bottom-2 left-0 h-2 bg-brand"
                 />
               </div>
               
               <div className="w-full max-w-lg h-64 bg-white p-4 shadow-sm border border-slate-200">
                 <ResponsiveContainer width="100%" height="100%">
                   <AreaChart data={adaletData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                     <defs>
                       <linearGradient id="colorKarar" x1="0" y1="0" x2="0" y2="1">
                         <stop offset="5%" stopColor="#da1212" stopOpacity={0.3}/>
                         <stop offset="95%" stopColor="#da1212" stopOpacity={0}/>
                       </linearGradient>
                     </defs>
                     <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} dy={10} />
                     <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} tickFormatter={(value) => `${value / 1000}k`} />
                     <Tooltip 
                       contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '0px', fontSize: '12px' }}
                       itemStyle={{ color: '#da1212', fontWeight: 'bold' }}
                       formatter={(value: number) => [value.toLocaleString('tr-TR'), 'Karar']}
                       labelStyle={{ color: '#64748b' }}
                     />
                     <Area type="monotone" dataKey="karar" stroke="#da1212" strokeWidth={3} fillOpacity={1} fill="url(#colorKarar)" animationDuration={2000} />
                   </AreaChart>
                 </ResponsiveContainer>
               </div>

               <div className="mt-8 text-sm text-slate-500 max-w-sm text-center border-t border-slate-200 pt-4">
                 Sistem tıkandı. Adalet; koruyamayan kararların enflasyonu altında eziliyor.
               </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="v3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full max-w-xl bg-white border border-slate-200 shadow-xl p-6">
              <div className="flex gap-2 mb-4 border-b border-slate-100 pb-4">
                <div className="w-3 h-3 rounded-full bg-brand/50" />
                <div className="w-3 h-3 rounded-full bg-slate-200" />
                <div className="w-3 h-3 rounded-full bg-slate-200" />
              </div>
              <div className="space-y-3 text-xs md:text-sm text-slate-500">
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>&gt; Analyzing digital crowd behavior...</motion.p>
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>&gt; Fetching social media interactions...</motion.p>
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0 }} className="text-brand">&gt; ERROR: EMPATHY_MODULE_FAILED</motion.p>
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>&gt; Overriding with collective rage directive...</motion.p>
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.0 }} className="text-slate-800 font-bold">&gt; EXECUTE: DIGITAL_LYNCH.exe</motion.p>
                <div className="h-4 w-2 bg-brand animate-strobe-bg mt-4" />
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div key="v4" initial={{ scale: 1.2, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1 }} exit={{ opacity: 0 }} className="text-center relative">
               <div className="absolute inset-0 flex items-center justify-center -z-10">
                 <div className="w-[150%] h-[150%] bg-brand/10 rounded-full blur-3xl mix-blend-multiply" />
               </div>
               <div className="border border-brand p-12 relative bg-white shadow-2xl">
                 <Activity className="w-16 h-16 text-brand mx-auto mb-8 animate-pulse" />
                 <h2 className="text-3xl md:text-5xl text-slate-800 font-sans font-bold tracking-tight mb-4">SİSTEM TEHLİKEDE</h2>
                 <p className="text-slate-500 text-sm max-w-sm mx-auto uppercase tracking-widest">Ahlaki çözülme tamamlanmak üzere.</p>
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <div className="bg-slate-50 font-sans selection:bg-brand selection:text-white text-slate-800">
      
      {/* Üst Navigasyon Menüsü */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="w-full grid grid-cols-5 text-[10px] md:text-xs font-mono tracking-widest uppercase divide-x divide-slate-200">
          <a href="#intro" className="py-4 text-center text-slate-500 hover:text-brand hover:bg-slate-50 transition-colors hidden sm:block">Sistem Hatası</a>
          <a href="#intro" className="py-4 text-center text-slate-500 hover:text-brand hover:bg-slate-50 transition-colors sm:hidden">Giriş</a>
          <a href="#siddet" className="py-4 text-center text-slate-500 hover:text-brand hover:bg-slate-50 transition-colors">Şiddet</a>
          <a href="#adalet" className="py-4 text-center text-slate-500 hover:text-brand hover:bg-slate-50 transition-colors">Adalet</a>
          <a href="#dijital" className="py-4 text-center text-slate-500 hover:text-brand hover:bg-slate-50 transition-colors hidden sm:block">Dijital Çürüme</a>
          <a href="#dijital" className="py-4 text-center text-slate-500 hover:text-brand hover:bg-slate-50 transition-colors sm:hidden">Dijital</a>
          <a href="#ahlaki" className="py-4 text-center text-slate-500 hover:text-brand hover:bg-slate-50 transition-colors hidden sm:block">Ahlaki Çözülme</a>
          <a href="#ahlaki" className="py-4 text-center text-slate-500 hover:text-brand hover:bg-slate-50 transition-colors sm:hidden">Sonuç</a>
        </div>
      </nav>

      {/* Giriş Ekranı */}
      <div className="h-screen w-full flex flex-col items-center justify-center text-center px-6 relative z-20 border-b border-slate-200 overflow-hidden">
        <div className="bg-noise" />
        <div className="absolute inset-0 flex items-center justify-center -z-10 opacity-30 pointer-events-none">
          <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-300 via-slate-50 to-slate-50" />
        </div>
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, ease: "easeOut" }} className="w-full max-w-6xl mx-auto z-10">
          <h1 className="text-6xl md:text-[8vw] font-bold tracking-tighter text-slate-900 mb-8 leading-none uppercase">
            Sessizce <br className="md:hidden" /><span className="text-brand relative inline-block glitch" data-text="Çürüyenler">Çürüyenler</span>
          </h1>
          <div className="w-24 h-1 bg-brand mx-auto mb-10" />
          <p className="text-xl md:text-3xl text-slate-600 max-w-4xl mx-auto font-light leading-relaxed">
            "Bozulan tamir edilir, ama çürüyen onarılamaz.<br className="hidden md:block"/> Bir toplumun temelinden, dijital ekranlarına uzanan sessiz inişine tanıklık edin."
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-12 flex flex-col items-center text-xs text-slate-500 font-mono tracking-widest uppercase gap-4"
        >
          <div className="w-px h-16 bg-gradient-to-b from-brand to-transparent" />
          <ArrowDown className="w-5 h-5 text-brand animate-bounce" />
        </motion.div>
      </div>

      {/* Ana İçerik - Scrollytelling */}
      <div className="flex flex-col md:flex-row relative">
      
      {/* Sol Pane - Haberler */}
      <div className="w-full md:w-3/5 min-h-screen border-r border-slate-200 z-10 px-6 md:px-16 lg:px-24">
        
        <header className="sticky top-12 md:top-14 pt-8 pb-4 bg-slate-50/90 backdrop-blur z-40 border-b border-slate-200 mb-8 flex justify-between items-center">
            <div className="text-lg font-bold tracking-tighter uppercase text-slate-800 flex items-center gap-2">
              <div className="w-3 h-3 bg-brand" /> ÇÜRÜME RAPORU
            </div>
            <div className="text-xs text-slate-500 font-mono hidden sm:block">DURUM: KRİTİK</div>
        </header>

        <div className="pb-32">
          {/* Step 0: Intro */}
          <Step id="intro" index={0} activeStep={activeStep} onStepEnter={setActiveStep}>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-8 text-slate-900 leading-tight">
              Sessiz ve Derinden: <br/><span className="text-slate-400 font-medium">Bir Sistem Hatası</span>
            </h1>
            <div className="space-y-6 text-slate-600 text-lg md:text-xl leading-relaxed">
              <p>
                Her şeyin bir gecede değil, yavaşça, hissettirmeden gerçekleştiğini anladığımızda çok geçti. Sokaklarda yankılanan silah sesleri, dijital dünyada birbirini parçalayan kalabalıkların uğultusu ve mahkeme salonlarına yığılan milyonlarca dosya... 
              </p>
              <p>
                Karşımızda duran tablo sadece güncel haber istatistiklerinden ibaret değil; bir toplumun adım adım kendi ruhunu nasıl kaybettiğinin, ahlaki pusulasını nasıl yitirdiğinin hikayesi.
              </p>
            </div>
            <div className="mt-12 flex items-center text-xs text-brand font-mono uppercase tracking-widest gap-2">
               <ArrowDown className="w-4 h-4 animate-bounce" /> İncelemeye Başla
            </div>
          </Step>

          {/* Step 1: Şiddetin Sıradanlaşması */}
          <Step id="siddet" index={1} activeStep={activeStep} onStepEnter={setActiveStep}>
            <Crosshair className="w-10 h-10 text-brand mb-6" />
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-8 text-slate-900">Şiddetin Sıradanlaşması</h2>
            <img src="https://images.unsplash.com/photo-1605806616949-1e87b487fc2f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Şiddetin Sıradanlaşması" className="w-full object-cover aspect-video mb-8 opacity-80 mix-blend-multiply contrast-125 brightness-90 border border-slate-200 pointer-events-none" />
            <div className="space-y-6 text-slate-600 text-lg md:text-xl leading-relaxed">
              <p>
                Umut Vakfı'nın hazırladığı 2025 raporunu açtığınızda karşınızda sadece sayılar değil, sönen hayatlar ve kararan evler beliriyor. Türkiye genelinde sadece bir yıl içinde <strong>3.422 silahlı şiddet olayı</strong> haber merkezlerine ve polis telsizlerine düştü. Artık haber bültenlerindeki üçüncü sayfa şiddeti, gündelik yaşamın arka plan gürültüsü haline geldi.
              </p>
              <p>
                Sokak başlarında, trafikteki en ufak bir tartışmada veya sıradan bir anlaşmazlıkta artık kelimeler değil, namlular konuşuyor. İnsan hayatının faturasının bir anlık öfkeye kesildiği bu düzende, <strong>2.225 insan</strong> hayatını kaybetti. Şiddet artık bir 'istisna' olmaktan çıkıp, günlük rutinimizin kanlı bir parçasına dönüştü. Silahlanmanın bu denli kolay, can almanın bu kadar ucuz olduğu bir ortamda sokaklar her geçen gün biraz daha güvensizleşiyor.
              </p>
            </div>
            <a href="https://www.odatv.com/guncel/umut-vakfinin-turkiye-silahli-siddet-haritasi-2025-raporu-on-binlerce-kisi-oldu-bilancolari-kiyasladik-120137621" target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center text-sm font-mono text-slate-500 hover:text-brand transition-colors border-b border-slate-300 pb-1 w-fit font-bold">
              ODATV Raporu İncele <ExternalLink className="w-4 h-4 ml-2" />
            </a>
          </Step>

          {/* Step 2: Adalet */}
          <Step id="adalet" index={2} activeStep={activeStep} onStepEnter={setActiveStep}>
            <AlertTriangle className="w-10 h-10 text-brand mb-6" />
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-8 text-slate-900">Tedbir Kararları Enflasyonu</h2>
            <img src="https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=1170&auto=format&fit=crop" alt="Tedbir Kararları" className="w-full object-cover aspect-video mb-8 opacity-80 mix-blend-multiply contrast-125 brightness-90 border border-slate-200 pointer-events-none" />
            <div className="space-y-6 text-slate-600 text-lg md:text-xl leading-relaxed">
              <p>
                Kan ve şiddetin gölgesinde adalet arayışı uçsuz bucaksız bir çaresizlikle boğuşuyor. Adalet Bakanlığı’nın 2025 istatistikleri, idari mahkemelerin ve emniyet güçlerinin nasıl bir evrak ve süreç yükü altında ezildiğini şeffaf bir şekilde netleştiriyor.
              </p>
              <p>
                Özellikle kadına yönelik şiddet başvurularında 6284 sayılı yasa kapsamında verilen önleyici tedbir kararları, son 9 yılda yaklaşık 5 kat artarak <strong>1 milyonu aştı</strong>. Ancak asıl korkutucu olan, karar sayısındaki bu enflasyonun şiddeti durduramaması... Koruma kararlarının kağıt üzerinde kaldığı, adaletin hızının cinayet hızına yetişemediği bir noktadayız. Sistem, koruyamadığı canların ardından sadece daha fazla tedbir belgesi üreterek durumu yönetmeye çalışıyor.
              </p>
            </div>
             <a href="https://www.cumhuriyet.com.tr/turkiye/adalet-bakanligi-2025-verilerini-acikladi-siddet-basvurularinda-dikkat-cekici-artis-2493541" target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center text-sm font-mono text-slate-500 hover:text-brand transition-colors border-b border-slate-300 pb-1 w-fit font-bold">
              CUMHURİYET Raporu İncele <ExternalLink className="w-4 h-4 ml-2" />
            </a>
          </Step>

          {/* Step 3: Dijital Çürüme */}
          <Step id="dijital" index={3} activeStep={activeStep} onStepEnter={setActiveStep}>
            <Users className="w-10 h-10 text-brand mb-6" />
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-8 text-slate-900">Linç Kültürü ve Yalnızlaşma</h2>
            <img src="https://images.unsplash.com/photo-1557081998-05f784dcdd41?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Dijital Çürüme" className="w-full object-cover aspect-video mb-8 opacity-80 mix-blend-multiply contrast-125 brightness-90 border border-slate-200 pointer-events-none" />
            <div className="space-y-6 text-slate-600 text-lg md:text-xl leading-relaxed">
              <p>
                Çürüme sadece fiziksel sokaklarımızı değil, saatlerimizi geçirdiğimiz dijital mahalleleri de ele geçirmiş durumda. Modern insan, karanlık bir odadaki derin yalnızlığını, klavye başında başkalarına acımasızca saldırarak gidermeye çalışıyor.
              </p>
              <p>
                Sosyal medya platformları birer iletişim aracı olmaktan çıkıp sınırların belirsizleştiği bir linç arenasına dönüştü. İnsanlar "yalnız olmadıklarını" hissedebilmek uğruna sanal kalabalıkların öfkesine ortak oluyor, hedefe konulan bir isme karşı en ufak bir empati kırıntısı bile taşımadan öfke kusuyorlar. İtibarın, kelimelerin sivri uçlarıyla saniyeler içinde yok edildiği bu dijital mobing kültürü, aslında hepimizin içindeki kolektif saldırganlığın tatmin bulduğu en tehlikeli ve en sessiz yaradır. 
              </p>
            </div>
            <a href="https://www.gelisim.edu.tr/tr/gelisim-haber-insanlar-yalniz-olmadiklarini-hissetmek-icin-sosyal-medyada-linc-ediyor" target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center text-sm font-mono text-slate-500 hover:text-brand transition-colors border-b border-slate-300 pb-1 w-fit font-bold">
              Akademik İncelemeyi Oku <ExternalLink className="w-4 h-4 ml-2" />
            </a>
          </Step>

          {/* Step 4: Ahlaki Çürüme */}
          <Step id="ahlaki" index={4} activeStep={activeStep} onStepEnter={setActiveStep}>
            <div className="w-8 h-8 bg-brand mb-6" />
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-8 text-slate-900">Yekûn: Ahlaki Çözülme</h2>
            <img src="https://images.unsplash.com/photo-1581007871115-f14bc016e0a4?q=80&w=1170&auto=format&fit=crop" alt="Ahlaki Çözülme" className="w-full object-cover aspect-video mb-8 opacity-80 mix-blend-multiply contrast-125 brightness-90 border border-slate-200 pointer-events-none" />
            <div className="space-y-6 text-slate-600 text-lg md:text-xl leading-relaxed">
              <p>
                <em className="text-slate-800 font-bold">"Ekonomik kriz yok, çürüme var."</em> Ekonomi gazetelerinin bile doğrudan manşetlerine taşınan bu yakıcı teşhis, içine sürüklendiğimiz dönemin belgesidir. Cebimizdeki paranın enflasyon karşısında erimesinden çok daha sinsi ve yıkıcı olan gerçek, insana, hukuka, adalete ve birbirimize olan merhametimizin tükenmesidir.
              </p>
              <p>
                Ülkelerin ekonomileri pragmatik kararlar, doğru para politikaları ve istihdam ile toparlanabilir. Ancak ahlaki tahribatın, güvensizliğin ve günden güne daha da normalleşen sosyal şizofreninin restorasyonu nesiller boyu sürer. Karşı karşıya olduğumuz asıl kriz cüzdanlarımızda değil, vicdanlarımızdadır; kriz tamamen varoluşsal ve ahlakidir.
              </p>
            </div>
            <a href="https://www.ekonomigazetesi.com/kose-yazisi/ekonomik-kriz-yok-curume-var-derken-71151" target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center text-sm font-mono text-slate-500 hover:text-brand transition-colors border-b border-slate-300 pb-1 w-fit font-bold">
              Ekonomi Gazetesi İçeriği <ExternalLink className="w-4 h-4 ml-2" />
            </a>
          </Step>
          
          <div className="pt-24 pb-12 flex items-center justify-center border-t border-slate-200 mt-24">
             <div className="text-center">
                <div className="text-slate-400 font-mono text-xs uppercase tracking-widest flex items-center justify-center gap-2">
                  <div className="w-1 h-3 bg-slate-400" />
                  Rapor Sonu
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* Sağ Pane - Dinamik Grafikler */}
      <div className="hidden md:block md:w-2/5 h-screen sticky top-0 bg-slate-100 border-l border-slate-200">
         <VisualGraphics step={activeStep} />
      </div>
      
      {/* Mobile view floating visual */}
      <div className="md:hidden fixed z-[5] top-0 left-0 w-full h-full opacity-10 pointer-events-none grayscale mix-blend-multiply">
         <VisualGraphics step={activeStep} />
      </div>

    </div>
    </div>
  );
}

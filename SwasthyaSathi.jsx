import React, { useState, useEffect } from 'react';

// Multi-language greetings and translations
const translations = {
  en: {
    emergency: "Urgent Medical Emergency? For severe breathing difficulty, chest pain, or trauma:",
    call112: "Call 112 Now",
    tagline: "YOUR HEALTH, YOUR LANGUAGE",
    heroTitle: "Healthcare guidance, just a conversation away.",
    heroSub: "Speak naturally. Find the right type of care, discover public healthcare services, and understand government scheme information — in a language you're comfortable with.",
    ctaTalk: "Talk to SwasthyaSathi",
    ctaHospitals: "Find Public Hospitals",
    trustBadge: "Privacy-minded • Source-led • Built for everyone",
    card1Title: "Voice Health Guide",
    card1Sub: "Ask in your own words",
    card2Title: "Government Hospitals",
    card2Sub: "Find care & verified services",
    card3Title: "Health Schemes (PM-JAY)",
    card3Sub: "Eligibility & free cards",
    card4Title: "Senior Citizen Care",
    card4Sub: "Simple, high-contrast support",
    greeting: "Namaste! How can I help you today?",
    inputPrompt: "Tap the microphone to speak, or type your health question below.",
    inputPlaceholder: "Ask in your language (e.g. 'Stomach pain since yesterday')...",
    listening: "Listening to your voice...",
    tapToSpeak: "Tap to Speak",
    listenAudio: "Listen (Voice)",
    pauseAudio: "Pause",
    doctorRecommendation: "A General Medicine clinician may be a reasonable first step",
    responseBody: "Stomach pain can have multiple causes, and this AI assistant does not provide a definitive diagnosis. If you experience severe or worsening pain, continuous vomiting, or high fever, seek emergency care immediately. Otherwise, a qualified clinician at a Primary Health Centre (PHC) or Community Health Centre (CHC) can assess your condition.",
    sources: "Source: National Health Mission & MoHFW Clinical Protocols"
  },
  hi: {
    emergency: "आपातकालीन स्थिति? सांस लेने में गंभीर तकलीफ, सीने में दर्द या भारी रक्तस्राव:",
    call112: "तुरंत 112 डायल करें",
    tagline: "आपका स्वास्थ्य, आपकी भाषा",
    heroTitle: "स्वास्थ्य सलाह, अब सिर्फ एक बातचीत की दूरी पर।",
    heroSub: "अपनी भाषा में सहजता से बोलें। सही डॉक्टर चुनें, सरकारी अस्पताल खोजें और आयुष्मान भारत जैसी योजनाओं की जानकारी आसान भाषा में पाएं।",
    ctaTalk: "स्वास्थ्य साथी से बात करें",
    ctaHospitals: "सरकारी अस्पताल खोजें",
    trustBadge: "गोपनीयता सुरक्षित • प्रामाणिक स्रोत • सबके लिए सुलभ",
    card1Title: "आवाज से स्वास्थ्य सलाह",
    card1Sub: "अपनी बोली में पूछें",
    card2Title: "सरकारी अस्पताल",
    card2Sub: "नजदीकी अस्पताल व सुविधाएं",
    card3Title: "स्वास्थ्य योजनाएं (PM-JAY)",
    card3Sub: "पात्रता एवं मुफ्त आयुष्मान कार्ड",
    card4Title: "वरिष्ठ नागरिक सेवा",
    card4Sub: "सरल और सुलभ सहायता",
    greeting: "नमस्ते! आज मैं आपकी क्या सहायता कर सकता हूँ?",
    inputPrompt: "बोलने के लिए माइक दबाएं, या नीचे अपना सवाल लिखें।",
    inputPlaceholder: "अपनी भाषा में पूछें (उदा. 'कल से पेट में दर्द है')...",
    listening: "आपकी आवाज सुन रहे हैं...",
    tapToSpeak: "बोलने के लिए दबाएं",
    listenAudio: "आवाज में सुनें",
    pauseAudio: "रोकें",
    doctorRecommendation: "सामान्य चिकित्सा (General Medicine) डॉक्टर से परामर्श उपयुक्त पहला कदम है",
    responseBody: "पेट दर्द के कई कारण हो सकते हैं, और यह AI सहायक अंतिम निदान (Diagnosis) नहीं देता। यदि दर्द अत्यधिक तीव्र है, उल्टी में खून है, या तेज बुखार है, तो तुरंत आपातकालीन केंद्र जाएं। अन्यथा नजदीकी प्राथमिक स्वास्थ्य केंद्र (PHC) में डॉक्टर को दिखाएं।",
    sources: "स्रोत: राष्ट्रीय स्वास्थ्य मिशन एवं स्वास्थ्य मंत्रालय भारत सरकार"
  },
  mr: {
    emergency: "तातडीची वैद्यकीय मदत हवी आहे? श्वास घेण्यास त्रास किंवा छातीत दुखत असल्यास:",
    call112: "तातडीने 112 वर कॉल करा",
    tagline: "तुमचे आरोग्य, तुमची भाषा",
    heroTitle: "आरोग्य मार्गदर्शन, आता फक्त एका संभाषणाच्या अंतरावर.",
    heroSub: "तुमच्या मातृभाषेत सहज बोला. योग्य डॉक्टर शोधा, सरकारी रुग्णालये आणि मोफत आरोग्य योजनांची माहिती मिळवा.",
    ctaTalk: "स्वास्थ्य साथीशी बोला",
    ctaHospitals: "सरकारी रुग्णालये शोधा",
    trustBadge: "सुरक्षित व गोपनीय • अधिकृत माहिती • सर्वांसाठी सुलभ",
    card1Title: "व्हॉइस आरोग्य मार्गदर्शक",
    card1Sub: "तुमच्या शब्दांत विचारा",
    card2Title: "सरकारी रुग्णालये",
    card2Sub: "जवळचे सेवा केंद्र शोधा",
    card3Title: "आरोग्य योजना (PM-JAY)",
    card3Sub: "पात्रता व आवश्यक कागदपत्रे",
    card4Title: "ज्येष्ठ नागरिक सेवा",
    card4Sub: "सुलभ आणि सोपी मदत",
    greeting: "नमस्कार! मी तुम्हाला कशी मदत करू शकतो?",
    inputPrompt: "बोलण्यासाठी माईकवर टॅप करा किंवा खाली तुमचा प्रश्न लिहा.",
    inputPlaceholder: "तुमच्या भाषेत विचारा (उदा. 'पोटात दुखत आहे')...",
    listening: "आवाज ऐकत आहे...",
    tapToSpeak: "बोलण्यासाठी टॅप करा",
    listenAudio: "ऑडिओ ऐका",
    pauseAudio: "थांबवा",
    doctorRecommendation: "जनरल मेडिसिन डॉक्टरांचा सल्ला घेणे योग्य राहील",
    responseBody: "पोटदुखीची अनेक कारणे असू शकतात. हा AI सहाय्यक अंतिम निदान करत नाही. तीव्र वेदना किंवा उलट्या होत असल्यास त्वरित रुग्णालयात जा. अन्यथा जवळच्या प्राथमिक आरोग्य केंद्रात (PHC) डॉक्टरांचा सल्ला घ्या.",
    sources: "स्रोत: राष्ट्रीय आरोग्य अभियान आणि आरोग्य मंत्रालय"
  }
};

export default function SwasthyaSathiApp() {
  const [lang, setLang] = useState('en');
  const [isSeniorMode, setIsSeniorMode] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [query, setQuery] = useState("Which doctor should I consult for stomach pain?");
  const [hasResponse, setHasResponse] = useState(true);

  const t = translations[lang] || translations.en;

  // Toggle voice recording simulation
  const handleMicToggle = () => {
    if (!isRecording) {
      setIsRecording(true);
      setTimeout(() => {
        setIsRecording(false);
        setQuery(lang === 'hi' ? "पेट दर्द के लिए किस डॉक्टर से मिलना चाहिए?" : "Which doctor should I consult for stomach pain?");
        setHasResponse(true);
      }, 2500);
    } else {
      setIsRecording(false);
    }
  };

  // Toggle audio playback simulation
  const handleAudioToggle = () => {
    setIsPlayingAudio(!isPlayingAudio);
  };

  const sampleQuestions = [
    { text: "Which doctor should I consult for stomach pain?", category: "Symptom" },
    { text: "How do I find an Ayushman Bharat empanelled hospital?", category: "Hospitals" },
    { text: "Am I eligible for PM-JAY 5 Lakh coverage?", category: "Schemes" }
  ];

  return (
    <div className={`min-h-screen bg-[#F8FAF9] text-slate-800 font-sans selection:bg-emerald-100 selection:text-emerald-900 ${isSeniorMode ? 'text-lg' : 'text-base'}`}>
      
      {/* 1. TOP URGENT EMERGENCY SAFETY BAR */}
      <aside aria-label="Emergency warning" className="bg-red-700 text-white px-4 py-2.5 shadow-sm text-sm">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-300 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
            </span>
            <span className="font-semibold tracking-wide">EMERGENCY ALERT:</span>
            <span className="text-red-100">{t.emergency}</span>
          </div>
          <a
            href="tel:112"
            className="inline-flex items-center gap-2 bg-white text-red-700 hover:bg-red-50 font-bold px-3.5 py-1 rounded-full text-xs transition-colors shadow-sm"
          >
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 4V3z" />
            </svg>
            <span>{t.call112}</span>
          </a>
        </div>
      </aside>

      {/* 2. MAIN NAVIGATION HEADER */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-emerald-900/10 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-800 to-emerald-600 flex items-center justify-center text-white shadow-md shadow-emerald-700/20">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight text-slate-900 flex items-center gap-1.5">
                SwasthyaSathi <span className="bg-emerald-100 text-emerald-800 font-bold text-xs px-2 py-0.5 rounded-md uppercase">AI</span>
              </span>
              <p className="text-xs text-slate-500 font-medium hidden sm:block">Public Health Guidance Assistant</p>
            </div>
          </div>

          {/* Right Action Controls: Senior Mode & Language Switcher */}
          <div className="flex items-center gap-3">
            
            {/* Senior Friendly Mode Button */}
            <button
              onClick={() => setIsSeniorMode(!isSeniorMode)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all flex items-center gap-1.5 ${
                isSeniorMode 
                  ? 'bg-amber-100 border-amber-300 text-amber-900 shadow-sm' 
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
              title="Toggle Large Text & High Readability"
            >
              <span className="text-sm">👓</span>
              <span>{isSeniorMode ? 'Large Text: ON' : 'Senior Mode'}</span>
            </button>

            {/* Language Selector Dropdown */}
            <div className="flex items-center bg-slate-50 rounded-lg p-1 border border-slate-200">
              <span className="text-slate-400 pl-2 text-xs">🌐</span>
              <select
                value={lang}
                onChange={(e) => setLang(e.target.value)}
                className="bg-transparent text-xs font-bold text-slate-800 py-1 px-2 focus:outline-none cursor-pointer"
              >
                <option value="en">English</option>
                <option value="hi">हिंदी (Hindi)</option>
                <option value="mr">मराठी (Marathi)</option>
              </select>
            </div>

            {/* Direct Emergency Call Button for Mobile */}
            <a
              href="tel:112"
              className="hidden md:flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-3.5 py-2 rounded-lg transition-colors shadow-sm"
            >
              <span>🚨 112</span>
            </a>
          </div>
        </div>
      </header>

      {/* 3. HERO SECTION */}
      <section className="relative overflow-hidden pt-8 pb-14 lg:py-16 bg-gradient-to-b from-white to-[#F3F7F5] border-b border-emerald-900/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100/80 text-emerald-900 border border-emerald-200/60 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
                <span>{t.tagline}</span>
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.18]">
                {t.heroTitle}
              </h1>

              {/* Subtitle */}
              <p className="text-slate-600 leading-relaxed text-base sm:text-lg max-w-2xl font-normal">
                {t.heroSub}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => {
                    const el = document.getElementById('chat-section');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-6 py-3.5 rounded-xl transition-all shadow-md shadow-emerald-700/25 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
                >
                  <span className="p-1 rounded-md bg-white/20">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m-4 0h8m-4-18a3 3 0 00-3 3v8a3 3 0 006 0V5a3 3 0 00-3-3z"/>
                    </svg>
                  </span>
                  <span>{t.ctaTalk}</span>
                  <span>→</span>
                </button>

                <button 
                  onClick={() => alert("Opening verified Government PHC / CHC locator...")}
                  className="inline-flex items-center gap-2.5 bg-white hover:bg-slate-50 text-slate-800 font-semibold px-5 py-3.5 rounded-xl border border-slate-200 transition-all hover:border-slate-300 shadow-2xs"
                >
                  <svg className="w-4 h-4 text-emerald-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                  <span>{t.ctaHospitals}</span>
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 pt-1">
                <svg className="w-4 h-4 text-emerald-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span>{t.trustBadge}</span>
              </div>
            </div>

            {/* Right Hero Graphic with Ambient Glow & Floating Cards */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md">
                
                {/* Ambient Soft Glow Backdrop */}
                <div className="absolute -inset-4 bg-gradient-to-r from-emerald-200/50 to-teal-100/50 rounded-full blur-2xl -z-10"></div>

                {/* Doctor Avatar Card */}
                <div className="relative bg-white/90 backdrop-blur-md rounded-3xl p-6 border border-emerald-100 shadow-xl shadow-emerald-900/5 flex flex-col items-center text-center">
                  
                  {/* Floating Pill Top Right */}
                  <div className="absolute -top-3 -right-3 bg-white border border-emerald-200 text-emerald-800 text-xs font-bold px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5 animate-bounce">
                    <span>🎙️</span>
                    <span>Voice First AI</span>
                  </div>

                  {/* Doctor Illustration / Avatar */}
                  <div className="w-36 h-36 rounded-full bg-gradient-to-b from-emerald-100 to-teal-50 border-4 border-white shadow-md flex items-center justify-center relative overflow-hidden mb-4">
                    <svg className="w-24 h-24 text-emerald-800" viewBox="0 0 64 64" fill="currentColor">
                      <circle cx="32" cy="22" r="14" fill="#E2A679" />
                      <path d="M18 16c0-6 6-10 14-10s14 4 14 10c0 3-1 6-3 8-1-5-6-9-11-9s-10 4-11 9c-2-2-3-5-3-8z" fill="#1e293b" />
                      <path d="M16 60c0-10 7-18 16-18s16 8 16 18H16z" fill="#047857" />
                      <path d="M26 42v10c0 3 2 6 6 6s6-3 6-6V42" fill="none" stroke="#f8fafc" strokeWidth="3" />
                      <circle cx="32" cy="56" r="3" fill="#38bdf8" />
                    </svg>
                  </div>

                  <h3 className="font-extrabold text-slate-800 text-lg">Dr. Swasthya Companion</h3>
                  <p className="text-xs text-slate-500 max-w-xs mt-1">
                    Ready to guide you to the right care in your native language.
                  </p>

                  {/* Floating Pill Bottom Left */}
                  <div className="mt-4 w-full bg-emerald-50/80 border border-emerald-200/80 rounded-xl p-2.5 flex items-center justify-between text-xs text-emerald-900 font-semibold">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      10+ Indian Languages
                    </span>
                    <span className="text-emerald-700 font-bold">24×7 Free</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. FOUR QUICK ACCESS CARDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Card 1: Voice Health Guide */}
          <div 
            onClick={() => {
              const el = document.getElementById('chat-section');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-lg hover:border-emerald-400 hover:-translate-y-1 transition-all cursor-pointer flex items-center justify-between"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center text-xl shrink-0 group-hover:scale-110 transition-transform">
                🎙️
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">{t.card1Title}</h4>
                <p className="text-xs text-slate-500 mt-0.5">{t.card1Sub}</p>
              </div>
            </div>
            <span className="text-slate-400 group-hover:text-emerald-600 transition-colors">→</span>
          </div>

          {/* Card 2: Government Hospitals */}
          <div 
            onClick={() => alert("Navigating to Verified PM-JAY & Public Hospitals Map...")}
            className="group bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-lg hover:border-emerald-400 hover:-translate-y-1 transition-all cursor-pointer flex items-center justify-between"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center text-xl shrink-0 group-hover:scale-110 transition-transform">
                🏥
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">{t.card2Title}</h4>
                <p className="text-xs text-slate-500 mt-0.5">{t.card2Sub}</p>
              </div>
            </div>
            <span className="text-slate-400 group-hover:text-emerald-600 transition-colors">→</span>
          </div>

          {/* Card 3: Health Schemes */}
          <div 
            onClick={() => alert("Opening PM-JAY Ayushman Card Eligibility Checker...")}
            className="group bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-lg hover:border-emerald-400 hover:-translate-y-1 transition-all cursor-pointer flex items-center justify-between"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center text-xl shrink-0 group-hover:scale-110 transition-transform">
                📋
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">{t.card3Title}</h4>
                <p className="text-xs text-slate-500 mt-0.5">{t.card3Sub}</p>
              </div>
            </div>
            <span className="text-slate-400 group-hover:text-emerald-600 transition-colors">→</span>
          </div>

          {/* Card 4: Senior Citizen Care */}
          <div 
            onClick={() => setIsSeniorMode(!isSeniorMode)}
            className="group bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-lg hover:border-emerald-400 hover:-translate-y-1 transition-all cursor-pointer flex items-center justify-between"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center text-xl shrink-0 group-hover:scale-110 transition-transform">
                👴
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">{t.card4Title}</h4>
                <p className="text-xs text-slate-500 mt-0.5">{t.card4Sub}</p>
              </div>
            </div>
            <span className="text-slate-400 group-hover:text-emerald-600 transition-colors">→</span>
          </div>

        </div>
      </section>

      {/* 5. INTERACTIVE CONVERSATION / LET'S TALK SECTION */}
      <section id="chat-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        
        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-emerald-700 tracking-wider uppercase">LET'S TALK</span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
                Ready to help
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              Your health, in your words.
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              Ask a general health question or get help finding the right medical service.
            </p>
          </div>
        </div>

        {/* Two-Column Grid: Assistant (Left) vs Safety & Resources (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Assistant Interactive Card */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-md">
            
            {/* Assistant Header */}
            <div className="text-center max-w-md mx-auto mb-6">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-emerald-100/70 border border-emerald-200 text-emerald-700 flex items-center justify-center text-2xl shadow-inner mb-3">
                💚
              </div>
              <h3 className="text-xl font-bold text-slate-900">{t.greeting}</h3>
              <p className="text-xs text-slate-500 mt-1 font-medium">{t.inputPrompt}</p>
            </div>

            {/* Quick Suggestion Pill Chips */}
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {sampleQuestions.map((sq, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setQuery(sq.text);
                    setHasResponse(true);
                  }}
                  className="text-xs font-medium bg-slate-50 hover:bg-emerald-50 hover:border-emerald-300 text-slate-700 hover:text-emerald-800 px-3.5 py-2 rounded-xl border border-slate-200 transition-all flex items-center gap-1.5"
                >
                  <span className="text-slate-400">✨</span>
                  <span>{sq.text}</span>
                  <span className="text-slate-400 text-xs">→</span>
                </button>
              ))}
            </div>

            {/* The Input Bar with Pulsing Mic Button */}
            <div className="relative mb-6">
              <div className={`flex items-center gap-2 bg-slate-50 border-2 rounded-2xl p-2 transition-all ${
                isRecording 
                  ? 'border-red-500 ring-4 ring-red-100 bg-red-50/20' 
                  : 'border-emerald-500/30 focus-within:border-emerald-600 focus-within:ring-4 focus-within:ring-emerald-500/10'
              }`}>
                
                {/* Voice Mic Button */}
                <button
                  onClick={handleMicToggle}
                  title={isRecording ? "Listening... click to stop" : "Tap to Speak"}
                  className={`p-3.5 rounded-xl font-bold flex items-center justify-center transition-all shadow-sm ${
                    isRecording 
                      ? 'bg-red-600 text-white animate-pulse' 
                      : 'bg-emerald-700 hover:bg-emerald-800 text-white hover:scale-105 active:scale-95'
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m-4 0h8m-4-18a3 3 0 00-3 3v8a3 3 0 006 0V5a3 3 0 00-3-3z"/>
                  </svg>
                </button>

                {/* Text Field */}
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={isRecording ? t.listening : t.inputPlaceholder}
                  className="w-full bg-transparent px-3 py-2 text-slate-800 placeholder:text-slate-400 focus:outline-none text-sm sm:text-base"
                />

                {/* Send Button */}
                <button
                  onClick={() => setHasResponse(true)}
                  className="p-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl transition-all shadow-sm shrink-0"
                  title="Submit Question"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                  </svg>
                </button>
              </div>

              {/* Status note */}
              <div className="flex items-center justify-between text-[11px] text-slate-400 px-2 mt-2">
                <span>🛡️ Safe & Anonymous Guidance</span>
                <span>Language: {lang.toUpperCase()}</span>
              </div>
            </div>

            {/* AI Response Card (With Audio TTS & Verified Badges) */}
            {hasResponse && (
              <div className="bg-[#F6FAF8] border border-emerald-200/80 rounded-2xl p-5 sm:p-6 shadow-sm transition-all animate-fadeIn">
                
                {/* Header with Clinical Tag and Voice Readout Button */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-emerald-200/50">
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 rounded-lg bg-emerald-100 text-emerald-800 text-xs font-bold">🩺</span>
                    <span className="text-xs font-bold tracking-wider text-emerald-800 uppercase">
                      General Clinical Guidance
                    </span>
                  </div>

                  {/* Audio Read-Out Button */}
                  <button
                    onClick={handleAudioToggle}
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all shadow-xs ${
                      isPlayingAudio 
                        ? 'bg-emerald-700 text-white animate-pulse' 
                        : 'bg-white text-emerald-800 border border-emerald-300 hover:bg-emerald-50'
                    }`}
                  >
                    <span>{isPlayingAudio ? '⏸️' : '🔊'}</span>
                    <span>{isPlayingAudio ? t.pauseAudio : t.listenAudio}</span>
                  </button>
                </div>

                {/* Response Title */}
                <h4 className="text-base sm:text-lg font-bold text-slate-900 mt-3">
                  {t.doctorRecommendation}
                </h4>

                {/* Response Text */}
                <p className="text-slate-700 text-sm leading-relaxed mt-2 font-normal">
                  {t.responseBody}
                </p>

                {/* Urgent Red Flag Signs Alert */}
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-900 flex items-start gap-2.5">
                  <span className="text-base shrink-0">⚠️</span>
                  <div>
                    <span className="font-bold">Red Flag Symptoms:</span> Severe sudden pain, continuous vomiting, breathlessness, or black stool require urgent in-person medical evaluation.
                  </div>
                </div>

                {/* Helpful Actions */}
                <div className="mt-4 pt-3 border-t border-emerald-200/50 flex flex-wrap items-center justify-between gap-3">
                  <span className="text-[11px] text-slate-500 font-medium">
                    {t.sources}
                  </span>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => alert("Finding nearest Primary Health Centre...")}
                      className="text-xs font-bold text-emerald-800 hover:underline flex items-center gap-1"
                    >
                      <span>Find Nearest PHC / Hospital</span>
                      <span>→</span>
                    </button>
                  </div>
                </div>

              </div>
            )}

          </div>

          {/* RIGHT SIDEBAR: Urgent Help & Trust Cards */}
          <div className="lg:col-span-4 space-y-5">
            
            {/* 1. Need Urgent Help Red Card */}
            <div className="bg-red-50/90 border-2 border-red-200 rounded-3xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <span className="p-2 rounded-xl bg-red-600 text-white text-base">🚨</span>
                <div>
                  <h4 className="font-extrabold text-red-900 text-base">Need Urgent Help?</h4>
                  <p className="text-[11px] text-red-700 font-medium">Don't wait for an AI reply</p>
                </div>
              </div>
              
              <p className="text-xs text-red-800 leading-relaxed mb-4">
                For severe breathing difficulty, sudden chest pressure, heavy bleeding, or loss of consciousness, seek immediate emergency care.
              </p>

              <a
                href="tel:112"
                className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-black py-3 px-4 rounded-xl shadow-md transition-all text-sm tracking-wide active:scale-98"
              >
                <span>📞 Call 112 (National Emergency)</span>
                <span>→</span>
              </a>

              <p className="text-[10px] text-red-600/90 text-center mt-2.5">
                Toll-free 24/7 across India. Dispatches ambulance, police & fire.
              </p>
            </div>

            {/* 2. Designed Around Trust Card */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs">
              <div className="flex items-center gap-2 mb-4 text-emerald-800 font-bold text-sm">
                <span>🛡️</span>
                <span>Designed Around Trust</span>
              </div>

              <ul className="space-y-3 text-xs text-slate-600">
                <li className="flex items-start gap-2.5">
                  <span className="text-emerald-600 font-bold text-sm leading-none mt-0.5">✓</span>
                  <div>
                    <span className="font-bold text-slate-800">Clear Public Sources:</span> All health information is sourced from MoHFW and NHM protocols.
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-emerald-600 font-bold text-sm leading-none mt-0.5">✓</span>
                  <div>
                    <span className="font-bold text-slate-800">No AI Diagnosis:</span> Guides you toward appropriate licensed doctors and public facilities.
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-emerald-600 font-bold text-sm leading-none mt-0.5">✓</span>
                  <div>
                    <span className="font-bold text-slate-800">Privacy First:</span> No mandatory phone number or Aadhaar login required to seek guidance.
                  </div>
                </li>
              </ul>
            </div>

            {/* 3. Official Government Schemes & Portals */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs">
              <div className="flex items-center gap-2 mb-3 text-slate-800 font-bold text-sm">
                <span>🇮🇳</span>
                <span>Official Health Services</span>
              </div>

              <div className="space-y-2">
                <a
                  href="https://pmjay.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 hover:bg-emerald-50 text-xs font-semibold text-slate-700 hover:text-emerald-800 transition-colors border border-slate-100"
                >
                  <span>Ayushman Bharat (PM-JAY)</span>
                  <span>↗</span>
                </a>
                <a
                  href="https://esanjeevani.mohfw.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 hover:bg-emerald-50 text-xs font-semibold text-slate-700 hover:text-emerald-800 transition-colors border border-slate-100"
                >
                  <span>eSanjeevani Teleconsultation</span>
                  <span>↗</span>
                </a>
              </div>
            </div>

          </div>

        </div>

      </section>

      {/* 6. CLEAN FOOTER */}
      <footer className="bg-white border-t border-slate-200 py-8 px-4 sm:px-6 lg:px-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800">SwasthyaSathi AI</span>
            <span>• An accessible public healthcare navigation initiative.</span>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => setLang('en')} className="hover:text-slate-800 font-medium">English</button>
            <button onClick={() => setLang('hi')} className="hover:text-slate-800 font-medium">हिंदी</button>
            <button onClick={() => setLang('mr')} className="hover:text-slate-800 font-medium">मराठी</button>
          </div>
        </div>
      </footer>

    </div>
  );
}

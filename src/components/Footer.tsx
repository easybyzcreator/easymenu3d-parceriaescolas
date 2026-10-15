import React from 'react';
import { motion } from 'motion/react';
import { Settings } from '../types';

interface FooterProps {
  settings?: Settings;
  onOpenAdmin?: () => void;
  hideActionButtons?: boolean;
}

export default function Footer({ settings, hideActionButtons = false }: FooterProps) {
  const primaryColor = settings?.primaryColor || '#865d39';

  return (
    <footer className="w-full py-8 flex flex-col items-center justify-center gap-4 mt-auto px-4">
      {/* Botões de Ação: EVENTOS & MENTORIA (sem redirecionamento) */}
      {!hideActionButtons && (
        <div className="flex flex-col items-center justify-center gap-3.5 mb-8 w-full max-w-xs animate-in fade-in">
          {/* Botão 1: EVENTOS */}
          <div className="relative flex flex-col items-center justify-center w-full max-w-[260px]">
            <motion.button
              type="button"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="w-full py-3.5 px-6 rounded-full font-bold text-xs uppercase tracking-widest text-white shadow-md hover:shadow-lg transition-all text-center cursor-default border border-white/20 flex items-center justify-center hover:brightness-110"
              style={{ backgroundColor: primaryColor }}
            >
              EVENTOS
            </motion.button>
          </div>

          {/* Botão 2: MENTORIA */}
          <div className="relative flex flex-col items-center justify-center w-full max-w-[260px]">
            <motion.button
              type="button"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="w-full py-3.5 px-6 rounded-full font-bold text-xs uppercase tracking-widest text-white shadow-md hover:shadow-lg transition-all text-center cursor-default border border-white/20 flex items-center justify-center hover:brightness-110"
              style={{ backgroundColor: primaryColor }}
            >
              MENTORIA
            </motion.button>
          </div>
        </div>
      )}

      {/* Tag: Logo da sua escola aqui ! */}
      <div 
        className="mb-2 flex items-center justify-center rounded-2xl bg-[#1c1412] border-2 border-[#424733]/80 hover:scale-105 active:scale-95 transition-all text-center w-[240px] max-w-[90vw] h-[80px] px-3 shadow-lg select-none relative overflow-hidden group cursor-default"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-amber-500/5 to-transparent pointer-events-none" />
        <span 
          className="font-script text-[22px] sm:text-[25px] text-[#f5e6d3] whitespace-nowrap tracking-wide text-center drop-shadow-md z-10"
          style={{ fontFamily: "'Great Vibes', cursive" }}
        >
          logo da sua escola aqui !
        </span>
      </div>

      <a 
        href="https://easybyzcreator.com" 
        target="_blank" 
        rel="noopener noreferrer"
        className="group mt-1 flex flex-col items-center cursor-pointer"
        title="Easy Byz Creator"
      >
        <p 
          className="text-[10px] tracking-[0.2em] font-sans font-bold text-[#482E1D] uppercase group-hover:opacity-80 transition-opacity"
          style={{ color: '#482E1D' }}
        >
          DESENVOLVIDO POR
        </p>
        <motion.img 
          src="https://i.ibb.co/Kj1CTDrD/patitour-2026-04-11-T125246-010.png" 
          alt="EasyByz Logo" 
          className="h-[158px] object-contain"
          initial={{ 
            filter: 'brightness(0) saturate(100%) invert(17%) sepia(17%) saturate(1519%) hue-rotate(341deg) brightness(97%) contrast(91%)',
            scale: 0.95
          }}
          whileHover={{ 
            filter: 'brightness(0) saturate(100%) invert(17%) sepia(17%) saturate(1519%) hue-rotate(341deg) brightness(97%) contrast(91%)',
            scale: 1.05
          }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          referrerPolicy="no-referrer"
        />
      </a>
    </footer>
  );
}

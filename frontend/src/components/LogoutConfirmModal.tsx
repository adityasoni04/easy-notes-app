"use client";
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { LogOut, Loader2 } from 'lucide-react'; 

export default function LogoutConfirmModal({ isOpen, onClose, onConfirm, isLoading }: any) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-auto">
      <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity" onClick={isLoading ? undefined : onClose} />

      <div className="relative z-[10000] bg-white w-[calc(100%-2rem)] max-w-sm rounded-[2.5rem] shadow-2xl p-8 border border-blue-50 text-center animate-in fade-in zoom-in duration-200">
        <div className="mx-auto flex items-center justify-center w-20 h-20 bg-blue-50 rounded-full mb-6">
          <LogOut className="text-blue-600 w-10 h-10" />
        </div>

        <h2 className="text-2xl font-black text-slate-800 mb-2">Logging Out?</h2>
        <p className="text-slate-500 mb-8 leading-relaxed">Are you sure you want to end your session?</p>

        <div className="flex flex-col gap-3">
          <button 
            onClick={onConfirm}
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-blue-200 active:scale-95 flex items-center justify-center gap-2"
          >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Yes, Sign Out"}
          </button>
          
          <button 
            onClick={onClose}
            disabled={isLoading}
            className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-4 rounded-2xl transition-all active:scale-95 disabled:opacity-50"
          >
            Stay Logged In
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
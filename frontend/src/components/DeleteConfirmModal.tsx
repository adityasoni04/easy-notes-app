"use client";
import { AlertTriangle, Loader2, X } from 'lucide-react';

export default function DeleteConfirmModal({ isOpen, onClose, onConfirm, loading }: any) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-sm rounded-3xl shadow-2xl p-8 border border-red-50 text-center">
        <div className="mx-auto flex items-center justify-center w-16 h-16 bg-red-50 rounded-full mb-6">
          <AlertTriangle className="text-red-600 w-8 h-8" />
        </div>

        <h2 className="text-2xl font-bold text-slate-800 mb-2">Are you sure?</h2>
        <p className="text-slate-500 mb-8">
          This action cannot be undone. This note will be permanently removed from your AI library.
        </p>

        <div className="flex flex-col gap-3">
          <button 
            disabled={loading}
            onClick={onConfirm}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center shadow-lg shadow-red-100"
          >
            {loading ? <Loader2 className="animate-spin w-5 h-5" /> : "Yes, Delete Note"}
          </button>
          
          <button 
            onClick={onClose}
            className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 rounded-xl transition-all"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
"use client";
import { X, Calendar, Clipboard, Check, NotebookPen } from 'lucide-react';
import { useState } from 'react';

export default function NoteModal({ note, isOpen, onClose }: any) {
    const [isCopied, setIsCopied] = useState(false);

    if (!isOpen || !note) return null;

    const copyToClipboard = () => {
        navigator.clipboard.writeText(note.content);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <div
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300"
                onClick={onClose}
            />
            <div className="relative bg-white w-full max-w-2xl max-h-[85vh] overflow-hidden rounded-[2.5rem] shadow-2xl flex flex-col animate-in fade-in zoom-in duration-300">
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-100/50 rounded-full blur-3xl pointer-events-none" />
                <div className="p-8 pb-6 flex justify-between items-start relative">
                    <div className="pr-8">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-bold uppercase tracking-wider">
                                <NotebookPen className="w-3 h-3" />
                                Easy Notes
                            </span>
                        </div>
                        <h2 className="text-3xl font-extrabold text-slate-800 leading-tight">
                            {note.title}
                        </h2>
                        <div className="flex items-center gap-2 text-slate-400 text-sm mt-3 font-medium">
                            <Calendar className="w-4 h-4" />
                            <span>Created on {new Date(note.createdAt?.$date || note.createdAt).toLocaleDateString('en-IN', {
                                day: '2-digit',
                                month: 'short',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                                hour12: true
                            })}
                            </span>
                        </div>
                    </div>

                    <button
                        onClick={onClose}
                        className="p-3 bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-600 rounded-2xl transition-all active:scale-90"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>
                <div className="px-8 py-4 overflow-y-auto custom-scrollbar flex-grow">
                    <div className="bg-slate-50/50 rounded-3xl p-6 border border-slate-100">
                        <p className="text-slate-700 leading-relaxed text-lg whitespace-pre-wrap font-medium">
                            {note.content}
                        </p>
                    </div>
                </div>
                <div className="p-8 pt-4 flex items-center justify-between bg-white relative">
                    <button
                        onClick={copyToClipboard}
                        className="flex items-center gap-2 px-6 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50 rounded-2xl border border-slate-100 transition-all active:scale-95"
                    >
                        {isCopied ? (
                            <>
                                <Check className="w-4 h-4 text-green-500" />
                                <span className="text-green-600">Copied to Clipboard!</span>
                            </>
                        ) : (
                            <>
                                <Clipboard className="w-4 h-4" />
                                <span>Copy Text</span>
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
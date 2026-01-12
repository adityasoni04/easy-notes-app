"use client";
import React, { useState, useRef, useEffect } from 'react';
import { Trash2, Edit3, Calendar } from 'lucide-react';

export default function NoteCard({ note, onEdit, onView, onDelete }: any) {
  const [isTruncated, setIsTruncated] = useState(false);
  const contentRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const element = contentRef.current;
    if (element) {
      setIsTruncated(element.scrollHeight > element.clientHeight);
    }
  }, [note.content]);

  const formatDateTime = (dateInput: any) => {
    const dateStr = dateInput?.$date || dateInput;
    const date = new Date(dateStr);

    if (isNaN(date.getTime())) return "Invalid Date";

    return date.toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div
      onClick={() => onView(note)} // CLICKING THE CARD OPENS THE READER
      className="group bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-blue-100/50 transition-all duration-300 relative overflow-hidden cursor-pointer flex flex-col h-[280px]"
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-bold text-slate-800 leading-tight line-clamp-1">{note.title}</h3>
        <div className="flex gap-1 transition-opacity">
          <button
            onClick={(e) => { e.stopPropagation(); onEdit(note); }}
            className="p-2 text-slate-500 bg-slate-50 hover:text-blue-600 hover:bg-blue-100 rounded-lg transition-colors border border-slate-100"
          >
            <Edit3 className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onDelete(note); }} 
            className="p-2 text-slate-500 bg-slate-50 hover:text-red-600 hover:bg-red-100 rounded-lg transition-colors border border-slate-100"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex-grow">
        <p ref={contentRef} className="text-slate-600 text-sm line-clamp-5 leading-relaxed">
          {note.content}
        </p>
        {isTruncated && (
          <span className="text-blue-500 text-xs font-bold mt-2 inline-block">
            Read More...
          </span>
        )}
      </div>

      <div className="pt-4 border-t border-slate-50 flex justify-between items-center mt-auto">
        <div className="flex items-center gap-1.5 text-slate-400 text-[10px] font-medium uppercase tracking-wider">
          <Calendar className="w-3.5 h-3.5" />
          {formatDateTime(note.createdAt)}
        </div>
      </div>
    </div>
  );
}
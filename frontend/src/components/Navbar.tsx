"use client";
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { LogOut, User, Menu, ChevronDown, NotebookPen } from 'lucide-react';
import LogoutConfirmModal from './LogoutConfirmModal';

export default function Navbar() {
  const { user, logout } = useAuth();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false); 

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed", error);
      setIsLoggingOut(false);
      setIsLogoutModalOpen(false);
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo Section */}
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 p-1.5 rounded-lg shadow-lg shadow-blue-200">
            <NotebookPen className="text-white w-6 h-6" />
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800">
            Easy Notes
          </span>
        </div>

        <div className="hidden md:flex items-center gap-6">
          <div className="flex items-center gap-2 text-slate-600 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">
            <User className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-semibold capitalize">{user?.name || "User"}</span>
          </div>
          <button
            onClick={() => setIsLogoutModalOpen(true)}
            className="flex items-center gap-2 text-slate-500 hover:text-red-600 transition-colors text-sm font-bold"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>

        <div className="md:hidden relative">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 bg-slate-50 rounded-xl border border-slate-100 text-slate-600 active:scale-95 transition-all"
          >
            <Menu className="w-6 h-6" />
          </button>
          {isMobileMenuOpen && (
            <div className="absolute right-0 mt-3 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 animate-in slide-in-from-top-2 duration-200">
              <div className="px-4 py-3 border-b border-slate-50 mb-1">
                <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1">Logged in as</p>
                <p className="text-sm font-bold text-slate-800 truncate capitalize">{user?.name}</p>
              </div>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsLogoutModalOpen(true);
                }}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold text-red-500 hover:bg-red-50 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      <LogoutConfirmModal
        isOpen={isLogoutModalOpen}
        isLoading={isLoggingOut} 
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogout}
      />
    </nav>
  );
}
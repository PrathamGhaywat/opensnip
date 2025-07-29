'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Code, LogOut, User } from 'lucide-react';
import { useAuth } from '../../components/AuthProvider';
import { ThemeToggle } from '../../components/ThemeToggle';

export default function Dashboard() {
  const { user, logout, loading } = useAuth();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      router.push('/');
    } catch {
      setIsLoggingOut(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-950/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Code className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-slate-900 dark:text-white">opensnip</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5 text-slate-600 dark:text-slate-300" />
              <span className="text-slate-700 dark:text-slate-300">{user.name}</span>
            </div>
            
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="flex items-center space-x-2 px-4 py-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span>{isLoggingOut ? 'Logging out...' : 'Logout'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Welcome to your dashboard, {user.name}!
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 mb-8">
            Your snippet management workspace is ready. Start organizing your code!
          </p>
          
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-12 shadow-xl border border-slate-200 dark:border-slate-800 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
              🚀 Coming Soon
            </h2>
            <p className="text-slate-600 dark:text-slate-300 mb-6">
              The full snippet management interface is under development. Here&apos;s what you can expect:
            </p>
            
            <div className="space-y-4 text-left">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">Create & Edit Snippets</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300">Write and organize your code snippets with syntax highlighting</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">Smart Search</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300">Find any snippet instantly with powerful search capabilities</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">Team Collaboration</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300">Share snippets with your team and work together</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

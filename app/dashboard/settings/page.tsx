'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Code, 
  Menu, 
  X,
  Home,
  BookOpen,
  Settings as SettingsIcon,
  Search,
  Plus,
  ChevronDown,
  ChevronUp,
  User,
  LogOut
} from 'lucide-react';
import { useAuth } from '../../../components/AuthProvider';
import { ThemeToggle } from '../../../components/ThemeToggle';
import { useState } from 'react';

export default function Settings() {
  const { user, logout, loading } = useAuth();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);

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

  const sidebarItems = [
    { icon: Home, label: 'Dashboard', href: '/dashboard' },
    { icon: BookOpen, label: 'Snippets' },
    { icon: Search, label: 'Search' },
    { icon: Plus, label: 'New Snippet' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 flex">
      {/* Sidebar */}
      <div className={`${sidebarCollapsed ? 'w-16' : 'w-64'} transition-all duration-300 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col`}>
        {/* Sidebar Header */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-center">
          {sidebarCollapsed ? (
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <Menu className="h-6 w-6 text-slate-600 dark:text-slate-300" />
            </button>
          ) : (
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center space-x-2">
                <Code className="h-8 w-8 text-blue-600 flex-shrink-0" />
                <span className="text-xl font-bold text-slate-900 dark:text-white">opensnip</span>
              </div>
              <button
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <X className="h-5 w-5 text-slate-600 dark:text-slate-300" />
              </button>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {sidebarItems.map((item, index) => (
              <li key={index}>
                <button 
                  onClick={() => item.href && router.push(item.href)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 ${sidebarCollapsed ? 'justify-center' : ''}`}
                >
                  <item.icon className="h-5 w-5 flex-shrink-0" />
                  {!sidebarCollapsed && (
                    <span className="font-medium">{item.label}</span>
                  )}
                </button>
              </li>
            ))}
            
            {/* Settings - Active */}
            <li>
              <button className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 ${sidebarCollapsed ? 'justify-center' : ''}`}>
                <SettingsIcon className="h-5 w-5 flex-shrink-0" />
                {!sidebarCollapsed && (
                  <span className="font-medium">Settings</span>
                )}
              </button>
            </li>
          </ul>
        </nav>

        {/* Account Menu */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800">
          <div className="relative">
            <button
              onClick={() => setAccountMenuOpen(!accountMenuOpen)}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ${
                sidebarCollapsed ? 'justify-center' : ''
              }`}
            >
              <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                <User className="h-4 w-4 text-white" />
              </div>
              {!sidebarCollapsed && (
                <>
                  <div className="flex-1 text-left">
                    <p className="text-sm font-medium text-slate-900 dark:text-white truncate">
                      {user.name}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                      {user.email}
                    </p>
                  </div>
                  {accountMenuOpen ? (
                    <ChevronUp className="h-4 w-4 text-slate-400" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-slate-400" />
                  )}
                </>
              )}
            </button>

            {/* Account Menu Dropdown */}
            {accountMenuOpen && !sidebarCollapsed && (
              <div className="absolute bottom-full left-0 right-0 mb-2 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 py-2">
                <button className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20">
                  <SettingsIcon className="h-4 w-4" />
                  <span>Settings</span>
                </button>
                <button
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span>{isLoggingOut ? 'Logging out...' : 'Logout'}</span>
                </button>
              </div>
            )}

            {/* Collapsed Account Menu */}
            {accountMenuOpen && sidebarCollapsed && (
              <div className="absolute bottom-full left-full ml-2 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 py-2 w-48">
                <div className="px-4 py-2 border-b border-slate-200 dark:border-slate-700">
                  <p className="text-sm font-medium text-slate-900 dark:text-white truncate">
                    {user.name}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                    {user.email}
                  </p>
                </div>
                <button className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20">
                  <SettingsIcon className="h-4 w-4" />
                  <span>Settings</span>
                </button>
                <button
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span>{isLoggingOut ? 'Logging out...' : 'Logout'}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Main Content Area */}
        <main className="flex-1 overflow-auto p-8">
          <div className="max-w-4xl">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
              Settings
            </h1>
            <p className="text-slate-600 dark:text-slate-300 mb-8">
              Manage your account settings and preferences.
            </p>
            
            {/* Settings Sections */}
            <div className="space-y-6">
              {/* Appearance Settings */}
              <div className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
                  Appearance
                </h2>
                <p className="text-slate-600 dark:text-slate-300 mb-6">
                  Customize how OpenSnip looks and feels.
                </p>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-900 dark:text-white mb-3">
                      Theme
                    </label>
                    <div className="flex items-center space-x-4">
                      <ThemeToggle />
                      <span className="text-sm text-slate-600 dark:text-slate-300">
                        Choose your preferred theme
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Account Settings */}
              <div className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
                  Account
                </h2>
                <p className="text-slate-600 dark:text-slate-300 mb-6">
                  Manage your account information.
                </p>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      value={user.name}
                      disabled
                      className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={user.email}
                      disabled
                      className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Preferences */}
              <div className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
                  Preferences
                </h2>
                <p className="text-slate-600 dark:text-slate-300 mb-6">
                  Configure your snippet management preferences.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-slate-900 dark:text-white">
                        Default Language
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-300">
                        Set the default programming language for new snippets
                      </p>
                    </div>
                    <select className="px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white">
                      <option>JavaScript</option>
                      <option>TypeScript</option>
                      <option>Python</option>
                      <option>Java</option>
                      <option>C++</option>
                    </select>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-slate-900 dark:text-white">
                        Auto-save
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-300">
                        Automatically save changes to your snippets
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

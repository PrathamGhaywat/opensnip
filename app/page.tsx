import { Code, Search, Share2, Zap } from "lucide-react";
import { ThemeToggle } from "../components/ThemeToggle";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-950/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Code className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-slate-900 dark:text-white">opensnip</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#features" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">
              Features
            </a>
            <a href="#github" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">
              GitHub
            </a>
            <ThemeToggle />
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
              Get Started
            </button>
          </nav>
          {/* Mobile navigation */}
          <div className="md:hidden flex items-center space-x-3">
            <ThemeToggle />
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg font-medium transition-colors text-sm">
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-6xl mx-auto px-6">
        <div className="py-20 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-slate-900 dark:text-white mb-6">
            Code snippets,
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              organized.
            </span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto">
            A minimalist snippet manager built for developers. Save, organize, and access your code snippets instantly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium text-lg transition-colors flex items-center space-x-2">
              <Zap className="h-5 w-5" />
              <span>Start Managing Snippets</span>
            </button>
            <button className="border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 px-8 py-3 rounded-lg font-medium text-lg transition-colors">
              View on GitHub
            </button>
          </div>
        </div>

        {/* Code Preview */}
        <div className="mb-20">
          <div className="bg-slate-900 rounded-xl p-6 shadow-2xl max-w-4xl mx-auto">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-slate-400 text-sm ml-4">snippet-manager.js</span>
            </div>
            <pre className="text-green-400 text-sm font-mono overflow-x-auto">
              <code>{`// Quick React hook example
const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  });
  
  const setValue = (value) => {
    setStoredValue(value);
    window.localStorage.setItem(key, JSON.stringify(value));
  };
  
  return [storedValue, setValue];
};`}</code>
            </pre>
          </div>
        </div>

        {/* Features Section */}
        <section id="features" className="py-20">
          <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-20">
            Built for modern developers
          </h2>
          
          {/* Feature 1: Lightning Fast Search */}
          <div className="mb-24">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="bg-blue-100 dark:bg-blue-900/20 w-20 h-20 rounded-2xl flex items-center justify-center mb-6">
                  <Search className="h-10 w-10 text-blue-600" />
                </div>
                <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                  Lightning Fast Search
                </h3>
                <p className="text-lg text-slate-600 dark:text-slate-300 mb-6">
                  Find any snippet instantly with our powerful search engine. Search by language, tags, 
                  keywords, or even partial code matches. Never lose track of that perfect function again.
                </p>
                <ul className="space-y-2 text-slate-600 dark:text-slate-300">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                    Full-text search across all your snippets
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                    Smart filtering by language and tags
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                    Fuzzy matching for typos and partial matches
                  </li>
                </ul>
              </div>
              <div className="bg-slate-100 dark:bg-slate-800 rounded-2xl p-8">
                <div className="bg-white dark:bg-slate-900 rounded-lg p-6 shadow-lg">
                  <div className="flex items-center space-x-2 mb-4">
                    <Search className="h-5 w-5 text-slate-400" />
                    <span className="text-slate-400 font-mono">react hook useState</span>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded border-l-4 border-blue-500">
                      <div className="font-mono text-sm text-slate-700 dark:text-slate-300">useLocalStorage.js</div>
                      <div className="text-xs text-slate-500">React hook for localStorage</div>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded border-l-4 border-purple-500">
                      <div className="font-mono text-sm text-slate-700 dark:text-slate-300">useToggle.js</div>
                      <div className="text-xs text-slate-500">Simple toggle hook</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Feature 2: Syntax Highlighting */}
          <div className="mb-24">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="lg:order-2">
                <div className="bg-purple-100 dark:bg-purple-900/20 w-20 h-20 rounded-2xl flex items-center justify-center mb-6">
                  <Code className="h-10 w-10 text-purple-600" />
                </div>
                <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                  Beautiful Syntax Highlighting
                </h3>
                <p className="text-lg text-slate-600 dark:text-slate-300 mb-6">
                  Your code deserves to look beautiful. OpenSnip supports syntax highlighting for 100+ 
                  programming languages with multiple themes to match your preferences.
                </p>
                <ul className="space-y-2 text-slate-600 dark:text-slate-300">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-purple-600 rounded-full mr-3"></div>
                    Support for 100+ programming languages
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-purple-600 rounded-full mr-3"></div>
                    Multiple color themes (light & dark)
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-purple-600 rounded-full mr-3"></div>
                    Copy code with proper formatting
                  </li>
                </ul>
              </div>
              <div className="lg:order-1 bg-slate-900 rounded-2xl p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-slate-400 text-sm ml-4">api-utils.ts</span>
                </div>
                <pre className="text-sm font-mono overflow-x-auto">
                  <code>
                    <span className="text-purple-400">export</span> <span className="text-blue-400">async</span> <span className="text-blue-400">function</span> <span className="text-yellow-300">fetchUser</span>(<span className="text-orange-400">id</span>: <span className="text-green-400">string</span>) {'{'}
                    {'\n'}  <span className="text-purple-400">const</span> <span className="text-white">response</span> = <span className="text-purple-400">await</span> <span className="text-yellow-300">fetch</span>(<span className="text-green-300">{`\`/api/users/\${id}\``}</span>);
                    {'\n'}  <span className="text-purple-400">if</span> (!<span className="text-white">response</span>.<span className="text-yellow-300">ok</span>) {'{'}
                    {'\n'}    <span className="text-purple-400">throw</span> <span className="text-purple-400">new</span> <span className="text-yellow-300">Error</span>(<span className="text-green-300">&apos;Failed to fetch user&apos;</span>);
                    {'\n'}  {'}'}
                    {'\n'}  <span className="text-purple-400">return</span> <span className="text-white">response</span>.<span className="text-yellow-300">json</span>();
                    {'\n'}{'}'}
                  </code>
                </pre>
              </div>
            </div>
          </div>

          {/* Feature 3: Easy Sharing */}
          <div className="mb-12">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="bg-green-100 dark:bg-green-900/20 w-20 h-20 rounded-2xl flex items-center justify-center mb-6">
                  <Share2 className="h-10 w-10 text-green-600" />
                </div>
                <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                  Seamless Sharing
                </h3>
                <p className="text-lg text-slate-600 dark:text-slate-300 mb-6">
                  Collaboration made simple. Share individual snippets, entire collections, or create 
                  public repositories for the community. Perfect for teams and open source projects.
                </p>
                <ul className="space-y-2 text-slate-600 dark:text-slate-300">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                    One-click sharing with secure links
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                    Team workspaces for collaboration
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                    Public galleries for community snippets
                  </li>
                </ul>
              </div>
              <div className="bg-slate-100 dark:bg-slate-800 rounded-2xl p-8">
                <div className="space-y-4">
                  <div className="bg-white dark:bg-slate-900 rounded-lg p-4 shadow-lg">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-semibold text-slate-900 dark:text-white">React Utilities</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-1 rounded">Public</span>
                        <Share2 className="h-4 w-4 text-slate-400" />
                      </div>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">Collection of useful React hooks and utilities</p>
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span>12 snippets</span>
                      <span>2.3k views</span>
                    </div>
                  </div>
                  <div className="bg-white dark:bg-slate-900 rounded-lg p-4 shadow-lg">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-semibold text-slate-900 dark:text-white">Team Workspace</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-2 py-1 rounded">Private</span>
                        <div className="flex -space-x-1">
                          <div className="w-6 h-6 bg-orange-400 rounded-full border-2 border-white dark:border-slate-900"></div>
                          <div className="w-6 h-6 bg-blue-500 rounded-full border-2 border-white dark:border-slate-900"></div>
                          <div className="w-6 h-6 bg-purple-500 rounded-full border-2 border-white dark:border-slate-900"></div>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">Shared snippets for the development team</p>
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span>45 snippets</span>
                      <span>3 members</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 text-center">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-12 shadow-xl border border-slate-200 dark:border-slate-800">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
              Ready to organize your code?
            </h2>
            <p className="text-slate-600 dark:text-slate-300 mb-8 text-lg">
              Join developers who&apos;ve already organized thousands of snippets with OpenSnip.
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium text-lg transition-colors">
              Get Started for Free
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 py-8">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-slate-600 dark:text-slate-400">
            Open source and free for Individuals and Selfhosting forever.
          </p>
        </div>
      </footer>
    </div>
  );
}

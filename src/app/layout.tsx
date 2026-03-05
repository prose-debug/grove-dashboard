import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Grove Dashboard',
  description: 'Explore learnings and your personalized learning path',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <div className="flex h-screen">
          {/* Sidebar Navigation */}
          <nav className="w-48 bg-sidebar-bg border-r border-sidebar-border flex flex-col p-4 gap-8">
            <h1 className="font-bold text-lg">🌿 Grove</h1>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-sm hover:text-sidebar-active">
                  Home
                </a>
              </li>
              <li>
                <a href="/learnings" className="text-sm hover:text-sidebar-active">
                  Learnings
                </a>
              </li>
              <li>
                <a href="/dashboard" className="text-sm hover:text-sidebar-active">
                  My Dashboard
                </a>
              </li>
              <li>
                <a href="/team" className="text-sm hover:text-sidebar-active">
                  Team Stats
                </a>
              </li>
              <li>
                <a href="/oceans" className="text-sm hover:text-sidebar-active">
                  🌊 Ocean Health
                </a>
              </li>
              <li>
                <a href="/ocean-commons" className="text-sm hover:text-sidebar-active">
                  🌍 Ocean Commons
                </a>
              </li>
              <li>
                <a href="/monterey-bay" className="text-sm hover:text-sidebar-active">
                  🦭 Monterey Bay Hub
                </a>
              </li>
            </ul>
          </nav>

          {/* Main Content */}
          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}

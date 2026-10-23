import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { AuthModal } from './components/AuthModal';
import { HomePage } from './pages/HomePage';
import { CustomerPage } from './pages/CustomerPage';
import { AdminPage } from './pages/AdminPage';

const queryClient = new QueryClient();

export function App() {
  const [authModalOpen, setAuthModalOpen] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <AuthProvider>
          <BrowserRouter>
            <div className="min-h-screen flex flex-col bg-surface-bg text-content-primary selection:bg-accent-gold/30">
              <Navbar onOpenAuth={() => setAuthModalOpen(true)} />

              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route
                    path="/customer"
                    element={<CustomerPage onOpenAuth={() => setAuthModalOpen(true)} />}
                  />
                  <Route
                    path="/admin"
                    element={<AdminPage onOpenAuth={() => setAuthModalOpen(true)} />}
                  />
                </Routes>
              </main>

              <Footer />

              <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
            </div>
          </BrowserRouter>
        </AuthProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;

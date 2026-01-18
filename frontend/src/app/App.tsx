import { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { LandingPage } from './components/landing-page';
import { Navigation } from './components/navigation';
import { AdminDashboard } from './components/admin-dashboard';
import { EvidenceRoom } from './components/evidence-room';
import { SuspectsPage } from './components/suspects-page';
import { DetectivesNotebook } from './components/detectives-notebook';
import { Footer } from './components/footer';

function AppContent() {
  const { user } = useApp();
  const [currentPage, setCurrentPage] = useState('evidence');

  if (!user) {
    return <LandingPage />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'admin':
        return user.isAdmin ? <AdminDashboard /> : <EvidenceRoom />;
      case 'evidence':
        return <EvidenceRoom />;
      case 'suspects':
        return <SuspectsPage />;
      case 'notebook':
        return <DetectivesNotebook />;
      default:
        return <EvidenceRoom />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />
      <main className="flex-1 px-4 py-8">{renderPage()}</main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

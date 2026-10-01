import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './Home';
import GamePage from './GamePage';
import SupportPage from './SupportPage';
import NewsPage from './NewsPage';
import ProfilePage from './ProfilePage';
import SearchPage from './SearchPage';
import SwaggerPage from './SwaggerPage';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import { StoreProvider } from './context/StoreContext';

function App() {
  return (
    <StoreProvider>
      <Router>
        <div className="min-h-screen bg-brand-background text-brand-text flex flex-col font-sans">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/support" element={<SupportPage />} />
              <Route path="/news" element={<NewsPage />} />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              } />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/game/:id" element={<GamePage />} />
              <Route path="/swagger" element={<SwaggerPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </StoreProvider>
  );
}

export default App;

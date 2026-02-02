import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Showcase from './components/Showcase';
import FeaturesPage from './pages/FeaturesPage';

const HomePage: React.FC = () => (
  <>
    <Navbar />
    <main className="flex-grow">
      <Hero />
      <Features />
      <Showcase />
    </main>
  </>
);

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-background text-foreground overflow-x-hidden">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/features" element={<FeaturesPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
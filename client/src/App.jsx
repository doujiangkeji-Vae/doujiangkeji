import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { LanguageProvider } from './i18n';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import News from './pages/News';
import Mail from './pages/Mail';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import Login from './pages/Login';
import './styles/global.css';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <Router>
      <LanguageProvider>
        <ScrollToTop />
        <div className="app">
          <Navbar />
          <main>
            <Routes>
              {/* 英文版路由 */}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/products" element={<Products />} />
              <Route path="/news" element={<News />} />
              <Route path="/news/:id" element={<News />} />
              <Route path="/mail" element={<Mail />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/login" element={<Login />} />

              {/* 中文版路由 */}
              <Route path="/cn" element={<Home />} />
              <Route path="/cn/about" element={<About />} />
              <Route path="/cn/products" element={<Products />} />
              <Route path="/cn/news" element={<News />} />
              <Route path="/cn/news/:id" element={<News />} />
              <Route path="/cn/contact" element={<Contact />} />
              <Route path="/cn/mail" element={<Mail />} />
              <Route path="/cn/login" element={<Login />} />
              <Route path="/cn/admin" element={<Admin />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </LanguageProvider>
    </Router>
  );
}

export default App;

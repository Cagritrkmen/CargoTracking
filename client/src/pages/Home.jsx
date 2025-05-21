import React, { useState } from "react";
import TrackingForm from "../components/TrackingForm";
import { Card, Typography, Link, Box } from "@mui/material";
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LanguageIcon from '@mui/icons-material/Language';

const footerBlue = '#2196f3';
const footerYellow = '#FFD600';

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden bg-gradient-to-br from-yellow-100 to-blue-100">
      {/* Tam ekran arka plan görseli */}
      <img
        src="/bg.png"
        alt="Kargo Görevlisi ve Kargomat"
        className="fixed inset-0 w-full h-full object-cover z-0"
        style={{ pointerEvents: "none" }}
      />
      {/* Yarı saydam katman */}
      <div className="absolute inset-0 bg-white bg-opacity-40 z-10" />

      {/* Header ve Slogan */}
      <header className="relative z-20 w-full flex flex-col md:flex-row justify-between items-center px-4 md:px-8 pt-4 md:pt-8 pb-4">
        <Box className="flex items-center justify-center md:justify-start w-full md:w-auto">
          <img 
            src="/logo.png" 
            alt="Çağrı Kargo Logo" 
            className="w-[280px] md:w-[320px] h-auto object-contain" 
          />
        </Box>
        <Box className="mt-4 md:mt-0 text-center md:text-right w-full md:w-auto">
          <img 
            src="/a.png" 
            alt="Slogan Görseli" 
            className="w-[280px] md:w-[380px] h-auto object-contain mx-auto md:mx-0" 
          />
        </Box>
      </header>

      {/* Ana İçerik Alanı */}
      <main className="relative z-20 flex-1 flex flex-col items-start justify-center gap-8 px-4 pb-8 md:pl-32">
        <TrackingForm isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      </main>

      {/* Footer */}
      <footer className={`relative z-20 py-4 md:py-6 px-4 md:px-8 text-white transition-all duration-300 ${isModalOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        style={{ background: `linear-gradient(90deg, ${footerYellow} 70%, ${footerBlue} 100%)`, boxShadow: '0 -2px 16px 0 rgba(0,0,0,0.08)' }}>
        <Box className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-8">
          {/* Logo */}
          <Box className="w-full md:w-auto flex justify-center md:justify-start">
            <img src="/logo.png" alt="Çağrı Logo" className="h-12 md:h-14 object-contain" />
          </Box>

          {/* Sosyal Medya */}
          <Box className="w-full md:w-auto flex flex-col md:flex-row justify-center gap-4 md:gap-8 items-center">
            <Link 
              href="https://www.linkedin.com/in/cagriturkmenn/" 
              target="_blank" 
              rel="noopener" 
              underline="hover" 
              sx={{ 
                color: '#fff', 
                display: 'flex', 
                alignItems: 'center', 
                gap: 1, 
                fontWeight: 600, 
                fontSize: { xs: 14, sm: 16, md: 18 } 
              }}
            >
              <TwitterIcon sx={{ fontSize: { xs: 20, sm: 24, md: 28 } }} />@CagriKargo
            </Link>
            <Link 
              href="https://www.linkedin.com/in/cagriturkmenn/" 
              target="_blank" 
              rel="noopener" 
              underline="hover" 
              sx={{ 
                color: '#fff', 
                display: 'flex', 
                alignItems: 'center', 
                gap: 1, 
                fontWeight: 600, 
                fontSize: { xs: 14, sm: 16, md: 18 } 
              }}
            >
              <FacebookIcon sx={{ fontSize: { xs: 20, sm: 24, md: 28 } }} />/CagriKargo
            </Link>
            <Link 
              href="https://www.linkedin.com/in/cagriturkmenn/" 
              target="_blank" 
              rel="noopener" 
              underline="hover" 
              sx={{ 
                color: '#fff', 
                display: 'flex', 
                alignItems: 'center', 
                gap: 1, 
                fontWeight: 600, 
                fontSize: { xs: 14, sm: 16, md: 18 } 
              }}
            >
              <InstagramIcon sx={{ fontSize: { xs: 20, sm: 24, md: 28 } }} />@CagriKargo
            </Link>
            <Link 
              href="https://www.linkedin.com/in/cagriturkmenn/" 
              target="_blank" 
              rel="noopener" 
              underline="hover" 
              sx={{ 
                color: '#fff', 
                display: 'flex', 
                alignItems: 'center', 
                gap: 1, 
                fontWeight: 600, 
                fontSize: { xs: 14, sm: 16, md: 18 } 
              }}
            >
              <LanguageIcon sx={{ fontSize: { xs: 20, sm: 24, md: 28 } }} />cagri.gov.tr
            </Link>
          </Box>

          {/* Telefon Numarası */}
          <Box className="w-full md:w-auto flex justify-center md:justify-end">
            <Typography 
              className="font-bold text-center md:text-right" 
              sx={{ 
                color: '#fff', 
                fontSize: { xs: 16, sm: 18, md: 20 }, 
                letterSpacing: 2, 
                textShadow: '0 1px 4px #0002' 
              }}
            >
              444 1 123r
            </Typography>
          </Box>
        </Box>
      </footer>
    </div>
  );
};

export default Home; 
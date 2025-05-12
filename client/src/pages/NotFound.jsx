import React from "react";

const NotFound = () => (
  <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-yellow-100 to-blue-100">
    <div className="w-full max-w-xl bg-cyan-500 border-8 border-yellow-400 shadow-lg p-12 flex flex-col items-center text-center rounded-3xl">
      <h1 className="text-6xl font-extrabold text-white mb-4">404</h1>
      <p className="text-2xl text-white font-semibold mb-2">Sayfa Bulunamadı</p>
      <p className="text-md text-white/80">Aradığınız sayfa mevcut değil veya taşınmış olabilir.</p>
    </div>
  </div>
);

export default NotFound; 
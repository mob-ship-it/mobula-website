import React, { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-[#faf1ea]/95 backdrop-blur-sm border-b border-[#13243c]/10 pt-20 pb-4">
        <div className="w-full mx-auto px-6 sm:px-8 lg:px-8">
          {/* Mobile Header */}
          <div className="flex lg:hidden justify-between items-center h-16 max-w-[90%] mx-auto">
            {/* Logo on the left */}
            <div className="flex-shrink-0">
              <img
                className="h-16 w-auto"
                alt="Mobula Studio Logo"
                src="https://c.animaapp.com/ZTuOwSBY/img/group-2@2x.png"
              />
            </div>

            {/* Mobile menu button */}
            <button
              onClick={handleMenuToggle}
              className="flex flex-col w-10 items-center justify-center gap-2 cursor-pointer hover:opacity-80 transition-opacity p-2"
              aria-label="Toggle menu"
            >
              <div className="w-8 h-1.5 bg-[#13243c] rounded-full" />
              <div className="w-8 h-1.5 bg-[#13243c] rounded-full" />
              <div className="w-8 h-1.5 bg-[#13243c] rounded-full" />
            </button>
          </div>

          {/* Desktop Header */}
          <div className="hidden lg:flex justify-between items-center h-20 max-w-7xl mx-auto">
            {/* Logo - Larger size */}
            <div className="flex-shrink-0">
              <img
                className="h-20 w-auto"
                alt="Mobula Studio Logo"
                src="https://c.animaapp.com/ZTuOwSBY/img/group-2@2x.png"
              />
            </div>

            {/* Desktop navigation - Rounded bordered container (centered) */}
            <div className="absolute left-1/2 transform -translate-x-1/2">
              <nav 
                className="flex items-center gap-1 px-6 py-3 rounded-full"
                style={{ border: '2px solid #13243c' }}
              >
                <a 
                  href="#servicios" 
                  className="[font-family:'Be_Vietnam',Helvetica] text-[#13243c] hover:text-[#13243c]/70 transition-colors font-medium px-4 py-1"
                >
                  Servicios
                </a>
                <div className="w-px h-6 bg-[#13243c]" />
                
                <a 
                  href="#trabajo" 
                  className="[font-family:'Be_Vietnam',Helvetica] text-[#13243c] hover:text-[#13243c]/70 transition-colors font-medium px-4 py-1"
                >
                  Nuestro Trabajo
                </a>
                <div className="w-px h-6 bg-[#13243c]" />
                
                <a 
                  href="#planes" 
                  className="[font-family:'Be_Vietnam',Helvetica] text-[#13243c] hover:text-[#13243c]/70 transition-colors font-medium px-4 py-1"
                >
                  Planes
                </a>
                <div className="w-px h-6 bg-[#13243c]" />
                
                <a 
                  href="#blog" 
                  className="[font-family:'Be_Vietnam',Helvetica] text-[#13243c] hover:text-[#13243c]/70 transition-colors font-medium px-4 py-1"
                >
                  Blog
                </a>
                <div className="w-px h-6 bg-[#13243c]" />
                
                <a 
                  href="#contacto" 
                  className="[font-family:'Be_Vietnam',Helvetica] text-[#13243c] hover:text-[#13243c]/70 transition-colors font-medium px-4 py-1"
                >
                  Contacto
                </a>
              </nav>
            </div>

            {/* Spacer for balance */}
            <div className="flex-shrink-0 w-20"></div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity lg:hidden"
          style={{ zIndex: 9999 }}
          onClick={handleMenuClose}
        >
          {/* Menu Panel */}
          <div 
            className="flex h-[510px] items-start justify-center gap-2.5 px-[39px] py-[46px] relative bg-[#13243c] w-full min-w-[393px]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={handleMenuClose}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center cursor-pointer hover:opacity-70 transition-opacity z-10 bg-transparent border-0 p-0 rounded-sm focus:outline-none focus:ring-0"
              aria-label="Close menu"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="#ffffff"
                viewBox="0 0 24 24"
                strokeWidth={3}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="flex flex-col items-center justify-center w-full">
              <div className="relative w-[305px] h-[321px] mt-8">
                <div className="flex w-[305px] items-start justify-center gap-[22px] flex-col relative">
                  <a
                    href="#servicios"
                    className="relative w-fit mt-[-1.00px] [font-family:'Be_Vietnam',Helvetica] font-normal text-white text-2xl tracking-[0] leading-[29.3px] whitespace-nowrap hover:text-gray-300 transition-colors cursor-pointer"
                    onClick={handleMenuClose}
                  >
                    Servicios
                  </a>
                  <div className="relative w-[305px] h-px bg-white/30"></div>

                  <a
                    href="#trabajo"
                    className="relative w-fit [font-family:'Be_Vietnam',Helvetica] font-normal text-white text-2xl tracking-[0] leading-[29.3px] whitespace-nowrap hover:text-gray-300 transition-colors cursor-pointer"
                    onClick={handleMenuClose}
                  >
                    Nuestro Trabajo
                  </a>
                  <div className="relative w-[305px] h-px bg-white/30"></div>

                  <a
                    href="#planes"
                    className="relative w-fit [font-family:'Be_Vietnam',Helvetica] font-normal text-white text-2xl tracking-[0] leading-[29.3px] whitespace-nowrap hover:text-gray-300 transition-colors cursor-pointer"
                    onClick={handleMenuClose}
                  >
                    Planes
                  </a>
                  <div className="relative w-[305px] h-px bg-white/30"></div>

                  <a
                    href="#blog"
                    className="relative w-fit [font-family:'Be_Vietnam',Helvetica] font-normal text-white text-2xl tracking-[0] leading-[29.3px] whitespace-nowrap hover:text-gray-300 transition-colors cursor-pointer"
                    onClick={handleMenuClose}
                  >
                    Blog
                  </a>
                  <div className="relative w-[305px] h-px bg-white/30"></div>

                  <a
                    href="#contacto"
                    className="relative w-fit [font-family:'Be_Vietnam',Helvetica] font-normal text-white text-2xl tracking-[0] leading-[29.3px] whitespace-nowrap hover:text-gray-300 transition-colors cursor-pointer"
                    onClick={handleMenuClose}
                  >
                    Contacto
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

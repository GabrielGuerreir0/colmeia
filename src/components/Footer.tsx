"use client";

import React from "react";
import { usePathname } from "next/navigation";

export const Footer: React.FC = () => {
  const pathname = usePathname();
  const year = new Date().getFullYear();

  if (pathname !== "/") return null;

  const handleCopy = (e: React.ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    alert("Não é permitido copiar o texto do footer!");
  };

  return (
    <footer
      className="w-full bg-[#11286b] text-white text-center py-4 select-none"
      onCopy={handleCopy}
    >
      <div>
        © {year} Todos os direitos reservados. Desenvolvido por Gabriel
        Guerrero.
      </div>
    </footer>
  );
};

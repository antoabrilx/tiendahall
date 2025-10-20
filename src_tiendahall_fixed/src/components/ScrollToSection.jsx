// src/components/ScrollToSection.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ScrollToSection = ({ sectionId }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirigir a la raíz
    navigate("/", { replace: true });

    // Esperar al render y luego scrollear
    const t = setTimeout(() => {
      const section = document.getElementById(sectionId);
      if (section) section.scrollIntoView({ behavior: "smooth" });
    }, 120);

    return () => clearTimeout(t);
  }, [navigate, sectionId]);

  return null;
};

export default ScrollToSection;
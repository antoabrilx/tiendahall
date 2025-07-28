import React from "react";
import "../styles/Contacto.css"; // Asegurate de tener este archivo CSS

const Contacto = () => {
return (
    <section id="contacto" className="py-16 px-6">
    <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4">Contáctanos</h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
        ¿Tienes alguna pregunta o necesitas asesoramiento? Estamos aquí para ayudarte.
        </p>

        <div className="divider"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Información de contacto */}
        <div>
            <h3 className="text-2xl font-bold mb-4">Información de Contacto</h3>
            <div className="space-y-4">
            <div className="flex items-start gap-1">
                <i className="fas fa-map-marker-alt text-[#8B0000] mt-1 text-lg min-w-[20px] text-center "></i>
                <p className="text-left m-1">Calle Viñedo 123, Mendoza, Argentina</p>
            </div>
            <div className="flex items-start">
                <i className="fas fa-phone text-[#8B0000] mt-1 text-lg min-w-[20px] text-center"></i>
                <p className="text-left m-1">+54 (261) 555-1234</p>
            </div>
            <div className="flex items-start gap-1">
                <i className="fas fa-envelope text-[#8B0000] mt-1 text-lg min-w-[20px] text-center"></i>
                <p className="text-left m-1">info@haalvinos.com</p>
            </div>
            <div className="flex items-start">
                <i className="fas fa-clock text-[#8B0000] mt-1 text-lg min-w-[20px] text-center"></i>
                <div>
                <p className=" font-medium">Horario de atención:</p>
                <p>Lunes a Viernes: 10:00 - 20:00</p>
                <p>Sábados: 10:00 - 14:00</p>
                </div>
            </div>
            </div>
        </div>

          {/* Formulario */}
        <div>
            <h3 className="text-2xl font-bold mb-4">Envíanos un Mensaje</h3>
        <form id="contact-form" className="space-y-4">
            <div>
                <label htmlFor="name" className="block mb-1 font-medium">Nombre</label>
                <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#8B0000]"
                    />
            </div>

            <div>
                <label htmlFor="email" className="block mb-1 font-medium">Email</label>
                <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#8B0000]"
                />
            </div>

            <div>
                <label htmlFor="message" className="block mb-1 font-medium">Mensaje</label>
                <textarea
                    id="message"
                    rows="4"
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#8B0000]"
                ></textarea>
            </div>

            <div className="flex flex-col items-center gap-2">
            <button
                type="submit"
                className="btn-primary inline-block px-10 py-2 rounded bg-[#8B0000] w-auto "
            >
                Enviar Mensaje
            </button>
            <p className="mt-2 text-sm text-gray-500 block">
                * Este es un formulario de demostración
            </p>
            </div>
        </form>
</div>

        </div>
    </div>
    </section>
);
};

export default Contacto;
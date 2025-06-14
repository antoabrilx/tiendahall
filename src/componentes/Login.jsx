import React, { useState } from 'react'; // ¡Importamos useState aquí!

function Login() {
  // 1. Estados para los valores de los inputs
  // Usamos useState para crear una variable de estado para cada input
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false); // Para el checkbox

  // 2. Función para manejar el envío del formulario
  const handleSubmit = (event) => {
    event.preventDefault(); // Evita que la página se recargue al enviar el formulario

    // Aquí puedes agregar tu lógica de validación
    if (!email || !password) {
      alert('Por favor, ingresa tu email y contraseña.');
      return;
    }

    // Aquí iría tu lógica para enviar los datos (por ejemplo, a una API)
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Recordarme:', rememberMe);

    // Reiniciar el formulario después del envío (opcional)
    setEmail('');
    setPassword('');
    setRememberMe(false);
  };

  return (
    <div className="container mt-5"> {/* Agregamos una clase container y margin-top para mejor visualización */}
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}> {/* Asignamos la función handleSubmit al evento onSubmit */}
        <div className="mb-3">
          {/* 3. Atributos "for" y "class" cambiados a "htmlFor" y "className" */}
          <label htmlFor="emailInput" className="form-label">Dirección de Email</label>
          <input
            type="email"
            className="form-control"
            id="emailInput"
            aria-describedby="emailHelp"
            value={email} // 4. El valor del input está controlado por el estado
            onChange={(e) => setEmail(e.target.value)} // 5. Actualiza el estado cuando el input cambia
            required // Agregamos el atributo required de HTML5
          />
          <div id="emailHelp" className="form-text">Nunca compartiremos tu email con nadie más.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="passwordInput" className="form-label">Contraseña</label>
          <input
            type="password"
            className="form-control"
            id="passwordInput"
            value={password} // El valor del input está controlado por el estado
            onChange={(e) => setPassword(e.target.value)} // Actualiza el estado cuando el input cambia
            required
          />
        </div>
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="rememberMeCheck"
            checked={rememberMe} // El estado del checkbox está controlado por la variable rememberMe
            onChange={(e) => setRememberMe(e.target.checked)} // Actualiza el estado al marcar/desmarcar
          />
          <label className="form-check-label" htmlFor="rememberMeCheck">Recordarme</label>
        </div>
        <button type="submit" className="btn btn-primary">Enviar</button>
      </form>
    </div>
  );
}

export default Login;
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-200 text-gray-600 p-4 mt-8">
      <div className="container mx-auto text-center">
        &copy; {new Date().getFullYear()} Web Dev Academy. Todos os direitos reservados.
      </div>
    </footer>
  );
};

export default Footer;


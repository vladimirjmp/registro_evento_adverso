import React from 'react'
import Footer from './components/Footer';
import Form from './components/Form';
import Header from './components/Header';

function App() {
  return (
    <div className="bg-blue-50 flex flex-col h-screen">
      <Header />
      <div className=" flex-1 overflow-auto">
        <div className="py-10 text-center">
          <h1 className="pb-2 text-blue-500 text-2xl font-black">Formulario de Registro de Eventos Adversos</h1>
          <p className="text-sm text-gray-600">Complete los datos solicitados en el formulario, es muy importante que estos datos sean veraces y correctos ya que solo así podremos hacer seguimiento al evento reportado.</p>
        </div>
        <Form />
      </div>
      <Footer />
    </div>
  );
}

export default App;

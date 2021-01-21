import React from 'react'

const Header = () => (
  <nav className="bg-blue-500 shadow-md">
    <div className="max-w-full mx-auto px-5 sm:px-6 lg:px-8">
      <div className="relative flex items-center justify-between h-16">
        <div className="flex-1 flex items-stretch justify-start">
          <div className="flex-shrink-0 flex items-center">
            <img className="h-9 w-auto" src="https://pruebas.novax.com.pe/static/media/logo_novax_blanco.5f1c41df.png" alt="Workflow" />
          </div>
          <div className="hidden sm:block sm:ml-6">
            <div className="flex space-x-4">
              <span className="text-white px-3 py-2 text-xl tracking-wider font-extralight">Registro de Eventos Adversos</span>
            </div>
          </div>
        </div>

        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
          <div className="p-1 text-white">
            <span className="sr-only">View notifications</span>
            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M6.176 1.322l2.844-1.322 4.041 7.89-2.724 1.341c-.538 1.259 2.159 6.289 3.297 6.372.09-.058 2.671-1.328 2.671-1.328l4.11 7.932s-2.764 1.354-2.854 1.396c-7.862 3.591-19.103-18.258-11.385-22.281zm1.929 1.274l-1.023.504c-5.294 2.762 4.177 21.185 9.648 18.686l.971-.474-2.271-4.383-1.026.5c-3.163 1.547-8.262-8.219-5.055-9.938l1.007-.497-2.251-4.398z" />
            </svg>
          </div>
          <div className="p-1 text-white">
            <span className="sr-only">View notifications</span>
            <span className="hidden sm:block">Línea de Farmacovigilancia: 01 644-9279 Anex. 25 ó 28</span>
            <span className="block sm:hidden">01 644-9279 Anex. 25 ó 28</span>
          </div>
        </div>
      </div>
    </div>
  </nav>
)

export default Header
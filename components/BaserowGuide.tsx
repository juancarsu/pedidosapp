
import React from 'react';

const BaserowGuide: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 max-w-4xl mx-auto overflow-y-auto h-full">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center text-2xl font-bold">B</div>
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Guía de Configuración Backend (Baserow)</h2>
          <p className="text-slate-500">Cómo crear tu base de datos profesional paso a paso</p>
        </div>
      </div>

      <div className="space-y-8">
        <section>
          <h3 className="text-lg font-bold text-blue-700 mb-3">1. Creación del Espacio de Trabajo</h3>
          <p className="text-slate-700 mb-4">Regístrate en <a href="https://baserow.io" target="_blank" rel="noreferrer" className="text-blue-600 underline">Baserow.io</a> y crea una nueva base de datos llamada <strong>"Gestión Mantenimiento UniMant"</strong>.</p>
        </section>

        <section>
          <h3 className="text-lg font-bold text-blue-700 mb-3">2. Estructura de Tablas</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border-l-4 border-blue-500 bg-slate-50 p-4 rounded-r-xl">
              <h4 className="font-bold text-slate-800">Tabla: Tipos de Empresa</h4>
              <p className="text-xs text-slate-500 mb-2">Para clasificar proveedores dinámicamente.</p>
              <ul className="list-disc list-inside text-sm text-slate-600 space-y-1">
                <li><strong>Nombre:</strong> Texto</li>
              </ul>
            </div>

            <div className="border-l-4 border-slate-400 bg-slate-50 p-4 rounded-r-xl">
              <h4 className="font-bold text-slate-800">Tabla: Proveedores</h4>
              <ul className="list-disc list-inside text-sm text-slate-600 space-y-1">
                <li><strong>Nombre Empresa:</strong> Texto</li>
                <li><strong>Tipo:</strong> Enlace a 'Tipos de Empresa'</li>
                <li><strong>NIF:</strong> Texto</li>
                <li><strong>Dirección:</strong> Texto</li>
                <li><strong>Teléfono:</strong> Teléfono</li>
                <li><strong>Web:</strong> URL</li>
              </ul>
            </div>

            <div className="border-l-4 border-slate-400 bg-slate-50 p-4 rounded-r-xl">
              <h4 className="font-bold text-slate-800">Tabla: Contactos</h4>
              <ul className="list-disc list-inside text-sm text-slate-600 space-y-1">
                <li><strong>Nombre Completo:</strong> Texto</li>
                <li><strong>Empresa:</strong> Enlace a 'Proveedores'</li>
                <li><strong>Móvil:</strong> Teléfono</li>
                <li><strong>Email:</strong> Email</li>
              </ul>
            </div>

            <div className="border-l-4 border-indigo-500 bg-slate-50 p-4 rounded-r-xl">
              <h4 className="font-bold text-slate-800">Tabla: Pedidos</h4>
              <ul className="list-disc list-inside text-sm text-slate-600 space-y-1">
                <li><strong>IdPedido:</strong> Texto</li>
                <li><strong>Proveedor:</strong> Enlace a 'Proveedores'</li>
                <li><strong>Descripción:</strong> Texto largo</li>
                <li><strong>Fechas:</strong> 3 campos tipo Fecha</li>
                <li><strong>Docs:</strong> Campos tipo URL</li>
                <li><strong>Precio s/IVA:</strong> Número (€)</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-amber-50 p-6 rounded-2xl border border-amber-100">
          <h3 className="text-lg font-bold text-amber-800 mb-2 flex items-center gap-2">💡 Consejos de Velocidad</h3>
          <p className="text-amber-700 text-sm mb-4">Para gestionar más de 10.000 registros:</p>
          <ul className="list-decimal list-inside text-sm text-amber-900 space-y-2">
            <li><strong>Vistas:</strong> Crea una vista "PENDIENTES" con filtro [Fecha de Llegada Real] - is empty.</li>
            <li><strong>Agrupación:</strong> En Proveedores, usa "Group by" [Tipo] para ver especialistas juntos.</li>
            <li><strong>Búsqueda:</strong> El buscador de Baserow es extremadamente rápido, similar a Excel.</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default BaserowGuide;

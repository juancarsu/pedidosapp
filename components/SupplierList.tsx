
import React, { useState, useMemo } from 'react';
import { Supplier, CompanyType } from '../types';

interface SupplierListProps {
  suppliers: Supplier[];
  companyTypes: CompanyType[];
}

const SupplierList: React.FC<SupplierListProps> = ({ suppliers, companyTypes }) => {
  const [activeTypeId, setActiveTypeId] = useState<string | 'Todos'>('Todos');
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);

  const filteredSuppliers = useMemo(() => {
    return activeTypeId === 'Todos' 
      ? suppliers 
      : suppliers.filter(s => s.typeId === activeTypeId);
  }, [suppliers, activeTypeId]);

  const getTypeName = (typeId: string) => companyTypes.find(t => t.id === typeId)?.name || 'Sin tipo';

  return (
    <div className="flex gap-8 h-[calc(100vh-12rem)] overflow-hidden">
      {/* Sidebar List */}
      <div className="w-1/3 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex gap-2 overflow-x-auto no-scrollbar scroll-smooth">
          <button
            onClick={() => setActiveTypeId('Todos')}
            className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              activeTypeId === 'Todos' ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
            }`}
          >
            Todos
          </button>
          {companyTypes.map(t => (
            <button
              key={t.id}
              onClick={() => setActiveTypeId(t.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                activeTypeId === t.id ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
              }`}
            >
              {t.name}
            </button>
          ))}
        </div>
        
        <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
          {filteredSuppliers.map(s => (
            <div
              key={s.id}
              onClick={() => setSelectedSupplier(s)}
              className={`p-4 cursor-pointer transition-all border-l-4 ${
                selectedSupplier?.id === s.id ? 'bg-blue-50 border-blue-600' : 'hover:bg-slate-50 border-transparent'
              }`}
            >
              <div className="flex justify-between items-start mb-1">
                <h4 className="font-bold text-slate-800">{s.name}</h4>
                <span className="text-[10px] uppercase px-2 py-0.5 bg-blue-100 text-blue-700 rounded font-bold">
                  {getTypeName(s.typeId)}
                </span>
              </div>
              <p className="text-xs text-slate-500 truncate">{s.city} • {s.nif}</p>
            </div>
          ))}
          {filteredSuppliers.length === 0 && (
            <div className="p-8 text-center text-slate-400 italic text-sm">
              No hay empresas en esta categoría.
            </div>
          )}
        </div>
      </div>

      {/* Details View */}
      <div className="flex-1 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-y-auto">
        {selectedSupplier ? (
          <div className="p-8 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-2">{selectedSupplier.name}</h2>
                <div className="flex gap-3 text-sm text-slate-500">
                  <span className="flex items-center gap-1">📍 {selectedSupplier.address}, {selectedSupplier.city}</span>
                  <span>•</span>
                  <span>🆔 {selectedSupplier.nif}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-semibold hover:bg-slate-200 transition-colors">Editar</button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors">Nuevo Pedido</button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Información de Contacto</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Teléfono:</span>
                    <span className="text-slate-900 font-semibold">{selectedSupplier.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Web:</span>
                    {selectedSupplier.web ? (
                      <a href={selectedSupplier.web} target="_blank" rel="noreferrer" className="text-blue-600 font-semibold hover:underline">{selectedSupplier.web}</a>
                    ) : <span className="text-slate-400 italic">No disponible</span>}
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Datos del Servicio</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Especialidad:</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-xs font-bold uppercase tracking-tight">
                      {getTypeName(selectedSupplier.typeId)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                👥 Personas de Contacto
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedSupplier.contacts.map(c => (
                  <div key={c.id} className="p-5 border border-slate-100 rounded-xl hover:shadow-lg transition-all bg-white group">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-bold text-slate-800 text-lg leading-tight">{c.name}</p>
                        <p className="text-blue-600 text-xs font-bold mb-4 uppercase tracking-wider">{c.position}</p>
                      </div>
                      <button className="opacity-0 group-hover:opacity-100 text-slate-300 hover:text-blue-500 transition-opacity">✏️</button>
                    </div>
                    <div className="space-y-2 text-sm text-slate-600">
                      <p className="flex items-center gap-3">
                        <span className="text-slate-400">📱</span> {c.mobile}
                      </p>
                      <p className="flex items-center gap-3">
                        <span className="text-slate-400">📧</span> {c.email}
                      </p>
                    </div>
                  </div>
                ))}
                <button className="p-6 border-2 border-dashed border-slate-200 rounded-xl text-slate-400 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 transition-all flex flex-col items-center justify-center gap-2 font-medium">
                  <span className="text-2xl">➕</span>
                  <span>Añadir contacto</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-slate-400 p-12 text-center">
            <div className="bg-slate-100 w-24 h-24 rounded-full flex items-center justify-center text-5xl mb-6 shadow-inner">🏢</div>
            <h3 className="text-xl font-bold text-slate-700 mb-2">Gestión de Proveedores</h3>
            <p className="max-w-xs text-slate-500 text-sm">Selecciona una empresa de la lista para gestionar sus datos, contactos y ver su historial de pedidos.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SupplierList;

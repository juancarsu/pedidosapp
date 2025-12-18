
import React, { useState } from 'react';
import { CompanyType } from '../types';

interface CompanyTypeManagerProps {
  companyTypes: CompanyType[];
  onAdd: (name: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, name: string) => void;
}

const CompanyTypeManager: React.FC<CompanyTypeManagerProps> = ({ companyTypes, onAdd, onDelete, onUpdate }) => {
  const [newName, setNewName] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (newName.trim()) {
      onAdd(newName.trim());
      setNewName('');
    }
  };

  const startEdit = (type: CompanyType) => {
    setEditingId(type.id);
    setEditingName(type.name);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingName('');
  };

  const saveEdit = (id: string) => {
    if (editingName.trim()) {
      onUpdate(id, editingName.trim());
      setEditingId(null);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
        <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          🏷️ Añadir Nuevo Tipo de Empresa
        </h3>
        <form onSubmit={handleAdd} className="flex gap-4">
          <input
            type="text"
            placeholder="Ej: Carpintería Metálica, Seguridad..."
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="flex-1 px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 active:scale-95"
          >
            Añadir
          </button>
        </form>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 bg-slate-50/50">
          <h3 className="text-lg font-bold text-slate-800">Listado de Tipos de Empresa</h3>
          <p className="text-xs text-slate-500">Estos tipos aparecerán en los desplegables y filtros de proveedores.</p>
        </div>
        <div className="divide-y divide-slate-100">
          {companyTypes.map((type) => (
            <div key={type.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
              {editingId === type.id ? (
                <div className="flex-1 flex gap-2">
                  <input
                    type="text"
                    value={editingName}
                    onChange={(e) => setEditingName(e.target.value)}
                    className="flex-1 px-3 py-1.5 border border-blue-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    autoFocus
                  />
                  <button
                    onClick={() => saveEdit(type.id)}
                    className="bg-emerald-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-emerald-600"
                  >
                    Guardar
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="bg-slate-200 text-slate-600 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-slate-300"
                  >
                    Cancelar
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs">
                      {type.name.charAt(0).toUpperCase()}
                    </span>
                    <span className="font-semibold text-slate-700">{type.name}</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => startEdit(type)}
                      className="p-2 text-slate-400 hover:text-blue-600 transition-colors"
                      title="Editar"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => onDelete(type.id)}
                      className="p-2 text-slate-400 hover:text-red-600 transition-colors"
                      title="Eliminar"
                    >
                      🗑️
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
          {companyTypes.length === 0 && (
            <div className="p-12 text-center text-slate-400 italic">No hay tipos definidos.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompanyTypeManager;

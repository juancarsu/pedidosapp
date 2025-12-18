
import React, { useState, useMemo } from 'react';
import { Order, Supplier } from '../types';

interface OrderTableProps {
  orders: Order[];
  suppliers: Supplier[];
}

const OrderTable: React.FC<OrderTableProps> = ({ orders, suppliers }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBuilding, setFilterBuilding] = useState('Todos');

  const buildings = useMemo(() => ['Todos', ...new Set(orders.map(o => o.building))], [orders]);

  const filteredOrders = useMemo(() => {
    return orders.filter(o => {
      const matchSearch = 
        o.idPedido.toLowerCase().includes(searchTerm.toLowerCase()) ||
        o.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        o.notes?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchBuilding = filterBuilding === 'Todos' || o.building === filterBuilding;
      return matchSearch && matchBuilding;
    });
  }, [orders, searchTerm, filterBuilding]);

  const getSupplierName = (id: string) => suppliers.find(s => s.id === id)?.name || 'Desconocido';

  const renderLink = (val?: string, label?: string) => {
    if (!val) return <span className="text-slate-300">-</span>;
    const isUrl = val.startsWith('http');
    return isUrl ? (
      <a href={val} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center gap-1 font-medium">
        🔗 <span className="truncate max-w-[80px]">{label || 'Ver'}</span>
      </a>
    ) : (
      <span className="text-slate-600 font-medium">{val}</span>
    );
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col h-full max-h-[calc(100vh-12rem)]">
      {/* Table Filters */}
      <div className="p-4 border-b border-slate-100 flex flex-wrap gap-4 items-center bg-slate-50/50 rounded-t-2xl">
        <div className="relative flex-1 min-w-[300px]">
          <input
            type="text"
            placeholder="Filtrar por ID, descripción o notas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <span className="absolute left-3 top-2.5 text-slate-400">🔍</span>
        </div>
        <select
          value={filterBuilding}
          onChange={(e) => setFilterBuilding(e.target.value)}
          className="px-4 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500"
        >
          {buildings.map(b => <option key={b} value={b}>{b}</option>)}
        </select>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors shadow-md shadow-blue-500/20">
          + Nuevo Pedido
        </button>
      </div>

      {/* Grid Container */}
      <div className="overflow-auto relative flex-1">
        <table className="w-full text-left text-sm border-separate border-spacing-0">
          <thead className="sticky top-0 z-10 bg-white shadow-sm">
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="p-4 font-semibold text-slate-600 border-b border-slate-200 whitespace-nowrap">ID Pedido</th>
              <th className="p-4 font-semibold text-slate-600 border-b border-slate-200 whitespace-nowrap">Proveedor</th>
              <th className="p-4 font-semibold text-slate-600 border-b border-slate-200 min-w-[300px]">Descripción</th>
              <th className="p-4 font-semibold text-slate-600 border-b border-slate-200 whitespace-nowrap">Estado</th>
              <th className="p-4 font-semibold text-slate-600 border-b border-slate-200 whitespace-nowrap">Edificio</th>
              <th className="p-4 font-semibold text-slate-600 border-b border-slate-200 whitespace-nowrap">GDC/PIN</th>
              <th className="p-4 font-semibold text-slate-600 border-b border-slate-200 whitespace-nowrap">SC</th>
              <th className="p-4 font-semibold text-slate-600 border-b border-slate-200 whitespace-nowrap">Precio (s/IVA)</th>
              <th className="p-4 font-semibold text-slate-600 border-b border-slate-200 whitespace-nowrap">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-blue-50/30 transition-colors group">
                  <td className="p-4 font-bold text-blue-700 whitespace-nowrap">{order.idPedido}</td>
                  <td className="p-4 text-slate-700 whitespace-nowrap">{getSupplierName(order.supplierId)}</td>
                  <td className="p-4 text-slate-600">
                    <div className="line-clamp-2" title={order.description}>{order.description}</div>
                  </td>
                  <td className="p-4 whitespace-nowrap">
                    {order.actualArrivalDate ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                        Recibido ({order.actualArrivalDate})
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                        Pendiente (Est. {order.estimatedArrivalDate})
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-slate-600 whitespace-nowrap">{order.building}</td>
                  <td className="p-4 whitespace-nowrap">{renderLink(order.gdcPin, 'GDC')}</td>
                  <td className="p-4 whitespace-nowrap">{renderLink(order.sc, 'SC')}</td>
                  <td className="p-4 font-bold text-slate-800 whitespace-nowrap">{order.priceNoVat.toLocaleString()}€</td>
                  <td className="p-4 text-center whitespace-nowrap">
                    <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors">✏️</button>
                    <button className="p-2 text-slate-400 hover:text-red-600 transition-colors">🗑️</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={9} className="p-12 text-center text-slate-400 italic">No se encontraron pedidos con los criterios seleccionados.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="p-4 bg-slate-50 border-t border-slate-200 text-xs text-slate-500 flex justify-between items-center rounded-b-2xl">
        <span>Mostrando {filteredOrders.length} de {orders.length} pedidos</span>
        <span>UniMant System v1.0 - Acceso Ultra-Rápido activado</span>
      </div>
    </div>
  );
};

export default OrderTable;

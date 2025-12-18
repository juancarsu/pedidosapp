
import React, { useEffect, useState } from 'react';
import { Order, Supplier } from '../types';
import { getSmartSummary } from '../services/geminiService';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface DashboardProps {
  orders: Order[];
  suppliers: Supplier[];
}

const Dashboard: React.FC<DashboardProps> = ({ orders, suppliers }) => {
  const [summary, setSummary] = useState<string>('Analizando datos con Gemini AI...');

  useEffect(() => {
    const fetchSummary = async () => {
      const result = await getSmartSummary(orders, suppliers);
      setSummary(result);
    };
    fetchSummary();
  }, [orders, suppliers]);

  const pending = orders.filter(o => !o.actualArrivalDate).length;
  const completed = orders.filter(o => !!o.actualArrivalDate).length;
  const totalValue = orders.reduce((acc, curr) => acc + curr.priceNoVat, 0);

  const stats = [
    { label: 'Pedidos Totales', value: orders.length, color: 'bg-blue-500', icon: '📦' },
    { label: 'Pendientes', value: pending, color: 'bg-amber-500', icon: '⏳' },
    { label: 'Completados', value: completed, color: 'bg-emerald-500', icon: '✅' },
    { label: 'Inversión (s/IVA)', value: `${totalValue.toLocaleString()}€`, color: 'bg-indigo-500', icon: '💶' },
  ];

  // Data for Chart: Orders per Building
  const buildingData = orders.reduce((acc: any[], order) => {
    const existing = acc.find(item => item.name === order.building);
    if (existing) {
      existing.count += 1;
    } else {
      acc.push({ name: order.building, count: 1 });
    }
    return acc;
  }, []);

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  return (
    <div className="space-y-8">
      {/* AI Summary Box */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">✨</span>
            <h3 className="text-lg font-bold">Asistente Inteligente UniMant</h3>
          </div>
          <p className="text-blue-50 text-sm leading-relaxed max-w-3xl">
            {summary}
          </p>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4 transition-transform hover:scale-[1.02]">
            <div className={`${stat.color} w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-inner`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">{stat.label}</p>
              <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Chart */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Pedidos por Edificio</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={buildingData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} fontSize={12} tick={{ fill: '#64748b' }} />
                <YAxis axisLine={false} tickLine={false} fontSize={12} tick={{ fill: '#64748b' }} />
                <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                   {buildingData.map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Pedidos Recientes</h3>
          <div className="space-y-4">
            {orders.slice(0, 5).map(order => (
              <div key={order.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer border border-transparent hover:border-slate-100">
                <div className="w-2 h-10 bg-blue-500 rounded-full"></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-800 truncate">{order.description}</p>
                  <p className="text-xs text-slate-500">{order.idPedido} • {order.building}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-medium text-slate-400">{order.orderDate}</p>
                  <p className="text-sm font-bold text-slate-700">{order.priceNoVat}€</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

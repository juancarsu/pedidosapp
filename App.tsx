
import React, { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import OrderTable from './components/OrderTable';
import SupplierList from './components/SupplierList';
import CompanyTypeManager from './components/CompanyTypeManager';
import BaserowGuide from './components/BaserowGuide';
import { ViewMode, Order, Supplier, CompanyType } from './types';
import { MOCK_ORDERS, MOCK_SUPPLIERS, MOCK_COMPANY_TYPES } from './mockData';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<ViewMode>('dashboard');
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);
  const [suppliers, setSuppliers] = useState<Supplier[]>(MOCK_SUPPLIERS);
  const [companyTypes, setCompanyTypes] = useState<CompanyType[]>(MOCK_COMPANY_TYPES);

  const handleAddCompanyType = (name: string) => {
    const newType: CompanyType = {
      id: `t-${Date.now()}`,
      name,
    };
    setCompanyTypes([...companyTypes, newType]);
  };

  const handleDeleteCompanyType = (id: string) => {
    if (suppliers.some(s => s.typeId === id)) {
      alert("No se puede eliminar este tipo porque hay proveedores asociados a él.");
      return;
    }
    setCompanyTypes(companyTypes.filter(t => t.id !== id));
  };

  const handleUpdateCompanyType = (id: string, name: string) => {
    setCompanyTypes(companyTypes.map(t => t.id === id ? { ...t, name } : t));
  };

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard orders={orders} suppliers={suppliers} />;
      case 'orders':
        return <OrderTable orders={orders} suppliers={suppliers} />;
      case 'suppliers':
        return <SupplierList suppliers={suppliers} companyTypes={companyTypes} />;
      case 'company-types':
        return (
          <CompanyTypeManager 
            companyTypes={companyTypes} 
            onAdd={handleAddCompanyType} 
            onDelete={handleDeleteCompanyType}
            onUpdate={handleUpdateCompanyType}
          />
        );
      case 'setup-guide':
        return <BaserowGuide />;
      default:
        return <Dashboard orders={orders} suppliers={suppliers} />;
    }
  };

  return (
    <Layout activeView={activeView} onViewChange={setActiveView}>
      {renderContent()}
    </Layout>
  );
};

export default App;


export interface CompanyType {
  id: string;
  name: string;
}

export interface Contact {
  id: string;
  name: string;
  position: string;
  mobile: string;
  email: string;
  supplierId: string;
}

export interface Supplier {
  id: string;
  name: string;
  address: string;
  city: string;
  nif: string;
  typeId: string; // References CompanyType.id
  phone: string;
  web?: string;
  contacts: Contact[];
}

export interface Order {
  id: string;
  idPedido: string;
  supplierId: string;
  description: string;
  orderDate: string;
  estimatedArrivalDate: string;
  actualArrivalDate?: string;
  buyer: string;
  requester: string;
  building: string;
  gdcPin?: string;
  sc?: string;
  oc?: string;
  deliveryNote?: string;
  budget?: string;
  invoice?: string;
  priceNoVat: number;
  notes?: string;
}

export type ViewMode = 'dashboard' | 'orders' | 'suppliers' | 'company-types' | 'setup-guide';

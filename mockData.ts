
import { Supplier, Order, CompanyType } from './types';

export const MOCK_COMPANY_TYPES: CompanyType[] = [
  { id: 't1', name: 'Carpintería' },
  { id: 't2', name: 'Electricidad' },
  { id: 't3', name: 'Climatización' },
  { id: 't4', name: 'Fontanería' },
  { id: 't5', name: 'Albañilería' },
  { id: 't6', name: 'Pintura' },
  { id: 't7', name: 'Suministros Generales' },
];

export const MOCK_SUPPLIERS: Supplier[] = [
  {
    id: 's1',
    name: 'Maderas Sierra S.L.',
    address: 'Polígono Industrial Norte, Nave 4',
    city: 'Madrid',
    nif: 'B12345678',
    typeId: 't1',
    phone: '912345678',
    web: 'https://maderassierra.com',
    contacts: [
      { id: 'c1', name: 'Antonio Sierra', position: 'Gerente', mobile: '600111222', email: 'antonio@maderassierra.com', supplierId: 's1' },
      { id: 'c2', name: 'Laura Ruiz', position: 'Ventas', mobile: '600333444', email: 'laura@maderassierra.com', supplierId: 's1' }
    ]
  },
  {
    id: 's2',
    name: 'Electrónica Voltio',
    address: 'Av. de la Técnica, 12',
    city: 'Getafe',
    nif: 'B87654321',
    typeId: 't2',
    phone: '918765432',
    web: 'https://voltio.es',
    contacts: [
      { id: 'c3', name: 'Carlos Amperio', position: 'Técnico Senior', mobile: '655999888', email: 'carlos@voltio.es', supplierId: 's2' }
    ]
  }
];

export const MOCK_ORDERS: Order[] = [
  {
    id: 'o1',
    idPedido: 'MANT-2024-001',
    supplierId: 's1',
    description: 'Suministro de listones de pino para reparación de puertas en Facultad de Ciencias.',
    orderDate: '2024-03-15',
    estimatedArrivalDate: '2024-03-20',
    actualArrivalDate: '2024-03-19',
    buyer: 'Juan García',
    requester: 'Ricardo Gómez',
    building: 'Facultad de Ciencias',
    gdcPin: 'https://docs.univ.es/GDC001',
    sc: 'SC-123',
    oc: 'OC-987',
    priceNoVat: 450.50,
    notes: 'Urgente para final de semana.'
  },
  {
    id: 'o2',
    idPedido: 'MANT-2024-002',
    supplierId: 's2',
    description: 'Sustitución de balastros en sótano del Rectorado.',
    orderDate: '2024-03-18',
    estimatedArrivalDate: '2024-03-22',
    buyer: 'María López',
    requester: 'Pedro Alcaide',
    building: 'Rectorado',
    sc: 'SC-124',
    priceNoVat: 1250.00,
    notes: 'Requiere andamio.'
  }
];

export const BUYERS = ['Juan García', 'María López', 'Silvia Domínguez', 'Carlos Martínez'];
export const REQUESTERS = ['Ricardo Gómez', 'Pedro Alcaide', 'Elena Fernández', 'Luis Ocaña'];
export const BUILDINGS = ['Facultad de Ciencias', 'Facultad de Letras', 'Rectorado', 'Biblioteca Central', 'Pabellón Polideportivo'];

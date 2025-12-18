
import { GoogleGenAI } from "@google/genai";
import { Order, Supplier } from "../types";

export const getSmartSummary = async (orders: Order[], suppliers: Supplier[]): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const pendingOrders = orders.filter(o => !o.actualArrivalDate);
  const dataContext = `
    Resumen de datos:
    - Total Pedidos: ${orders.length}
    - Pedidos Pendientes: ${pendingOrders.length}
    - Total Proveedores: ${suppliers.length}
    
    Listado de pedidos pendientes:
    ${pendingOrders.map(o => `- ${o.idPedido}: ${o.description} (Est. ${o.estimatedArrivalDate}) para ${o.building}`).join('\n')}
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Eres un asistente experto en gestión de mantenimiento universitario. Basándote en estos datos, dame un resumen ejecutivo muy breve (3 frases máximo) sobre el estado actual y qué debería ser la prioridad. Contexto: ${dataContext}`,
    });
    return response.text || "No se pudo generar el resumen.";
  } catch (error) {
    console.error("Error calling Gemini:", error);
    return "Error al conectar con la inteligencia artificial.";
  }
};

// EDITA AQUÍ tus datos reales. Todo el sitio lee de este archivo.
export const SITE = {
  titulo: "Departamento en alquiler",
  zona: "Tu próximo hogar",
  subtitulo: "Luminoso · Ventilado · Apto profesional · Listo para habitar",
  badge: "Disponible ahora",
  precio: "$940.000 ARS / mes",
  precioMensual: "$940.000 ARS",
  // Cambia por tu número real con código país, sin + ni espacios. Ej: 5215500000000
  whatsappNumber: "5491140648243",
  whatsappMessage: "Hola, me interesa el departamento en alquiler. ¿Sigue disponible? Quiero agendar una visita.",
  ubicacionAprox: "Zona residencial · Acceso rápido a avenidas principales",
  requisitos: [
    "Duración: Contrato tradicional a 2 años",
    "1 mes de adelanto y 1 mes de depósito",
    "Actualización trimestral por Índice de Precios al Consumidor (IPC)",
    "Expensas ordinarias ($150.000 actuales) y servicios a cargo del inquilino",
    "Garantía a convenir (propietaria de CABA o Seguro de Caución) y demostración de ingresos comprobable",
  ],
};

// Portada hero (la que más enamora). Cambia el nombre si prefieres otra.
export const HERO_IMG = "/media/photo_4997085112373546010_y.jpg";

export const PHOTOS = [
  "/media/photo_4997085112373546010_y.jpg",
  "/media/photo_4997085112373546011_y.jpg",
  "/media/photo_4997085112373546012_y.jpg",
  "/media/photo_4997085112373545992_y.jpg",
  "/media/photo_4997085112373545994_y.jpg",
  "/media/photo_4997085112373545995_y.jpg",
  "/media/photo_4997085112373545996_y.jpg",
  "/media/photo_4997085112373545997_y.jpg",
  "/media/photo_4997085112373545998_y.jpg",
  "/media/photo_4997085112373545999_y.jpg",
  "/media/photo_4997085112373546000_y.jpg",
  "/media/photo_4997085112373546001_y.jpg",
  "/media/photo_4997085112373546002_y.jpg",
  "/media/photo_4997085112373546003_y.jpg",
  "/media/photo_4997085112373546004_y.jpg",
  "/media/photo_4997085112373546005_y.jpg",
  "/media/photo_4997085112373546006_y.jpg",
  "/media/photo_4997085112373546007_y.jpg",
  "/media/photo_4997085112373546008_y.jpg",
  "/media/photo_4997085112373546009_y.jpg",
  "/media/photo_4997085112373545993_y.jpg",
  "/media/photo_4997085112373546013_y.jpg",
  "/media/photo_4997085112373546014_y.jpg",
  "/media/photo_4997085112373546020_y.jpg",
];

export const VIDEOS = [
  "/media/IMG_8750.mp4",
];

export function whatsappLink() {
  const msg = encodeURIComponent(SITE.whatsappMessage);
  return `https://wa.me/${SITE.whatsappNumber}?text=${msg}`;
}

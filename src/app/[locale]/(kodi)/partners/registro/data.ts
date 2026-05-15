export const MAX_LOGO_BYTES = 2_000_000;
export const MAX_PHOTO_BYTES = 5_000_000;
export const LOGO_MIN_PX = 400;
export const MIN_DEADLINE_DAYS = 15;
export const MAX_DEADLINE_DAYS = 90;

export const LIMITS = {
  businessName: 60,
  businessDescription: 250,
  branchName: 60,
  couponDescription: 80,
  couponConditions: 150,
  branchesMin: 2,
  branchesMax: 20,
  couponQtyMin: 5,
  couponQtyMax: 500,
  percentMin: 5,
  percentMax: 100,
  fixedMin: 500,
} as const;

export const HANDLE_RE = /^[A-Za-z0-9._]{1,30}$/;
export const NAME_RE = /^[\p{L} ]+$/u;
export const WHATSAPP_RE = /^\d{8}$/;

export type BusinessCategory = { value: string; es: string; en: string };

export const BUSINESS_CATEGORIES: BusinessCategory[] = [
  { value: "Escuela de Manejo", es: "Escuela de Manejo", en: "Driving School" },
  { value: "Alquiler de Vehículo COSEVI", es: "Alquiler de Vehículo COSEVI", en: "COSEVI Vehicle Rental" },
  { value: "Restaurante", es: "Restaurante", en: "Restaurant" },
  { value: "Hamburguesería", es: "Hamburguesería", en: "Burger Joint" },
  { value: "Café / Heladería", es: "Café / Heladería", en: "Café / Ice Cream" },
  { value: "Comida Rápida", es: "Comida Rápida", en: "Fast Food" },
  { value: "Delivery / Dark Kitchen", es: "Delivery / Dark Kitchen", en: "Delivery / Dark Kitchen" },
  { value: "Tecnología", es: "Tecnología", en: "Technology" },
  { value: "Ropa / Boutique", es: "Ropa / Boutique", en: "Clothing / Boutique" },
  { value: "Calzado", es: "Calzado", en: "Footwear" },
  { value: "Barbería / Salón", es: "Barbería / Salón", en: "Barber / Salon" },
  { value: "Gimnasio / Fitness", es: "Gimnasio / Fitness", en: "Gym / Fitness" },
  { value: "Academia de Idiomas", es: "Academia de Idiomas", en: "Language Academy" },
  { value: "Librería / Papelería", es: "Librería / Papelería", en: "Bookstore / Stationery" },
  { value: "Óptica", es: "Óptica", en: "Optical" },
  { value: "Entretenimiento", es: "Entretenimiento", en: "Entertainment" },
  { value: "Fotografía", es: "Fotografía", en: "Photography" },
  { value: "Salud / Bienestar", es: "Salud / Bienestar", en: "Health / Wellness" },
  { value: "Supermercado", es: "Supermercado", en: "Supermarket" },
  { value: "Otro", es: "Otro", en: "Other" },
];

// ⚠️ Verificar contra fuente oficial antes de lanzar (PRD §3.3 / spec §9).
export const GAM_CANTONS: string[] = [
  "San José", "Escazú", "Desamparados", "Aserrí", "Mora", "Goicoechea",
  "Santa Ana", "Alajuelita", "Vázquez de Coronado", "Tibás", "Moravia",
  "Montes de Oca", "Curridabat",
  "Alajuela", "Atenas", "Poás",
  "Cartago", "Paraíso", "La Unión", "Oreamuno", "El Guarco",
  "Heredia", "Barva", "Santo Domingo", "Santa Bárbara", "San Rafael",
  "San Isidro", "Belén", "Flores", "San Pablo",
];

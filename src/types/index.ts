export type MaterialCategory = 'papel' | 'plastico' | 'biodegradable' | 'tela';

export type UseCategory = 'alimentos' | 'comercial' | 'industrial' | 'ecommerce';

export interface TechnicalSpecs {
  barrierO2: string; // ej: "Baja (< 50 cm³/m²·día)" o "Alta Barrier (EVOH)"
  barrierH2O: string; // ej: "Excelente (WVTR < 1.0 g/m²·día)"
  sealStrength: string; // ej: "> 25 N/15mm"
  grammageMicrons: string; // ej: "80 - 120 g/m²" o "40 - 90 Micras"
  certifications: string[]; // ["FSC® Certified", "BPI Compostable", "FDA Food Contact", "ISO 9001"]
  recyclability: string; // "100% Reciclable / Biodegradable en 180 días"
  maxWeightKg: number;
}

export interface Product {
  id: string;
  name: string;
  code: string;
  tagline: string;
  materialCategory: MaterialCategory;
  materialLabel: string;
  useCategory: UseCategory;
  useLabel: string;
  ecoBadge: string;
  ecoBadgeType: 'eco' | 'recycled' | 'kraft' | 'durable';
  featured: boolean;
  basePrice: number; // Precio base por unidad para 5000 uds
  minOrderQuantity: number;
  imageUrl: string;
  availableDimensions: {
    defaultHeight: number;
    defaultWidth: number;
    defaultGusset: number; // Fuelle en cm
    heightRange: [number, number];
    widthRange: [number, number];
    gussetRange: [number, number];
  };
  thicknessOptions: string[];
  printOptions: { id: string; name: string; multiplier: number; addCost?: number }[];
  finishOptions: { id: string; name: string; multiplier: number; addCost?: number }[];
  accessoryOptions: { id: string; name: string; addCost: number }[];
  technicalSpecs: TechnicalSpecs;
  description: string;
  keyFeatures: string[];
}

export interface FilterState {
  material: MaterialCategory | 'all';
  use: UseCategory | 'all';
  searchQuery: string;
  ecoOnly: boolean;
}

export interface QuoteFormState {
  selectedProductId: string;
  heightCm: number;
  widthCm: number;
  gussetCm: number;
  thickness: string;
  quantity: number;
  printOptionId: string;
  finishOptionId: string;
  selectedAccessories: string[];
  clientName?: string;
  clientCompany?: string;
  clientEmail?: string;
}

export interface QuoteCalculationResult {
  product: Product;
  quantity: number;
  dimensionsText: string;
  basePricePerUnit: number;
  customizationFactor: number;
  volumeDiscountPercent: number;
  finalUnitPrice: number;
  subtotal: number;
  savingsAmount: number;
  estimatedCo2SavedKg: number;
  productionDays: number;
}

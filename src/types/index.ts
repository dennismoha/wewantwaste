export type SkipTypes = {
  id: number;
  size: number;
  hire_period_days: number;
  transport_cost: number | null;
  per_tonne_cost: number | null;
  price_before_vat: number;
  vat: number;
  postcode: string;
  area: string;
  forbidden: boolean;
  created_at: string;
  updated_at: string;
  allowed_on_road: boolean;
  allows_heavy_waste: boolean;
};

export type NavbarProps = {
  setViewMode: (mode: 'grid' | 'list') => void;
  viewMode: 'grid' | 'list';
  setFilterSize: (size: number | null) => void;
  setCurrentPage: (page: number) => void;
  skips: { size: number }[];
  size?: number;
};

export type Sidebarprops = {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
};

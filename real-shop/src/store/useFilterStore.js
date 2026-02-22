import { create } from "zustand";

export const useFilterStore = create((set) => ({
    filters : {},

    setFilters: (filters) => set({ filters }),

    clearFilters: () => set({ filters: {} }),

    addFilter: (key, value) => set((state) => ({ filters: { ...state.filters, [key]: value } })),

    removeFilter: (key) => set((state) => ({ filters: { ...state.filters, [key]: undefined } })),

    updateFilter: (key, value) => set((state) => ({ filters: { ...state.filters, [key]: value } })),

    resetFilters: () => set({ filters: {} }),

    toggleFilter: (key) => set((state) => ({ filters: { ...state.filters, [key]: !state.filters[key] } })),

    toggleFilterValue: (key, value) => set((state) => ({ filters: { ...state.filters, [key]: state.filters[key] === value ? undefined : value } })),

    
}));


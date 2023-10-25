'use client';

import { create } from 'zustand';

interface BearState {
    counter: number;
    increase: (by: number) => void;
    increment: () => void;
}

const useStoreBase = create<BearState>()((set) => ({
    counter: 0,
    increase: (by: number) => set((state) => ({ counter: state.counter + by })),
    increment: () => set((state) => ({ counter: (state.counter += 1) })),
}));

export default useStoreBase;

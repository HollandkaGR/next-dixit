'use client';

import { create } from 'zustand';

interface Counter {
    counter: number;
    increase: (by: number) => void;
    increment: () => void;
}

const useCounterStore = create<Counter>()((set) => ({
    counter: 0,
    increase: (by: number) => set((state) => ({ counter: state.counter + by })),
    increment: () => set((state) => ({ counter: (state.counter += 1) })),
}));

export default useCounterStore;

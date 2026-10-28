'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
  type ReactNode,
} from 'react';
import type { CartLine } from '@/lib/types';

const STORAGE_KEY = 'davela.cart.v1';
const MAX_QUANTITY = 10;

type Action =
  | { type: 'hydrate'; lines: CartLine[] }
  | { type: 'add'; line: CartLine }
  | { type: 'quantity'; variantId: string; quantity: number }
  | { type: 'clear' };

function reducer(state: CartLine[], action: Action): CartLine[] {
  switch (action.type) {
    case 'hydrate':
      return action.lines;
    case 'add': {
      const exists = state.some((l) => l.variantId === action.line.variantId);
      return exists
        ? state.map((l) =>
            l.variantId === action.line.variantId
              ? { ...l, quantity: Math.min(l.quantity + action.line.quantity, MAX_QUANTITY) }
              : l,
          )
        : [...state, action.line];
    }
    case 'quantity':
      return action.quantity <= 0
        ? state.filter((l) => l.variantId !== action.variantId)
        : state.map((l) =>
            l.variantId === action.variantId
              ? { ...l, quantity: Math.min(action.quantity, MAX_QUANTITY) }
              : l,
          );
    case 'clear':
      return [];
  }
}

interface CartContextValue {
  lines: CartLine[];
  count: number;
  totalUGX: number;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  add: (line: CartLine) => void;
  setQuantity: (variantId: string, quantity: number) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, dispatch] = useReducer(reducer, []);
  const [hydrated, setHydrated] = useState(false);
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) dispatch({ type: 'hydrate', lines: JSON.parse(stored) as CartLine[] });
    } catch {
      // Corrupt or blocked storage: start with an empty bag.
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      // Storage unavailable (private mode); the bag lives in memory only.
    }
  }, [lines, hydrated]);

  const open = useCallback(() => setOpen(true), []);
  const close = useCallback(() => setOpen(false), []);
  const add = useCallback((line: CartLine) => dispatch({ type: 'add', line }), []);
  const setQuantity = useCallback(
    (variantId: string, quantity: number) => dispatch({ type: 'quantity', variantId, quantity }),
    [],
  );
  const clear = useCallback(() => dispatch({ type: 'clear' }), []);

  const value = useMemo<CartContextValue>(
    () => ({
      lines,
      count: lines.reduce((n, l) => n + l.quantity, 0),
      totalUGX: lines.reduce((sum, l) => sum + l.unitPriceUGX * l.quantity, 0),
      isOpen,
      open,
      close,
      add,
      setQuantity,
      clear,
    }),
    [lines, isOpen, open, close, add, setQuantity, clear],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
}

interface Composition {
  toBRL(value: number|string): string;
}

export default function useCurrency(): Composition {
  const toBRL = (value: number|string) => {
    const number = typeof value === 'string' ? Number(value) : value;

    return number.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return {
    toBRL,
  };
}

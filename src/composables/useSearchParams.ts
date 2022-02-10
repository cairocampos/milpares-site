export default function useSearchParams(params: any): string {
  const search = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (['string', 'number'].includes(typeof value)) {
      search.append(key, String(value));
    } else if (typeof value === 'object' && value) {
      Object.entries(value).forEach(([valueKey, valueVal]) => {
        search.append(`${key}[${valueKey}]`, String(valueVal));
      });
    }
  });

  return search.toString();
}

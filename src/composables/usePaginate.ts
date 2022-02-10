import { IPaginate } from '@/interfaces/IPaginate';
import {
  Ref, ref, computed, ComputedRef,
} from 'vue';

interface Composition {
  paginate: Ref<IPaginate>,
  podePaginar: ComputedRef<boolean>
}

export default function usePaginate(): Composition {
  const paginate = ref<IPaginate>({
    current_page: 1,
    last_page: 1,
    per_page: 15,
  });

  const podePaginar = computed(() => paginate.value.current_page < paginate.value.last_page);

  return {
    paginate,
    podePaginar,
  };
}

<template>
  <nav
    class="container mt-4"
    aria-label="breadcrumb"
  >
    <ul class="d-flex align-items-center breadcrumb top-nav-info">
      <li class="pr-2 d-flex align-items-center">
        <a
          class="text-primary"
          @click="redirectRouter('Home')"
        >Home</a>
      </li>
      <hr>
      <li class="pr-2 d-flex align-items-center breadcrumb-item">
        <!-- <img src="@/assets/images/social/breadShape.png" /> -->
        <a
          class="pl-2"
          @click="redirectRouter(primaryRoute)"
        >
          {{ onBreadcrumbRoute(primaryRoute) }}
        </a>
      </li>
      <hr>
      <li class="pr-2 d-flex align-items-center breadcrumb-item">
        <!-- <img
          v-if="$route.path !== '/resgate'"
          src="@/assets/images/social/breadShape.png"
          class="pr-2"
        /> -->
        <a v-if="product">
          {{ onBreadcrumbRoute(secondaryRoute) }}
        </a>
        <a>
          {{ product }}
        </a>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router';

import useBreadcrumbs from '@/composables/useBreadcrumbs'

  export default defineComponent({
    props: {
      product: {
        type: String,
        default: () => ''
      }
    },
    setup() {
      const breadcrumbRoute = useBreadcrumbs();
      const router = useRouter();
      const route = useRoute();
      const primaryRoute = ref('')
      const secondaryRoute = ref('')

     const breadCrumb = () => {
      const currentPath = route.path
      primaryRoute.value = currentPath.split('/', 2)[1]
      secondaryRoute.value = currentPath.split('/', 3)[2]

      console.log(primaryRoute.value)
      console.log(secondaryRoute.value)
    }

    const onBreadcrumbRoute = (route: string) => {
      // @ts-ignore
      return breadcrumbRoute[route]
    }

    const redirectRouter = (routerName:string) => {
      router.push({ name: `${routerName}` })
    }

      onMounted(() => breadCrumb());

      return {
        primaryRoute,
        secondaryRoute,
        breadCrumb,
        onBreadcrumbRoute,
        redirectRouter
      }
    }
  });
</script>

<style lang="scss">
.top-nav-info {
  font-family: Gotham-Book;
  display: flex;
  white-space: nowrap;
}
  .top-nav-info li {
  font-weight: 900;
  padding: 0 0.8rem;
  color: #ababab;
  cursor: pointer;
}

.top-nav-info hr {
  font-weight: 900;
  color: #ababab;
  margin-top: 0.2rem;
  height: 15px;
}

ul {
  margin: 0;
  padding:0;
}

.breadcrumb-item > .breadcrumb-item {
  background: red;
}
</style>

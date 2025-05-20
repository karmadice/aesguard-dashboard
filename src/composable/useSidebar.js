import { ref } from 'vue'
import { useRouter } from 'vue-router'

export function useSidebar() {
  const router = useRouter()
  const routes = router.getRoutes()

  const sidebarGroupsMap = {}

  routes.forEach(route => {
    const meta = route.meta?.sidebar
    if (meta) {
      if (!sidebarGroupsMap[meta.group]) {
        sidebarGroupsMap[meta.group] = {
          title: meta.group,
          items: [],
        }
      }

      sidebarGroupsMap[meta.group].items.push({
        meta: {
          title: meta.title,
          icon: meta.icon,
        },
        path: route.path,
        children: route.children || [], // optional: handle nested routes
      })
    }
  })

  const sidebarGroups = ref(Object.values(sidebarGroupsMap))

  return { sidebarGroups }
}

import { useRouter } from "vue-router"

export function useSidebar() {
    const router = useRouter()
    const routers = router.getRoutes()

    const sidebarGroups = {}

    routers.forEach(route => {
        const meta = route.meta?.sidebar
        if (meta) {
            if(!sidebarGroups[meta.group]) {
                sidebarGroups[meta.group] = {
                    name: meta.group,
                    items:[]
                }
            }
            sidebarGroups[meta.group].items.push({
                title: meta.title,
                path: route.path,
                icon: meta.iicon 
            })
        }
    })

    return Object.values(sidebarGroups)
}
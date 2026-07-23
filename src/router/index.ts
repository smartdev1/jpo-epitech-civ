import { createRouter, createWebHistory } from 'vue-router'
import { useGameStore } from '@/stores/game'
import { FINAL_CHECKPOINT, TOTAL_FRAGMENTS } from '@/types/game'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'splash',
      component: () => import('@/views/SplashView.vue'),
    },
    {
      path: '/equipe',
      name: 'team-setup',
      component: () => import('@/views/TeamSetupView.vue'),
    },
    {
      path: '/mission',
      name: 'dashboard',
      component: () => import('@/views/DashboardView.vue'),
      meta: { requiresTeam: true },
    },
    {
      path: '/checkpoint/:code',
      name: 'checkpoint',
      component: () => import('@/views/CheckpointView.vue'),
      meta: { requiresTeam: true },
    },
    {
      path: '/fragment/:id',
      name: 'fragment',
      component: () => import('@/views/FragmentView.vue'),
      meta: { requiresTeam: true },
    },
    {
      path: '/final',
      name: 'final',
      component: () => import('@/views/FinalView.vue'),
      meta: { requiresTeam: true },
    },
    {
      path: '/victoire',
      name: 'victory',
      component: () => import('@/views/VictoryView.vue'),
      meta: { requiresTeam: true },
    },
    {
      path: '/admin/qrcodes',
      name: 'admin-qrcodes',
      component: () => import('@/views/AdminQrView.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
  ],
})

router.beforeEach((to) => {
  const store = useGameStore()

  if (to.meta.requiresTeam && !store.team.teamName) {
    return { name: 'team-setup' }
  }

  if (to.name === 'fragment') {
    const id = Number(to.params.id)
    if (!Number.isInteger(id) || id < 1 || id > TOTAL_FRAGMENTS || store.currentStep !== id) {
      return { name: 'dashboard' }
    }
  }

  if (to.name === 'final') {
    if (store.completed) return { name: 'victory' }
    if (store.currentStep !== FINAL_CHECKPOINT) return { name: 'dashboard' }
  }

  if (to.name === 'victory' && !store.finalValidated) {
    return { name: 'dashboard' }
  }

  return true
})

export default router


/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from "vue-router";
import BaseLayout from "@/components/BaseLayout.vue";
import ResourcePage from '@/pages/ResourcePage.vue';
import TimeslotsPage from "@/pages/TimeslotPage.vue";
import TypePage from "@/pages/TypePage.vue";
import GroupPage from "@/pages/GroupPage.vue";
import TeamPage from "@/pages/TeamPage.vue";
import SoundeffectPage from "@/pages/SoundeffectPage.vue";

const routes = [
  {
    path: "/",
    component: BaseLayout,
    children: [
      {
        path: "create",
        component: () => import("@/pages/create.vue"),
        children: [
          { path: "Resource", component: ResourcePage },
          { path: "Timeslots", component: TimeslotsPage },
          { path: "Type", component: TypePage },
          { path: "Group", component: GroupPage },
          { path: "Team", component: TeamPage },
          { path: "Soundeffect", component: SoundeffectPage },
        ],
      },
      {
        path:"",
        component: () => import("@/pages/index.vue")
      },
      {
        path: "filter",
        component: () => import("@/pages/Filter.vue")
      },
      {
        path:"logout",
        component: () => import("@/pages/LogoutPage.vue")
      },
      {
        path: "login",
        component: () => import("@/pages/Login.vue")
    }
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (!localStorage.getItem('vuetify:dynamic-reload')) {
      console.log('Reloading page to fix dynamic import error')
      localStorage.setItem('vuetify:dynamic-reload', 'true')
      location.assign(to.fullPath)
    } else {
      console.error('Dynamic import error, reloading page did not fix it', err)
    }
  } else {
    console.error(err)
  }
})

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload')
})

export default router

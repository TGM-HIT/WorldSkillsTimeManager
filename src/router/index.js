import { createRouter, createWebHistory } from "vue-router";
import BaseLayout from "@/components/BaseLayout.vue";
import Home from "@/components/Table_Component.vue";
import ResourcePage from "@/pages/ResourcePage.vue";
import TimeslotsPage from "@/pages/TimeslotPage.vue";
import TypePage from "@/pages/TypePage.vue";
import GroupPage from "@/pages/GroupPage.vue";
import TeamPage from "@/pages/TeamPage.vue";
import SoundeffectPage from "@/pages/SoundeffectPage.vue";
import { components } from "vuetify/dist/vuetify-labs.js";

const routes = [
  {
    path: "/login",
    component: () => import("@/pages/Login.vue"),
  },
  {
    path: "/table",
    component: () => import("@/pages/TablePage.vue"),
  },
  {
    path: "/filterpage",
    component: () => import('@/components/Filterpage_Component.vue')
  },

  {
    path: "/mateitest",
    component: () => import('@/pages/TEMPtestPage.vue')
  },
  
  {
    path:"/team-picture",
    component: () => import("@/components/Picture_Component.vue")
  },
  {
    path:"/participant-picture",
    component: () => import("@/components/ParticipantImage_Component.vue")
  },
  {
    path:"/sound",
    component: () => import("@/components/ReturnedSound_Component.vue")
  },
  {
    path: "/",
    component: BaseLayout,
    children: [
      {
        path: "create",
        component: () => import("@/pages/create.vue"),
        children: [
          { path: "Resource", component: ResourcePage },
          { path: "timeslot", component: TimeslotsPage },
          { path: "timeslottype", component: TypePage },
          { path: "groups", component: GroupPage },
          { path: "Team", component: TeamPage },
          { path: "Soundeffect", component: SoundeffectPage },
          { path: "Participant", component: () => import("@/pages/TeammatesPage.vue")}
        ],
      },
      {
        path: "edit",
        component: () => import("@/pages/edit/edit.vue"),
        children: [
          { path: "Resource", component: () => import("@/pages/edit/Edit_Resource_Page.vue") },
          { path: "Timeslot", component: () => import("@/pages/edit/Edit_Timeslot_Page.vue") },
          { path: "TimeslotType", component: () => import("@/pages/edit/Edit_Type_Page.vue") },
          { path: "Groups", component: () => import("@/pages/edit/Edit_Groups_Page.vue") },
          { path: "Team", component: () => import("@/pages/edit/Edit_Team_Page.vue") },
          { path: "Soundeffect", component: () => import("@/pages/edit/Edit_Soundeffect_Page.vue") },
          { path: "Participant", component: () => import("@/pages/edit/Edit_Participant_Page.vue")}
        ],
      },
      {
        path: "",
        component: () => import("@/pages/index.vue"),
      },
      {
        path: "filter",
        component: () => import("@/pages/Filter.vue"),
      },
      {
        path: "wabbler",
        component: () => import("@/components/Babler_Component.vue")
      },
      {
        path: "lazyloading",
        component: () => import("@/components/Babler_Component.vue")
      },
      {
        path: "blackjack",
        component: () => import("@/components/Slot_Component.vue")
      },
      {
        path: "poker",
        component: () => import("@/components/Poker_Component.vue")
      },
      {
        path: "minesweeper",
        component: () => import("@/components/Minesweeper_Component.vue")
      },
      {
        path: "credits",
        component: () => import("@/pages/Impressum.vue")
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const publicRoutes = ["/login", "/table", "/filterpage"]; 

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem("auth") === "true";

  if (!isAuthenticated && !publicRoutes.includes(to.path)) {
    next("/login");
  } else if (isAuthenticated && to.path === "/login") {
    next("/");
  } else {
    next();
  }
});

router.onError((err, to) => {
  if (err?.message?.includes?.("Failed to fetch dynamically imported module")) {
    if (!localStorage.getItem("vuetify:dynamic-reload")) {
      console.log("Seite neu laden, um Import-Fehler zu beheben");
      localStorage.setItem("vuetify:dynamic-reload", "true");
      location.assign(to.fullPath);
    } else {
      console.error("Dynamischer Importfehler, Reload hat nicht geholfen", err);
    }
  } else {
    console.error(err);
  }
});

router.isReady().then(() => {
  localStorage.removeItem("vuetify:dynamic-reload");
});

export default router;
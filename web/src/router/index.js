import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ProfileView from "../views/ProfileView.vue";
import TasksView from "../views/TasksView.vue";
import AdminView from "../views/AdminView.vue"
import UsersView from "../views/UsersView.vue"
import StatisticView from "../views/StatisticView.vue"
import GeneralStatisticView from "../views/GeneralStatisticView.vue"
import WorkersView from "../views/WorkersView.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/profile",
      name: "profile",
      component: ProfileView,
      children: [
        {
          path: "",
          component: TasksView,
        },
        {
          path: "/admin",
          component: AdminView,
          children: [
            {
              path: "",
              component: UsersView
            },
            {
              path: "/statistic",
              component: StatisticView,
              children: [
                {
                  path: "",
                  component: GeneralStatisticView
                },
                {
                  path: "/workers",
                  component: WorkersView
                }
              ]
            }
          ]
        }
      ],
    },
  ],
});

export default router;

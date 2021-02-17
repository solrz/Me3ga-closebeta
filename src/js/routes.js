
import ProductPage from '../pages/product.svelte';
import AboutmePage from '../pages/aboutme.svelte'
import TodayPage from '../pages/today.svelte'
import TimetablePage from '../pages/timetable.svelte'
import CourseDetailPage from '../pages/course-detail.svelte'
import HomeworksPage from '../pages/homeworks.svelte'
import AnnouncementsPage from '../pages/announcements.svelte'
import StudentsPage from '../pages/students.svelte'

import DynamicRoutePage from '../pages/dynamic-route.svelte';
import NotFoundPage from '../pages/404.svelte';

var routes = [
  {
    path: '/',
    component: TodayPage,
  },
  {
    path: '/today',
    component: TodayPage,
  },
  {
    path: '/timetable',
    component: TimetablePage,
  },
  {
    path: '/aboutme',
    component: AboutmePage,
  },
  {
    path: '/homeworks',
    component: HomeworksPage,
  },
  {
    path: '/announcements',
    component: AnnouncementsPage,
  },
  {
    path: '/students',
    component: StudentsPage,
  },
  {
    path: '/course/:courseID/',
    component: CourseDetailPage,
  },
  // {
  //   path: '/product/:id/',
  //   component: ProductPage,
  // },
  // {
  //   path: '/dynamic-route/blog/:blogId/post/:postId/',
  //   component: DynamicRoutePage,
  // },
  // {
  //   path: '/request-and-load/user/:userId/',
  //   async: function ({ router, to, resolve }) {
  //     // App instance
  //     var app = router.app;
  //
  //     // Show Preloader
  //     app.preloader.show();
  //
  //     // User ID from request
  //     var userId = to.params.userId;
  //
  //     // Simulate Ajax Request
  //     setTimeout(function () {
  //       // We got user data from request
  //       var user = {
  //         firstName: 'Vladimir',
  //         lastName: 'Kharlampidi',
  //         about: 'Hello, i am creator of Framework7! Hope you like it!',
  //         links: [
  //           {
  //             title: 'Framework7 Website',
  //             url: 'http://framework7.io',
  //           },
  //           {
  //             title: 'Framework7 Forum',
  //             url: 'http://forum.framework7.io',
  //           },
  //         ]
  //       };
  //       // Hide Preloader
  //       app.preloader.hide();
  //
  //       // Resolve route to load page
  //       resolve(
  //         {
  //           component: RequestAndLoad,
  //         },
  //         {
  //           props: {
  //             user: user,
  //           }
  //         }
  //       );
  //     }, 1000);
  //   },
  // },
  {
    path: '(.*)',
    component: NotFoundPage,
  },
];

export default routes;

<template>
  <!-- Content Wrapper -->
  <div class="class-stats-wrapper">
    <div class="class-stats-header-wrapper">
      <h2 class="h2">My Stats</h2>
    </div>

    <div class="class-stats-header-student-wrapper">
      <span
        v-html="user?.image"
        v-if="user?.image"
        class="class-stats-header-student-avatar"
      >
      </span>
      <h4 class="h4" v-if="user?.name">
        {{ user?.name?.split(" ")[0] }}
      </h4>
      <h5 class="h5" v-if="user.className">
        {{ user.className }}
      </h5>
    </div>

    <div class="class-stats-content-wrapper">
      <div class="class-stats-points-content-wrapper">
        <h5 class="h5">Total Number of points</h5>
        <h3 class="h3 class-stats-points">{{ user.points }}</h3>
      </div>
      <talkie-button> View Leaderboard </talkie-button>
    </div>
  </div>
</template>

<script>
import { TalkieButton } from "@/components/UICore";

export default {
  name: "ClassStats",
  components: { TalkieButton },
  data() {
    return {
      user: {
        name: "Student",
        image: `<svg xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:cc="http://creativecommons.org/ns#" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 762 762" fill="none"><metadata><rdf:rdf><cc:work><dc:format>image/svg+xml</dc:format><dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage"></dc:type><dc:title>Adventurer</dc:title><dc:creator><cc:agent><dc:title>Lisa Wischofsky</dc:title></cc:agent></dc:creator><dc:source>https://www.instagram.com/lischis_adventures/</dc:source><cc:license rdf:resource="https://creativecommons.org/licenses/by/4.0/"></cc:license></cc:work><cc:license rdf:about="https://creativecommons.org/licenses/by/4.0/"><cc:permits rdf:resource="https://creativecommons.org/ns#Reproduction"></cc:permits><cc:permits rdf:resource="https://creativecommons.org/ns#Distribution"></cc:permits><cc:permits rdf:resource="https://creativecommons.org/ns#DerivativeWorks"></cc:permits><cc:requires rdf:resource="https://creativecommons.org/ns#Notice"></cc:requires><cc:requires rdf:resource="https://creativecommons.org/ns#Attribution"></cc:requires></cc:license></rdf:rdf></metadata><mask id="avatarsRadiusMask"><rect width="762" height="762" rx="0" ry="0" x="0" y="0" fill="#fff"></rect></mask><g mask="url(#avatarsRadiusMask)"><path d="M396.01 164.85c37.82 4.9 74.21 19.64 104.8 42.39 6.15 4.84 12.48 9.33 18.02 14.92 23.77 21.98 42.73 49.02 55.13 78.95 9.35 22.31 14.72 46.04 16.64 70.14 6.62.81 13.05 2.14 19.12 5 15.54 6.93 27.08 20.94 31.78 37.21 2.63 9.56 3.56 19.75 1.72 29.55-2.96 18.76-13.72 36.13-29.37 46.92-10.94 7.65-24.49 12.03-37.86 11.68-5.13-.05-10.04-1.6-15.13-1.79-1.85 2.17-3.23 4.84-4.76 7.25-18.66 29.62-44.57 54.51-74.64 72.4-28.1 16.73-59.9 27.16-92.46 30.32-11.08.7-21.87 2.05-32.98.74-51.69-2.3-102.07-23.44-140.15-58.43-29.03-26.55-50.84-60.83-62.54-98.39-7.09-22.85-10.62-46.78-10.07-70.71.52-40.34 12.53-80.58 33.94-114.76 19.1-30.81 45.91-56.58 77.2-74.83 29.63-17.28 63.35-27.68 97.59-29.87 14.66-1.47 29.44-.37 44.02 1.31Z" fill="#000"></path><path d="M363 169.06c48.47-1.39 97.32 14.7 135.81 44.12 6.55 4.06 11.72 9.49 17.36 14.64 24.33 22.63 43.2 50.95 54.93 82.02 7.43 19.61 11.86 40.2 13.56 61.09-8.89.74-17.34 2.34-25.38 6.38-2.19 1.03-1.89 4.95.68 5.23 2.35.23 4.98-1.51 7.24-2.2 14.62-5.37 31.32-4.35 44.78 3.68 11.69 6.78 20.09 18.16 23.89 31.06 2.6 8.25 2.68 17.41 1.76 25.95-2.5 17.35-12.35 33.73-26.73 43.81-15.71 11.33-37.17 14.64-54.93 6.2-3.17-1.43-5.94-3.58-9.08-5.05-2.95-1.09-4.88 2.79-2.7 4.75 3.17 2.76 7.34 4.52 11 6.56-20.14 34.15-49.45 62.7-84.41 81.47-30.2 16.31-64.44 25.53-98.78 26.15-27.63.72-55.33-4.04-81.21-13.72-30.32-11.24-57.84-29.43-80.37-52.6-22.67-23.37-39.92-51.88-50.2-82.77-14.96-44.64-14.91-94.01.27-138.59 11.05-33.06 30.28-63.21 55.37-87.39 29.67-28.73 67.65-48.54 108.13-56.67 12.8-2.52 25.94-4.24 39.01-4.12Z" fill="rgba(242, 211, 177, 1)"></path><path d="M605.03 404.4c2.63-.1 3.44 3.8 1.36 4.98-3.69 1.83-7.82 2.77-11.64 4.35-5.82 2.04-11.28 4.76-16.68 7.72 4.29 2.34 8.86 4.74 12.71 7.76 2.58 2.09 4.85 4.35 5.33 7.8-.26 3.59-2.73 6.55-5.45 8.69-5.86 4.66-13.92 7.18-20.79 10.26-1.75.62-4.43 1.99-5.59-.26-1.02-1.74-.06-3.11 1.57-3.87 6.65-3.3 14.86-5.62 20.79-10.16 1.37-1.14 3.39-2.74 3.61-4.62-4.07-5.63-12.42-8.59-18.23-12.09-2.34-1.72-2.29-4.24-.16-6.13 7.27-5.64 16.98-9.26 25.57-12.38 2.42-.83 5.03-1.95 7.6-2.05Z" fill="#000"></path><g transform="translate(-161 -83)"><path d="M554.99 424.09c15.56-.47 31.18 4.79 43.19 14.7 9.2 7.44 16.2 17.65 20.32 28.71 2.1 5.56 2.58 11.13 3.64 16.92-1.32 1.48-1.69 3.34-4.05 3.02-7.04-.31-13.96-2.04-21.03-2.22-8.77-.09-17.381-.37-26.091.95-9.84 1.63-19.519 2.64-29.069 5.72-11.24 3.04-22.07 7.25-32.49 12.45-3.36 1.62-6.47 3.76-9.89 5.22-2.08.77-4.42.35-5.29-1.92-2.28-7.19-2.82-15.19-2.45-22.69.94-15.99 8.12-31.4 19.67-42.5 11.64-11.32 27.3-17.95 43.54-18.36Z" fill="#000"></path><path d="M557 429.85c15.33-.23 30.41 6.15 41.39 16.75 9.87 9.5 15.83 22.19 17.69 35.7-14.89-2.86-29.99-3.76-45.11-2.49-5.99.69-11.93 1.87-17.87 2.88-.91-3.26-1.74-6.35-3.55-9.25-5.97-9.96-19.33-15.24-30.34-11.14-7.24 2.35-13.12 7.85-15.96 14.91-3.08 7.37-2.28 15.5 1.22 22.59-1.92.97-3.83 1.94-5.74 2.91-5.12-21.71 3.1-45.53 20.44-59.53 10.54-8.6 24.19-13.57 37.83-13.33Z" fill="#fff"></path><path d="M411.45 452.57c13.11 6.46 23.28 18.27 27.77 32.17 3.17 9.49 3.14 19.25 1.59 29.04-.96.52-1.92 1.05-2.88 1.57-9.78-2.77-19.77-4.68-29.91-5.44-17.91-1.13-36.17-1.69-54.05.02-6.9.17-13.47 2.03-20.42 1.58-.89-2.44-1.7-4.84-1.7-7.47-.18-10.31 2.22-20.81 7.45-29.76 6.91-12.04 18.47-21.18 31.78-25.14 13.26-4.05 27.97-2.75 40.37 3.43Z" fill="#000"></path><path d="M397.24 453.61c10.7 2.33 20.53 8.2 27.52 16.64 8.89 10.61 13 24.91 11.07 38.62-4.06-1.25-8.12-2.4-12.33-3.02-12.45-1.82-25.08-2.6-37.65-2.38-.06-3.82.07-7.39-1.47-10.98-3-7.74-10.12-13.39-18.35-14.5-10.08-1.52-20.42 4.34-24.35 13.74-2.23 4.9-1.78 9.64-1.96 14.85-1.73-1.26-1.94-1.37-1.99-3.52-.54-12.06 4.06-24.34 11.92-33.45 11.49-13.49 30.27-19.84 47.59-16Z" fill="#fff"></path></g><g transform="translate(-161 -83)"><g fill="#000"><path d="M545.03 378.5c24.7.94 48.04 8.97 69.45 20.99 2.26 1.32 4.92 2.49 6.79 4.33 1.3 2.39-.38 5.13-3.2 4.19-16.58-6.21-33.56-9.63-51.06-12.02-20.3-2.34-39.92-3.68-60.2-.13-3.2.44-6.87 2.16-10.08 1.59-2.66-1.69-1.2-6.1 1.29-7.37 13.63-9.33 30.79-12.1 47.01-11.58ZM407.99 396.92c3.51.64 6.6 1.92 9.63 3.78-.15 1.2-.26 2.4-.33 3.62-2.7.74-5.46 1.12-8.24 1.34-13.17 1.15-26.45 5.11-38.81 9.69-12.23 4.75-24.78 10.64-35.19 18.71-2.82 2.03-4.13 4.82-8.08 4.47-.5-.9-1-1.79-1.51-2.67.89-1.59 1.68-3.17 2.76-4.64 9.55-13.17 23.64-23.22 38.61-29.35 12.7-5.15 27.61-8.05 41.16-4.95Z"></path></g></g><g transform="translate(-161 -83)"><path d="M579.989 568.69c2.42 1 1.92 3.4 1.38 5.45-6.78 13.35-16.08 25.18-28.35 33.9-17.19 12.49-38.88 18.4-60.02 17.58-26.81-.96-53.07-12.04-73.44-29.31-.4-2.42-.49-3.71 1.45-5.42 51.83-7.13 106.78-15.03 158.98-22.2Z" fill="#000"></path><path d="M573.86 575.51c-8.17 15.05-20.98 27.46-36.37 34.99-12.46 6.12-26.6 9.44-40.49 9.19-24.71.18-49.01-9.01-68.58-23.87 47.93-6.59 97.73-13.8 145.44-20.31Z" fill="#8F2E45"></path></g><g transform="translate(-161 -83)"></g><g transform="translate(-161 -83)"><path d="M659.42 36.42c1.88-.59 3.59-1.19 5.56-.58.87.92 1.68 1.9 2.44 2.93-3.42 5.06-6.01 10.48-8.69 15.95-12.22 25.23-20.41 54.18-19.54 82.36 14.8-1.49 29.92-1.55 44.81-1.19 20.39.41 40.21 3.24 60.24 6.83 1.95.42 3.48 1.07 3.69 3.29.11 3.07-2.87 3.52-4.95 5-11.35 6.77-21.47 15.87-30.98 24.99-15.02 14.51-26.84 32.82-36.53 51.22 30.01 5.2 58.94 19.94 83.13 38.16 2 1.54 4.54 3.24 5.72 5.51-.49 4.16-4.62 4.34-7.75 5.73-19.34 6.6-36.87 16.49-54.05 27.41 12.87 7.93 25.13 16.95 36.31 27.14 1.62 1.69 3.56 3.07 3.01 5.72-.17 1.85-2.91 2.88-4.35 3.62-7.78 3.39-15.78 6.43-23.83 9.12-2.25.76-3.23-.07-4.44-1.88-10.35-16.7-24.88-31.41-39.8-44.08-12.12-10.19-25.26-19.49-39.34-26.76-2.63-1.31-5.02-2.57-8.04-2.55-5.66 0-11.38.22-17.04.52-31.98 2.5-63.58 10.35-92.98 23.17-15.63 6.95-31.29 15.52-44.41 26.58-2.06 1.61-4.08 4.07-6.59 4.91-5.84-.87-11.53-3.37-17.05-5.39-18.8-6.99-35.07-19.92-48.92-34.17-11.07-10.95-20.32-23.26-28.72-36.33-6.21-9.48-11.98-19.09-16.47-29.52-1.35-3.24-3.13-6.64-3.66-10.13.03-1.27 1.24-3.6 2.76-3.18 3.12 1 5.98 2.84 8.97 4.18 5.95 2.87 12.19 4.68 18.56 6.35 12.07 3.37 24.58 5.79 36.9 8.26-1.22-7.7-1.19-15.42-.84-23.18 1.36-21.95 7.11-43.14 15.36-63.45 6.36-15.81 14.59-30.82 24.27-44.83 10.5-15.13 22.52-29.48 36.6-41.4 2.59-1.92 5.45-4.42 8.73-2.24 2.16.95 1.11 3.69.98 5.48-3.73 17.06-.34 34.65 4.34 51.17 2.58 9.3 6.68 17.9 10.94 26.53 3.57-4.73 7.39-9.12 11.56-13.33 20.76-21 45.01-39.18 69.72-55.27 20.28-12.69 41.84-24.51 64.37-32.67Z" fill="#000"></path><path d="M658.74 42.89c-13.93 25.15-23.31 52.27-25.15 81.11-.23 5.43-.08 10.88-.11 16.31 1.06.84 2.06 2.5 3.49 2.48 6.34-.46 12.64-1.45 19.03-1.47 11.29.01 22.53-.29 33.8.65 16.34.46 32.31 2.84 48.39 5.6-14.22 9.19-27.15 20.55-38.6 32.99-11.62 13.42-21.35 28.79-29.59 44.49-.84 1.79-2.11 3.88-1 5.83 1.09 1.27 2.48 1.14 4 1.45 6.07.75 11.98 2.28 17.81 4.11 23.61 7.44 45.88 19.46 65.48 34.54-7.37 2.62-14.68 5.33-21.78 8.63-11.78 5.22-23.15 12-34.08 18.82-2.3 1.72-7.83 3.98-5.62 7.67 3.14 1.96 6.6 3.32 9.63 5.48 10.61 7.16 20.98 14.93 30.25 23.78-6.92 3.08-14.03 5.65-21.17 8.19-10.01-15.57-22.53-28.52-36.26-40.81-14.82-12.9-31-24.61-48.78-33.08-2.07-1.03-4.22-1.1-6.48-1.07-37.47.07-74.99 8.41-109.48 22.91-19.05 8.2-37.07 18.24-52.66 32.05-6.1-1.86-12.09-4.07-17.98-6.52-11.45-4.89-21.52-11.87-30.92-19.97-12.08-10.66-23.1-22.44-32.36-35.65-9.32-13.5-18.34-26.55-24.8-41.73 18.11 8.03 38.79 11.36 58.18 15.01 2.62.06 6.37 1.91 7.43-1.52-.16-2.73-.85-5.43-1.16-8.15-1.38-9.74-.01-20.28 1.14-30.04 5.2-33.79 18.61-66.43 38.2-94.43 10.21-14.56 21.56-28.03 35.14-39.59-1.4 8.92-1.38 18.06-.6 27.04 1.98 16.19 6.47 32.3 13.82 46.91 1.72 3.24 3.05 6.96 5.36 9.82 1.05 1.28 3.52 1.71 4.41.03 5.22-8.96 12.75-15.69 20.2-22.87 19.17-17.78 40.21-33.6 62.13-47.81 19.22-12.03 39.43-23.2 60.69-31.19Z" fill="rgba(175, 175, 175, 1)"></path></g></g></svg>`,
        className: "Spanish 10A",
        points: 0,
      },
    };
  },
};
</script>

<style>
.class-stats-wrapper {
  display: flex;
  flex-direction: column;
  margin: auto;
  margin-top: var(--t-space-36);
  margin-bottom: calc(var(--t-space-70) * 2);
  background-color: var(--t-white);
}
.class-stats-header-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.class-stats-header-student-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--t-space-12);
}
.class-stats-header-student-avatar {
  height: var(--student-avatar);
  width: var(--student-avatar);
  border-style: solid;
  border-color: var(--t-primary);
  background-color: var(--t-gray-125);
  border-radius: 50%;
}
.class-stats-content-wrapper {
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.class-stats-points-content-wrapper {
  border: var(--t-space-1) solid var(--t-gray-50);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.class-stats-points {
  color: var(--t-secondary);
}
/* Responsive variants */
@media (max-width: 599px) {
  .class-stats-wrapper {
    max-width: 100%;
    padding: var(--t-space-32);
    border-radius: var(--t-br-medium);
    gap: calc(var(--t-space-16) * 2);
  }
  .class-stats-header-details-wrapper {
    gap: var(--t-space-8);
  }
  .class-stats-header-student-wrapper {
    gap: var(--t-space-8);
  }
  .class-stats-header-student-avatar {
    --student-avatar: calc(var(--t-space-50) * 1.5);
    border-width: var(--t-space-2);
  }
  .class-stats-content-wrapper {
    gap: var(--t-space-30);
  }
  .class-stats-points-content-wrapper {
    border-radius: var(--t-br-small);
    padding: var(--t-space-16) var(--t-space-24);
    gap: var(--t-space-12);
  }
}
@media (min-width: 600px) {
  .class-stats-wrapper {
    max-width: 80%;
    padding: var(--t-space-48);
    border-radius: var(--t-br-medium);
    gap: calc(var(--t-space-16) * 2);
  }
  .class-stats-header-details-wrapper {
    gap: var(--t-space-8);
  }
  .class-stats-header-student-wrapper {
    gap: var(--t-space-10);
  }
  .class-stats-header-student-avatar {
    --student-avatar: calc(var(--t-space-50) * 1.65);
    border-width: var(--t-space-3);
  }
  .class-stats-content-wrapper {
    gap: var(--t-space-24);
  }
  .class-stats-points-content-wrapper {
    border-radius: var(--t-br-medium);
    gap: var(--t-space-16);
    padding: var(--t-space-16) var(--t-space-50);
  }
}
@media (min-width: 1200px) {
  .class-stats-wrapper {
    max-width: 90%;
    padding: var(--t-space-48);
    border-radius: var(--t-br-large);
    gap: calc(var(--t-space-12) * 2);
  }
  .class-stats-header-details-wrapper {
    gap: var(--t-space-16);
  }
  .class-stats-header-student-wrapper {
    gap: var(--t-space-12);
  }
  .class-stats-header-student-avatar {
    --student-avatar: calc(var(--t-space-50) * 1.75);
  }
  .class-stats-points-content-wrapper {
    padding: var(--t-space-24) calc(var(--t-space-70) * 1.5);
  }
}
</style>

<template>
  <div class="admin-users-home-wrapper">
    <h2 class="h2">Users</h2>

    <div class="admin-users-home-options-wrapper">
      <div class="admin-users-home-options-tabs-wrapper">
        <p class="p">Filter:</p>
        <template v-for="tabName in tabs" :key="tabName">
          <talkie-tab
            :label="tabName"
            :active="tabName.toLowerCase() === activeTab"
            :onClick="() => handleTabChange(tabName.toLowerCase())"
          />
        </template>
      </div>
      <talkie-input
        :placeholder="'Search name / school / keyword'"
        :customClass="'admin-users-home-options-custom-input'"
      />
    </div>

    <div
      :class="[
        'admin-users-home-content-wrapper',
        'admin-users-home-content-wrapper-single-col',
      ]"
    >
      <template v-if="usersList && usersList.length > 0">
        <talkie-student-card
          v-for="_user in usersList"
          :key="_user"
          :mode="'info'"
          :studentName="_user.name"
          :studentAvatar="_user.image"
        />
      </template>
    </div>
  </div>
</template>

<script>
import {
  TalkieIcon,
  TalkieTab,
  TalkieSelect,
  TalkieModal,
  TalkieLoader,
  TalkieSwitch,
  TalkieButtonDropDown,
  TalkieBackDropLoader,
  TalkieInput,
} from "@/components/UICore";
import {
  TalkieQuestionCard,
  TalkieStudentCard,
} from "@/components/SubModules/Cards";
import URLModifier from "@/utils/helpers/URLModifier";

export default {
  name: "AdminUsersHome",
  components: {
    TalkieIcon,
    TalkieTab,
    TalkieSelect,
    TalkieModal,
    TalkieButtonDropDown,
    TalkieLoader,
    TalkieSwitch,
    TalkieBackDropLoader,
    TalkieQuestionCard,
    TalkieStudentCard,
    TalkieInput,
  },
  data() {
    return {
      usersList: [
        {
          name: "Alice J",
          image: `<svg xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:cc="http://creativecommons.org/ns#" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 762 762" fill="none"><metadata><rdf:rdf><cc:work><dc:format>image/svg+xml</dc:format><dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage"></dc:type><dc:title>Adventurer</dc:title><dc:creator><cc:agent><dc:title>Lisa Wischofsky</dc:title></cc:agent></dc:creator><dc:source>https://www.instagram.com/lischis_adventures/</dc:source><cc:license rdf:resource="https://creativecommons.org/licenses/by/4.0/"></cc:license></cc:work><cc:license rdf:about="https://creativecommons.org/licenses/by/4.0/"><cc:permits rdf:resource="https://creativecommons.org/ns#Reproduction"></cc:permits><cc:permits rdf:resource="https://creativecommons.org/ns#Distribution"></cc:permits><cc:permits rdf:resource="https://creativecommons.org/ns#DerivativeWorks"></cc:permits><cc:requires rdf:resource="https://creativecommons.org/ns#Notice"></cc:requires><cc:requires rdf:resource="https://creativecommons.org/ns#Attribution"></cc:requires></cc:license></rdf:rdf></metadata><mask id="avatarsRadiusMask"><rect width="762" height="762" rx="0" ry="0" x="0" y="0" fill="#fff"></rect></mask><g mask="url(#avatarsRadiusMask)"><path d="M396.01 164.85c37.82 4.9 74.21 19.64 104.8 42.39 6.15 4.84 12.48 9.33 18.02 14.92 23.77 21.98 42.73 49.02 55.13 78.95 9.35 22.31 14.72 46.04 16.64 70.14 6.62.81 13.05 2.14 19.12 5 15.54 6.93 27.08 20.94 31.78 37.21 2.63 9.56 3.56 19.75 1.72 29.55-2.96 18.76-13.72 36.13-29.37 46.92-10.94 7.65-24.49 12.03-37.86 11.68-5.13-.05-10.04-1.6-15.13-1.79-1.85 2.17-3.23 4.84-4.76 7.25-18.66 29.62-44.57 54.51-74.64 72.4-28.1 16.73-59.9 27.16-92.46 30.32-11.08.7-21.87 2.05-32.98.74-51.69-2.3-102.07-23.44-140.15-58.43-29.03-26.55-50.84-60.83-62.54-98.39-7.09-22.85-10.62-46.78-10.07-70.71.52-40.34 12.53-80.58 33.94-114.76 19.1-30.81 45.91-56.58 77.2-74.83 29.63-17.28 63.35-27.68 97.59-29.87 14.66-1.47 29.44-.37 44.02 1.31Z" fill="#000"></path><path d="M363 169.06c48.47-1.39 97.32 14.7 135.81 44.12 6.55 4.06 11.72 9.49 17.36 14.64 24.33 22.63 43.2 50.95 54.93 82.02 7.43 19.61 11.86 40.2 13.56 61.09-8.89.74-17.34 2.34-25.38 6.38-2.19 1.03-1.89 4.95.68 5.23 2.35.23 4.98-1.51 7.24-2.2 14.62-5.37 31.32-4.35 44.78 3.68 11.69 6.78 20.09 18.16 23.89 31.06 2.6 8.25 2.68 17.41 1.76 25.95-2.5 17.35-12.35 33.73-26.73 43.81-15.71 11.33-37.17 14.64-54.93 6.2-3.17-1.43-5.94-3.58-9.08-5.05-2.95-1.09-4.88 2.79-2.7 4.75 3.17 2.76 7.34 4.52 11 6.56-20.14 34.15-49.45 62.7-84.41 81.47-30.2 16.31-64.44 25.53-98.78 26.15-27.63.72-55.33-4.04-81.21-13.72-30.32-11.24-57.84-29.43-80.37-52.6-22.67-23.37-39.92-51.88-50.2-82.77-14.96-44.64-14.91-94.01.27-138.59 11.05-33.06 30.28-63.21 55.37-87.39 29.67-28.73 67.65-48.54 108.13-56.67 12.8-2.52 25.94-4.24 39.01-4.12Z" fill="rgba(242, 211, 177, 1)"></path><path d="M605.03 404.4c2.63-.1 3.44 3.8 1.36 4.98-3.69 1.83-7.82 2.77-11.64 4.35-5.82 2.04-11.28 4.76-16.68 7.72 4.29 2.34 8.86 4.74 12.71 7.76 2.58 2.09 4.85 4.35 5.33 7.8-.26 3.59-2.73 6.55-5.45 8.69-5.86 4.66-13.92 7.18-20.79 10.26-1.75.62-4.43 1.99-5.59-.26-1.02-1.74-.06-3.11 1.57-3.87 6.65-3.3 14.86-5.62 20.79-10.16 1.37-1.14 3.39-2.74 3.61-4.62-4.07-5.63-12.42-8.59-18.23-12.09-2.34-1.72-2.29-4.24-.16-6.13 7.27-5.64 16.98-9.26 25.57-12.38 2.42-.83 5.03-1.95 7.6-2.05Z" fill="#000"></path><g transform="translate(-161 -83)"><path d="M617.23 468.82c1.16 1.34 2.37 2.36 2.84 4.14 4.46 17.23 1.58 36.09-7.98 51.11-8.01 12.77-20.52 22.56-34.83 27.28-11.68 3.74-24.33 4.31-36.24 1.27-17.06-4.16-32.11-15.59-40.77-30.86-7.18-12.23-9.85-26.73-8.06-40.75.53-3.41 1.75-7.26 5.57-8.09 8.61-1.53 17.56-1.34 26.27-2.27 24.31-1.49 48.65-2.37 73.01-2.08 6.75-.37 13.45.4 20.19.25Z" fill="#000"></path><path d="M607.09 474.28c2.48.12 4.97.24 7.45.37 3.8 14.15 1.78 29.85-5.17 42.73-6.79 12.81-18.41 23-32.1 27.84-14.68 5.57-31.38 4.73-45.56-1.92-13.38-6.21-24.24-17.42-29.82-31.09-4.19-10.23-5.98-22.11-3.62-32.99 1.86-.72 3.69-1.32 5.7-1.4 16.9-1.37 33.84-2.38 50.78-3.11-.41 5.34-.18 10.53 2.09 15.47 3.42 7.65 10.45 13.28 18.62 15.04 4.89.87 9.94.6 14.61-1.13 8.19-2.81 14.36-9.94 16.48-18.26.92-3.9.66-7.59.54-11.55Z" fill="#fff"></path><path d="M432.03 480.67c2.01-.23 3.79.3 5.74.68 4.2 9.05 4.82 19.93 3.38 29.69-2.48 14.77-11.15 28.19-23.63 36.48-10.93 7.31-24.46 10.57-37.51 8.79-15.32-1.77-29.51-10.46-38.25-23.14-6.82-9.71-10.02-21.43-10.01-33.24 6.53-3.27 13.18-3.72 20.49-5.47 20.5-4.17 41.07-8.1 61.75-11.22 6-.99 11.97-2.04 18.04-2.57Z" fill="#000"></path><path d="M433.71 486.06c1.44 5.27 2.74 10.43 2.6 15.94-.2 9.49-3.01 19.08-8.31 26.99-9.89 15.07-28.07 23.78-46.01 21.88-12.38-1.34-24.01-7.28-32.17-16.71-7.5-8.47-11.57-19.33-12.24-30.58 14.45-3.54 29.14-6.22 43.76-9.01 1.32 6.49 4.55 12.28 10.11 16.03 9.04 6.32 21.92 5.38 29.9-2.26 6.12-5.72 8.04-13.57 7.2-21.73 1.72-.19 3.44-.38 5.16-.55Z" fill="#fff"></path></g><g transform="translate(-161 -83)"><g fill="#000"><path d="M613.54 401.51c1.59 1.01 1.08 2.86 1.24 4.48-.06 11.34-.05 22.7-.12 34.04.32 2.75-2.42 4.22-4.62 5-39.99 13.74-80.12 27.25-120.05 41.12-2.53.2-2.84-1.75-3.51-3.66-1.63-6-3.3-11.98-5.01-17.95.97 5.75.98 11.66 1.36 17.47-.02 1.44.45 3.94-.99 4.85-1.95 1.4-4.07.13-4.6-2.03-3.64-12.73-7.02-25.58-10.66-38.32-.39-1.83-.65-3.91 1.36-4.88 2.11-.49 3.41.47 4 2.44 1.27 4.55 2.55 9.11 3.68 13.7-.73-5.24-.94-10.49-1.18-15.77-.01-1.27-.14-3.73 1.66-3.79 1.47-.26 2.98-.38 4.43-.72 41.23-11.74 82.37-23.44 123.6-35.22 3.27-.87 6.02-2.08 9.41-.76ZM324 433.87c13.64 1.39 27.36 1.44 41 2.58 21.04 1.05 42.11 2.67 63.14 3.42 7.79.78 15.61 1.12 23.44 1.68 2.77 2.19 1.08 8.08 1.91 11.33.56-2.97.18-6.91 1.92-9.46 2.15-1.8 5.08-.17 4.76 2.56-2.36 14.03-4.77 28.14-7.02 42.18-.8 2.93-4.48 2.56-5.29-.15-.27-4.92-.21-9.89-.28-14.83-1.03 4.29-1.47 8.69-2.47 12.98-.43 1.64-1.17 2.84-3.1 2.4-39.48-6.89-79.4-14.23-118.87-21.29-1.88-.2-2.83-1.46-3.09-3.26-1.45-7.98-2.5-16.04-4.12-23.99-.23-1.72-.74-3.14.56-4.58 2.12-2.29 4.72-1.68 7.51-1.57Z"></path></g></g><g transform="translate(-161 -83)"><path d="M462.23 552.76c5.89 1.34 11.98 4.52 15.69 9.38 1.25 2.25.03 5.01-2.77 4.63-2.26-1.24-3.96-3.38-6.13-4.8-4.31-2.87-9.86-4.48-15.03-3.68-2.57.46-5.36 1.6-6.83 3.87-1.53 2.09-1.29 4.76-.4 7.05 1.72 4.44 6 7.87 10.25 9.73 2.3 1.06 5.25 1.28 7.29 2.75 1.69 1.8.58 4.36-1.73 4.78-4.61 1.03-8.66 2.66-11.62 6.51-5.51 6.68-4.73 16.7 1.35 22.74 6.13 6.67 17.21 7.51 24.26 1.85 2.43-1.87 3.59-4.35 5.54-6.58 2.97-1.44 5.07 1.04 3.97 3.91-4.62 9.77-16.97 14.49-27.13 11.4-8.93-2.41-15.86-10.12-17.26-19.27-1.55-9.44 3.19-18.64 11.31-23.48-5.73-2.95-10.81-7.86-12.37-14.28-1.54-5.3.79-11.27 5.45-14.2 4.69-3.25 10.76-3.16 16.16-2.31Z" fill="#000"></path></g><g transform="translate(-161 -83)"><path d="M489.12 525.88c6.31 4.76 7.63 14.96 13.93 20.08 6.42 4.85 14.59 7.27 22.22 3.55 1.06 1.29 2.3 2.29 1.36 4.1-4.04 6.97-11.2 10.37-18.68 12.5-9.75 2.39-20.52 2.45-29.5-2.57-6.24-3.58-9.82-9.17-14.36-14.52-5.21 7.59-12.23 14.38-20.37 18.75-5.83 3.02-13.36 5.01-19.86 3.3-6.23-1.8-11.9-6.12-12.18-13.11-.15-2.33 1.23-2.67 3.13-3.08 1.34 1.31 2.27 2.69 4.21 3.08 3.48.68 6.9-1.27 9.13-3.82 5.38-6.43 4.41-17.03 10.37-22.64 6.15-5.89 16.87-8.12 24.48-3.93 7.71-5.3 17.94-6.94 26.12-1.69Z" fill="#000"></path></g><g transform="translate(-161 -83)"><path d="M453.2 221.61c2.21-.27 4.98-1.02 6.98.24 1.24 1.36 1.45 3.15.26 4.63-1.79 2.14-4.27 3.78-6.41 5.56-3.41 2.7-6.44 5.78-9.34 9.02 42.11-10.14 86.31-12.16 129.32-7.8 29.11 3.23 59.17 9.68 85.96 21.78 14.5 6.6 29.04 15.29 39.91 27.1 8.19 8.82 13.87 19.65 14.68 31.81 4.11.73 8.02 1.54 11.52 3.93 7.77 5.07 13.16 13.9 16.87 22.21 6.17 13.97 9.48 29.58 11.32 44.68 1.44 14.22 2.28 28.42 1.41 42.71-.77 9.55-1.26 19.04-2.9 28.5-.31 1.34-.38 2.48-1.9 2.96-6.68.79-14.42.76-20.72 3.28-8.91 3.44-17.56 7.19-25.67 12.28-1.32.69-2.96 1.95-4.49 1.71-2.19-.24-3.37-2.51-2.32-4.48 2.53-5.43 5.76-10.57 8.68-15.8-6.02 2.64-12.06 5.11-17.67 8.58-1.73-1.26-3.39-2.16-3.59-4.51-.8-10.39-.59-21.07-1.62-31.42-1.37-1.32-3.04-2.36-4.6-3.44-6.33-4.24-12.39-8.86-18.09-13.93-1.62-1.44-3.07-3.01-4.02-4.98-10.46-23.77-17.68-48.87-19.99-74.79-7.84-.12-15.53-.68-23.31-1.64 1.97 1.75 4.83 3.53 5.6 6.16-.59 2.42-2.44 3.03-4.5 3.91-16.3 6.38-34.16 8.45-51.57 8.32-28.17-.34-56.38-6.53-82.39-17.28 3.54 3.97 7.07 7.88 11.18 11.29 1.55 1.39 3.59 2.88 4.44 4.81-.4 2.74-2.48 4.16-5.19 3.87-17.56-1.57-34.69-4.94-51.98-8.28-.03 5.89 1.26 11.62 1.58 17.47-.53 2.09-3.1 2.4-4.66 1.39-1.51-.97-2.78-2.13-4.07-3.36-8.85-8.62-17.57-16.99-25.34-26.64-1.33-1.43-2.64-3.63-4.73-3.82-7.55-1.08-15.23-2.38-22.85-2.53-4.05-.32-8.11 2.52-11.73 4.14-3.99 2.2-8.7 3.84-12.19 6.76-3.79 4.64-6.91 9.88-10.25 14.84-.45.79-1.04 1.28-1.77 1.49-8.33-1.12-16.34-5.15-22.4-10.97-9.12-8.72-13.66-19.69-17.66-31.41-.54-2.03-1.27-4.85.9-6.18 1.83-1.13 4.53.36 6.3 1.04 6.38 3.09 12.35 6.6 19.33 8.27-2.34-6.14-3.46-12.38-1.98-18.89 2.68-16.01 11.76-30.26 24.41-40.28 3.04-2.34 6.36-5.05 10.04-6.27 2.8-.94 5.11 1.61 4.52 4.34-1.28 5.31-3.56 10.35-5 15.63 12.4-11.21 24.93-21.55 39.94-29.18 16.29-8.48 33.75-13.53 51.75-16.83Z" fill="#000"></path><path d="M450.12 228.04c-5.19 4.72-9.97 9.43-13.78 15.38-.84 1.16-1.07 2.4-.7 3.73 1.82 1.82 3.7 1.07 5.9.67 40.59-10.55 83.76-13.02 125.46-9.5 29.47 2.8 59.86 8.8 87.18 20.45 13.59 5.88 27.45 13.55 38.15 23.91 7.48 7.21 13.64 15.93 15.7 26.28.69 2.94.11 6.71 1.67 9.32 1.38 2.44 3.94 1.6 6.35 2.06 5.02.19 9.74 4.04 12.91 7.67 6.53 7.69 10.68 17.91 13.56 27.48 3.87 13.13 5.96 26.89 7.01 40.51 1.03 19.32.63 38.69-2.14 57.86-6.56.8-12.89.91-19.19 3.2-7.35 1.85-14.27 5.92-21.2 9.18 2.07-3.71 4.38-7.45 5.96-11.39.67-1.68.76-3.07.12-4.77-2.01-1.54-4.06-1.01-6.22-.2-5.46 2.18-10.8 4.68-16.04 7.32-.85-10.21-.82-20.99-1.73-31.14-2.41-2.88-6.24-4.63-9.23-6.9-5.8-4.16-12.24-8.34-17.08-13.59a291.93 291.93 0 0 1-15-42.52c-2.78-11.4-5.34-23.23-5.7-34.98-.92-1.52-3.34-2.06-4.99-2.14-8.91-.26-18.33-.36-27.06-2.22-2.29-.55-4.42-.8-6.06-2.66-3.42-3.13-6.26-7.32-10.13-9.86-3.03-.65-4.48 2.19-2.62 4.5 6.25 6.77 12.88 13.28 19.87 19.27-15.08 5.76-32.04 7.59-48.09 7.61-30.09-.71-60.12-7.57-87.45-20.24-2.3-1.02-3.76-1.09-5.88.4-1.33 2.51.15 4.05 1.6 5.97 4.64 5.53 9.78 10.68 14.87 15.79-15.12-1.45-30.18-4.47-45.13-7.15-2.79-.56-5.77-.2-6.82 2.83-1.02 4.14-.1 9.02.48 13.21-7.48-7.47-15.14-15.06-21.84-23.23-5.32-6.4-10.39-12.98-15.47-19.56-.91-1.12-2.52-2.88-4.12-2.26-2.13.55-2.2 2.92-1.22 4.55 1.98 3.1 4.46 5.9 6.62 8.88-6-1.22-12.07-1.31-18.12-2.13-2.31-.23-4.35-.76-6.51.38-7.37 3.44-14.7 7.11-21.78 11.11-4.25 4.28-7.22 10.11-10.72 15.05-6.07-1.3-11.71-4.17-16.25-8.42-8.32-7.58-12.19-17.05-16.16-27.3 6.67 3.15 14.39 7.66 21.89 7.81 2.18-.02 5.06.24 6.31-1.98 1.18-1.78-.38-2.92-1.28-4.33-3.47-4.3-3.4-10.18-2.97-15.39 2.34-17.31 12.85-31.59 26.82-41.58-2.03 6.47-4.54 13.3-4.96 20.11-.26 3.05 3.27 4.11 5.21 2.08 12.54-12.42 26.66-24.43 42.32-32.72 14.98-8.07 31.05-13.04 47.68-16.41Z" fill="rgba(172, 101, 17, 1)"></path><path d="M712.34 472.27c2.12-1.15 4.61 1.35 3.65 3.55-1.63 1.76-4.04 2.94-6.12 4.12-6.07 3.25-11.97 6.8-17.87 10.35-.9-.36-1.8-.73-2.7-1.09.23-1.3-.04-2.88 1.1-3.78 3.09-2.65 6.94-4.47 10.4-6.6 3.86-2.15 7.59-4.59 11.54-6.55Z" fill="#000"></path></g></g></svg>`,
        },
      ],
      activeTab: "free",
      tabs: ["Free", "Paid"],
    };
  },
  async created() {
    // sidebar data
    const sidebarItems = [
      {
        name: "Users",
        hasRightIcon: true,
        link: `/admin/users`,
        onClick: () => this.$router.push(`/admin/users`),
        isActive: this.$route.path === `/admin/users`,
      },
    ];
    this.handleSidebarMutation({
      items: sidebarItems,
    });
  },
  methods: {
    handleTabChange(x) {
      this.activeTab = x.toLowerCase();
      URLModifier.addToURL("tab", x.toLowerCase());
    },
    handleStoreMutation(key, value) {
      this.$store.state[key] = value;
    },
    handleSidebarMutation(data) {
      const sidebar = this.$store.state.sidebar;
      const updatedData = {
        hasBackLink: data.hasOwnProperty("hasBackLink")
          ? data.hasBackLink
          : sidebar.hasBackLink,
        items: data.hasOwnProperty("items") ? data.items : sidebar.items,
        checkboxes: data.hasOwnProperty("checkboxes")
          ? data.checkboxes
          : sidebar.checkboxes,
        buttons: data.hasOwnProperty("buttons")
          ? data.buttons
          : sidebar.buttons,
      };

      this.handleStoreMutation(
        "sidebar",
        Object.assign({}, { ...updatedData })
      );
    },
  },
};
</script>

<style>
.admin-users-home-options-custom-input {
  border-color: var(--t-gray-75) !important;
}
</style>

<style scoped>
.admin-users-home-wrapper {
  display: flex;
  flex-direction: column;
  margin: auto;
  width: 100%;
  padding: var(--t-space-24);
}
.admin-users-home-header-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
}
.admin-users-home-header-details-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.admin-users-home-header-details-icons-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.admin-users-home-options-tabs-wrapper {
  display: flex;
  align-items: center;
  overflow-x: scroll;
}
.admin-users-home-options-tabs-wrapper::-webkit-scrollbar {
  display: none !important;
}
.admin-users-home-options-tabs-wrapper::-webkit-scrollbar-track {
  display: none !important;
}
.admin-users-home-options-tabs-wrapper:-webkit-scrollbar {
  display: none !important;
}
.admin-users-home-options-tabs-wrapper::-webkit-scrollbar-thumb {
  display: none !important;
}
.admin-users-home-options-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.admin-users-home-content-wrapper {
  display: grid;
}
.admin-users-home-content-error-image {
  height: var(--image-size);
  width: var(--image-size);
  margin: auto;
}
.admin-users-home-content-error-info {
  margin: auto;
  max-width: 80%;
  text-align: center;
  line-height: 1.5;
}
.admin-users-home-loading-wrapper {
  margin: auto;
}

/* Responsive variants */
@media (max-width: 599px) {
  .admin-users-home-wrapper {
    gap: var(--t-space-18);
  }
  .admin-users-home-header-wrapper {
    gap: var(--t-space-12);
  }
  .admin-users-home-header-details-wrapper {
    gap: var(--t-space-12);
  }
  .admin-users-home-header-details-icons-wrapper {
    gap: var(--t-space-5);
  }
  .admin-users-home-options-tabs-wrapper {
    gap: var(--t-space-12);
  }
  .admin-users-home-options-wrapper {
    gap: var(--t-space-12);
  }
  .admin-users-home-options-custom-talkie-select {
    min-width: calc(var(--t-space-70) * 2.25) !important;
  }
  .admin-users-home-content-wrapper {
    gap: var(--t-space-16);
  }
  .admin-users-home-content-wrapper-single-col {
    grid-template-columns: 1fr;
  }
  .admin-users-home-content-wrapper-multi-col {
    grid-template-columns: 1fr;
  }
  .admin-users-home-content-error-image {
    --image-size: calc(var(--t-space-70) * 1.2);
  }
}
@media (min-width: 600px) {
  .admin-users-home-wrapper {
    gap: var(--t-space-24);
  }
  .admin-users-home-header-wrapper {
    gap: var(--t-space-16);
  }
  .admin-users-home-header-details-wrapper {
    gap: var(--t-space-16);
  }
  .admin-users-home-header-details-icons-wrapper {
    gap: var(--t-space-8);
  }
  .admin-users-home-options-tabs-wrapper {
    gap: var(--t-space-16);
  }
  .admin-users-home-options-wrapper {
    gap: var(--t-space-16);
  }
  .admin-users-home-options-custom-talkie-select {
    min-width: calc(var(--t-space-70) * 3) !important;
  }
  .admin-users-home-content-wrapper {
    gap: var(--t-space-16);
  }
  .admin-users-home-content-wrapper-single-col {
    grid-template-columns: 1fr;
  }
  .admin-users-home-content-wrapper-multi-col {
    grid-template-columns: 1fr;
  }
  .admin-users-home-content-error-image {
    --image-size: calc(var(--t-space-70) * 1.7);
  }
}
@media (min-width: 900px) {
  .admin-users-home-wrapper {
    gap: var(--t-space-36);
  }
  .admin-users-home-options-custom-talkie-select {
    min-width: calc(var(--t-space-70) * 5) !important;
  }
  .admin-users-home-content-wrapper-multi-col {
    grid-template-columns: 1fr 1fr;
  }
  .admin-users-home-content-error-image {
    --image-size: calc(var(--t-space-70) * 2);
  }
}
</style>

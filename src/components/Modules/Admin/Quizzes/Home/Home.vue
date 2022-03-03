<template>
  <div class="class-quizzes-home-wrapper">
    <!-- Contents -->
    <template v-if="!loading">
      <div class="class-quizzes-home-header-wrapper">
        <h2 class="h2">Quizzes</h2>
      </div>

      <!-- Questions tab -->
      <div class="class-quizzes-home-options-wrapper">
        <talkie-button-drop-down
          :size="'small'"
          :variant="'primary'"
          :dropDownItems="newTaskOptions"
        >
          + New Task
        </talkie-button-drop-down>
      </div>

      <div
        :class="[
          'class-quizzes-home-content-wrapper',
          'class-quizzes-home-content-wrapper-multi-col',
        ]"
      >
        <talkie-modal
          :type="'confirm'"
          :contentPadded="true"
          :closeButton="true"
          :centered="true"
          :title="'Are You Sure'"
          :description="'Your students responses and your feedbacks will also be deleted.'"
          :onClose="handleTopicDeleteDialogClose"
          :onConfirm="handleTaskDeletion"
          v-if="taskToDelete"
        />
        <template v-if="classTasks && classTasks.length > 0">
          <template v-for="_question in classTasks" :key="_question">
            <talkie-question-card
              v-if="
                currentTopicFilter
                  ? _question.topic === currentTopicFilter
                  : true
              "
              :title="_question.title"
              :topic="_question.topic"
              :description="_question.description"
              :manageModeOptions="{
                canEdit: false,
                canDelete: true,
              }"
              :centered="false"
              :hoverAnimation="true"
              :audioSource="
                _question.type === TaskTypes.QUESTION_ANSWER &&
                _question.audioSource
              "
              :image="
                _question.type === TaskTypes.CAPTION_THIS && _question.image
              "
              :expandContent="
                _question.type === TaskTypes.TRANSLATION
                  ? { translation: _question.translation }
                  : _question.type === TaskTypes.EMOJI_STORY
                  ? { emojis: _question.emojiStory }
                  : {}
              "
              :onCardBodyClick="
                () =>
                  _question.type === TaskTypes.QUESTION_ANSWER
                    ? handleTopicCardBodyClick(_question.id)
                    : {}
              "
              :onEditClick="() => handleTopicCardEditClick(_question.id)"
              :onDeleteClick="() => handleTopicCardDeleteClick(_question.id)"
            />
          </template>
        </template>
      </div>
    </template>

    <!-- Load wrapper -->
    <template v-if="loading">
      <div class="class-quizzes-home-loading-wrapper">
        <talkie-loader :size="'large'" />
      </div>
    </template>

    <!-- Backdrop load wrapper -->
    <talkie-back-drop-loader v-if="backdropLoading" />
  </div>
</template>

<script>
import {
  TalkieModal,
  TalkieLoader,
  TalkieButtonDropDown,
  TalkieBackDropLoader,
} from "@/components/UICore";
import { TalkieQuestionCard } from "@/components/SubModules/Cards";
import { TaskService } from "@/api/services";
import TaskTypes from "@/utils/constants/taskTypes";
import { notifications } from "@/components/UIActions";
import handleSidebarItemsMutation from "../../_common/mixins/handleSidebarItemsMutation";

export default {
  name: "AdminQuizzesHome",
  mixins: [handleSidebarItemsMutation],
  components: {
    TalkieModal,
    TalkieButtonDropDown,
    TalkieLoader,
    TalkieBackDropLoader,
    TalkieQuestionCard,
  },
  data() {
    return {
      taskToDelete: null,
      newTaskOptions: [
        {
          name: "Photo",
          onClick: () =>
            this.handleRedirection(
              `/admin/quizzes/create?type=${TaskTypes.CAPTION_THIS}`,
              100
            ),
        },
        {
          name: "Emoji Story",
          onClick: () =>
            this.handleRedirection(
              `/admin/quizzes/create?type=${TaskTypes.EMOJI_STORY}`,
              100
            ),
        },
        {
          name: "Translation",
          onClick: () =>
            this.handleRedirection(
              `/admin/quizzes/create?type=${TaskTypes.TRANSLATION}`,
              100
            ),
        },
      ],
      classTasks: [],
      loading: false,
      backdropLoading: false,
      TaskTypes: TaskTypes,
    };
  },
  async created() {
    // update page state
    this.loading = true;

    // class tasks
    const classTasks = await this.getTasksFromAllClasses();
    if (!classTasks) return this.$router.push("/404");

    this.classTasks = classTasks.results
      ?.filter((x) => x.type !== TaskTypes.QUESTION_ANSWER)
      .map((x) => ({
        id: x.id,
        type: x.type,
        title: x.title,
        topic: x.topic.name,
        description: x.questionText,
        isForPractice: x?.isPracticeMode,
        ...(x.type === TaskTypes.CAPTION_THIS && {
          image: x.captionThisImage,
        }),
        ...(x.type === TaskTypes.TRANSLATION && {
          translation: {
            textToTranslate: x?.textToTranslate,
            translatedText: x?.answer,
          },
        }),
        ...(x.type === TaskTypes.EMOJI_STORY && {
          emojiStory: x?.emojiStory,
        }),
      }));

    this.loading = false;
  },
  methods: {
    handleRedirection(link, timeout = 100) {
      const self = this;
      setTimeout(function () {
        self.$router.push(link);
      }, timeout);
    },
    handleTopicCardDeleteClick(id) {
      this.taskToDelete = id;
    },
    async handleTaskDeletion() {
      const taskId = this.taskToDelete;
      this.taskToDelete = null;
      this.backdropLoading = true;

      // api call
      const response = await TaskService.Delete(taskId).catch(() => null);

      // failure case
      if (!response) {
        this.backdropLoading = false;
        notifications.show("Failed To Delete Task..!", {
          variant: "error",
          displayIcon: true,
        });
        return;
      }

      // success case
      this.backdropLoading = false;
      notifications.show("Task Deleted Successfully..!", {
        variant: "success",
        displayIcon: true,
      });
      this.classTasks = this.classTasks?.filter((x) => x?.id !== taskId);
    },
    handleTopicDeleteDialogClose() {
      this.taskToDelete = null;
    },
    async getTasksFromAllClasses() {
      const query = {
        isPracticeMode: true,
        limit: 1000,
      };

      const response = await TaskService.GetTasksFromAllClasses(query).catch(
        () => null
      );

      return response.data || null;
    },
  },
};
</script>

<style scoped>
.class-quizzes-home-wrapper {
  display: flex;
  flex-direction: column;
  margin: auto;
  width: 100%;
  padding: var(--t-space-24);
}
.class-quizzes-home-header-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
}
.class-quizzes-home-header-details-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.class-quizzes-home-header-details-icons-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.class-quizzes-home-header-tabs-wrapper {
  display: flex;
  align-items: center;
  overflow-x: scroll;
}
.class-quizzes-home-header-tabs-wrapper::-webkit-scrollbar {
  display: none !important;
}
.class-quizzes-home-header-tabs-wrapper::-webkit-scrollbar-track {
  display: none !important;
}
.class-quizzes-home-header-tabs-wrapper:-webkit-scrollbar {
  display: none !important;
}
.class-quizzes-home-header-tabs-wrapper::-webkit-scrollbar-thumb {
  display: none !important;
}
.class-quizzes-home-options-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.class-quizzes-home-content-wrapper {
  display: grid;
}
.class-quizzes-home-content-error-image {
  height: var(--image-size);
  width: var(--image-size);
  margin: auto;
}
.class-quizzes-home-content-error-info {
  margin: auto;
  max-width: 80%;
  text-align: center;
  line-height: 1.5;
}
.class-quizzes-home-loading-wrapper {
  margin: auto;
}

/* Responsive variants */
@media (max-width: 599px) {
  .class-quizzes-home-wrapper {
    gap: var(--t-space-18);
  }
  .class-quizzes-home-header-wrapper {
    gap: var(--t-space-12);
  }
  .class-quizzes-home-header-details-wrapper {
    gap: var(--t-space-12);
  }
  .class-quizzes-home-header-details-icons-wrapper {
    gap: var(--t-space-5);
  }
  .class-quizzes-home-header-tabs-wrapper {
    gap: var(--t-space-12);
  }
  .class-quizzes-home-options-wrapper {
    gap: var(--t-space-12);
  }
  .class-quizzes-home-options-custom-talkie-select {
    min-width: calc(var(--t-space-70) * 2.25) !important;
  }
  .class-quizzes-home-content-wrapper {
    gap: var(--t-space-16);
  }
  .class-quizzes-home-content-wrapper-single-col {
    grid-template-columns: 1fr;
  }
  .class-quizzes-home-content-wrapper-multi-col {
    grid-template-columns: 1fr;
  }
  .class-quizzes-home-content-error-image {
    --image-size: calc(var(--t-space-70) * 1.2);
  }
}
@media (min-width: 600px) {
  .class-quizzes-home-wrapper {
    gap: var(--t-space-24);
  }
  .class-quizzes-home-header-wrapper {
    gap: var(--t-space-16);
  }
  .class-quizzes-home-header-details-wrapper {
    gap: var(--t-space-16);
  }
  .class-quizzes-home-header-details-icons-wrapper {
    gap: var(--t-space-8);
  }
  .class-quizzes-home-header-tabs-wrapper {
    gap: var(--t-space-16);
  }
  .class-quizzes-home-options-wrapper {
    gap: var(--t-space-16);
  }
  .class-quizzes-home-options-custom-talkie-select {
    min-width: calc(var(--t-space-70) * 3) !important;
  }
  .class-quizzes-home-content-wrapper {
    gap: var(--t-space-16);
  }
  .class-quizzes-home-content-wrapper-single-col {
    grid-template-columns: 1fr;
  }
  .class-quizzes-home-content-wrapper-multi-col {
    grid-template-columns: 1fr;
  }
  .class-quizzes-home-content-error-image {
    --image-size: calc(var(--t-space-70) * 1.7);
  }
}
@media (min-width: 900px) {
  .class-quizzes-home-wrapper {
    gap: var(--t-space-36);
  }
  .class-quizzes-home-options-custom-talkie-select {
    min-width: calc(var(--t-space-70) * 5) !important;
  }
  .class-quizzes-home-content-wrapper-multi-col {
    grid-template-columns: 1fr 1fr;
  }
  .class-quizzes-home-content-error-image {
    --image-size: calc(var(--t-space-70) * 2);
  }
}
</style>

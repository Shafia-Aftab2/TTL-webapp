<template>
  <div class="select-language-container">
    <!-- Header with Logo -->
    <header class="header">
      <!-- <img src="@/assets/logo.png" alt="Logo" class="logo" /> -->
    </header>

    <!-- Main Content -->
    <div class="content">
      <h1 class="heading">Select Language</h1>
      <p class="subheading">Choose what you want to learn now!</p>

      <!-- Dropdown for Language Selection -->
      <div class="dropdown-wrapper">
        <!-- <label for="language-select" class="dropdown-label">Language</label> -->
        <select
          id="language-select"
          v-model="selectedLanguage"
          @change="onLanguageSelect"
          class="dropdown-select"
        >
          <option disabled value="">Select a language</option>
          <option value="spanish">Spanish</option>
          <option value="french">French</option>
        </select>
      </div>

      <!-- Submit Button -->
      <button
        class="proceed-button"
        :disabled="!selectedLanguage"
        @click="proceed"
      >
        Proceed
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "SelectLanguage",
  data() {
    return {
      selectedLanguage: "", // Store selected language
    };
  },
  methods: {
    onLanguageSelect() {
      // Handle language selection if needed
      console.log(`Selected language: ${this.selectedLanguage}`);
    },
    proceed() {
      // Proceed to the next step (e.g., navigate to the next page)
      if (this.selectedLanguage) {
        this.$router.push({
          name: "NextPage", // Replace 'NextPage' with your next component route name
          params: { language: this.selectedLanguage },
        });
      }
    },
  },
};
</script>

<style scoped>
.select-language-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;
  padding: 20px;
}

.header {
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: 30px;
}

.logo {
  height: 80px;
  width: auto;
}

.content {
  text-align: center;
}

.heading {
  font-size: 2rem;
  margin-bottom: 10px;
}

.subheading {
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 30px;
}

.dropdown-wrapper {
  margin-bottom: 20px;
}

.dropdown-label {
  display: block;
  font-size: 1rem;
  margin-bottom: 8px;
}

.dropdown-select {
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

/* Proceed button styles */
.proceed-button {
  background-color: yellow; /* Yellow background */
  color: black;
  font-size: 1rem;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.proceed-button:disabled {
  background-color: #ddd; /* Grey background when disabled */
  cursor: not-allowed;
}

.proceed-button:not(:disabled):hover {
  background-color: #fdd835; /* Darker yellow on hover */
}
</style>

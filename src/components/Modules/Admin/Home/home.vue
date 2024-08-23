<template>
  <div class="home-page">
    <!-- Header -->
    <div class="summary-header">
      <h1>Summary</h1>
    </div>

    <!-- Stats Grid -->
    <div class="stats-grid">
      <div class="stat-item" v-if="!loading">
        <h2>{{ stats.freeTeachers }}</h2>
        <p>Teachers - Free</p>
      </div>
      <div class="stat-item" v-if="!loading">
        <h2>{{ stats.paidTeachers }}</h2>
        <p>Teachers - Paid</p>
      </div>
      <div class="stat-item" v-if="!loading">
        <h2>{{ stats.students }}</h2>
        <p>No. of Students</p>
      </div>
      <div class="stat-item" v-if="!loading">
        <h2>{{ stats.quizzes }}</h2>
        <p>Quizzes Attended</p>
      </div>
      <div v-if="loading" class="loading">
        <p>Loading...</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "AdminHomePage",
  data() {
    return {
      loading: true,
      stats: {
        freeTeachers: 0,
        paidTeachers: 0,
        students: 0,
        quizzes: 0,
      },
    };
  },
  async created() {
    await this.fetchStats();
  },
  methods: {
    async fetchStats() {
      try {
        this.loading = true;
        // Replace with your actual API call
        const response = await fetch("/api/getStats");
        const data = await response.json();

        // Assume data has the structure: { freeTeachers, paidTeachers, students, quizzes }
        this.stats.freeTeachers = data.freeTeachers || 0;
        this.stats.paidTeachers = data.paidTeachers || 0;
        this.stats.students = data.students || 0;
        this.stats.quizzes = data.quizzes || 0;

        this.loading = false;
      } catch (error) {
        console.error("Error fetching stats:", error);
        this.loading = false;
      }
    },
  },
};
</script>
<style scoped>
.home-page {
  padding: 20px;
}

.summary-header h1 {
  font-size: 24px;
  margin-bottom: 20px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.stat-item {
  background-color: #f5f5f5;
  padding: 20px;
  text-align: center;
  border-radius: 8px;
}

.stat-item h2 {
  font-size: 36px;
  margin: 0;
}

.stat-item p {
  font-size: 18px;
  margin: 10px 0 0;
}

.loading {
  grid-column: span 2;
  text-align: center;
}
</style>

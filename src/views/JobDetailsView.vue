<script setup>
import { RouterLink, useRoute,useRouter } from 'vue-router';
import { reactive, onMounted } from 'vue';
import axios from 'axios';

const route = useRoute();
const router = useRouter();
const jobId = route.params.id;

const state = reactive({
  job: null,
  isLoading: true,
});

onMounted(async () => {
  try {
    const response = await axios.get(`http://localhost:7000/jobs/${jobId}`);
    state.job = response.data;
    console.log(state.job);
  } catch (error) {
    console.log("Error fetching job");
  } finally {
    state.isLoading = false;
  }
});



const deleteJob = async () => {
  try {
    const confirm = window.confirm('Are you sure you want to delete this job?');
    if (confirm) {
      await axios.delete(`http://localhost:7000/jobs/${jobId}`);
      router.push('/jobs');
    }
  } catch (error) {
    console.error('Error deleting job', error);
  }
};

</script>

<template>
  <div class="container m-auto py-6 px-6">
      <RouterLink
        to="/jobs"
        class="text-green-500 hover:text-green-600 flex items-center"
      >
        <i class="pi pi-arrow-circle-left mr-3"></i> Go Back 
      </RouterLink>
    </div>
  <section v-if="!state.isLoading" class="bg-green-50">
    <div class="container m-auto py-10 px-6">
      <div class="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
        <main v-if="state.job">
          <div class="bg-white p-6 rounded-lg shadow-md text-center md:text-left">
            <div class="text-gray-500 mb-4">{{ state.job.type }}</div>
            <h1 class="text-3xl font-bold mb-4">{{ state.job.title }}</h1>
            <div class="text-gray-500 mb-4 flex align-middle justify-center md:justify-start">
              <i class="fa-solid fa-location-dot text-lg text-orange-700 mr-2"></i>
              <p class="text-orange-700">{{ state.job.location }}</p>
            </div>
          </div>

          <div class="bg-white p-6 rounded-lg shadow-md mt-6">
            <h3 class="text-green-800 text-lg font-bold mb-6">Job Description</h3>
            <p class="mb-4">{{ state.job.description }}</p>

            <h3 class="text-green-800 text-lg font-bold mb-2">Salary</h3>
            <p class="mb-4">{{ state.job.salary }}</p>
          </div>
        </main>

        <!-- Sidebar -->
        <aside v-if="state.job.company">
          <!-- Company Info -->
          <div class="bg-white p-6 rounded-lg shadow-md">
            <h3 class="text-xl font-bold mb-6">Company Info</h3>

            <h2 class="text-2xl">{{ state.job.company.name }}</h2>

            <p class="my-2">{{ state.job.company.description }}</p>

            <hr class="my-4" />

            <h3 class="text-xl">Contact Email:</h3>
            <p class="my-2 bg-green-100 p-2 font-bold">{{ state.job.company.contactEmail }}</p>

            <h3 class="text-xl">Contact Phone:</h3>
            <p class="my-2 bg-green-100 p-2 font-bold">{{ state.job.company.contactPhone }}</p>
          </div>

          <!-- Manage -->
          <div class="bg-white p-6 rounded-lg shadow-md mt-6">
            <h3 class="text-xl font-bold mb-6">Manage Job</h3>
            <RouterLink :to="`/jobs/edit/${state.job.id}`" class="bg-green-500 hover:bg-green-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block">
              Edit Job
            </RouterLink>
            <button @click="deleteJob" class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block">
              Delete Job
            </button>
          </div>
        </aside>
      </div>
    </div>
  </section>

  <!-- Loading div -->
  <div v-else class="flex justify-center items-center min-h-screen">
    <div class="loader"></div>
  </div>
</template>

<style scoped>

</style>

<script setup>
import Navbar from '@/components/Navbar.vue';
import Home from '@/components/Home.vue';
import HomeCard from '@/components/HomeCard.vue';
import JobList from '@/components/JobList.vue';
</script>

<template>

  <Navbar />
  <Home title="test props" subTitle="test subtitle"/>
  <HomeCard/>
  <JobList :limit="3" :showButton="true"/>
</template>

<style scoped>

</style>

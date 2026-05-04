<template>
  <div>
    <div class="contact-content">

      <p v-if="$route.params.phone">Phone: {{ $route.params.phone }}</p>

      <h1 v-if="$route.params.mode === 'partnership'">Partnership</h1>
      <h1 v-else-if="$route.params.mode === 'work'">Work With Us</h1>
      <h1 v-else-if="$route.params.mode === 'more-info'">More Info</h1>
      <h1 v-else>Invalid contact mode</h1>
      <p v-if="$route.params.mode === 'partnership'">Learn about partnership opportunities with us.</p>
      <p v-else-if="$route.params.mode === 'work'">Join our team and build your career.</p>
      <p v-else-if="$route.params.mode === 'more-info'">Additional information about our services.</p>
      <p v-else>The specified contact mode does not exist.</p>
    </div>
  </div>
</template>

<script setup>
// Add any necessary script logic here
</script>

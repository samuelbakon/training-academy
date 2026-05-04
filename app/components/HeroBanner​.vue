<template>
    <div class="hero-banner">
        <div class="hero-content">
            <h1>Welcome to Our Platform</h1>
            <p>Experience the future of web development</p>
            <NuxtLink to="#" class="cta-button">Get Started</NuxtLink>
        </div>
    </div>
</template>

<style scoped>
    .hero-banner {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 4rem 2rem;
        text-align: center;
    }

    .hero-banner h1 {
        margin: 0;
        font-size: 2.5rem;
    }

.cta-button {
  background-color: #fff;
  color: #667eea;
  padding: 12px 24px;
  border-radius: 4px;
  text-decoration: none;
  font-weight: bold;
}
</style>

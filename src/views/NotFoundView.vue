<template>
  <main class="page">
    <div class="page-header">
      <h1 class="page-title">Page not found</h1>
    </div>

    <section class="card">
      <div class="state">
        The page you're looking for doesn't exist.
        <RouterLink :to="{ name: 'employees' }">Back to employees</RouterLink>
      </div>
    </section>
  </main>
</template>

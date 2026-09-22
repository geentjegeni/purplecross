<template>
  <header class="app-header">
    <div class="app-header-inner">
      <RouterLink to="/employees" class="brand">Purple Cross</RouterLink>

      <nav class="app-nav">
        <RouterLink to="/employees" class="nav-link">Employees</RouterLink>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.app-header {
  position: sticky;
  top: 0;
  z-index: 40;
  border-bottom: 1px solid #e5e7eb;
  background: #ffffff;
}

.app-header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1400px;
  margin: 0 auto;
  padding: 14px 40px;
}

.brand {
  color: #7c3aed;
  font-size: 1.05rem;
  font-weight: 700;
  text-decoration: none;
}

.nav-link {
  color: #6b7280;
  font-size: 0.9rem;
  font-weight: 500;
  text-decoration: none;
}

.nav-link:hover,
.nav-link.router-link-active {
  color: #7c3aed;
}

@media (max-width: 768px) {
  .app-header-inner {
    padding: 12px 16px;
  }
}
</style>

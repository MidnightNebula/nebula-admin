function setTheme() {
  try {
    const theme = localStorage.getItem('theme');
    const defTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (theme === 'dark' || (!theme && defTheme)) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
    }
  } catch (e) {}
}

setTheme();

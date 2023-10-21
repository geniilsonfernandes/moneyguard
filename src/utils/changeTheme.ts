export const changeTheme = (theme: string) => {
  document.querySelector('body')?.setAttribute('data-theme', theme);
};

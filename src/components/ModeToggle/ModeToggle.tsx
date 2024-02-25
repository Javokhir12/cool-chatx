import { useTheme } from '@/context/theme-provider';
import { Moon } from '@/components/svg/Moon';
import { Sun } from '@/components/svg/Sun';

export function ModeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <button
      className="relative"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      aria-label={
        theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
      }
    >
      <Sun
        className="stroke-black rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
        data-testid="sun-icon"
        aria-hidden={theme === 'dark'}
      />
      <Moon
        className="absolute top-0 stroke-white rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
        data-testid="moon-icon"
        aria-hidden={theme === 'light'}
      />
    </button>
  );
}

import { ModeToggle } from '@/components/ModeToggle';

export function Header() {
  return (
    <header className="container mx-auto my-6">
      <nav className="flex items-center justify-between mx-auto">
        <a href="#" className="text-xl font-bold lg:text-3xl dark:text-white">
          CoolChatX
        </a>
        <ModeToggle />
      </nav>
    </header>
  );
}

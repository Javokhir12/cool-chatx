import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@/__tests__/test-utils';
import { ModeToggle } from './ModeToggle';

describe('ModeToggle', () => {
  it('should render correctly with initial Light theme', () => {
    render(<ModeToggle />);

    const toggleButton = screen.getByRole('button');
    const sunIcon = screen.getByTestId('sun-icon');
    const moonIcon = screen.getByTestId('moon-icon');

    expect(toggleButton).toHaveAttribute('aria-label', 'Switch to dark mode');
    expect(sunIcon).toHaveAttribute('aria-hidden', 'false');
    expect(moonIcon).toHaveAttribute('aria-hidden', 'true');
  });

  it.only('should switch theme correctly', async () => {
    render(<ModeToggle />);

    const toggleButton = screen.getByRole('button');
    const sunIcon = screen.getByTestId('sun-icon');
    const moonIcon = screen.getByTestId('moon-icon');

    expect(toggleButton).toHaveAttribute('aria-label', 'Switch to dark mode');
    expect(sunIcon).toHaveAttribute('aria-hidden', 'false');
    expect(moonIcon).toHaveAttribute('aria-hidden', 'true');

    userEvent.click(toggleButton);

    await waitFor(() => {
      expect(toggleButton).toHaveAttribute(
        'aria-label',
        'Switch to light mode'
      );
      expect(sunIcon).toHaveAttribute('aria-hidden', 'true');
      expect(moonIcon).toHaveAttribute('aria-hidden', 'false');
    });
  });
});

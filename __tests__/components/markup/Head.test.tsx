import { render, screen } from '@testing-library/react';

import Header from '../../../components/markup/Head';

describe('<Header />', () => {
  it('should render <Header />', () => {
    render(<Header />);
    expect(screen.findByTestId('header-test-id')).toBeTruthy();
  });
  it('should render <Header /> when title changes', () => {
    render(<Header title='test title' />);
    expect(screen.findByTestId('header-test-id')).toBeTruthy();
  });
});

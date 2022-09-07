import { render } from '@testing-library/react';

import Logo from '../../../components/markup/Logo';

describe('<Logo />', () => {
  it('should render <Logo />', () => {
    const { container } = render(<Logo />);
    expect(container.getElementsByTagName('img')).toHaveLength(1);
  });
});

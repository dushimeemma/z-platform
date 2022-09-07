import { render, screen } from '@testing-library/react';

import Badge from '../../../components/reusable/Badge';

describe('<Badage />', () => {
  it('should render <Badge />', () => {
    const { container } = render(<Badge label='' className='' />);
    expect(container.getElementsByTagName('button')).toHaveLength(1);
  });
});

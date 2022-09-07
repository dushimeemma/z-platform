import { render } from '@testing-library/react';

import SideView from '../../../components/markup/SideView';

describe('<SideView />', () => {
  it('should render <SideView />', () => {
    const { container } = render(<SideView />);
    expect(container.getElementsByTagName('div')).toHaveLength(1);
  });
});

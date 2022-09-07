import { render } from '@testing-library/react';

import UserProfileItem from '../../../components/reusable/UserProfileItem';

describe('<UserProfileItem />', () => {
  it('should render <UserProfileItem />', () => {
    const { container } = render(<UserProfileItem src={''} label={''} />);
    expect(container.getElementsByTagName('div')).toHaveLength(1);
  });
});

import { render } from '@testing-library/react';

import TextField from '../../../components/reusable/TextField';

describe('<TextField />', () => {
  it('should render <TextField />', () => {
    const { container } = render(
      <TextField placeholder={''} name={''} type={''} />
    );
    expect(container.getElementsByTagName('input')).toHaveLength(1);
  });
});

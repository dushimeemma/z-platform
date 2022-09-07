import { render } from '@testing-library/react';

import Button from '../../../components/reusable/Button';

describe('<Button />', () => {
  it('should render <Button />', () => {
    const { container } = render(<Button label={''} className={''} />);
    expect(container.getElementsByTagName('button')).toHaveLength(1);
  });
  it('should change isLoading state', () => {
    const { container } = render(
      <Button label={''} className={''} isLoading={true} />
    );
    const buttonComponent = container.getElementsByTagName('button');
    expect(buttonComponent).toHaveLength(1);
  });
});

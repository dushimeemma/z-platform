import React from 'react';
import { render } from '@testing-library/react';

import Alert from '../../../components/reusable/Alert';

jest.useFakeTimers();
jest.spyOn(global, 'setTimeout');

describe('<Alert />', () => {
  const getComponent = () => render(<Alert />);
  it('should render <Alert />', () => {
    const { container } = getComponent();
    expect(container.getElementsByTagName('span')).toHaveLength(1);
  });
  it('should call timeout function', () => {
    getComponent();
    expect(setTimeout).toHaveBeenCalledTimes(2);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 3000);
  });
});

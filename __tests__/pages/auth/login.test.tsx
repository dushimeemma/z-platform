import { render } from '@testing-library/react';
import { Provider } from 'react-redux';

import Login from '../../../pages/auth/login';
import store from '../../../store/store';

describe('<Login />', () => {
  it('should render <Login />', () => {
    const { container } = render(
      <Provider store={store}>
        <Login />
      </Provider>
    );
    expect(container.children).toBeTruthy();
  });
});

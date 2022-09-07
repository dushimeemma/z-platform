import { render } from '@testing-library/react';
import { Provider } from 'react-redux';

import ForgotPassword from '../../../pages/auth/forgot_password';
import store from '../../../store/store';

describe('<ForgotPassword />', () => {
  it('should render <ForgotPassword />', () => {
    const { container } = render(
      <Provider store={store}>
        <ForgotPassword />
      </Provider>
    );
    expect(container.children).toBeTruthy();
  });
});

import { render } from '@testing-library/react';
import { Provider } from 'react-redux';

import ResetPassword from '../../../pages/auth/reset_password';
import store from '../../../store/store';

const useRouter = jest.spyOn(require('next/router'), 'useRouter');

describe('<ResetPassword />', () => {
  it('should render <ResetPassword />', () => {
    useRouter.mockImplementationOnce(() => ({
      query: { token: 'sampleToken' },
    }));
    const { container } = render(
      <Provider store={store}>
        <ResetPassword />
      </Provider>
    );
    expect(container.children).toBeTruthy();
  });
});

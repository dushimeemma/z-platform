import { render } from '@testing-library/react';
import { Provider } from 'react-redux';

import Home from '../../pages';
import store from '../../store/store';

describe('<Home />', () => {
  it('should render <Signup />', () => {
    const { container } = render(
      <Provider store={store}>
        <Home />
      </Provider>
    );
    expect(container.children).toHaveLength(1);
  });
});

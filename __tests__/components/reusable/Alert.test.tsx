import { render } from 'enzyme';
import Alert from '../../../components/reusable/Alert';

describe('Test Alert component', () => {
	it('Should render alert', () => {
		const wrapper =  render(<Alert />);
		expect(wrapper.length).toBe(1);
	});
});
import React from 'react';
// import ReactShallowRenderer from 'react-test-renderer/shallow';
import LoadingPage from '../../components/LoadingPage';
import { shallow } from 'enzyme';

test('Should render LoadingPage correctly', () => {

    // // Using react-test-renderer/shallow
    // const renderer = new ReactShallowRenderer();
    // renderer.render(<LoadingPage />);
    // expect(renderer.getRenderOutput()).toMatchSnapshot();

    // Using enzyme
    const wrapper = shallow(<LoadingPage />);
    expect(wrapper).toMatchSnapshot();
});

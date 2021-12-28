// react-test-renderer renders components into regular JS code to test them

import React from 'react';
// import ReactShallowRenderer from 'react-test-renderer/shallow';
import { shallow } from 'enzyme';
import { Header } from '../../components/Header';

test('Should render Header correctly', () => {

    // // Using react-test-renderer/shallow
    // const renderer = new ReactShallowRenderer();
    // renderer.render(<Header />);
    // expect(renderer.getRenderOutput()).toMatchSnapshot();

    // Using enzyme
    const wrapper = shallow(<Header startLogout={() => {}} />);
    // expect(wrapper.find('h1').text()).toBe('Expensify');
    expect(wrapper).toMatchSnapshot();

});

test('Should call startLogout on button click', () => {
    // Use a spy
    const startLogout = jest.fn();
    const wrapper = shallow(<Header startLogout={startLogout} />);
    wrapper.find('button').simulate('click');
    expect(startLogout).toHaveBeenCalled();
});

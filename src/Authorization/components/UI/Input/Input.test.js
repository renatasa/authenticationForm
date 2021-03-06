import React from 'react';
// import PropTypes from 'prop-types';
// import {findByTestAttr, checkProps} from '../test/testUtils';
import Enzyme, {shallow} from 'enzyme';
import checkPropTypes from 'check-prop-types'
import EnzymeAdaptor from 'enzyme-adapter-react-16';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import {findByTestAttr, checkProps} from '../../../../test/testUtils';
import Input from './Input.jsx';

Enzyme.configure({adapter: new Adapter()});



    const defaultProps = {
        changed: event => this.inputChangedHandler(event, formElement.id),
        elementConfig: {type: "email", placeholder: "Mail Address"},
        value: ""
    }
    
    
    const setup =(props={defaultProps})=>{
        const setupProps={...defaultProps, ...props};
        return shallow(<Input {...setupProps}/>)
    }
    
    test('input component renders without error', ()=>{
        const wrapper=setup({}); 
        const component = findByTestAttr(wrapper, 'component-formInput')
        expect(component.length).toBe(1);
    })

    test('does not throw warning with expected props', ()=>{
        const wrapper=setup({}); 
        checkProps(Input, defaultProps);
    })
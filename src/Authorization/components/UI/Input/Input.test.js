import React from 'react';
// import PropTypes from 'prop-types';
// import {findByTestAttr, checkProps} from '../test/testUtils';
import Enzyme, {shallow} from 'enzyme';
import checkPropTypes from 'check-prop-types'
import EnzymeAdaptor from 'enzyme-adapter-react-16';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import {findByTestAttr, checkProps} from '../../../../test/testUtils';
import Input from './Input.jsx';

/*
AAA Pattern: arrange, act, assert
*/

Enzyme.configure({adapter: new Adapter()});
    
    const setup =(props={defaultProps})=>{
        const setupProps={...defaultProps, ...props};
        return shallow(<Input {...setupProps}/>)
    }
    
    test('input component renders without error', ()=>{
        //arrange
        const defaultProps = {
            changed: event => this.inputChangedHandler(event, formElement.id),
            elementConfig: {type: "email", placeholder: "Mail Address"},
            value: ""
        };    

        //act 
        const wrapper = setup({}); 
        
        //assert    
        const inputComponent = findByTestAttr(wrapper, 'component-formInput');
        expect(inputComponent.length).toBe(1);
    });

    test('input component created with default props', () => {
        //arrange
        const defaultProps = {
            changed: event => this.inputChangedHandler(event, formElement.id),
            elementConfig: {type: "email", placeholder: "Mail Address"},
            value: ""
        }; 
        
        //act
        const wrapper = setup({}); 
        
        //assert
        checkProps(Input, defaultProps);
    });

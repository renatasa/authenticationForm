import Resct from 'react';
import {findByTestAttr} from '../../../test/testUtils';
import Auth from './Auth';
import rootReducer from'../../store/reducers/auth';
import Enzyme, { shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

Enzyme.configure({ adapter: new Adapter() });
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';

const storeFactory =(initialState)=>{return createStore(rootReducer, initialState)};

const setup = (initialState={})=>{
    const store=storeFactory(initialState);
    const wrapper=shallow(<Auth store={store}/>);
    console.log(wrapper.debug);
}

setup();

test('When Auth component renders without error', ()=>{

})
import React from "react";
import { shallow } from "enzyme";
import sinon from 'sinon';

import { Button } from 'react-native';

import Post from '../../src/post';

const post = {id:1, title: 'Post Test', description: 'Description Test'};

describe('Testing Post', () =>{
    it('can delete post', () => {
        deletePostSpy = sinon.spy();

        const wrapper = shallow(<Post post={post} onDelete={deletePostSpy}/>);

        wrapper.find(Button).simulate('press');

        expect(deletePostSpy.withArgs(post.id).calledOnce).toBe(true);
    });
});
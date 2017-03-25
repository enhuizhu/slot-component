'use strict';

import React from 'react';
import { expect } from 'chai';
import slotHelper from '../src/helpers/SlotHelper';

describe('slot', () => {
	// let myslot = null;

	it('messImages', () => {
		let testArr = [1, 2, 3, 4];
		let newArr = slotHelper.messImages(testArr);
				
		expect(newArr.length).to.equal(testArr.length);
		expect(newArr).to.not.deep.equal(testArr);
	});

	it('generateSlotImages', () => {
		let newArr = slotHelper.generateSlotImages([1, 2, 3, 4], 4);
		expect(newArr.length).to.equal(16);
	});
});
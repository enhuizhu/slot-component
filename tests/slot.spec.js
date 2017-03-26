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

	it('getSlotPos', () => {
		let pos = slotHelper.getSlotPos(300, 100, 0);
		expect(pos).to.equal(100);

		pos = slotHelper.getSlotPos(300, 100, 1);
		expect(pos).to.equal(0);

		pos = slotHelper.getSlotPos(300, 100, 2);
		expect(pos).to.equal(-100);
	});

	it('getStopIndex', () => {
		let stopIndex = slotHelper.getStopIndex(4, 0);
		expect(stopIndex).to.equal(4);
		
		stopIndex = slotHelper.getStopIndex(4, 1);
		expect(stopIndex).to.equal(5);

		stopIndex = slotHelper.getStopIndex(4, 2);
		expect(stopIndex).to.equal(6);

		stopIndex = slotHelper.getStopIndex(4, 3);
		expect(stopIndex).to.equal(7);
	});

	it('getStopPos', () => {
		let stopPos = slotHelper.getStopPos(4, 300, 100, 0);
		expect(stopPos).to.equal(-300);
	});

	it('getStartIndex', () => {
		let startIndex = slotHelper.getStartIndex(3, 4, 0);
		expect(startIndex).to.equal(6)

		startIndex = slotHelper.getStartIndex(3, 4, 1);
		expect(startIndex).to.equal(7)
	});	

	it('getStartPos', () => {
		let startPos = slotHelper.getStartPos(3, 300, 100, 4, 0);
		expect(startPos).to.equal(-500);
	});
});
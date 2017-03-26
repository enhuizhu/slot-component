'use strict';

class SlotHelper {
	static messImages(arr) {
		const cloneArr = [...arr];
		let newArr  = [];
		
		while(cloneArr.length > 0) {
			const randomIndex = Math.round(Math.random() * (cloneArr.length - 1));
			newArr.push(cloneArr[randomIndex]);
			cloneArr.splice(randomIndex, 1);
		}

		return newArr;
	}

	static generateSlotImages(arr, repeatTimes) {
		const messArr = [...arr];
		let newArr = [];
			
		for(let i = 0; i < repeatTimes; i++) {
			newArr = newArr.concat(messArr);
		}
		
		return newArr;
	}

	static getSlotPos(viewHeight, imgH, index) {
		return 0.5 * viewHeight - (index + 0.5) * imgH
	}

	static getStopIndex(numberOfImgs, index) {
		return numberOfImgs + index;
	}

	static getStopPos(numberOfImgs, viewHeight, imgH, index) {
		let indexInGroup = this.getStopIndex(numberOfImgs, index);
		return this.getSlotPos(viewHeight, imgH, indexInGroup);
	}

	static getStartIndex(numberOfImgs, repeatTimes, index) {
		return numberOfImgs * (repeatTimes - 2) + index;
	}

	static getStartPos(numberOfImgs, viewHeight, imgH, repeatTimes, index) {
		let indexInGroup = this.getStartIndex(numberOfImgs, repeatTimes, index);
		return this.getSlotPos(viewHeight, imgH, indexInGroup);
	}
}

export default SlotHelper;
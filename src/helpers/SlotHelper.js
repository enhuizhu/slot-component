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
		const messArr = this.messImages(arr);
		let newArr = [];
			
		for(let i = 0; i < repeatTimes; i++) {
			newArr = newArr.concat(messArr);
		}
		
		return newArr;
	}
}

export default SlotHelper;
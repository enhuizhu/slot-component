'use strict';

import React from 'react';
import slotHelper from '../helpers/SlotHelper';
import TWEEN from 'tween.js';

class Slot extends React.Component {
    constructor(props) {
        super(props);
        this.slotRepeatTimes = 5;
        this.slotHeight = this.slotRepeatTimes * this.props.imgHeight * this.props.images.length;
        this.cachCanvas = document.createElement('canvas');
        this.cachCtx = this.cachCanvas.getContext('2d');
        this.cachCanvas.setAttribute('height', this.slotHeight);
        this.hasSpined = false;
        this.aniObj = {
            slotPos : 0
        }
    }

    componentDidMount() {
        this.ctx = this.refs['slot'].getContext('2d');
        this.messImages = slotHelper.messImages(this.props.images);

        this.messStartIndex = this._getImgIndexInImgArr(this.props.images[this.props.startImgIndex], this.messImages);
        this.messStopIndex = this._getImgIndexInImgArr(this.props.images[this.props.stopImgIndex], this.messImages);        


        // console.log(this.messStartIndex, this.messStopIndex);

        this.slotImages = slotHelper.generateSlotImages(this.messImages, this.slotRepeatTimes);
        this._drawImagesInCachCanvas(this.slotImages);
        this._InitSlot();
    }

    _getImgIndexInImgArr(img, imgArr) {
        for(let i in imgArr) {
            if (img.src === imgArr[i].src) {
                return parseInt(i);
            }
        }

        return false;
    }

    _clear() {
        this.ctx.clearRect(0, 0, this.refs['slot'].width, this.refs['slot'].height);
    }

    _InitSlot() {
        this.aniObj.slotPos = this._InitSlotPos(this.hasSpined ? this.messStopIndex : this.messStartIndex);
        // console.log('init slot pos is:', this.aniObj);
        this._drawSlot();
    }

    _start() {
        this.hasSpined = true;
        //Linear, Quadratic, Cubic, Quartic, Quintic, Sinusoidal, Exponential, Circular, Elastic, Back and Bounce, and then by the easing type: In, Out and InOut
        setTimeout(() => {
            let stopPos = slotHelper.getStopPos(this.props.images.length, this.props.canvasHeight, this.props.imgHeight, this.messStopIndex);
            
            new TWEEN.Tween(this.aniObj)
                .to({slotPos: stopPos}, 3000)
                .easing(TWEEN.Easing.Back.InOut)
                .onUpdate(() => {
                    // console.log(this.aniObj);
                })
                .start();
            
            this._spin();
        }, this.props.delay);
    }

    _InitSlotPos(index) {
        return slotHelper.getStartPos(this.props.images.length, this.props.canvasHeight, this.props.imgHeight, this.slotRepeatTimes, index);
    }

    _drawSlot() {
        this._clear();
        this.ctx.drawImage(this.cachCanvas, 0, this.aniObj.slotPos);        
    }

    _spin(time) {
        this._drawSlot();
        requestAnimationFrame(this._spin.bind(this));
        TWEEN.update(time);
    }

    _drawImagesInCachCanvas(slotImages) {
        let startY = 0;
        
        slotImages.map((img) => {
            this.cachCtx.drawImage(img, 0, 0, img.width, img.height, 0, startY, this.props.imgWidth, this.props.imgHeight);
            startY += this.props.imgHeight;
        });
    }

    render() {
        return <canvas ref='slot' width={this.props.imgWidth} height={this.props.canvasHeight}>
        </canvas>;
    }
}

Slot.propTypes = {
    images: React.PropTypes.array,
    stopImgIndex: React.PropTypes.number,
    startImgIndex: React.PropTypes.number,
    delay: React.PropTypes.number,
    imgWidth: React.PropTypes.number,
    imgHeight: React.PropTypes.number,
    canvasHeight: React.PropTypes.number,
    animationDuration: React.PropTypes.number,
    animationEndCallback: React.PropTypes.func
};

Slot.defaultProps = {
    images: [],
    startImgIndex: 0,
    stopImgIndex: 0,
    delay: 0,
    imgWidth: 100,
    imgHeight: 100,
    canvasHeight: 300,
    animationDuration: 3,
    animationEndCallback: () => {}
};

export default Slot;
'use strict';

import React from 'react';
import slotHelper from '../helpers/SlotHelper';
import TWEEN from 'tween.js';

class Slot extends React.Component {
    constructor(props) {
        super(props);
        this.cachCanvas = document.createElement('canvas');
        this.cachCtx = this.cachCanvas.getContext('2d');
        this.slotRepeatTimes = 5;
        this.slotHeight = this.slotRepeatTimes * this.props.imgHeight * this.props.images.length;
        this.cachCanvas.setAttribute('height', this.slotHeight);
        this.aniObj = {
            slotPos : 0
        }
    }

    componentDidMount() {
        this.ctx = this.refs['slot'].getContext('2d');
        const slotImages = slotHelper.generateSlotImages(this.props.images, this.slotRepeatTimes);
        this._drawImagesInCachCanvas(slotImages);
        // this._drawSlot();
        this._InitSlot();
    }

    _InitSlot() {
        this.aniObj.slotPos = this._InitSlotPos();
        this._drawSlot();
    }

    _start() {
        //Linear, Quadratic, Cubic, Quartic, Quintic, Sinusoidal, Exponential, Circular, Elastic, Back and Bounce, and then by the easing type: In, Out and InOut
        setTimeout(() => {
            new TWEEN.Tween(this.aniObj)
                .to({slotPos: 0}, 3000)
                .easing(TWEEN.Easing.Cubic.InOut)
                .onUpdate(() => {
                    // console.log(this.aniObj);
                })
                .start();
            
            this._spin();
        }, this.props.delay);
    }

    _InitSlotPos() {
        return -this.slotHeight + this.props.canvasHeight;    
    }

    _drawSlot() {
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
        return <canvas ref='slot' width={this.props.canvasWidth} height={this.props.canvasHeight}>
        </canvas>;
    }
}

Slot.propTypes = {
    images: React.PropTypes.array,
    stopImgIndex: React.PropTypes.number,
    delay: React.PropTypes.number,
    imgWidth: React.PropTypes.number,
    imgHeight: React.PropTypes.number,
    canvasWidth: React.PropTypes.number,
    canvasHeight: React.PropTypes.number,
    animationDuration: React.PropTypes.number,
    animationEndCallback: React.PropTypes.func
};

Slot.defaultProps = {
    images: [],
    stopImgIndex: 0,
    delay: 0,
    imgWidth: 100,
    imgHeight: 100,
    canvasHeight: 300,
    canvasWidth: 100,
    animationDuration: 3,
    animationEndCallback: () => {}
};

export default Slot;
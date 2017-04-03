'use strict';

import React from 'react';
import reelHelper from '../helpers/reelHelper';
import TWEEN from 'tween.js';

class Reel extends React.Component {
    constructor(props) {
        super(props);
        this.reelRepeatTimes = this.props.spinCount;
        this.reelHeight = this.reelRepeatTimes * this.props.faceHeight * this.props.images.length;
        this.cachCanvas = document.createElement('canvas');
        this.cachCtx = this.cachCanvas.getContext('2d');
        this.cachCanvas.setAttribute('height', this.reelHeight);
        this.hasSpined = false;
        this.isSpining = false;
        this.aniObj = {
            reelPos : 0
        }
    }

    componentDidMount() {
        this.ctx = this.refs['reel'].getContext('2d');

        this._loadImages().then(() => {
            this.messImages = reelHelper.messImages(this.imgObjs);
            this.messStartIndex = this._getImgIndexInImgArr(this.imgObjs[this.props.startIndex], this.messImages);
            this.messStopIndex = this._getImgIndexInImgArr(this.imgObjs[this.props.endIndex], this.messImages);        
            this.reelImages = reelHelper.generateReelImages(this.messImages, this.reelRepeatTimes);
            this._drawImagesInCachCanvas(this.reelImages);
            this.initReel();

            this.props.onReady();
        });
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
        this.ctx.clearRect(0, 0, this.refs['reel'].width, this.refs['reel'].height);
    }

    initReel() {
        this.aniObj.reelPos = this._getInitReelPos(this.hasSpined ? this.messStopIndex : this.messStartIndex);
        this._drawReel();
    }

    _loadImages() {
        this.imgObjs = [];
        
        let promises = this.props.images.map((v, i) => {
            return new Promise((resolve, reject) => {
                let img = new Image();
                img.src = v;

                img.onload = () => {
                    resolve();
                }

                img.onerror = () => {
                    reject();
                }

                this.imgObjs.push(img);
            });
        });

        return Promise.all(promises);
    }

    spin() {
        if (this.isSpining) {
            return ;
        }

        this.initReel();
        this.isSpining = true;
        
        return new Promise((resolve, reject) => {
            //Linear, Quadratic, Cubic, Quartic, Quintic, Sinusoidal, Exponential, Circular, Elastic, Back and Bounce, and then by the easing type: In, Out and InOut
            setTimeout(() => {
                let stopPos = reelHelper.getStopPos(this.props.images.length, this.props.frameHeight, this.props.faceHeight, this.messStopIndex);
                
                new TWEEN.Tween(this.aniObj)
                    .to({reelPos: stopPos}, this.props.animationDuration * 1000)
                    .easing(TWEEN.Easing.Back.InOut)
                    .onComplete(() => {
                        resolve();
                        console.log('reel animation end');
                        this.isSpining = false;
                        this.hasSpined = true;
                        // this.props.onReady();
                    })
                    .start();
                
                this._update();
            }, this.props.delay);
        });
    }

    _getInitReelPos(index) {
        return reelHelper.getStartPos(this.props.images.length, this.props.frameHeight, this.props.faceHeight, this.reelRepeatTimes, index);
    }

    _drawReel() {
        this._clear();
        this.ctx.drawImage(this.cachCanvas, 0, this.aniObj.reelPos);        
    }

    _update(time) {
        this._drawReel();
        requestAnimationFrame(this._update.bind(this));
        TWEEN.update(time);
    }

    _drawImagesInCachCanvas(reelImages) {
        let startY = 0;
        
        reelImages.map((img) => {
            this.cachCtx.drawImage(img, 0, 0, img.width, img.height, 0, startY, this.props.faceWidth, this.props.faceHeight);
            startY += this.props.faceHeight;
        });
    }

    render() {
        return <canvas ref='reel' width={this.props.faceWidth} height={this.props.frameHeight}>
        </canvas>;
    }
}

Reel.propTypes = {
    images: React.PropTypes.array,
    endIndex: React.PropTypes.number, // endIndex
    startIndex: React.PropTypes.number, //startIndex
    delay: React.PropTypes.number,
    faceWidth: React.PropTypes.number, //faceWidth
    faceHeight: React.PropTypes.number, //faceHeight
    frameHeight: React.PropTypes.number, //frameHeight
    animationDuration: React.PropTypes.number,
    spinCount: React.PropTypes.number,
    onReady: React.PropTypes.func
};

Reel.defaultProps = {
    images: [],
    startIndex: 0,
    endIndex: 0,
    delay: 0,
    faceWidth: 100,
    faceHeight: 100,
    frameHeight: 300,
    animationDuration: 3,
    spinCount: 7,
    onReady: () => {}
};

export default Reel;
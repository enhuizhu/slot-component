'use strict';

import React from 'react';
import slotHelper from '../helpers/SlotHelper';
import TWEEN from 'tween.js';
// import THREE from 'three';

class WebGlSlot extends React.Component {
    constructor(props) {
        super(props);
        
        this.width = 400;
        this.height = 400;

        this.cachCanvas = document.createElement('canvas');
        this.cachCtx = this.cachCanvas.getContext('2d');
        this.cachCtx.rotate(Math.PI * 3);
        this.cachCanvas.setAttribute('height', 50);
        this.cachCtx.fillStyle = 'green';
        this.cachCtx.fillRect(0, 0, this.cachCanvas.width, this.cachCanvas.height);
        this.slotRepeatTimes = 7;
    }

    componentDidMount() {
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(this.width, this.height);
        this.renderer.setClearColor( 0xffffff, 1 );
        this.refs['slot'].appendChild(this.renderer.domElement);
        this.messImages = slotHelper.messImages(this.props.images);
        // this.slotImages = slotHelper.messImages(this.props.images);
        // this.slotImages = this.props.images;
        this.slotImages = slotHelper.generateSlotImages(this.messImages, this.slotRepeatTimes);
        this.cachCanvas.setAttribute('width', this.slotImages.length * this.props.imgHeight);
        this._drawImagesInCachCanvas(this.slotImages);
        this.init();
        this.animate();
    }

     _drawImagesInCachCanvas(slotImages) {
        let startY = 0;
        slotImages.map((img) => {
            this.cachCtx.save();
            this.cachCtx.translate(this.cachCanvas.width, this.cachCanvas.height/2);
            this.cachCtx.rotate(90*Math.PI/180);
            this.cachCtx.drawImage(img, 0, 0, img.width, img.height, 0 - this.props.imgWidth / 2 , startY, this.props.imgWidth, this.props.imgHeight);
            startY += this.props.imgHeight;
            this.cachCtx.restore();
        });
    }

    init() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(70, this.width / this.height, 1, 1000);
        this.camera.position.z = 500;
        this.scene.add(this.camera);

        // this.refs['testCan'].appendChild(this.cachCanvas);
        this.texture = new THREE.Texture(this.cachCanvas);
        this.texture.needsUpdate = true;
        let perimeter = this.slotImages.length * this.props.imgHeight;
        console.log('perimeter', perimeter);
        perimeter = 250;
        var material = new THREE.MeshBasicMaterial({ map: this.texture });
        var geometry = new THREE.CylinderGeometry( perimeter, perimeter, 100, 32 );
        this.mesh = new THREE.Mesh( geometry, material );
        this.mesh.rotation.z = Math.PI/2;
        this.scene.add( this.mesh );
    }

    animate() {
        requestAnimationFrame(this.animate.bind(this));
        this.mesh.rotation.x += 0.01;
        this.renderer.render(this.scene, this.camera);
    }

    render() {
        return <div>
            <div ref='slot'>
                    
            </div>
            
        </div>;
    }
}

WebGlSlot.propTypes = {
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

WebGlSlot.defaultProps = {
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

export default WebGlSlot;
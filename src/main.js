'use strict';

import React from 'react';
import ReactDom from 'react-dom';
import Slot from './components/slot';

class App extends React.Component {
    constructor() {
        super();
        
        this.state = {
            isImagesReady: false
        };

        this._data = {
            images: [],
            cols: 3
        };
    }

    componentDidMount() {
        console.log('mount');
        this.loadImages().then(() => {
            console.log('all images loaded', this._data.images);
            this.setState({
                isImagesReady: true
            });
        });
    }

    loadImages() {
        const imgUrls = ['apple.png', 'banana.png', 'peach.png', 'grape.png'];
        
        const promises = imgUrls.map((imgName) => {
            return new Promise((resolve, reject) => {
                let fruit = new Image();
                fruit.src = `./images/${imgName}`;
                
                fruit.onload = () => {
                    resolve();
                }

                fruit.onerror = () => {
                    reject();
                }

                this._data.images.push(fruit);
            });
        });

        return Promise.all(promises);    
    }

    spin() {
        console.log('spinning ...');
        for(let i =0; i < this._data.cols; i++) {
            setTimeout(() => {
                this.refs[`slot${i}`]._InitSlot();
                this.refs[`slot${i}`]._start();
            }, i * 300);
        }
    }

    getSlots() {  
        const slots = [];

        for(let i = 0; i < this._data.cols; i++) {
            slots.push(<td key={i}><Slot images={this._data.images} ref={`slot${i}`} startImgIndex={0} stopImgIndex={1}></Slot></td>);
        }

        return (<table>
                <tbody>
                    <tr>
                        {slots}
                    </tr>
                </tbody> 
            </table>)
    }

    render() {
        const slot = this.state.isImagesReady ? this.getSlots() : null;

        return (<div>
            <h1>here is the slot machine</h1>
            {slot}
            <div>
                <button onClick={this.spin.bind(this)}>SPIN</button>
            </div>
        </div>);
    }
}

ReactDom.render(<App/>, document.getElementById('slot'));





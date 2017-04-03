'use strict';

import React from 'react';
import ReactDom from 'react-dom';
import { Slot, Reel } from './components/Slot.jsx';

class App extends React.Component {
    constructor() {
       super();
       
       this._data = {
            "frameHeight": 340,
            "reelSize": {
                "width": 170,
                "height": 170
            },
            "duration": 3,
            "reels": [
                {
                    "images": [
                        "images/apple.png",
                        "images/banana.png",
                        "images/peach.png",
                        "images/grape.png"
                    ],
                    "startIndex": 0,
                    "endIndex": 3,
                    "spinCount": 7
                },
                {
                    "images": [
                        "images/apple.png",
                        "images/banana.png",
                        "images/peach.png",
                        "images/grape.png"
                    ],
                    "startIndex": 0,
                    "endIndex": 3,
                    "spinCount": 7
                },
                {
                    "images": [
                        "images/apple.png",
                        "images/banana.png",
                        "images/peach.png",
                        "images/grape.png"
                    ],
                    "startIndex": 0,
                    "endIndex": 3,
                    "spinCount": 7
                }
            ]
        };
    }

    _spin() {
        this.refs['slot'].spin().then(() => {
             console.log('spin finished');
        });
    }

    _onReady() {
        console.log('reel is ready');
    }

    render() {
        let reelRef = null;

        const reels = this._data.reels.map((v, i) => {
            return <Reel images={v.images} 
                         startIndex={v.startIndex} 
                         endIndex={v.endIndex} 
                         delay={i*300} 
                         faceWidth={this._data.reelSize.width}
                         faceHeight={this._data.reelSize.height}
                         animationDuration = {this._data.duration}
                         spinCount = {v.spinCount}
                         onReady = {this._onReady.bind(this)}
                         key={i}
                         ref={c => reelRef = c}/>                            
        });


        return <div>
             <div className ='slot-container'>
                <Slot ref='slot'>
                     {reels}
                 </Slot>
             </div>
             <button onClick={this._spin.bind(this)}>Spin</button>
        </div>;
    }
}

ReactDom.render(<App/>, document.getElementById('slot'));
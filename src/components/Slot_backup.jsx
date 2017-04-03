'use strict';

import React from 'react';
import ReactDom from 'react-dom';
import Reel from './Reel.jsx';

class Slot extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            isImagesReady: false
        };

        this.reelsData = [...this.props.config.reels];
    }

    componentDidMount() {
        this.loadImages().then(() => {
            this.setState({
                isImagesReady: true
            });
        });
    }

    loadImages() {
        let promises = [];

        for(let k in this.reelsData) {
            for(let imgIndex in this.reelsData[k].images) {
                promises.push(new Promise((resolve, reject) => {
                    let imgUrl = this.reelsData[k].images[imgIndex];
                    let img = new Image();
                    img.src = imgUrl;

                    img.onload = () => {
                        resolve();
                    }

                    img.onerror = () => {
                        reject();
                    }

                    if(!this.reelsData[k].imgObjs) {
                        this.reelsData[k].imgObjs = [];
                    }

                    this.reelsData[k].imgObjs.push(img);
                }));
            }
        }

        return Promise.all(promises);    
    }

    spin() {
        let promises = [];

        this.reelsData.map((reelData, i) => {
            this.refs[`reel${i}`]._InitReel();
            promises.push(this.refs[`reel${i}`].spin());
        });

        return Promise.all(promises);
    }

    getReels() {
        const reelWidth = 1 / this.reelsData.length * 100 + '%';

        const reels = this.reelsData.map((reelData, i) => {
            return <td key={i} width={reelWidth}><Reel images={reelData.imgObjs} ref={`reel${i}`} starIndex={reelData.startIndex} endIndex={reelData.endIndex} animationDuration={this.props.config.duration} delay={i*300} frameHeight={this.props.config.frameHeight} faceWidth={this.props.config.reelSize.width} faceHeight={this.props.config.reelSize.height}></Reel></td>;
        });

        return (<table>
                <tbody>
                    <tr>
                        {reels}
                    </tr>
                </tbody> 
            </table>)
    }

    render() {
        const slotComponent = this.state.isImagesReady ? this.getReels() : <div></div>;
        return (<div className='slot-component'>{slotComponent}</div>);
    }
}

Slot.propTypes = {
    config: React.PropTypes.object
};

Slot.defaultProps = {
    config:{
        "frameHeight": 170,
        "reelSize": {
            "width": 85,
            "height": 85
        },
        "duration": 3,
        "reels": [
            {
                "images": [],
                "startIndex": 0,
                "endIndex": 0,
                "spinCount": 4
            },
            {
                "images": [],
                "startIndex": 0,
                "endIndex": 0,
                "spinCount": 4
            },
            {
                "images": [],
                "startIndex": 0,
                "endIndex": 0,
                "spinCount": 4
            }
        ]
    }
};

export default Slot;
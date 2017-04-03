'use strict';

import React from 'react';
import ReactDom from 'react-dom';
import Reel from './Reel.jsx';

class Slot extends React.Component {
    constructor(props) {
        super(props);
        this.refMap= [];    
    }

    spin() {
        const promises = this.refMap.map((child, i) => {
            return child.spin();
        });
        
        return Promise.all(promises);
    }

    render() {
        const children = this.props.children.map((child, index) => {
            if (child.type !== Reel) {
                throw 'Slots children should be reels.';
            }

            return React.cloneElement(child, {ref: (ref) => { this.refMap[index] = ref }})
        });

        return (<div className='slot-component'>
            {children}
        </div>);
    }
}

export { Slot, Reel };
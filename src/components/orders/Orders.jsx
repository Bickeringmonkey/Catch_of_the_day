import React from 'react';
import { formatPrice } from '../helpers/helpers';
import { TransitionGroup, CSSTransition } from "react-transition-group";

class Order extends React.Component {
    renderOrder = (key) => {
        const fish = this.props.fishes[key];
        const count = this.props.order[key];
        const isAvailable = fish && fish.status === 'available';
        const transitionOptions = {
            classNames: "order", 
            key,
            timeout:{ enter: 500, exit: 500 }
        }
        // make sure fish is loaded before continuing
        if (!fish) return null;
        if(!isAvailable) {
            return (
            <CSSTransition {...transitionOptions} >
            <li key={key}>Sorry {fish ? fish.name : 'fish'} is no longer available</li>
            </CSSTransition> 
            ) 
        }
        return (
            <CSSTransition {...transitionOptions} >
                <li key={key}>
                <span>
                <TransitionGroup component="span" className="count">
                    <CSSTransition 
                    classNames="count" 
                    key={count} 
                    timeout={{ enter: 500, exit: 500 }}>
                        <span>{count}</span>
                    </CSSTransition>
                </TransitionGroup>
                lbs <span className='fishName'>{fish.name}</span>
                {formatPrice(count * fish.price)}
                <button className="cross" onClick={() => this.props.RemoveFromOrder(key)}>&times;</button>
                </span>
                </li>
            </CSSTransition>
        );
    };
    render() {
        const orderIds = Object.keys(this.props.order);
        const total = orderIds.reduce((prevTotal, key) => {
            const fish = this.props.fishes[key];
            const count = this.props.order[key];
            const isAvailable = fish && fish.status === 'available';
            if(isAvailable) {
                return prevTotal + (count * fish.price);
            }
            return prevTotal;
        }, 0);
        return (
            <div className='order-wrap'>
                <h2>Orders</h2>
                <TransitionGroup component="ul" className='order'>
                {orderIds.map(this.renderOrder)}
                </TransitionGroup>
                <div className='total'>
                    <strong>{formatPrice(total)}</strong>

                </div>
            </div>
        )
    }
}

export default Order;
import React from 'react';
import Header from '../components/storeheader/Header';
import Inventory from '../components/inventory/StoreInventory';
import Order from '../components/orders/Orders';
import sampleFishes from '../sample-fishes';
import Fish from './Fish/Fish';
import base from '../base';

class App extends React.Component {
    state = {
        fishes: {},
        order: {},
    };
    componentDidMount() {
        const { params } = this.props.match;
        // first reinstate local storage
        const localStorageRef = localStorage.getItem(params.storeId);
        if(localStorageRef) {
            this.setState({ order: JSON.parse(localStorageRef) })
        }
        this.ref = base.syncState(`${params.storeId}/fishes`, {
            context: this,
            state: "fishes"
        });
    }
    componentDidUpdate() {
        localStorage.setItem(
            this.props.match.params.storeId, 
            JSON.stringify(this.state.order));
    }
    componentWillUnmount() {
        base.removeBinding(this.ref);
    }
    addFishes = fish => {
        // take copy of the existing state
        const fishes = { ...this.state.fishes };
        // add our fish to the fishes variable
        fishes[`fish${Date.now()}`] = fish;
        // set new fishes object to new state
        this.setState({
            fishes
        });
    };
    loadSampleFishes = () => {
        this.setState({ fishes:sampleFishes });
    };
    addToOrder = key => {
        // take a copy of state
        const order = { ...this.state.order };
        //add to order or update number
        order[key] = order[key] + 1 || 1;
        //call setstae to update state object
        this.setState({ order });
    }
    RemoveFromOrder = key => {
        // take a copy of state
        const order = { ...this.state.order };
        //remove from order or update number
        delete order[key];
        //call setstae to update state object
        this.setState({ order });
    }
    updateFish = (key, updatedFish) => {
        //take a copy of the current state
        const fishes = {...this.state.fishes};
        // update the state
        fishes[key] = updatedFish;
        // set that to state
        this.setState({ fishes });
    }
    deleteFish = (key) => {
        // take a copy of state
        const fishes = { ...this.state.fishes };
        // update the state
        fishes[key] = null;
        // update state
        this.setState({ fishes });
    }
    render() {
        return (
            <div className='catch-of-the-day'>
                <div className='menu'>
                    <Header tagline='Fresh Seafood Market'/>
                    <ul className='fishes'>
                        {Object.keys(this.state.fishes).map(key => (
                        <Fish 
                        key={key} 
                        index={key}
                        details={this.state.fishes[key]} 
                        addToOrder={this.addToOrder}  
                        />
                        ))}
                    </ul>
                </div>
                <Order fishes={this.state.fishes} order={this.state.order} 
                RemoveFromOrder={this.RemoveFromOrder}/>
                <Inventory 
                updateFish={this.updateFish}
                addFishes={this.addFishes}
                deleteFish ={this.deleteFish}
                loadSampleFishes={this.loadSampleFishes}
                fishes={this.state.fishes}
                storeId={this.props.match.params.storeId}
                />
            </div>
        )
    }
}

export default App;
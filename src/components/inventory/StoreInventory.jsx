import React from 'react';
import PropTypes from 'prop-types';
import AddFish from '../addfish/addFishForm'
import EditFish from '../editfish/EditFish';
import Login from '../login/Login';
import base, { firebaseApp } from "../../base";
import firebase from 'firebase';

class StoreInventory extends React.Component {
    static propTypes = {
        fishes: PropTypes.object,
        updateFish: PropTypes.func,
        deleteFish: PropTypes.func,
        loadSampleFishes: PropTypes.func
    };

    state = {
        uid: null,
        owner: null
    };

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if(user) {
                this.authHandler({ user });
            }
        })
    }

    authHandler = async (authData) => {
        // Look up the current store in the firebase database
        const store = await base.fetch(this.props.storeId, { context: this });
        // claim it if there is no owner
        if (!store.owner) {
            //save as our own
            await base.post(`${this.props.storeId}/owner`,{
                data: authData.user.uid
            });
        }
        // set the state of the inventory component to reflect the current user
        this.setState({
            uid: authData.user.uid,
            owner: store.owner || authData.user.uid
        });
        console.log(authData)
    }

    authenticate = (provider) => {
        const authProvider = new firebase.auth[`${provider}AuthProvider`]();
        firebaseApp.auth().signInWithPopup(authProvider).then(this.authHandler);
    };

    logout = async () => {
        console.log('Logging out!');
        await firebase.auth().signOut();
        this.setState({ uid: null });
    }

    render() {
        const logout = <button onClick={this.logout}>Log Out</button>
        // check if logged in
        if (!this.state.uid) {
         return <Login authenticate={this.authenticate} />   
        }
        if (this.state.uid !== this.state.owner) {
            return <div>Sorry you are not the owner</div>
            {logout}
        }
        return (
            <div className='inventory'>
                <h2>Inventory</h2>
                {logout}
                {Object.keys(this.props.fishes).map(key => (
                    <EditFish 
                    key={key} 
                    index={key}
                    fish={this.props.fishes[key]}
                    updateFish={this.props.updateFish}
                    deleteFish={this.props.deleteFish}
                    />
                    ))}
                    <AddFish addFishes={this.props.addFishes}/>
                    <button onClick={this.props.loadSampleFishes}>Load Sample Fishes</button>
            </div>
        )
    }
}

export default StoreInventory;
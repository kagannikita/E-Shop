import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { logout, update } from '../actions/UserActions';
import { listMyOrders } from '../actions/OrderActions';
import { useDispatch, useSelector } from 'react-redux';

function ProfileScreen(props) {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [phone_number, setPhone_number] = useState('');
    const dispatch = useDispatch();

    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;
    const handleLogout = () => {
        dispatch(logout());
        props.history.push("/signin");
    }
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(update({ userId: userInfo._id, email,phone_number, name, password }))
    }
    const userUpdate = useSelector(state => state.userUpdate);
    const { loading, success, error } = userUpdate;

    const myOrderList = useSelector(state => state.myOrderList);
    const { loading: loadingOrders, orders, error: errorOrders } = myOrderList;
    useEffect(() => {
        if (userInfo) {
            console.log(userInfo)
            setEmail(userInfo.email);
            setName(userInfo.name);
            setPassword(userInfo.password);
            setPhone_number(userInfo.phone_number);
        }
        dispatch(listMyOrders());
        return () => {

        };
    }, [userInfo])

    return <div className="profile">
        <div className="profile-info">
            <div className="form">
                <form onSubmit={submitHandler} >
                    <ul className="form-container">
                        <li>
                            <h2>User Profile</h2>
                        </li>
                        <li>
                            {loading && <div>Loading...</div>}
                            {error && <div>{error}</div>}
                            {success && <div>Profile Saved Successfully.</div>}
                        </li>
                        <li>
                            <label htmlFor="name">
                                Name
                            </label>
                            <input value={name} type="name" name="name" id="name" onChange={(e) => setName(e.target.value)}>
                            </input>
                        </li>
                        <li>
                            <label htmlFor="email">
                                Email
                            </label>
                            <input value={email} type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)}>
                            </input>
                        </li>
                        <li>
                            <label htmlFor="email">
                                Phone number
                            </label>
                            <input value={phone_number} type="phone_number" name="phone_number" id="phone_number" onChange={(e) => setPhone_number(e.target.value)}>
                            </input>
                        </li>
                        <li>
                            <label htmlFor="password">Password</label>
                            <input value={password} type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)}>
                            </input>
                        </li>

                        <li>
                            <button type="submit" className="button primary">Update</button>
                        </li>
                        <li>

                            <button type="button" onClick={handleLogout} className="button secondary full-width">Logout</button>
                        </li>

                    </ul>
                </form>
            </div>
        </div>
        <div className="profile-orders content-margined">
            {
                loadingOrders ? <div>Loading...</div> :
                    errorOrders ? <div>{errorOrders} </div> :
                        <table className="table">
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>DATE</th>
                                <th>TOTAL</th>
                                <th>PAID</th>
                                <th>ACTIONS</th>
                            </tr>
                            </thead>
                            <tbody>
                            {orders.map(order => <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.deliveredAt}</td>
                                <td>{order.totalPrice}</td>
                                <td>{order.isPaid}</td>
                                <td>
                                    <Link to={"/order/" + order._id}>DETAILS</Link>
                                </td>
                            </tr>)}
                            </tbody>
                        </table>
            }
        </div>
    </div>

}

export default ProfileScreen;
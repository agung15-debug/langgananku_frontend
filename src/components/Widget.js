import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Toast } from 'react-bootstrap'
import { logout } from '../actions/userActions'
import { useState } from 'react'
import io from 'socket.io-client'
import { listOrders } from '../actions/orderActions'

const Widget = () => {
    const dispatch = useDispatch()

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const orderList = useSelector((state) => state.orderList)
    const { loading, error, orders } = orderList

    const logoutHandler = () => {
        dispatch(logout())
    }

    const [showToast, setShowToast] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listOrders())
        }
    }, [dispatch, userInfo])

    const handleButtonClick = () => {
        setShowToast(true);
        setShowAlert(false);
    };

    const handleMouseEnter = () => {
        setShowToast(true);
    };

    const handleMouseLeave = () => {
        setShowToast(false);
    };

    const socket = io('http://localhost:5000', {});

    useEffect(() => {
        socket.on('orderCreated', (order) => {
            // console.log('New order created:', order);
            setShowAlert(true);
            setShowToast(true)
            setTimeout(() => {
                setShowToast(false);
            }, 3000);
        });

        return () => {
            socket.off('orderCreated');
        };
    }, []);

    return (
        <>
            {userInfo?.isAdmin && (
                <div className='widget-container'>
                    <Button
                        className="widget-button position-fixed bottom-0 rounded-circle"
                        variant="transparent"
                        onClick={handleButtonClick}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        style={{
                            border: 'none',
                            backgroundColor: showAlert ? 'rgba(255, 170, 0, 0.7)' : 'rgba(128, 128, 128, 0.5)',
                            height: '50px',
                            width: '50px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            right: '50px',
                            bottom: '50px',
                            zIndex: 1
                        }}
                    >
                        <i className="fas fa-bell"></i>
                        <Toast
                            show={showToast}
                            onClose={() => setShowToast(false)}
                            style={{
                                position: 'absolute',
                                top: '-97px',
                                left: '-270px',
                                backgroundColor: 'rgba(128, 128, 128, 0.7)',
                                zIndex: 2,
                                width: '300px'
                            }}
                        >
                            <Toast.Header closeButton={false}>
                                {showAlert ? (
                                    <strong className="mr-auto">New Orders !!</strong>
                                ) : (
                                    <strong className="mr-auto">Uncompleted Orders !!</strong>
                                )}
                            </Toast.Header>
                            {showAlert ? (
                                <Toast.Body>
                                    Great news! You've received a{' '}
                                    <a href="/admin/salelist" style={{ color: "white", fontWeight: "bold", textDecoration: "underline" }}>new order</a>.{' '}
                                    Take a look!
                                </Toast.Body>
                            ) : ( //orders?.filter(order => order.isDone === false).length
                                <Toast.Body>
                                    You have {orders?.length} uncompleted orders. Click{' '}
                                    <a href="/admin/salelist" style={{ color: "white", fontWeight: "bold", textDecoration: "underline" }}>here</a>{' '}
                                    to see them all.
                                </Toast.Body>
                            )}
                        </Toast>
                    </Button>
                </div>
            )}
        </>
    )
}

export default Widget
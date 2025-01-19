import { Outlet, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';
import TabView from '../components/TabView';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { addTab } from '../store/reducers/tabSlice';

const MainLayout = () => {
    const location = useLocation();
    const dispatch = useDispatch();

    useEffect(() => {
        // Add the current route as a tab
        const pageName = location.pathname === '/' ? 'Home' : location.pathname.slice(1).charAt(0).toUpperCase() + location.pathname.slice(2);
        dispatch(addTab({ path: location.pathname, name: pageName }));
    }, [location, dispatch]);

    return (
        <div style={{ display: 'flex' }}>
            <Sidebar />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                <Header />
                <TabView />
                <main style={{
                    flex: 1,
                    padding: '20px',
                    paddingTop: '100px', // Adjust this based on the height of the header + tab bar
                }}>
                    <Outlet />
                </main>
                <Footer />
            </div>
        </div>
    );
};

export default MainLayout;

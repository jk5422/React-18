import { useSelector, useDispatch } from 'react-redux';
import { closeTab, setActiveTab } from '../store/reducers/tabSlice';
import { useNavigate } from 'react-router-dom';

const TabView = () => {
    const { tabs, activeTab } = useSelector((state) => state.tabs);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleTabClick = (path) => {
        dispatch(setActiveTab(path));
        navigate(path);
    };

    const handleTabClose = (e, path) => {
        e.stopPropagation();
        dispatch(closeTab(path));
    };

    return (
        <div
            style={{
                position: 'fixed', // Ensures the tabs are always visible
                top: '67px',       // Adjust this to match the height of your header
                left: '241px',     // Matches the width of the sidebar
                right: 0,          // Stretch to the right edge
                display: 'flex',
                padding: '10px',
                background: '#f0f0f0',
                borderBottom: '1px solid #ddd',
                zIndex: 1000,      // Ensures it stays above other elements
                overflowX: 'auto', // Allows horizontal scrolling if tabs exceed the width
            }}>
            {tabs.map((tab) => (
                <div
                    key={tab.path}
                    style={{
                        padding: '5px 15px',
                        marginRight: '10px',
                        background: activeTab === tab.path ? '#007bff' : '#e0e0e0',
                        color: activeTab === tab.path ? 'white' : '#333',
                        borderRadius: '15px',
                        display: 'flex',
                        alignItems: 'center',
                        cursor: 'pointer',
                        whiteSpace: 'nowrap', // Prevents text wrapping
                        boxShadow: activeTab === tab.path ? '0px 2px 5px rgba(0, 0, 0, 0.2)' : 'none',
                        transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
                    }}
                    onClick={() => handleTabClick(tab.path)}
                >
                    <span>{tab.name}</span>
                    <button
                        onClick={(e) => handleTabClose(e, tab.path)}
                        style={{
                            marginLeft: '10px',
                            background: 'transparent',
                            border: 'none',
                            color: 'inherit',
                            cursor: 'pointer',
                            fontWeight: 'bold',
                            fontSize: '16px',
                        }}
                    >
                        &times;
                    </button>
                </div>
            ))}
        </div>
    );
};

export default TabView;

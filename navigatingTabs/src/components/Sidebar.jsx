import { NavLink } from "react-router-dom";

const Sidebar = () => {
    return (
        <aside style={{ width: '200px', background: '#f4f4f4', padding: '20px', height: '100vh' }}>
            <nav>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    <li><NavLink to="/" style={({ isActive }) => ({ textDecoration: 'none', color: isActive ? 'blue' : 'black' })}>Home</NavLink></li>
                    <li><NavLink to="/about" style={({ isActive }) => ({ textDecoration: 'none', color: isActive ? 'blue' : 'black' })}>About</NavLink></li>
                    <li><NavLink to="/contact" style={({ isActive }) => ({ textDecoration: 'none', color: isActive ? 'blue' : 'black' })}>Contact</NavLink></li>
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;

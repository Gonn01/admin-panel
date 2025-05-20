import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import './Navbar.css';

export default function Navbar({ collapsed, onToggleSidebar }) {
    return (
        <header className="navbar">
            <button
                className="toggle-btn"
                onClick={onToggleSidebar}
                aria-label="Toggle sidebar"
            >
                {collapsed ? <MenuIcon /> : <MenuOpenIcon />}
            </button>
            <h1 className="title">Dashboard</h1>
            <div className="user-info">Admin</div>
        </header>
    );
}

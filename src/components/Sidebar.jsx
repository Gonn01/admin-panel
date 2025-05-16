// Sidebar.jsx
import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
    List, ListItemButton, ListItemIcon, ListItemText, Collapse,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './Sidebar.css';

const ExpandIcon = styled(ExpandMoreIcon, {
    shouldForwardProp: (prop) => prop !== 'expand',
})(({ theme, expand }) => ({
    transform: expand ? 'rotate(180deg)' : 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function Sidebar({ collapsed, children }) {
    const { pathname } = useLocation();
    const menuConfig = React.useMemo(
        () => (Array.isArray(children) ? children : []),
        [children]
    );
    const [open, setOpen] = useState({});

    useEffect(() => {
        if (collapsed) setOpen({});
    }, [collapsed]);

    useEffect(() => {
        if (!collapsed) {
            const active = menuConfig.find(item =>
                (item.to === pathname) ||
                (item.children?.some(ch => ch.to === pathname))
            );
            if (active) {
                setOpen({ [active.key]: true });
            }
        }
    }, [collapsed, pathname, menuConfig]);

    const toggleSection = key => {
        setOpen(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <nav className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
            <div style={{ height: 60 }} />
            <List disablePadding>
                {menuConfig.map(({ key, label, Icon, to, exact, children: subs }) => (
                    <React.Fragment key={key}>
                        <ListItemButton
                            component={(!subs && to) ? NavLink : 'div'}
                            to={(!subs && to) ? to : undefined}
                            end={exact}
                            selected={
                                subs
                                    ? subs.some(ch => ch.to === pathname)
                                    : (to === pathname)
                            }
                            onClick={() => subs && toggleSection(key)}
                        >
                            <ListItemIcon>
                                <Icon style={{ padding: '8px 0' }} />
                            </ListItemIcon>
                            {!collapsed && <ListItemText primary={label} />}
                            {!collapsed && subs && (
                                <ExpandIcon expand={open[key] ? 1 : 0} />
                            )}
                        </ListItemButton>

                        {subs && (
                            <Collapse in={!!open[key]} timeout={300} unmountOnExit>
                                <List disablePadding>
                                    {subs.map(sub => (
                                        <ListItemButton
                                            key={sub.to}
                                            component={NavLink}
                                            to={sub.to}
                                            end={sub.exact}
                                            selected={pathname === sub.to}
                                            sx={{ pl: 4 }}
                                        >
                                            {sub.Icon && (
                                                <ListItemIcon>
                                                    <sub.Icon fontSize="small" />
                                                </ListItemIcon>
                                            )}
                                            <ListItemText
                                                primary={sub.label}
                                                primaryTypographyProps={{ noWrap: true }}
                                            />
                                        </ListItemButton>
                                    ))}
                                </List>
                            </Collapse>
                        )}
                    </React.Fragment>
                ))}
            </List>
        </nav>
    );
}

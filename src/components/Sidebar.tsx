import  { useState, useEffect,Fragment } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './Sidebar.css';

// Interfaces para items y subitems del menú
export interface SubMenuItem {
  key?: string;
  label: string;
  to: string;
  exact?: boolean;
  Icon?: React.ElementType;
}

export interface MenuItem {
  key: string;
  label: string;
  Icon: React.ElementType;
  to?: string;
  exact?: boolean;
  children?: SubMenuItem[];
}

export interface SidebarProps {
  collapsed: boolean;
  menuConfig: MenuItem[];
}

// Icono expandible con prop expand de tipo boolean
const ExpandIcon = styled(ExpandMoreIcon, {
  shouldForwardProp: prop => prop !== 'expand',
})<{ expand: boolean }>(({ theme, expand }) => ({
  transform: expand ? 'rotate(180deg)' : 'rotate(0deg)',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const Sidebar: React.FC<SidebarProps> = ({ collapsed, menuConfig }) => {
  const { pathname } = useLocation();
  const [open, setOpen] = useState<Record<string, boolean>>({});

  // Cerrar secciones al colapsar sidebar
  useEffect(() => {
    if (collapsed) {
      setOpen({});
    }
  }, [collapsed]);

  // Abrir automáticamente la sección activa
  useEffect(() => {
    if (!collapsed) {
      const active = menuConfig.find(item =>
        item.to === pathname ||
        item.children?.some(ch => ch.to === pathname)
      );
      if (active) {
        setOpen({ [active.key]: true });
      }
    }
  }, [collapsed, pathname, menuConfig]);

  const toggleSection = (key: string) => {
    setOpen(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <nav className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div style={{ height: 60 }} />
      <List disablePadding>
        {menuConfig.map(item => {
          const { key, label, Icon, to, exact, children: subs } = item;
          const hasSubs = Array.isArray(subs) && subs.length > 0;

          return (
            <Fragment key={key}>
              <ListItemButton
                component={hasSubs || !to ? 'div' : NavLink}
                {...(!hasSubs && to
                  ? { to, end: exact }
                  : {})}
                selected={
                  hasSubs
                    ? subs!.some(ch => ch.to === pathname)
                    : to === pathname
                }
                onClick={hasSubs ? () => toggleSection(key) : undefined}
              >
                <ListItemIcon>
                  <Icon />
                </ListItemIcon>
                {!collapsed && <ListItemText primary={label} />}
                {!collapsed && hasSubs && (
                  <ExpandIcon expand={Boolean(open[key])} />
                )}
              </ListItemButton>

              {hasSubs && (
                <Collapse in={open[key]} timeout={300} unmountOnExit>
                  <List disablePadding>
                    {subs!.map(sub => (
                      <ListItemButton
                        key={sub.key ?? sub.to}
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
            </Fragment>
          );
        })}
      </List>
    </nav>
  );
};

export default Sidebar;

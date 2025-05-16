// menuConfig.js
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import FormatListBulletedRoundedIcon from '@mui/icons-material/FormatListBulleted';

export const menuConfig = [
    {
        key: 'inicio',
        label: 'Inicio',
        Icon: HomeIcon,
        to: '/',
        exact: true,
        children: [
            { label: 'Panel principal', to: '/', exact: true },
        ],
    },
    {
        key: 'usuarios',
        label: 'Usuarios',
        Icon: PeopleIcon,
        children: [
            { label: 'Crear usuario', to: '/users/new' },
            { label: 'Listado de usuarios', to: '/users' },
        ],
    },
    {
        key: 'configuracion',
        label: 'Configuración',
        Icon: SettingsIcon,
        children: [
            { label: 'Preferencias', to: '/settings/preferences' },
            { label: 'Seguridad', to: '/settings/security' },
        ],
    },
    {
        key: 'ticket2',
        label: 'Ticket',
        Icon: ConfirmationNumberIcon,
        children: [
            { label: 'Crear ticket', to: '/ticket/create', Icon: AddRoundedIcon },
            { label: 'Listado de tickets', to: '/ticket/list', Icon: FormatListBulletedRoundedIcon },
        ],
    },
    {
        key: 'ticket3',
        label: 'Ticket',
        Icon: ConfirmationNumberIcon,
        children: [
            { label: 'Crear ticket', to: '/ticket/create2', Icon: AddRoundedIcon },
            { label: 'Listado de tickets', to: '/ticket/list2', Icon: FormatListBulletedRoundedIcon },
        ],
    },
    {
        key: 'ticket4',
        label: 'Ticket',
        Icon: ConfirmationNumberIcon,
        children: [
            { label: 'Crear ticket', to: '/ticket/create3', Icon: AddRoundedIcon },
            { label: 'Listado de tickets', to: '/ticket/list3', Icon: FormatListBulletedRoundedIcon },
        ],
    },
    {
        key: 'ticket5',
        label: 'Ticket',
        Icon: ConfirmationNumberIcon,
        children: [
            { label: 'Crear ticket', to: '/ticket/create4', Icon: AddRoundedIcon },
            { label: 'Listado de tickets', to: '/ticket/list4', Icon: FormatListBulletedRoundedIcon },
        ],
    },
];

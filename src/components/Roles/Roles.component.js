import React from 'react';

import './Roles.scss';

const Roles = (props) => {
    return (
        <div className='Roles'>
            <div className='Roles__container'>
                <div className='Roles__names'>
                    <span/>
                    {roles.map((r, i) => (<span key={i}>{r.name}</span>))}
                </div>
                <div className='Roles__table'>
                    {LIST_PERMISSIONS.map((p, i) => (
                        <span key={i} className='Roles__table-cell'>{p.name}</span>
                    ))}
                    {roles.map((r, i) => (
                        <div key={i} className='Roles__table-row'>
                            {LIST_PERMISSIONS.map((p,i) => (
                                <div className='Roles__table-cell Roles__crud' key={i}>
                                    <button data-active={r.permissions[p.field].create}>C</button>
                                    <button data-active={r.permissions[p.field].read}>R</button>
                                    <button data-active={r.permissions[p.field].update}>U</button>
                                    <button data-active={r.permissions[p.field].delete}>D</button>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
                <div>
                    actions
                </div>
            </div>
        </div>
    );
};
const LIST_PERMISSIONS = [
    {
        name: 'Модель',
        field: 'model',
    },
    {
        name: 'Работы',
        field: 'works',
    },
    {
        name: 'Ресурсы',
        field: 'resources',
    },
    {
        name: 'Технология',
        field: 'technology',
    },
    {
        name: 'График',
        field: 'charts',
    },
    {
        name: 'Тендер',
        field: 'tender',
    },
    {
        name: 'Журнал',
        field: 'report',
    },
];
const roles = [
    {
        name: 'Прораб',
        permissions: {
            'model': {
                'create': true,
                'read': true,
                'update': true,
                'delete': true,
                '_id': '5e4eff419badd700155f3a4d',
                'id': 'model',
            },
            'works': {
                'create': true,
                'read': true,
                'update': true,
                'delete': true,
                '_id': '5e4eff419badd700155f3a4c',
                'id': 'works',
            },
            'technology': {
                'create': true,
                'read': true,
                'update': true,
                'delete': true,
                '_id': '5e4eff419badd700155f3a4b',
                'id': 'technology',
            },
            'resources': {
                'create': true,
                'read': true,
                'update': true,
                'delete': true,
                '_id': '5e4eff419badd700155f3a4a',
                'id': 'resources',
            },
            'charts': {
                'create': false,
                'read': true,
                'update': false,
                'delete': false,
                '_id': '5e4eff419badd700155f3a49',
                'id': 'charts',
            },
            'execution_log': {
                'create': false,
                'read': true,
                'update': false,
                'delete': false,
                '_id': '5e4eff419badd700155f3a48',
                'id': 'execution_log',
            },
            'execution': {
                'create': false,
                'read': true,
                'update': false,
                'delete': false,
                '_id': '5e4eff419badd700155f3a47',
                'id': 'execution',
            },
            'report': {
                'create': false,
                'read': true,
                'update': false,
                'delete': false,
                '_id': '5e4eff419badd700155f3a46',
                'id': 'report',
            },
            'tender': {
                'create': false,
                'read': true,
                'update': false,
                'delete': false,
                '_id': '5e4eff419badd700155f3a45',
                'id': 'tender',
            },
            'suppliers': {
                'create': false,
                'read': true,
                'update': false,
                'delete': false,
                '_id': '5e4eff419badd700155f3a44',
                'id': 'suppliers',
            },
            'documents': {
                'create': false,
                'read': true,
                'update': false,
                'delete': false,
                '_id': '5e4eff419badd700155f3a43',
                'id': 'documents',
            },
            'exploitation': {
                'create': false,
                'read': true,
                'update': false,
                'delete': false,
                '_id': '5e4eff419badd700155f3a42',
                'id': 'exploitation',
            },
            'prices': {
                'create': false,
                'read': true,
                'update': false,
                'delete': false,
                '_id': '5e4eff419badd700155f3a41',
                'id': 'prices',
            },
        },
    },
    {
        name: 'Специалист по закупкам',
        permissions: {
            'model': {
                'create': true,
                'read': true,
                'update': true,
                'delete': true,
                '_id': '5e4eff419badd700155f3a4d',
                'id': 'model',
            },
            'works': {
                'create': true,
                'read': true,
                'update': true,
                'delete': true,
                '_id': '5e4eff419badd700155f3a4c',
                'id': 'works',
            },
            'technology': {
                'create': true,
                'read': true,
                'update': true,
                'delete': true,
                '_id': '5e4eff419badd700155f3a4b',
                'id': 'technology',
            },
            'resources': {
                'create': true,
                'read': true,
                'update': true,
                'delete': true,
                '_id': '5e4eff419badd700155f3a4a',
                'id': 'resources',
            },
            'charts': {
                'create': false,
                'read': true,
                'update': false,
                'delete': false,
                '_id': '5e4eff419badd700155f3a49',
                'id': 'charts',
            },
            'execution_log': {
                'create': false,
                'read': true,
                'update': false,
                'delete': false,
                '_id': '5e4eff419badd700155f3a48',
                'id': 'execution_log',
            },
            'execution': {
                'create': false,
                'read': true,
                'update': false,
                'delete': false,
                '_id': '5e4eff419badd700155f3a47',
                'id': 'execution',
            },
            'report': {
                'create': false,
                'read': true,
                'update': false,
                'delete': false,
                '_id': '5e4eff419badd700155f3a46',
                'id': 'report',
            },
            'tender': {
                'create': false,
                'read': true,
                'update': false,
                'delete': false,
                '_id': '5e4eff419badd700155f3a45',
                'id': 'tender',
            },
            'suppliers': {
                'create': false,
                'read': true,
                'update': false,
                'delete': false,
                '_id': '5e4eff419badd700155f3a44',
                'id': 'suppliers',
            },
            'documents': {
                'create': false,
                'read': true,
                'update': false,
                'delete': false,
                '_id': '5e4eff419badd700155f3a43',
                'id': 'documents',
            },
            'exploitation': {
                'create': false,
                'read': true,
                'update': false,
                'delete': false,
                '_id': '5e4eff419badd700155f3a42',
                'id': 'exploitation',
            },
            'prices': {
                'create': false,
                'read': true,
                'update': false,
                'delete': false,
                '_id': '5e4eff419badd700155f3a41',
                'id': 'prices',
            },
        },
    },
];


export default Roles;

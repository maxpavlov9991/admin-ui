import React from 'react';

import './Roles.scss';

const Roles = (props) => {

    const handleChangePermission = (roleName, field, permission) => {
        props.changePermission(roleName, field, permission)
    }

    return (
        <div className='Roles'>
            <div className='Roles__container'>
                <div className='Roles__names'>
                    <span/>
                    {props.roles.map((r, i) => (<span key={i}>{r.name}</span>))}
                </div>
                <div className='Roles__table'>
                    {LIST_PERMISSIONS.map((p, i) => (
                        <span key={i} className='Roles__table-cell'>{p.name}</span>
                    ))}
                    {props.roles.map((r, i) => (
                        <div key={i} className='Roles__table-row'>
                            {LIST_PERMISSIONS.map((p,i) => (
                                <div className='Roles__table-cell Roles__crud' key={i}>
                                    <button data-active={r.permissions[p.field].create} onClick={() => handleChangePermission(r.name, p.field, 'create')}>C</button>
                                    <button data-active={r.permissions[p.field].read} onClick={() => handleChangePermission(r.name, p.field, 'read')}>R</button>
                                    <button data-active={r.permissions[p.field].update} onClick={() => handleChangePermission(r.name, p.field, 'update')}>U</button>
                                    <button data-active={r.permissions[p.field].delete} onClick={() => handleChangePermission(r.name, p.field, 'delete')}>D</button>
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

export default Roles;

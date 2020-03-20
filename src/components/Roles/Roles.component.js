import React, { useState } from 'react';
import { cloneDeep } from 'lodash'

import './Roles.scss';
import { createNewRole } from '../../store/actions/rolesActions';

const Roles = (props) => {
    const [newRole, setNewRole] = useState(null)

    const handleChangePermission = (roleName, field, permission) => {
        props.changePermission(roleName, field, permission)
    }

    const handleCreateNewRole = (role) => {
        setNewRole(role)
    }

    const handleChangeNewRoleName = (event) => {
        setNewRole({
            permissions: cloneDeep(newRole.permissions),
            name: event.target.value,
        })
    }

    const handleOnBlurNewRole = (event) => {
        props.createRole(newRole)
        setNewRole(null)
    }

    const handleChangeNewRolePermission = (field, permission) => {
        const newRoleState = cloneDeep(newRole)
        const newField = newRoleState.permissions[field]
        newField[permission] = !newField[permission]
        setNewRole(newRoleState)
    }

    return (
        <div className='Roles'>

<button onClick={() => console.log(newRole)}>a</button>
            <div className='Roles__container'>
                <div className='Roles__names'>
                    <span/>
                    {props.roles.map((r, i) => (<span key={i}>{r.name}</span>))}
                    {newRole && <input autoFocus onChange={handleChangeNewRoleName} onBlur={handleOnBlurNewRole} value={newRole.name}></input>}
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
                    {newRole && (
                        <div className='Roles__table-row'>
                            {LIST_PERMISSIONS.map((p,i) => (
                                <div className='Roles__table-cell Roles__crud' key={i}>
                                    <button data-active={newRole.permissions[p.field].create} onClick={() => handleChangeNewRolePermission(p.field, 'create')}>C</button>
                                    <button data-active={newRole.permissions[p.field].read} onClick={() => handleChangeNewRolePermission(p.field, 'read')}>R</button>
                                    <button data-active={newRole.permissions[p.field].update} onClick={() => handleChangeNewRolePermission(p.field, 'update')}>U</button>
                                    <button data-active={newRole.permissions[p.field].delete} onClick={() => handleChangeNewRolePermission(p.field, 'delete')}>D</button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div className='Roles__actions'>
                    <span>actions</span>
                    {props.roles.map((r, i) => (
                        <button key={i} onClick={() => handleCreateNewRole(r)}>CR</button>
                    ))}
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

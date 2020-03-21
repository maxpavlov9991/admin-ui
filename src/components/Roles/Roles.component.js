import React, { useState, useEffect } from 'react';
import { cloneDeep } from 'lodash'

import defaultRole from './defaultRole'
import PermissionButton from '../BaseComponents/PermissionButton'
import ActionButton from '../BaseComponents/ActionButton'


import './Roles.css';



const Roles = (props) => {
    useEffect(() => {
        props.loadData()
        props.loadList()
    }, [])

    const [newRole, setNewRole] = useState(null)

    const handleChangePermission = (name, field) => {
        props.changePermission(name, field)
    }

    const handleCreateNewRole = (role) => {
        setNewRole((role) ? { name: '', permissions: role.permissions} : defaultRole)
    }

    const handleChangeNewRoleName = (event) => {
        setNewRole({
            permissions: cloneDeep(newRole.permissions),
            name: event.target.value,
        })
    }

    const handleOnBlurNewRole = () => {
        props.createRole(newRole)
        setNewRole(null)
    }

    const handleEnterKeyDown = (event) => {
        if (event.keyCode === 13) {
            props.createRole(newRole)
            setNewRole(null)
        }
    }

    const handleDeleteRole = (name) => {
        props.deleteRole(name)
    }

    const handleChangeNewRolePermission = (field, permission) => {
        const newRoleState = cloneDeep(newRole)
        const newField = newRoleState.permissions[field]
        newField[permission] = !newField[permission]
        setNewRole(newRoleState)
    }

    const calcVariant = (field) => {
        return (field.create && field.read && field.update && field.delete) ? 'edit'
            : (field.read) ? 'read'
            : 'noaccess'
    }

    return (
        <div className='table'>
            <div className='table-header'>
                <div className='row-name'>Names</div>
                <div className='row-field'>
                    {props.permissions.map((p, i) => (
                        <span key={i}>
                            {p.name}
                        </span>
                    ))}
                </div>
                <div className='row-action'>Actions</div>
            </div>
            <div className='table-body'>
                {props.roles.map((r, i) => (
                    <div key={i} className='table-row'>
                        <div className='row-name'>
                            <span>{r.name}</span>
                        </div>
                        <div className='row-field'>
                            {props.permissions.map((p, i) => (
                                <div key={i} className='field-item'>
                                    <PermissionButton variant={calcVariant(r.permissions[p.field])} onClick={() => handleChangePermission(r.name, p.field)}/>
                                </div>
                            ))}
                        </div>
                        <div className='row-action'>
                            <ActionButton variant='create' onClick={() => handleCreateNewRole(r)}>CR</ActionButton>
                            <ActionButton variant='delete' onClick={() => handleDeleteRole(r.name)}>RM</ActionButton>
                        </div>
                    </div>
                ))}
                {newRole && (<div className='table-row newRow'>
                    <div className='row-name'>
                        {newRole &&
                            <input autoFocus onChange={handleChangeNewRoleName} onBlur={handleOnBlurNewRole} onKeyDown={handleEnterKeyDown} value={newRole.name}></input>}
                    </div>
                    <div className='row-field'>
                        {props.permissions.map((p, i) => (
                            <div key={i} className='field-item'>
                                <PermissionButton variant={calcVariant(newRole.permissions[p.field])} onClick={() => handleChangePermission(r.name, p.field)}/>
                            </div>
                        ))}
                    </div>
                </div>)}
                {!newRole && 
                <div>
                    <div className='table-row row-btn'>
                        <div className='row-name'>
                            <button onClick={() => handleCreateNewRole(null)}>Добавить</button>
                        </div>
                        <div className='row-description'>
                            <span>Добавить новую роль со стандартными значениями</span>
                        </div>
                    </div>
                    <div className='table-row row-btn'>
                        <div className='row-name'>
                            <button onClick={() => {console.log(props)}}>Создать</button>
                        </div>
                        <div className='row-description'>
                            <span>Нажмите кнопку "Создать" и выберите существующую роль</span>
                        </div>
                    </div>
                </div>}
            </div>
        </div>
    )
    }

export default Roles;

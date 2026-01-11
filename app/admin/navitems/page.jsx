"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { DragHandle as DragHandleIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import styles from '../../../AdminStyles/NavItems.module.css';

const NavItemsPage = () => {
    const [navItems, setNavItems] = useState([]);
    const [name, setName] = useState('');
    const [path, setPath] = useState('');
    const [parent, setParent] = useState('');
    const [editingItem, setEditingItem] = useState(null);

    useEffect(() => {
        fetchNavItems();
    }, []);

    const fetchNavItems = async () => {
        try {
            const { data } = await axios.get('/api/admin/navitems');
            setNavItems(data);
        } catch (error) {
            console.error('Error fetching nav items:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newNavItem = { name, path, parent: parent || null };

        if (editingItem) {
            try {
                await axios.put(`/api/admin/navitems/${editingItem._id}`, newNavItem);
                setEditingItem(null);
            } catch (error) {
                console.error('Error updating nav item:', error);
            }
        } else {
            try {
                await axios.post('/api/admin/navitems', newNavItem);
            } catch (error) {
                console.error('Error creating nav item:', error);
            }
        }
        resetForm();
        fetchNavItems();
    };

    const handleEdit = (item) => {
        setEditingItem(item);
        setName(item.name);
        setPath(item.path);
        setParent(item.parent || '');
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            try {
                await axios.delete(`/api/admin/navitems/${id}`);
                fetchNavItems();
            } catch (error) {
                console.error('Error deleting nav item:', error);
            }
        }
    };

    const resetForm = () => {
        setEditingItem(null);
        setName('');
        setPath('');
        setParent('');
    };

    const onDragEnd = async (result) => {
        if (!result.destination) return;
        const { source, destination } = result;
        const reorderedItems = Array.from(navItems);
        const [movedItem] = reorderedItems.splice(source.index, 1);
        reorderedItems.splice(destination.index, 0, movedItem);

        setNavItems(reorderedItems);

        const updatePromises = reorderedItems.map((item, index) =>
            axios.put(`/api/admin/navitems/${item._id}`, { ...item, order: index })
        );

        try {
            await Promise.all(updatePromises);
            fetchNavItems(); // Refetch to ensure order is correct
        } catch (error) {
            console.error('Error updating nav item order:', error);
            fetchNavItems();
        }
    };

    const renderNavItems = (parentId = null, level = 0) => {
        const items = navItems
            .filter(item => (item.parent || null) === parentId)
            .sort((a, b) => a.order - b.order);

        if (items.length === 0) return null;

        return (
            <Droppable droppableId={parentId || 'root'} type="NAV_ITEM">
                {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                        {items.map((item, index) => (
                            <Draggable key={item._id} draggableId={item._id} index={index}>
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        className={`${styles.navItem} ${snapshot.isDragging ? styles.isDragging : ''}`}
                                    >
                                        <div className={styles.navItemContent}>
                                            <div {...provided.dragHandleProps} className={styles.dragHandle}>
                                                <DragHandleIcon />
                                            </div>
                                            <div className={styles.navItemDetails}>
                                                {item.name} <span>({item.path})</span>
                                            </div>
                                        </div>
                                        <div className={styles.navItemActions}>
                                            <button onClick={() => handleEdit(item)} className={styles.editButton}><EditIcon /></button>
                                            <button onClick={() => handleDelete(item._id)} className={styles.deleteButton}><DeleteIcon /></button>
                                        </div>
                                        {renderNavItems(item._id, level + 1)}
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        );
    };


    return (
        <div className={styles.navItemsContainer}>
            <h1>Manage Navigation Menu</h1>
            <form onSubmit={handleSubmit} className={styles.navItemForm}>
                <h2>{editingItem ? 'Edit' : 'Add'} Menu Item</h2>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Path (e.g., /products)"
                    value={path}
                    onChange={(e) => setPath(e.target.value)}
                    required
                />
                <select value={parent} onChange={(e) => setParent(e.target.value)}>
                    <option value="">-- No Parent (Main Menu) --</option>
                    {navItems.filter(item => !item.parent).map(item => (
                        <option key={item._id} value={item._id}>{item.name}</option>
                    ))}
                </select>
                <div className={styles.formActions}>
                    <button type="submit">{editingItem ? 'Update' : 'Create'}</button>
                    {editingItem && <button type="button" onClick={resetForm}>Cancel</button>}
                </div>
            </form>

            <div className={styles.navItemList}>
                <h2>Current Menu</h2>
                <DragDropContext onDragEnd={onDragEnd}>
                    {renderNavItems()}
                </DragDropContext>
            </div>
        </div>
    );
};

export default NavItemsPage;

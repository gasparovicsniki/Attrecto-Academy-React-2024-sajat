import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { Page } from '../../components/page/Page';
import { BadgeModel } from '../../models/badges.model';
import { badgesService } from '../../services/badges.service';
import TextField from '../../components/text-field/TextField';
import { Button } from '../../components/button/Button';
import classes from './Badges.module.scss';

const BadgesPage = () => {
    const [badges, setBadges] = useState<BadgeModel[]>([]);
    const [formData, setFormData] = useState<Partial<BadgeModel>>({});
    const [editingId, setEditingId] = useState<number | null>(null);

    const fetchBadges = async () => {
        const fetchedBadges = await badgesService.getBadges();
        setBadges(fetchedBadges);
    };

    useEffect(() => {
        fetchBadges();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (editingId) {
            await badgesService.updateBadge(editingId, formData as BadgeModel);
        } else {
            await badgesService.addBadge(formData as BadgeModel);
        }
        setFormData({});
        setEditingId(null);
        fetchBadges();
    };

    const handleEdit = (badge: BadgeModel) => {
        setFormData(badge);
        setEditingId(badge.id);
    };

    const handleDelete = async (badgeId: number) => {
        await badgesService.deleteBadge(badgeId);
        fetchBadges();
    };

    return (
        <Page title="Badges">
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Name"
                    name="name"
                    value={formData.name || ''}
                    onChange={handleInputChange}
                />
                <TextField
                    label="Image URL"
                    name="image"
                    value={formData.image || ''}
                    onChange={handleInputChange}
                />
                <TextField
                    label="Description"
                    name="description"
                    value={formData.description || ''}
                    onChange={handleInputChange}
                />
                <Button type="submit">{editingId ? 'Update Badge' : 'Add Badge'}</Button>
            </form>

            <div className="row mt-4">
                {badges.map((badge) => (
                    <div key={badge.id} className="col-lg-4 col-md-6 col-sm-12">
                        <div className={classNames("d-flex box-shadow align-items-center", classes.Badge)}>
                            <div
                                className={classes.BadgeImage}
                                style={{ backgroundImage: `url(${badge.image})` }}
                            />
                            <div className='d-flex flex-column'>
                                <h5 className='ms-3'>{badge.name}</h5>
                                <p className='ms-3 text-black-50'>{badge.description}</p>
                            </div>
                            <div className="ms-3">
                                <Button onClick={() => handleEdit(badge)}>Edit</Button>
                                <Button onClick={() => handleDelete(badge.id)} color="danger">Delete</Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </Page>
    );
};

export default BadgesPage;

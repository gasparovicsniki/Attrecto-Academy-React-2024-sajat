import request, { Methods } from './../util/request';
import { BadgeModel } from '../models/badges.model';

class BadgesService {

    async getBadges(): Promise<BadgeModel[]> {
        return request<BadgeModel[]>({ method: Methods.GET, resource: 'badges' });
    }

    async addBadge(badge: BadgeModel): Promise<BadgeModel> {
        return request<BadgeModel>({
            method: Methods.POST,
            resource: 'badge',
            data: badge, 
        });
    }

    async updateBadge(badgeId: number, badge: BadgeModel): Promise<BadgeModel> {
        return request<BadgeModel>({
            method: Methods.PUT,
            resource: `badge/${badgeId}`, 
            data: badge, 
        });
    }

    async deleteBadge(badgeId: number): Promise<void> {
        return request<void>({
            method: Methods.DELETE,
            resource: `badge/${badgeId}`, 
        });
    }
}

export const badgesService = new BadgesService();

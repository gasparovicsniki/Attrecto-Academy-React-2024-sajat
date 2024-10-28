import React, { useCallback, useEffect, useState } from "react";

import { Page } from "../../components/page/Page";
import { UserModel } from "../../models/user.model";
import { userService } from "../../services/user.service";
import { Button } from "../../components/button/Button";
import { useNavigate } from "react-router-dom";
import UserCard from "../../components/user-card/UserCard";
import { BadgeModel } from "../../models/badges.model";
import { badgesService } from "../../services/badges.service";
import AccessController from "../../components/access-controller/AccessController";

const UsersPage = () => {
  const [users, setUsers] = useState<UserModel[]>([]);
  const [badges, setBadges] = useState<BadgeModel[]>([]);

  const navigate = useNavigate();

  const fetchUsers = useCallback(async () => {
    setUsers(await userService.getUsers());
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  useEffect(() => {
    const fetchBadges = async () => {
      setBadges(await badgesService.getBadges());
    };
    fetchBadges();
  }, []);

  const goToUserPage = () => {
    navigate("/user");
  };

  const handleDeleteUser = async (id: string | number) => {
    await userService.deleteUser(id);

    fetchUsers();
  };

  return (
    <Page title="Users">
      <AccessController allowedFor={["ADMIN"]}>
        <div className="row">
          <div className="col-12 col-sm-6 col-md-4 col-lg-3">
            <Button color="primary" className="w-100 mb-3" onClick={goToUserPage}>
              Create User
            </Button>
          </div>
        </div>
      </AccessController>
      <div className="row">
        {users.map((user) => (
          <div className="col-12 col-sm-6 col-md-4 col-lg-3 my-1">
            <UserCard
              user={user}
              handleDeleteUser={handleDeleteUser}
              badges={badges}
            />
          </div>
        ))}
      </div>
    </Page>
  );
};

export default UsersPage;

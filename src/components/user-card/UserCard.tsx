import React from "react";
import { UserModel } from "../../models/user.model";
import { BadgeModel } from "../../models/badges.model";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { Button } from "../button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import BadgeImage from "../badge-image/BadgeImage";

import classes from "./UserCard.module.scss";
import { hasPermission } from "../../util/hasPermission";
import AccessController from "../access-controller/AccessController";

interface UserCardProps {
  user: UserModel;
  badges: BadgeModel[];
  handleDeleteUser: (userId: string) => void;
}

const UserCard = ({ user, badges, handleDeleteUser }: UserCardProps) => {
  const { id, image, name, badges: userBadges } = user;

  const allowedUserChangeFor: Role[] = ["ADMIN"];

  const showLink = hasPermission(allowedUserChangeFor);

  const userCardContent = (<>
    <img
      src={image}
      alt={`user #${id}`}
      className={classNames(classes.UserImage, "card-img-top ")}
    />
    <div className={classNames("card-body", classes.CardBody)}>
      <h5 className={classes.UserName}>{name}</h5>
    </div>
    <AccessController allowedFor={allowedUserChangeFor}>
      <Button
        className={classes.DeleteIcon}
        onClick={(e) => {
          e.preventDefault();
          handleDeleteUser(id.toString());
        }}
      >
        <FontAwesomeIcon icon={faTrash} />
      </Button>
    </AccessController>
    <div className={classes.Badges}>
      {userBadges?.map((badge) => {
        const found = badges.find((item) => item.id === badge.id);

        return found ? (
          <BadgeImage
            small
            url={found.image}
            key={badge.id}
            className={classes.BadgeImage}
          />
        ) : null;
      })}
    </div>
  </>)

  return showLink ? (
    <Link to={`/user/${id}`} className={classNames("card", classes.UserCard)}>
      {userCardContent}
    </Link>
  ) : (
    <div className={classNames("card", classes.UserCard, classes.NotLink)}>
      {userCardContent}
    </div>
  );
};

export default UserCard;

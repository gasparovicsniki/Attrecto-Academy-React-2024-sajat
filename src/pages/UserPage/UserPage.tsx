import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Page } from "../../components/page/Page";
import { UserFormValues, UserModel } from "../../models/user.model";
import { BadgeModel } from "../../models/badges.model";
import TextField from "../../components/text-field/TextField";
import TagField from "../../components/tag-field/TagField";
import { badgesService } from "../../services/badges.service";
import { userService } from "../../services/user.service";
import { Button } from "../../components/button/Button";
import ProfileImagePreview from "../../components/profileImage-preview/ProfileImagePreview";
import UserCard from "../../components/user-card/UserCard";
import TableView from "../../components/user-card/TableView"; 

const schema = Yup.object({
  name: Yup.string().required(),
  image: Yup.string().required(),
  badges: Yup.array().required(),
});

export const UserPage = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<UserModel>();
  const [badges, setBadges] = useState<BadgeModel[]>([]);
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<"card" | "table">("card"); 

  const {
    register,
    control,
    handleSubmit,
    reset,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useForm<UserFormValues>({
    defaultValues: {
      name: "",
      image: "",
      badges: [],
    },
    resolver: yupResolver(schema),
  });

  const imageUrl = watch("image");

  useEffect(() => {
    const fetchUser = async (id: string | number) => {
      const response = await userService.geUser(id);
      setUser(response);
    };

    if (id) {
      fetchUser(id);
    }
  }, [id]);

  useEffect(() => {
    const fetchBadges = async () => {
      const response = await badgesService.getBadges();
      setBadges(response);
    };

    fetchBadges();
  }, []);

  useEffect(() => {
    reset({ name: user?.name, image: user?.image, badges: user?.badges });
  }, [reset, user?.badges, user?.image, user?.name]);

  const onSubmit = async (values: UserFormValues) => {
    if (user?.id) {
      await userService.updateUser(user.id, values);
    } else {
      await userService.createUser(values);
    }
    goToUsersPage();
  };

  const goToUsersPage = () => {
    navigate("/users");
  };

  const handleDeleteUser = (userId: string) => {
    console.log(`User ${userId} deleted`);
  };

  return (
    <Page title={user ? user.name : "User"}>
      <div>
        <Button
          color={viewMode === "card" ? "primary" : "secondary"}
          onClick={() => setViewMode("card")}
        >
          Card View
        </Button>
        <Button
          color={viewMode === "table" ? "primary" : "secondary"}
          onClick={() => setViewMode("table")}
          style={{ marginLeft: "10px" }}
        >
          Table View
        </Button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          name="name"
          label="Name"
          register={register}
          error={errors.name?.message}
        />

        <TextField
          name="image"
          label="Avatar url"
          register={register}
          error={errors.image?.message}
        />

        <ProfileImagePreview imageUrl={imageUrl} />

        <Controller
          name="badges"
          control={control}
          render={({ field }) => (
            <TagField
              {...field}
              label="Badges"
              name="badges"
              getLabel={({ name }) => name}
              setValue={setValue}
              getValues={getValues}
              options={badges}
            />
          )}
        />

        <div className="mt-3">
          <Button color="secondary" type="button" className="me-2" onClick={goToUsersPage}>
            Back
          </Button>
          <Button type="submit" color="primary">{id ? "Update" : "Create"}</Button>
        </div>
      </form>

      {viewMode === "card" ? (
        <div className="user-card-container">
          {badges.map((badge) => (
            <UserCard
              key={badge.id}
              user={user!}  
              badges={badges}
              handleDeleteUser={handleDeleteUser}
            />
          ))}
        </div>
      ) : (
        <TableView badges={badges} /> 
      )}
    </Page>
  );
};

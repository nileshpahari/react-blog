import React, { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import dbService from "../appwrite/db.service";
import storageService from "../appwrite/storage.service";
import { useSelector } from "react-redux";
import { Input, Button, SelectField, RTE } from "./index.js";

function PostForm({ post }) {
  const { register, handleSubmit, watch, control, setValue, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.slug || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });
  const userData = useSelector((state) => state.auth.userData);
  const navigate = useNavigate();

  const generateSlug = useCallback((value) => {
    if (value && typeof value === "string") {
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d]+/g, "-");
    }
    return "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, generateSlug, setValue]);

  const submit = async (data) => {
    const featuredImage = data.image[0]
      ? await storageService.uploadFile(data.image[0])
      : null;
    if (post) {
      if (featuredImage) {
        await storageService.deleteFile(post.featuredImage);
      }
      const dbPost = await dbService.updatePost(post.$id, {
        ...data,
        featuredImage: featuredImage ? featuredImage.$id : null,
      });
      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      const dbPost = await dbService.createPost({
        ...data,
        userId: userData.$id,
        featuredImage: featuredImage ? featuredImage.$id : null,
      });
      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(submit)}>
        {post?.featuredImage && (
          <div>
            <img
              src={storageService.previewFile(post.featuredImage)}
              alt="Featured Image"
            />
          </div>
        )}
        <Input
          label="Title: "
          placeholder="Title"
          {...register("title", { required: !post })}
        />
        <Input
          label="Slug: "
          placeholder="Slug"
          {...register("title", { required: !post })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />
        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
        <Input
          type="image"
          label="Featured Image: "
          placeholder="Featured Image"
          accept="image/png, image/jpg, image/jpeg"
          {...register("title", { required: !post })}
        />
        <SelectField
          label="Status"
          options={["active", "inactive"]}
          {...register("status", { required: true })}
        ></SelectField>
        <Button>{post ? "Update" : "Create"}</Button>
      </form>
    </div>
  );
}

export default PostForm;

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
    console.log(post?.$id);
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", generateSlug(value.title), { shouldValidate: true });
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, generateSlug, setValue]);

  const submit = async (data) => {
    let featuredImage = null;
    if (data.image?.[0]) {
      featuredImage = await storageService.uploadFile(data.image[0]);
    }
    if (post) {
      const dbPost = await dbService.updatePost(post.$id, {
        ...data,
        featuredImage: featuredImage ? featuredImage.$id : post.featuredImage,
      });
      if (dbPost) {
        if (featuredImage && post.featuredImage) {
          await storageService.deleteFile(post.featuredImage);
        }
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
    <div className="flex justify-center items-center min-h-screen py-10">
      <div className="w-full max-w-6xl bg-gray-700 p-10 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-white text-center mb-8">
          {post ? "Edit Post" : "Create Post"}
        </h2>

        <form onSubmit={handleSubmit(submit)} className="space-y-6">
          {post?.featuredImage && (
            <div className="mb-6">
              <img
                src={storageService.previewFile(post.featuredImage)}
                alt="Featured Image"
                className="w-full h-52 object-cover rounded-lg"
              />
            </div>
          )}

          <div className="space-y-6">
            <Input
              label="Title"
              placeholder="Title"
              labelClasses="block mb-2 text-sm font-medium text-gray-300"
              inputClasses="w-full p-2.5 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-blue-500 focus:border-blue-500"
              {...register("title", { required: !post })}
            />
            <Input
              label="Slug"
              placeholder="Slug"
              labelClasses="block mb-2 text-sm font-medium text-gray-300"
              inputClasses="w-full p-2.5 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-blue-500 focus:border-blue-500"
              {...register("slug", { required: !post })}
              // onInput={(e) => {
              //   setValue("slug", generateSlug(e.currentTarget.value), {
              //     shouldValidate: true,
              //   });
              // }}
            />
            <RTE
              label="Content"
              name="content"
              control={control}
              defaultValue={getValues("content")}
            />
          </div>

          <div className="space-y-6">
            <Input
              type="file"
              label="Featured Image"
              placeholder="Upload an Image"
              labelClasses="block mb-2 text-sm font-medium text-gray-300"
              inputClasses="w-full p-2.5 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-blue-500 focus:border-blue-500"
              accept="image/png, image/jpg, image/jpeg"
              {...register("image")}
            />
            <div>
              <SelectField
                label="Status"
                labelClasses="block mb-2 text-sm font-medium text-gray-300"
                selectFieldClasses="w-full p-2.5 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-blue-500 focus:border-blue-500"
                options={["active", "inactive"]}
                {...register("status", { required: true })}
              />
            </div>
          </div>

          <Button classname="w-2/12 py-3">{post ? "Update" : "Create"}</Button>
        </form>
      </div>
    </div>
  );
}

export default PostForm;

// import { useNavigate } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import dbService from "../appwrite/db.service";
// import storageService from "../appwrite/storage.service";
// import { useSelector } from "react-redux";
// import { Input, Button, SelectField, RTE } from "./index.js";

// function PostForm({ post }) {
//   const { register, handleSubmit, watch, control, setValue, getValues } =
//     useForm({
//       defaultValues: {
//         title: post?.title || "",
//         slug: post?.slug || "",
//         content: post?.content || "",
//         status: post?.status || "active",
//       },
//     });
//   const userData = useSelector((state) => state.auth.userData);
//   const navigate = useNavigate();

//   const generateSlug = useCallback((value) => {
//     if (value && typeof value === "string") {
//       return value
//         .trim()
//         .toLowerCase()
//         .replace(/[^a-zA-Z\d]+/g, "-");
//     }
//     return "";
//   }, []);

//   useEffect(() => {
//     const subscription = watch((value, { name }) => {
//       if (name === "title") {
//         setValue("slug", slugTransform(value.title), { shouldValidate: true });
//       }
//     });
//     return () => subscription.unsubscribe();
//   }, [watch, generateSlug, setValue]);

//   const submit = async (data) => {
//     const featuredImage = data.image[0]
//       ? await storageService.uploadFile(data.image[0])
//       : null;
//     if (post) {
//       if (featuredImage) {
//         await storageService.deleteFile(post.featuredImage);
//       }
//       const dbPost = await dbService.updatePost(post.$id, {
//         ...data,
//         featuredImage: featuredImage ? featuredImage.$id : null,
//       });
//       if (dbPost) {
//         navigate(`/post/${dbPost.$id}`);
//       }
//     } else {
//       const dbPost = await dbService.createPost({
//         ...data,
//         userId: userData.$id,
//         featuredImage: featuredImage ? featuredImage.$id : null,
//       });
//       if (dbPost) {
//         navigate(`/post/${dbPost.$id}`);
//       }
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit(submit)}>
//         {post?.featuredImage && (
//           <div>
//             <img
//               src={storageService.previewFile(post.featuredImage)}
//               alt="Featured Image"
//             />
//           </div>
//         )}
//         <Input
//           label="Title: "
//           placeholder="Title"
//           {...register("title", { required: !post })}
//         />
//         <Input
//           label="Slug: "
//           placeholder="Slug"
//           {...register("slug", { required: !post })}
//           onInput={(e) => {
//             setValue("slug", slugTransform(e.currentTarget.value), {
//               shouldValidate: true,
//             });
//           }}
//         />
//         <RTE
//           label="Content :"
//           name="content"
//           control={control}
//           defaultValue={getValues("content")}
//         />
//         <Input
//           type="file"
//           label="Featured Image: "
//           placeholder="Featured Image"
//           accept="image/png, image/jpg, image/jpeg"
//           {...register("title", { required: !post })}
//         />
//         <SelectField
//           label="Status"
//           options={["active", "inactive"]}
//           {...register("status", { required: true })}
//         ></SelectField>
//         <Button>{post ? "Update" : "Create"}</Button>
//       </form>
//     </div>
//   );
// }

// export default PostForm;

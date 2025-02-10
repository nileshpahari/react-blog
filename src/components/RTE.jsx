import React from "react";
import { Controller } from "react-hook-form";
import { Editor } from "@tinymce/tinymce-react";
import config from "../config";

function RTE({ name, label, control, defaultValue = "" }) {
  return (
    <div className="mb-4">
      {label && <label className="block mb-2 text-sm font-medium text-gray-300">{label}</label>}
      <Controller
        name={name || "content"}
        control={control}
        defaultValue={defaultValue}
        render={({ field: { onChange, value } }) => (
          <Editor
          apiKey={config.tinyMCEKey}
            value={value} // Ensures controlled component behavior
            init={{
              height: 500,
              menubar: true,
              plugins: [
                "image", "advlist", "autolink", "lists", "link", "charmap",
                "preview", "anchor", "searchreplace", "visualblocks",
                "code", "fullscreen", "insertdatetime", "media",
                "table", "help", "wordcount"
              ],
              toolbar:
                "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
            onEditorChange={onChange} // Fixes the event binding
          />
        )}
      />
    </div>
  );
}

export default RTE;

// import React from "react";
// import { Controller } from "react-hook-form";
// import { Editor } from "@tinymce/tinymce-react";
// function RTE({ name, label, control, defaultValue = "" }) {
//   return (
//     <div>
//       {label && <label>{label}</label>}
//       <Controller
//         name={name || "content"}
//         control={control}
//         render={({ field: { onChange } }) => {
//           <Editor
//             initialValue={defaultValue}
//             init={{
//               initialValue: defaultValue,
//               height: 500,
//               menubar: true,
//               plugins: [
//                 "image",
//                 "advlist",
//                 "autolink",
//                 "lists",
//                 "link",
//                 "image",
//                 "charmap",
//                 "preview",
//                 "anchor",
//                 "searchreplace",
//                 "visualblocks",
//                 "code",
//                 "fullscreen",
//                 "insertdatetime",
//                 "media",
//                 "table",
//                 "code",
//                 "help",
//                 "wordcount",
//                 "anchor",
//               ],
//               toolbar:
//                 "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
//               content_style:
//                 "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
//             }}
//             onEditorChange={onChange}
//           />;
//         }}
//       />
//     </div>
//   );
// }

// export default RTE;



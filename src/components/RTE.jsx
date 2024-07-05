import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";

// Define the custom CSS for TinyMCE menubar
const customCSS = `
  .tox .tox-menubar {
    background-color: #8eb69b !important;
  }
`;

export default function RTE({ name, control, label, defaultValue = "" }) {
  return (
    <div className="w-full">
      {label && <label className="inline-block mb-1 pl-1 contentLable">{label}</label>}

      <Controller
        name={name || "content"}
        control={control}
        render={({ field: { onChange } }) => (
          <Editor
            apiKey="c0wp6n2whqi04n3a8islve159xz1x9n8lnqc0e5yl4kdy959"
            initialValue={defaultValue}
            init={{
              height: 500,
              menubar: true,
              plugins: [
                "image",
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
                "anchor",
              ],
              toolbar:
                "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px; background-color: #8eb69b; }",
              setup: (editor) => {
                editor.on('init', () => {
                  // Inject custom CSS into the editor's iframe
                  const styleSheet = editor.getDoc().createElement("style");
                  styleSheet.type = "text/css";
                  styleSheet.innerText = customCSS;
                  editor.getDoc().head.appendChild(styleSheet);

                  // Ensure the custom CSS is applied to the editor's container
                  const head = editor.getContainer().closest('.tox').querySelector('head');
                  if (head) {
                    const styleElement = document.createElement('style');
                    styleElement.type = 'text/css';
                    styleElement.appendChild(document.createTextNode(customCSS));
                    head.appendChild(styleElement);
                  }
                });
              },
            }}
            onEditorChange={onChange}
          />
        )}
      />
    </div>
  );
}






 

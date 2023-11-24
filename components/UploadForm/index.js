"use client";
import { useRef, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const UploadForm = () => {
  const [file, setFile] = useState("");
  const refFileName = useRef(null);
  const refFolderName = useRef(null);

  const onUploadHandler = async (e) => {
    e.preventDefault();
    if (file) {
        const public_id=refFolderName.current.value+"/"+refFileName.current.value
      const res = await fetch("/api/cloudinary/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ public_id }),
      }).then((res) => res.json());
      console.log(res);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("signature", res.signature);
      formData.append("public_id",public_id );
      formData.append("api_key", res.apikey);
      formData.append("timestamp", res.timestamp);
      formData.append("folder","myeik_guide");

      const uploadImage = await fetch(
        `https://api.cloudinary.com/v1_1/${res.cloudname}/image/upload`,
        { method: "POST", body: formData }
      ).then((res) => res.json());
      console.log(uploadImage);
    } else {
      alert("error");
    }
  };
  return (
    <form className="flex gap-6">
      <Input
        type="file"
        onChange={(e) => {
          setFile(e.target.files[0]);
          console.log(e.target.files[0]);
        }}
      />
      <Input
        type="text"
        ref={refFileName}
        name="file_name"
        id="file_name"
        placeholder="File Name"
      />
      <Input
        type="text"
        name="folder_name"
        id="folder_name"
        placeholder="Folder Name"
        ref={refFolderName}
      />
      <Button onClick={(e) => onUploadHandler(e)}>Upload</Button>
    </form>
  );
};

export default UploadForm;

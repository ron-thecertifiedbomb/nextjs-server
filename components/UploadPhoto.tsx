import React, { useState, ChangeEvent, FormEvent } from "react";
import { storage } from "../firebase";
import {
  ref,
  getDownloadURL,
  uploadBytesResumable,
  UploadTask,
} from "firebase/storage";
import {
  Button,
} from "@mui/material";

interface Images {

  imagelink_square: string | null;
  imagelink_portrait: string | null;
}

interface UploadImagesProps {
  onSubmit: (image: Images) => void;
}

const UploadPhotoForm: React.FC<UploadImagesProps> = ({ onSubmit }) => {

  const [imgUrl1, setImgUrl1] = useState<string | null>(null);
  const [imgUrl2, setImgUrl2] = useState<string | null>(null);
  const [progresspercent1, setProgresspercent1] = useState<number>(0);
  const [progresspercent2, setProgresspercent2] = useState<number>(0);
  const [isUploading1, setIsUploading1] = useState<boolean>(false);
  const [isUploading2, setIsUploading2] = useState<boolean>(false);

  const handleFileChange1 = (event: ChangeEvent<HTMLInputElement>) => {
    
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading1(true);
    const storageRef = ref(storage, `files/${file.name}`);
    const uploadTask: UploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgresspercent1(progress);
      },
      (error) => {
        alert(error);
        setIsUploading1(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImgUrl1(downloadURL);
          setIsUploading1(false);
        });
      }
    );
  };

  const handleFileChange2 = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading2(true);
    const storageRef = ref(storage, `files/${file.name}`);
    const uploadTask: UploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgresspercent2(progress);
      },
      (error) => {
        alert(error);
        setIsUploading2(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImgUrl2(downloadURL);
          setIsUploading2(false);
        });
      }
    );
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (imgUrl1 && imgUrl2) {
      onSubmit({
        imagelink_square: imgUrl1,
        imagelink_portrait: imgUrl2,
      });
      resetForm();
    } else {
      alert("Please wait for images to finish uploading.");
    }
  };

  const resetForm = () => {
    setImgUrl1(null);
    setImgUrl2(null);
    setProgresspercent1(0);
    setProgresspercent2(0);
    setIsUploading1(false);
    setIsUploading2(false);
    const fileInputs = document.querySelectorAll(
      'input[type="file"]'
    ) as NodeListOf<HTMLInputElement>;
    fileInputs.forEach((input) => (input.value = ""));
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="form"
        style={{ display: "flex", flexDirection: "column", gap: 10 }}
      >

        <input type="file" onChange={handleFileChange1} />
        {isUploading1 && progresspercent1 > 0 && (
          <div className="outerbar">
            <div className="innerbar" style={{ width: `${progresspercent1}%` }}>
              {progresspercent1}%
            </div>
          </div>
        )}
        {imgUrl1 && <img src={imgUrl1} alt="uploaded file 1" height={200} />}


        <input type="file" onChange={handleFileChange2} />
        {isUploading2 && progresspercent2 > 0 && (
          <div className="outerbar">
            <div className="innerbar" style={{ width: `${progresspercent2}%` }}>
              {progresspercent2}%
            </div>
          </div>
        )}
        {imgUrl2 && <img src={imgUrl2} alt="uploaded file 2" height={200} />}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={isUploading1 || isUploading2}
        >
          Upload
        </Button>
      </form>
    </div>
  );
};

export default UploadPhotoForm;

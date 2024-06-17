import React, { useState, ChangeEvent} from "react";
import { storage } from "../firebase";
import {
  ref,
  getDownloadURL,
  uploadBytesResumable,
  UploadTask,
} from "firebase/storage";
import { useAppDispatch } from "../lib/hooks";
import { uploadImages } from "../lib/features/images/productImagesSlice";
import Image from "next/image";

interface PhotoUploaderProps {
  key?: string | number;

}

const PhotoUploader: React.FC<PhotoUploaderProps> = () => {


  const dispatch = useAppDispatch()

  const [imgUrl, setImgUrl] = useState<string | null>(null);
  const [progresspercent, setProgresspercent] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const storageRef = ref(storage, `files/${file.name}`);
    const uploadTask: UploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgresspercent(progress);
      },
      (error) => {
        alert(error);
        setIsUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImgUrl(downloadURL);
          dispatch(uploadImages([downloadURL]));
          setIsUploading(false);
        });
      }
    );
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      {isUploading && progresspercent > 0 && (
        <div className="outerbar">
          <div className="innerbar" style={{ width: `${progresspercent}%` }}>
            {progresspercent}%
          </div>
        </div>
      )}
      {imgUrl && <Image src={imgUrl} alt="image_link" height={200} />}
    </div>
  );
};

export default PhotoUploader;

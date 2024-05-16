import React, { useState, ChangeEvent, FormEvent } from "react";
import { storage } from '../firebase';
import { ref, getDownloadURL, uploadBytesResumable, UploadTask } from "firebase/storage";
import { TextField, Button } from '@mui/material';

interface User {
  name: string;
  description: string;
  image: string | null;
}

interface AddFormProps {
  onSubmit: (user: User) => void;
}

const AddForm: React.FC<AddFormProps> = ({ onSubmit }) => {
  const [imgUrl, setImgUrl] = useState<string | null>(null);
  const [progresspercent, setProgresspercent] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const [user, setUser] = useState<User>({
    name: '',
    description: '',
    image: null,
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const storageRef = ref(storage, `files/${file.name}`);
    const uploadTask: UploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on("state_changed",
      (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgresspercent(progress);
      },
      (error) => {
        alert(error);
        setIsUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImgUrl(downloadURL);
          setUser((prevUser) => ({
            ...prevUser,
            image: downloadURL,
          }));
          setIsUploading(false);
        });
      }
    );
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (imgUrl) {
      onSubmit(user);
      resetForm();
    } else {
      alert("Please wait for the image to finish uploading.");
    }
  };

  const resetForm = () => {
    setUser({
      name: '',
      description: '',
      image: null,
    });
    setImgUrl(null);
    setProgresspercent(0);
    setIsUploading(false);
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className='form' style={{ display: "flex", flexDirection: 'column', gap: 10 }}>
        <TextField
          fullWidth
          name="name"
          label="Name"
          value={user.name}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          multiline
          rows={4}
          name="description"
          label="Description"
          value={user.description}
          onChange={handleChange}
        />
        <input type='file' onChange={handleFileChange} />
        <Button type='submit' variant="contained" color="primary" disabled={isUploading}>
          Upload
        </Button>
      </form>
      {isUploading && progresspercent > 0 && (
        <div className='outerbar'>
          <div className='innerbar' style={{ width: `${progresspercent}%` }}>{progresspercent}%</div>
        </div>
      )}
      {imgUrl && (
        <img src={imgUrl} alt='uploaded file' height={200} />
      )}
    </div>
  );
}

export default AddForm;

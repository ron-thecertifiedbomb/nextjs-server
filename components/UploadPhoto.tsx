import React, { useState, ChangeEvent, FormEvent } from "react";
import { storage } from "../firebase";
import {
  ref,
  getDownloadURL,
  uploadBytesResumable,
  UploadTask,
} from "firebase/storage";
import { TextField, Button, Switch, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

interface User {
  // _id: string;
  // description: string;
  // roasted: string;
  // ingredients: string;
  // special_ingredient: string;
  // average_rating: number;
  // ratings_count: string;
  // favourite: boolean;
  // type: string;
  imagelink_square: string | null;
  imagelink_portrait: string | null;
}

interface AddFormProps {
  onSubmit: (user: User) => void;
}

const UploadPhotoForm: React.FC<AddFormProps> = ({ onSubmit }) => {
  const [imgUrl1, setImgUrl1] = useState<string | null>(null);
  const [imgUrl2, setImgUrl2] = useState<string | null>(null);
  const [progresspercent1, setProgresspercent1] = useState<number>(0);
  const [progresspercent2, setProgresspercent2] = useState<number>(0);
  const [isUploading1, setIsUploading1] = useState<boolean>(false);
  const [isUploading2, setIsUploading2] = useState<boolean>(false);

  const [user, setUser] = useState<User>({
   
    // _id: '',
    // roasted: "",
    // ingredients: "",
    // special_ingredient: "",
    // average_rating: 0,
    // ratings_count: "",
    // favourite: false,
    // type: "",
    imagelink_square: null,
    imagelink_portrait: null,
  });

  console.log(user.imagelink_portrait)
  console.log(user.imagelink_square)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

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
          setUser((prevUser) => ({
            ...prevUser,
            imagelink_square: downloadURL,
          }));
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
          setUser((prevUser) => ({
            ...prevUser,
            imagelink_portrait: downloadURL,
          }));
          setIsUploading2(false);
        });
      }
    );
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (imgUrl1 && imgUrl2) {
      onSubmit(user);
      resetForm();
    } else {
      alert("Please wait for both images to finish uploading.");
    }
  };

  const resetForm = () => {
    setUser({
      // _id: "",
      // description: "",
      // roasted: "",
      // ingredients: "",
      // special_ingredient: "",
      // average_rating: 0,
      // ratings_count: "",
      // favourite: false,
      // type: "",
      imagelink_square: null,
      imagelink_portrait: null,
    });
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
       {/* <TextField
          fullWidth
          name="_id"
          label="Product ID"
          value={user._id}
          onChange={handleChange}
        /> */}
          {/*
        <TextField
          fullWidth
          multiline
          rows={4}
          name="description"
          label="Description"
          value={user.description}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          name="roasted"
          label="Roasted"
          value={user.roasted}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          name="ingredients"
          label="Ingredients"
          value={user.ingredients}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          name="special_ingredient"
          label="Special ingredient"
          value={user.special_ingredient}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          name="average_rating"
          label="Average Rating"
          value={user.average_rating}
          onChange={handleChange}
        />

        <Switch
          checked={user.favourite}
          onChange={(e) =>
            setUser((prevUser) => ({
              ...prevUser,
              favourite: e.target.checked,
            }))
          }
          name="favourite"
          color="primary"
        />
     <div style={{ marginBottom: '20px' }}>Favourite</div>


        <FormControl fullWidth>
          <InputLabel>Type</InputLabel>
          <Select
            value={user.type}
            onChange={handleChange}
            name="type"
          >
            <MenuItem value="Coffee">Coffee</MenuItem>
            <MenuItem value="Beans">Beans</MenuItem>
          </Select>
        </FormControl> */}
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

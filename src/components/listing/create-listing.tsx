/*
  This component showcases the ROQ File upload feature in the controlled mode
  i.e You can manually preview and trigger the upload of the file after it is selected
*/

import React, { useState } from "react";
import styles from "components/listing/create-listing.module.css";
import { useRoqFileUploader, FileUpload } from "@roq/nextjs";
import { ListingCreateDto } from "./types";
import { useListing } from "components/listing/hooks/useListing";

interface CreateListingProps {
  onSuccess?: () => void;
}

export default function CreateListing({ onSuccess }: CreateListingProps) {
  const [newFile, setNewFile] = useState<File>();
  const [listingData, setListingData] = useState<ListingCreateDto>();

  const { createListing } = useListing();

  const handleFormChange = (key: keyof ListingCreateDto, value: any) => {
    const newListingData = setListingData({
      ...listingData,
      [key]: value,
    });
  };

  // To control the file upload - i.e trigger the upload when required,
  // you can use this hook to get the fileUploader object
  const fileUploader = useRoqFileUploader({
    onUploadSuccess: (file) => {
      setNewFile(undefined);
    },
    onUploadFail: (err) => {
      console.error(err);
    },
    onChange: ([file]) => {
      setNewFile(file);
    },
    fileCategory: "USER_FILES",
  });

  // Trigger the upload manually, by calling the uploadFile function
  const handleCreateListing = async () => {
    const file = await fileUploader.uploadFile({
      file: newFile,
      temporaryId: Date.now().toString(),
    });

    try {
      await createListing({ ...listingData, fileId: file.fileId });
      onSuccess?.();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={styles.uploadContainer}>
      <h2 className={styles.formControl}>Create a listing</h2>
      <div className={styles.formControl}>
        <input
          className="input"
          placeholder="Title"
          onChange={(e) => handleFormChange("title", e.target.value)}
        />
      </div>
      <div className={styles.formControl}>
        <input
          className="input"
          placeholder="Price"
          type="number"
          onChange={(e) => handleFormChange("price", e.target.value)}
        />
      </div>
      <div className={styles.formControl}>
        <textarea
          className="textarea"
          placeholder="Description"
          rows={3}
          onChange={(e) => handleFormChange("description", e.target.value)}
        />
      </div>
      {/* Display the file selector button */}
      <div className={styles.formControl}>
        <FileUpload
          fileUploader={fileUploader}
          accept={["image/*"]}
          fileCategory="USER_FILES"
        />{" "}
        {/* Images can be previewed using the previews property of the file uploader object */}
        {newFile ? (
          <img
            className={styles.preview}
            src={fileUploader.previews?.[0]?.url}
          />
        ) : (
          <></>
        )}
      </div>
      <button
        disabled={!(newFile && listingData?.title && listingData?.price)}
        className="btn"
        onClick={handleCreateListing}
      >
        Create listing
      </button>
    </div>
  );
}

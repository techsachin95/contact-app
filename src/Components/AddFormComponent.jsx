import React, { useState } from "react";
import {
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Box,
  Typography,
} from "@mui/material";
import ModalComponent from "./ModalComponent";
import AddIcon from "@mui/icons-material/Add";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addNewClient } from "../Api/Api";
import useGlobalStore from "../GlobalStore/GlobalStore";

function AddFormComponent() {
  const { setContactIdToGlobalStore } = useGlobalStore((state) => state);
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const { mutateAsync: handleAddNewContact } = useMutation({
    mutationFn: addNewClient,
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const formDataSubmit = async (formData) => {
    console.log("Submitted:", formData);
      const formattedData = {
    ...formData,
    name: formData.name.toLowerCase(),
  };
    await handleAddNewContact(formattedData);
    reset();
    setOpen(false);
  };

  function AddContact() {
    setOpen(true);
    setContactIdToGlobalStore('AddContact');
      reset();
  }

  return (
    <>
      <Button
        sx={{ width: "100%" }}
        variant="contained"
        onClick={() => AddContact()}
      >
        <AddIcon /> Add Contact
      </Button>

      <ModalComponent
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={handleSubmit(formDataSubmit)}
        title="Contact Form"
      >
        <Box display="flex" flexDirection="column" gap={1}>
          <TextField
            required
            label="Name"
            name="name"
            variant="outlined"
            {...register("name", { required: true })}
          />
          {errors.name && errors.name.type === "required" ? (
            <span style={{ color: "red", fontSize: "0.8rem" }}>
              Please Enter Name
            </span>
          ) : null}
          <TextField
            required
            label="Email"
            name="email"
            variant="outlined"
            {...register("email", {
              required: true,
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              },
            })}
          />

          {errors.email && errors.email.type === "required" && (
            <span style={{ color: "red", fontSize: "0.8rem" }}>
              Please Enter Email
            </span>
          )}

          {errors.email && errors.email.type === "pattern" && (
            <span style={{ color: "red", fontSize: "0.8rem" }}>
              Enter a valid email address
            </span>
          )}

          <TextField
            required
            label="Phone No"
            type="text"
            name="phone"
            variant="outlined"
            inputProps={{
              maxLength: 10,
              inputMode: "numeric", // mobile-friendly numeric keyboard
              pattern: "[0-9]*", // prevents non-digits
            }}
            {...register("phone", {
              required: true,
              pattern: {
                value: /^[0-9]{10}$/,
              },
            })}
          />
          {errors.phone && errors.phone.type === "pattern" ? (
            <span style={{ color: "red", fontSize: "0.8rem" }}>
              Phone number must be numeric and exactly 10 digits
            </span>
          ) : null}
          {errors.phone && errors.phone.type === "required" ? (
            <span style={{ color: "red", fontSize: "0.8rem" }}>
              Please Enter phone no
            </span>
          ) : null}
          <TextField
            required
            label="Address"
            name="address"
            variant="outlined"
            multiline
            rows={1}
            {...register("address", { required: true })}
          />
          {errors.address && errors.address.type === "required" ? (
            <span style={{ color: "red", fontSize: "0.8rem" }}>
              Please Enter address
            </span>
          ) : null}
          <FormControlLabel
            control={<Checkbox name="favorite" />}
            label="Favorite"
            {...register("favorite")}
          />
        </Box>
      </ModalComponent>
    </>
  );
}

export default AddFormComponent;

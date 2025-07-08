import {
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Box,
  Typography,
} from "@mui/material";
import ModalComponent from "./ModalComponent";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchContactDataById,
  handleDeleteById,
  updateClient,
} from "../Api/Api";
import useGlobalStore from "../GlobalStore/GlobalStore";
import { Controller } from "react-hook-form";

import { useEffect } from "react";

function EditDeleteFormComponent({ open, setOpen }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm();
  const queryClient = useQueryClient();

  const { mutateAsync: editContactData } = useMutation({
    mutationFn: updateClient,
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
  const { ContactId } = useGlobalStore((state) => state);

  const { data, isError } = useQuery({
    queryKey: ["contacts"],
    queryFn: () => fetchContactDataById(ContactId),
  });

  const { mutateAsync: handleDelete } = useMutation({
    mutationFn: handleDeleteById,
    onSuccess: () => {
      queryClient.invalidateQueries(["contacts"]);
    },
    onError: (error) => {
      console.error("Delete failed:", error);
    },
  });

  // console.log(data);

  useEffect(() => {
    data
      ? reset({
          name: data.name || "",
          email: data.email || "",
          phone: data.phone || "",
          address: data.address || "",
          favorite: !!data.favorite,
        })
      : null;
  }, [data, reset]);

  //handelling error during contact details loading
  if (isError) {
    return (
      <Typography sx={{ fontSize: "18px" }} align="center">
        Error in Loding Contact Details
      </Typography>
    );
  }

  const formDataSubmit = async (formData) => {
    console.log("Submitted:", formData);
    const formattedData = {
      ...formData,
      name: formData.name.toLowerCase(),
    };
    await editContactData({ id: ContactId, data: formattedData });
    reset();
    setOpen(false);
  };

  function handleCloseModal() {
    handleDelete(ContactId);
    setOpen(false);
  }

  return (
    <>
      <ModalComponent
        open={open}
        onClose={setOpen} //new
        onDelete={() => handleCloseModal()}
        onSubmit={handleSubmit(formDataSubmit)}
        title="Edit Contact"
      >
        <Box display="flex" flexDirection="column" gap={1}>
          <TextField
            required
            // label="Name"
            placeholder="Name"
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
            placeholder="Email"
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
            placeholder="Phone No"
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
            placeholder="Address"
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
          {/* <FormControlLabel
            label="Favorite"
            control={<Checkbox {...register("favorite")} />}
            name="favorite"
          /> */}
          <Controller
            name="favorite"
            control={control}
            defaultValue={false}
            render={({ field }) => (
              <FormControlLabel
                label="Favorite"
                control={<Checkbox {...field} checked={!!field.value} />}
              />
            )}
          />
        </Box>
      </ModalComponent>
    </>
  );
}

export default EditDeleteFormComponent;

import {
  Modal,
  Box,
  Typography,
  Button,
  Divider,
} from "@mui/material";
import useGlobalStore from "../GlobalStore/GlobalStore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 2,
};

function ModalComponent({
  open,
  onClose,
  onDelete,
  onSubmit,
  title,
  children,
}) {
  // onClose original
  const { ContactId } = useGlobalStore((state) => state);

  function handleModalClose() {
    onClose(false);
  }
  return (
    <Modal open={open} onClose={handleModalClose}>
      {/* onClose={onClose} original */}
      <Box sx={style}>
        <Typography variant="h6" align="center" gutterBottom>
          {title}
        </Typography>

        <Divider sx={{ mb: 2 }} />
        {children}
        <Box mt={3} display="flex" justifyContent="center" gap={2}>
          {ContactId ? (
            <>
              <Button
                variant="contained"
                startIcon={<EditIcon />}
                onClick={onSubmit}
              >
                Edit
              </Button>
              <Button
                variant="contained"
                startIcon={<DeleteIcon />}
                // onClick={onClose}  original
                onClick={onDelete}
              >
                Delete
              </Button>
            </>
          ) : (
            <>
              <Button variant="contained" onClick={onSubmit}>
                Submit
              </Button>
              {/* <Button onClick={onClose} sx={{ mr: 1 }}>
                Cancel
              </Button> */}
            </>
          )}
        </Box>
      </Box>
    </Modal>
  );
}

export default ModalComponent;

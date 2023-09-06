import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Textarea from "@mui/joy/Textarea";
import Rating from "@mui/material/Rating";
import * as React from "react";
//formik
import { Formik } from "formik";
import * as Yup from "yup";
import { $axios } from "../../lib/AxiosInstance";
import CustomSnackBar from "./CustomSnackBar";

export default function WriteReview(props) {
  const [success, setSuccess] = React.useState(false);
  const [italic, setItalic] = React.useState(false);
  const [fontWeight, setFontWeight] = React.useState("normal");
  const [anchorEl, setAnchorEl] = React.useState(null);

  const [reviewerId, setReviewerId] = React.useState(
    localStorage.getItem("userId")
  );

  const [value, setValue] = React.useState(1);
  console.log(props.id);
  React.useEffect(() => {}, [success]);

  return (
    <>
      <CustomSnackBar
        open={success}
        status="success"
        message="Your review is successfully added."
        severity="success"
      />
      <Formik
        initialValues={{
          review: "",
          productId: "",
          reviewer: "",
          rating: "",
        }}
        validationSchema={Yup.object({
          review: Yup.string().required("Required"),
          rating: Yup.number().required("Required"),
        })}
        onSubmit={async (values) => {
          (values.productId = props.id), (values.reviewer = reviewerId);

          try {
            const response = await $axios.post(
              `/product/review/${props.id}`,
              values
            );
            console.log(response);
            setSuccess(true);
          } catch (error) {
            console.log(error.message);
          }
        }}
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit}>
            <Textarea
              placeholder="Write something here…"
              minRows={3}
              name="review"
              {...formik.getFieldProps("review")}
              endDecorator={
                <Box
                  sx={{
                    display: "flex",
                    gap: "var(--Textarea-paddingBlock)",
                    pt: "var(--Textarea-paddingBlock)",
                    borderTop: "1px solid",
                    borderColor: "divider",
                    flex: "auto",
                  }}
                >
                  <Rating
                    name="rating"
                    onChange={(event, newValue) => {
                      setValue(newValue);
                    }}
                    {...formik.getFieldProps("rating")}
                  />
                  <Button sx={{ ml: "auto" }} type="submit">
                    Send your review
                  </Button>
                </Box>
              }
              sx={{
                minWidth: 300,
                fontWeight,
                fontStyle: italic ? "italic" : "initial",
              }}
            />
            {formik.touched.review && formik.errors.review ? (
              <div>{formik.errors.review}</div>
            ) : null}
          </form>
        )}
      </Formik>
    </>
  );
}

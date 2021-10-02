import { useState } from "react";
import { useSelector } from "react-redux";
import { Grid } from "@material-ui/core";
import { Box } from "@mui/system";
import Form from "react-bootstrap/form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { toast } from "react-toastify";
import LinearProgress from "@material-ui/core/LinearProgress";

//components
import { InputField } from "./components/inputField";

//styles
import { styles } from "./components/stocksStyles";
import "react-toastify/dist/ReactToastify.css";

//validation
import { stockFormValidations } from "../../configs/stockFormValidation";

//json configs
import { jsonConfig, imageConfig } from "../../configs/jsonConfig";

export const AddStockItems = () => {
  const [loading, setLoading] = useState(false);

  //style config
  const classes = styles()();

  //currnt system
  const { nameId } = useSelector((store) => store.currentSystem);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      //getting aws image upload url friom backend server

      // const fileExtention = formik.values.itemImage.split(".");

      const { data: uploadUrl } = await axios.get(
        `/api/useposapp/generateImageUploadUrl/${nameId}-${formik.values.itemCode}`,
        jsonConfig
      ); //.${fileExtention[fileExtention.length - 1]}

      //uploading item image to aws bucket
      const result = await axios.put(
        uploadUrl,
        formik.values.itemImage,
        imageConfig
      );

      //setting new item data object
      //extracting existing image data from formik object
      const {
        values: { itemImage, ...itemdata },
      } = formik;

      //setting new item data with new item data and systemID
      const newItemData = {
        systemID: nameId,
        ...itemdata,
        itemImage: uploadUrl.split("?")[0],
      };

      //store item data in mongodb
      const response = await axios.post(
        "/api/useposapp/addItem",
        newItemData,
        jsonConfig
      );

      setLoading(false);
      //notify
      toast.success("New item added successfully !", {
        position: "top-center",
        theme: "colored",
        autoClose: 2000,
      });
    } catch (error) {
      toast.error("Unable to add new itwm , Try again !", {
        position: "bottom-right",
        theme: "colored",
      });
    }
  };

  //formik config
  const useFormik = stockFormValidations(handleSubmit);
  const formik = useFormik();

  return (
    <Grid alignItems="center" lg={6} xl={6}>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Box mt={5} className={classes.formElementHolders}>
          <div className={classes.formWrapperDiv}>
            <Form onSubmit={formik.handleSubmit}>
              {/* //barcode */}
              <InputField
                label="Item Code"
                type="text"
                placeholder="Item Code"
                name="itemCode"
                value={formik.values.itemCode}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={
                  formik.touched.itemCode && Boolean(formik.errors.itemCode)
                }
                error={formik.errors.itemCode}
              />

              {/* //item name */}
              <InputField
                label="Item Name"
                type="text"
                placeholder="Item Name"
                name="itemName"
                value={formik.values.itemName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={
                  formik.touched.itemName && Boolean(formik.errors.itemName)
                }
                error={formik.errors.itemName}
              />

              {/* //cash price */}
              <InputField
                label="Cash Price"
                type="text"
                placeholder="Cash Price"
                name="cashPrice"
                value={formik.values.cashPrice}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={
                  formik.touched.cashPrice && Boolean(formik.errors.cashPrice)
                }
                error={formik.errors.cashPrice}
              />

              {/* //selling price */}
              <InputField
                label="Selling Price"
                type="text"
                placeholder="Selling Price"
                name="sellingPrice"
                value={formik.values.sellingPrice}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={
                  formik.touched.sellingPrice &&
                  Boolean(formik.errors.sellingPrice)
                }
                error={formik.errors.sellingPrice}
              />

              {/* //stock */}
              <InputField
                label="Quantity"
                type="text"
                placeholder="Quantity"
                name="quantity"
                value={formik.values.quantity}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={
                  formik.touched.quantity && Boolean(formik.errors.quantity)
                }
                error={formik.errors.quantity}
              />

              {/* //image */}
              <InputField
                label="Item Image"
                type="file"
                name="itemImage"
                accept=".jpg , .png"
                value={formik.values.itemImage}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={
                  formik.touched.itemImage && Boolean(formik.errors.itemImage)
                }
                error={formik.errors.itemImage}
              />

              {/* //submit button */}

              {loading ? (
                <Box mt={5}>
                  <LinearProgress />
                </Box>
              ) : (
                <Button
                  type="submit"
                  className="mt-4"
                  style={{ width: "100%" }}
                >
                  Add new item
                </Button>
              )}
            </Form>
          </div>
        </Box>
      </Box>
    </Grid>
  );
};

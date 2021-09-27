import { Grid, Box } from "@material-ui/core";
import InfoIcon from "@mui/icons-material/Info";

//styles
import { styles } from "./possystemsStyles";

export const NoSystemsBanner = () => {
  const classes = styles()();
  return (
    <Grid container justifyContent="center">
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        p={4}
        className={classes.noSystemBannerRoot}
      >
        <Box>
          <InfoIcon />
        </Box>
        <Box ml={2}> No systems Available </Box>
      </Box>
    </Grid>
  );
};

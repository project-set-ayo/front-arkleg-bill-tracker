import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Box,
  TextField,
  Button,
  CircularProgress,
  InputLabel,
  MenuItem,
  Select,
  FormControl,
  FormHelperText,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import AddIcon from "@mui/icons-material/Add";
import AdImageUploader from "./AdImageUploader";
import { Ad } from "../types/ad";

const schema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  image: z.instanceof(File, { message: "Image file is required" }).nullable(),
  link: z.string().url("Invalid link URL"),
  weight: z.coerce.number().min(1, "Weight must be at least 1"),
  style: z.enum(["square", "horizontal", "vertical"]),
});

const AdForm = ({
  addAd,
}: {
  addAd: (
    ad: FormData,
  ) => Promise<{ success: boolean; errors?: Record<string, string[]> }>;
}) => {
  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      image: null,
      link: "",
      weight: 1,
      style: "square",
    },
  });

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
    watch,
  } = methods;

  const onSubmit = async (data: any) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("link", data.link);
    formData.append("weight", data.weight.toString());
    formData.append("style", data.style);

    if (data.image) {
      formData.append("image", data.image); // Ensure file is included
    }

    try {
      const response = await addAd(formData);

      if (!response.success && response.errors) {
        Object.entries(response.errors).forEach(([key, messages]) => {
          setError(key as keyof Omit<Ad, "id">, {
            type: "server",
            message: messages[0],
          });
        });
      } else {
        reset();
      }
    } catch (error) {
      setError("title", {
        type: "server",
        message: "An unexpected error occurred",
      });
    }
  };

  return (
    <FormProvider {...methods}>
      <Box sx={{ p: 3, mb: 3 }}>
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Title"
                {...register("title")}
                error={!!errors.title}
                helperText={errors.title?.message}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Link"
                {...register("link")}
                error={!!errors.link}
                helperText={errors.link?.message}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <FormControl fullWidth error={!!errors.style}>
                <InputLabel id="ad-style-label">Orientation/Style</InputLabel>
                <Select
                  labelId="ad-style-label"
                  id="style"
                  label="Orientation/Style"
                  defaultValue="square"
                  {...register("style")}
                >
                  <MenuItem value="square">Square</MenuItem>
                  <MenuItem value="horizontal">Horizontal</MenuItem>
                  <MenuItem value="vertical">Vertical</MenuItem>
                </Select>
                {errors.style && (
                  <FormHelperText>{errors.style.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, sm: 4 }}>
              <TextField
                fullWidth
                type="number"
                label="Weight"
                {...register("weight", { valueAsNumber: true })}
                error={!!errors.weight}
                helperText={errors.weight?.message}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <AdImageUploader />
              {errors.image && (
                <Box mt={1} color="error.main">
                  {errors.image.message}
                </Box>
              )}
            </Grid>
          </Grid>

          <Box mt={2} display="flex" justifyContent="center">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              startIcon={
                isSubmitting ? <CircularProgress size={20} /> : <AddIcon />
              }
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Add Advertisement"}
            </Button>
          </Box>
        </form>
      </Box>
    </FormProvider>
  );
};

export default AdForm;

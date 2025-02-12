import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Box, TextField, Button, CircularProgress } from "@mui/material";
import Grid from "@mui/material/Grid2";
import AddIcon from "@mui/icons-material/Add";
import { Ad } from "../types/ad";

const schema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  image: z.string().url("Invalid image URL"),
  link: z.string().url("Invalid link URL"),
  weight: z.number().min(1, "Weight must be at least 1"),
});

const AdForm = ({
  addAd,
}: {
  addAd: (
    ad: Omit<Ad, "id" | "is_active">,
  ) => Promise<{ success: boolean; errors?: Record<string, string[]> }>;
}) => {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      image: "",
      link: "",
      weight: 1,
    },
  });

  const onSubmit = async (data: Omit<Ad, "id" | "is_active">) => {
    try {
      const response = await addAd(data);

      if (!response.success && response.errors) {
        Object.entries(response.errors).forEach(([key, messages]) => {
          setError(key as keyof Omit<Ad, "id" | "is_active">, {
            type: "server",
            message: messages[0],
          });
        });
      } else {
        reset();
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      setError("title", {
        type: "server",
        message: "An unexpected error occurred",
      });
    }
  };

  return (
    <Box sx={{ p: 3, mb: 3 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
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
              label="Image URL"
              {...register("image")}
              error={!!errors.image}
              helperText={errors.image?.message}
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
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              type="number"
              label="Weight"
              {...register("weight", { valueAsNumber: true })}
              error={!!errors.weight}
              helperText={errors.weight?.message}
            />
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
  );
};

export default AdForm;

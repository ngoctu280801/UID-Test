import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  title: Yup.string().required("Please enter your title"),
  description: Yup.string().required("Please enter your description"),
  media: Yup.array().required("Please enter your media"),
  pricing: Yup.number()
    .required("Please enter your pricing")
    .positive("Pricing must be a positive number"),
  category: Yup.string(),
  tags: Yup.array().of(Yup.string().required()),
  productType: Yup.string(),
});

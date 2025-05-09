import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

type LeadFormData = {
  name: string;
  email: string;
  source: string;
  referralName: string | null;
  adCampaign: string | null;
};

const leadSchema: yup.ObjectSchema<LeadFormData> = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  source: yup.string().required("Lead source is required"),
  referralName: yup
    .string()
    .nullable()
    .default(null)
    .when("source", ([source], schema) =>
      source === "Referral" ? schema.required("Referral name is required") : schema
    ),
  adCampaign: yup
    .string()
    .nullable()
    .default(null)
    .when("source", ([source], schema) =>
      source === "Ads" ? schema.required("Campaign name is required") : schema
    ),
});

const CreateLead = () => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<LeadFormData>({
    resolver: yupResolver(leadSchema),
  });

  const source = watch("source");

  const onSubmit = (data: LeadFormData) => {
    console.log("Lead submitted:", data);
    alert("Lead submitted successfully!");
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow mt-6">
      <h2 className="text-2xl font-bold mb-4">Create New Lead</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block mb-1">Name</label>
          <input
            {...register("name")}
            className="w-full p-2 border rounded"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-1">Email</label>
          <input
            {...register("email")}
            className="w-full p-2 border rounded"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-1">Lead Source</label>
          <select
            {...register("source")}
            className="w-full p-2 border rounded"
          >
            <option value="">Select Source</option>
            <option value="Website">Website</option>
            <option value="Referral">Referral</option>
            <option value="Ads">Ads</option>
          </select>
          {errors.source && (
            <p className="text-red-500 text-sm">{errors.source.message}</p>
          )}
        </div>

        {source === "Referral" && (
          <div>
            <label className="block mb-1">Referral Name</label>
            <input
              {...register("referralName")}
              className="w-full p-2 border rounded"
            />
            {errors.referralName && (
              <p className="text-red-500 text-sm">{errors.referralName.message}</p>
            )}
          </div>
        )}

        {source === "Ads" && (
          <div>
            <label className="block mb-1">Ad Campaign</label>
            <input
              {...register("adCampaign")}
              className="w-full p-2 border rounded"
            />
            {errors.adCampaign && (
              <p className="text-red-500 text-sm">{errors.adCampaign.message}</p>
            )}
          </div>
        )}

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateLead;

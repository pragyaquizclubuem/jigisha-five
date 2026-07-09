"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Copy } from "lucide-react";
import toast from "react-hot-toast";

const qmSchema = z.object({
  id: z.string().min(1, "ID is required").regex(/^[a-z0-9-]+$/, "ID must be lowercase alphanumeric and hyphens"),
  name: z.string().min(2, "Name is required"),
  image: z.string().url("Must be a valid URL or path (e.g. /images/...)").optional().or(z.literal("")),
  bio: z.string().optional(),
  facebook: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  instagram: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  linkedin: z.string().url("Must be a valid URL").optional().or(z.literal("")),
});

type QmFormValues = z.infer<typeof qmSchema>;

export default function QmForm() {
  const [generatedJson, setGeneratedJson] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<QmFormValues>({
    resolver: zodResolver(qmSchema),
    defaultValues: {
      id: "qm-",
      name: "",
      image: "/images/Pragya_Team.avif",
      bio: "",
      facebook: "",
      instagram: "",
      linkedin: "",
    },
  });

  const onSubmit = (data: QmFormValues) => {
    const formattedData = {
      id: data.id,
      name: data.name,
      image: data.image || "/images/Pragya_Team.avif",
      bio: data.bio || undefined,
      socials: {
        ...(data.facebook ? { facebook: data.facebook } : {}),
        ...(data.instagram ? { instagram: data.instagram } : {}),
        ...(data.linkedin ? { linkedin: data.linkedin } : {}),
      },
    };

    // Remove empty socials object if none exist
    if (Object.keys(formattedData.socials).length === 0) {
      delete (formattedData as any).socials;
    }

    setGeneratedJson(JSON.stringify(formattedData, null, 2) + ",");
    toast.success("JSON Generated!");
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedJson);
    toast.success("Copied to clipboard!");
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
      {/* Form Section */}
      <div className="bg-[#FFEDE0] p-6 sm:p-8 rounded-[24px] border-4 border-[#252525] shadow-[8px_8px_0_0_#252525]">
        <h2 className="font-roboto-condensed text-3xl font-bold uppercase tracking-widest text-[#513081] mb-6">
          Generate QM Data
        </h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 font-body">
          <div>
            <label className="block text-sm font-bold uppercase mb-1">ID *</label>
            <input 
              {...register("id")} 
              className="w-full p-3 rounded-lg border-2 border-[#252525] focus:outline-none focus:ring-2 focus:ring-[#513081]" 
            />
            {errors.id && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.id.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-bold uppercase mb-1">Full Name *</label>
            <input 
              {...register("name")} 
              className="w-full p-3 rounded-lg border-2 border-[#252525] focus:outline-none focus:ring-2 focus:ring-[#513081]" 
            />
            {errors.name && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-bold uppercase mb-1">Image URL</label>
            <input 
              {...register("image")} 
              className="w-full p-3 rounded-lg border-2 border-[#252525] focus:outline-none focus:ring-2 focus:ring-[#513081]" 
            />
            {errors.image && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.image.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-bold uppercase mb-1">Bio (Short)</label>
            <textarea 
              {...register("bio")} 
              rows={2}
              className="w-full p-3 rounded-lg border-2 border-[#252525] focus:outline-none focus:ring-2 focus:ring-[#513081]" 
            />
          </div>

          <div className="space-y-4 pt-4 border-t-2 border-[#252525]/20">
            <h3 className="font-bold uppercase tracking-widest text-sm text-[#513081]">Social Links</h3>
            <div>
              <label className="block text-xs font-bold uppercase mb-1">Facebook URL</label>
              <input {...register("facebook")} className="w-full p-3 rounded-lg border-2 border-[#252525]" />
              {errors.facebook && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.facebook.message}</p>}
            </div>
            <div>
              <label className="block text-xs font-bold uppercase mb-1">Instagram URL</label>
              <input {...register("instagram")} className="w-full p-3 rounded-lg border-2 border-[#252525]" />
              {errors.instagram && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.instagram.message}</p>}
            </div>
            <div>
              <label className="block text-xs font-bold uppercase mb-1">LinkedIn URL</label>
              <input {...register("linkedin")} className="w-full p-3 rounded-lg border-2 border-[#252525]" />
              {errors.linkedin && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.linkedin.message}</p>}
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button 
              type="submit"
              className="flex-1 py-4 font-bold uppercase tracking-widest text-[#FFEDE0] bg-[#513081] rounded-full border-2 border-[#252525] transition-all hover:-translate-y-1 hover:shadow-[4px_4px_0_0_#252525]"
            >
              Generate JSON
            </button>
            <button 
              type="button"
              onClick={() => { reset(); setGeneratedJson(""); }}
              className="px-6 py-4 font-bold uppercase tracking-widest text-[#252525] bg-white rounded-full border-2 border-[#252525] transition-all hover:-translate-y-1 hover:shadow-[4px_4px_0_0_#252525]"
            >
              Clear
            </button>
          </div>
        </form>
      </div>

      {/* Output Section */}
      <div className="bg-[#252525] text-white p-6 sm:p-8 rounded-[24px] border-4 border-[#252525] shadow-[8px_8px_0_0_#513081] flex flex-col relative group">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-roboto-condensed text-2xl font-bold uppercase tracking-widest text-[#D7ABFF]">
            Generated JSON
          </h2>
          {generatedJson && (
            <button 
              onClick={copyToClipboard}
              className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
              title="Copy to clipboard"
            >
              <Copy className="w-5 h-5 text-white" />
            </button>
          )}
        </div>
        
        <div className="flex-1 bg-black/50 p-4 rounded-lg overflow-auto font-mono text-sm border-2 border-white/10 min-h-[300px]">
          {generatedJson ? (
            <pre className="text-[#a6e22e]">{generatedJson}</pre>
          ) : (
            <div className="h-full flex items-center justify-center text-white/30 italic">
              Fill the form and submit to generate data for QmData.ts
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

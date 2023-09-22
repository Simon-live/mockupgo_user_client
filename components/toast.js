import toast from "react-hot-toast";

export const success = (string) => {
  return toast.success(string, {
    duration: 2000,
    className:
      "!text-sm !text-slate-600 !shadow-2xl !shadow-slate-400/50 !rounded-2xl",
  });
};

export const info = (string) => {
  return toast(string, {
    duration: 2000,
    className:
      "!text-sm !text-slate-600 !shadow-2xl !shadow-slate-400/50 !rounded-2xl",
  });
};

export const error = (string) => {
  return toast.error(string, {
    duration: 2000,
    className:
      "!text-sm !text-slate-600 !shadow-2xl !shadow-slate-400/50 !rounded-2xl",
  });
};

export default {
  info,
  success,
  error,
};

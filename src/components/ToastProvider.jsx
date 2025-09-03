import { Toaster } from "react-hot-toast";

export const ToastProvider = () => {
  return (
    <Toaster
      position="top-center"
      gutter={8}
      toastOptions={{
        success: {
          duration: 3000,
          style: {
            background: "#4ade80",
            color: "white",
            padding: "16px",
            borderRadius: "8px",
            maxWidth: "350px",
            textAlign: "center",
          },
        },
        error: {
          duration: 3000,
          style: {
            background: "#f87171",
            color: "white",
            padding: "16px",
            borderRadius: "8px",
            maxWidth: "350px",
            textAlign: "center",
          },
        },
        loading: {
          duration: 3000,
          style: {
            background: "#60a5fa",
            color: "white",
            padding: "16px",
            borderRadius: "8px",
            maxWidth: "350px",
            textAlign: "center",
          },
        },
      }}
    />
  );
};

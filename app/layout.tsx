import AddTask from "./components/AddTask";
import Details from "./components/Details";
import Header from "./components/Header";
import TaskProvider from "./contexts/TaskContext";
import "./globals.css";
import {Roboto} from "next/font/google"
import { Toaster } from "sonner";
const roboto = Roboto({subsets: ["latin"]})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.className}  max-w-[100%] h-[100vh]`}
      >
        <Toaster duration={3000} toastOptions={{
              style: { backgroundColor: "#514e95", color: "white", borderColor: "#2C2C38"},
              descriptionStyle: {color: "#697080"}, // Change to your preferred color

        }}/>

        <TaskProvider>
          <Header />
          {children}
        </TaskProvider>
      </body>
    </html>
  );
}

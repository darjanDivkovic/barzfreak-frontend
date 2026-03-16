import emailjs from "@emailjs/browser";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export async function sendMemberEmail({ name, email }) {
  return emailjs.send(
    SERVICE_ID,
    TEMPLATE_ID,
    {
      member_name: name,
      member_email: email,
      to_email: "darjan.developer@gmail.com",
    },
    PUBLIC_KEY,
  );
}
